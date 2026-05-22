'use client';

import React, { useRef, useMemo, useState } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { SubmissionData } from '@/types/leetcode';

interface LeetCodeHeatmapProps {
  data: SubmissionData[];
  onHover: (data: SubmissionData | null, position: { x: number, y: number } | null) => void;
}

// Minimalist Light Theme Colors
const COLOR_PALETTE = [
  new THREE.Color('#D9CAB3'), // Level 0: Empty beige
  new THREE.Color('#b4cbbd'), // Level 1: Very light green
  new THREE.Color('#90b1a2'), // Level 2: Light green
  new THREE.Color('#6D9886'), // Level 3: Primary Accent Green
  new THREE.Color('#567A6B'), // Level 4: Darker Green
];

const HOVER_COLOR = new THREE.Color('#567A6B').multiplyScalar(1.2);

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function LeetCodeHeatmap({ data, onHover }: LeetCodeHeatmapProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Entrance animation
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { mass: 2, tension: 100, friction: 40 }
  });

  const numItems = data.length;

  // Pre-compute colors
  const colorArray = useMemo(() => {
    const colors = new Float32Array(numItems * 3);
    for (let i = 0; i < numItems; i++) {
      const color = COLOR_PALETTE[data[i].level];
      color.toArray(colors, i * 3);
    }
    return colors;
  }, [data, numItems]);

  // Track target heights for smooth spring-like animation per cube
  const currentHeights = useRef<Float32Array>(new Float32Array(numItems).fill(0.2));

  // Compute month label positions
  const monthLabels = useMemo(() => {
    const labels: { text: string; x: number; z: number }[] = [];
    let currentMonth = -1;
    let i = 0;
    
    for (let col = 0; col < 52; col++) {
      for (let row = 0; row < 7; row++) {
        if (i >= numItems) break;
        const submission = data[i];
        const month = submission.date.getMonth();
        
        // Add label if the month changes (and we are on the top row to just get 1 per month)
        if (month !== currentMonth && row === 0) {
          currentMonth = month;
          const monthName = submission.date.toLocaleString('default', { month: 'short' });
          const x = (col - 26) * 1.2;
          labels.push({ text: monthName, x, z: 4.5 * 1.2 }); // Place below the grid
        }
        i++;
      }
    }
    return labels;
  }, [data, numItems]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    let i = 0;
    for (let col = 0; col < 52; col++) {
      for (let row = 0; row < 7; row++) {
        if (i >= numItems) break;

        const submission = data[i];
        
        const x = (col - 26) * 1.2;
        const z = (row - 3.5) * 1.2;
        
        const isHovered = hoveredId === i;
        
        // Base target height
        let targetHeight = 0.3;
        if (submission.count > 0) {
          targetHeight = 0.5 + (submission.level * 1.0);
        }
        if (isHovered) {
          targetHeight *= 1.3;
        }

        // Smoothly interpolate current height towards target height
        currentHeights.current[i] = THREE.MathUtils.lerp(
          currentHeights.current[i], 
          targetHeight, 
          delta * (isHovered ? 15 : 5)
        );

        const currentScaleY = currentHeights.current[i];
        const targetY = currentScaleY / 2;

        tempObject.position.set(x, targetY, z);
        tempObject.scale.set(1, currentScaleY, 1);
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(i, tempObject.matrix);
        
        // Update color dynamically on hover
        if (isHovered) {
          tempColor.copy(HOVER_COLOR);
        } else {
          tempColor.copy(COLOR_PALETTE[submission.level]);
        }
        meshRef.current.setColorAt(i, tempColor);

        i++;
      }
    }
    
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.instanceId !== undefined && e.instanceId !== hoveredId) {
      setHoveredId(e.instanceId);
      document.body.style.cursor = 'pointer';
      
      // Calculate screen coordinates safely
      const position = { x: e.clientX, y: e.clientY };
      onHover(data[e.instanceId], position);
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHoveredId(null);
    document.body.style.cursor = 'auto';
    onHover(null, null);
  };

  React.useEffect(() => {
    return () => { document.body.style.cursor = 'auto'; };
  }, []);

  const dayLabels = [
    { text: 'Mon', z: (-2.5) * 1.2 },
    { text: 'Wed', z: (-0.5) * 1.2 },
    { text: 'Fri', z: (1.5) * 1.2 },
    { text: 'Sun', z: (3.5) * 1.2 },
  ];

  return (
    <a.group scale={scale}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, numItems]}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.95, 1, 0.95]}>
          <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
        </boxGeometry>
        
        {/* Premium soft matte material with subtle clearcoat */}
        <meshPhysicalMaterial 
          vertexColors
          roughness={0.55}
          metalness={0.0}
          clearcoat={0.15}
          clearcoatRoughness={0.6}
        />
      </instancedMesh>

      {/* 3D Text Labels for Days */}
      {dayLabels.map((label, idx) => (
        <Text
          key={`day-${idx}`}
          position={[(-27) * 1.2, 0.2, label.z]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.6}
          color="#6B6B6B"
          anchorX="right"
          anchorY="middle"
        >
          {label.text}
        </Text>
      ))}

      {/* 3D Text Labels for Months */}
      {monthLabels.map((label, idx) => (
        <Text
          key={`month-${idx}`}
          position={[label.x, 0.2, label.z]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.6}
          color="#6B6B6B"
          anchorX="center"
          anchorY="top"
        >
          {label.text}
        </Text>
      ))}
    </a.group>
  );
}
