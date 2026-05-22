'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { GitHubActivityDay } from '@/types/github';

interface GitHub3DSceneProps {
  activity: GitHubActivityDay[];
  onHover: (
    data: GitHubActivityDay | null,
    position: { x: number; y: number } | null
  ) => void;
}

// LeetCode-style Premium Color Palette
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

function ContributionField({
  activity,
  onHover,
}: {
  activity: GitHubActivityDay[];
  onHover: GitHub3DSceneProps['onHover'];
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const heights = useRef<Float32Array>(new Float32Array(activity.length).fill(0.2));

  const colorArray = useMemo(() => {
    const colors = new Float32Array(activity.length * 3);
    for (let i = 0; i < activity.length; i++) {
      COLOR_PALETTE[activity[i].level].toArray(colors, i * 3);
    }
    return colors;
  }, [activity]);

  // Compute month label positions dynamically
  const monthLabels = useMemo(() => {
    const labels: { text: string; x: number; z: number }[] = [];
    let currentMonth = -1;
    let i = 0;
    
    for (let col = 0; col < 52; col++) {
      for (let row = 0; row < 7; row++) {
        if (i >= activity.length) break;
        const day = activity[i];
        const dateObj = new Date(day.date);
        const month = dateObj.getMonth();
        
        // Add label if the month changes (and we are on the top row to get 1 per month)
        if (month !== currentMonth && row === 0) {
          currentMonth = month;
          const monthName = dateObj.toLocaleString('default', { month: 'short' });
          const x = (col - 26) * 1.2;
          labels.push({ text: monthName, x, z: 4.5 * 1.2 }); // Place below the grid
        }
        i++;
      }
    }
    return labels;
  }, [activity]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    let index = 0;
    for (let col = 0; col < 52; col++) {
      for (let row = 0; row < 7; row++) {
        if (index >= activity.length) break;

        const day = activity[index];
        const isHovered = hoveredId === index;
        
        // Match LeetCode height formula exactly
        let targetHeight = 0.3;
        if (day.count > 0) {
          targetHeight = 0.5 + (day.level * 1.0);
        }
        if (isHovered) {
          targetHeight *= 1.3;
        }

        heights.current[index] = THREE.MathUtils.lerp(
          heights.current[index],
          targetHeight,
          delta * (isHovered ? 15 : 5)
        );

        // Match LeetCode spacing exactly
        const x = (col - 26) * 1.2;
        const z = (row - 3.5) * 1.2;
        const targetY = heights.current[index] / 2;

        tempObject.position.set(x, targetY, z);
        tempObject.scale.set(1, heights.current[index], 1);
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(index, tempObject.matrix);

        // Update colors dynamically
        if (isHovered) {
          tempColor.copy(HOVER_COLOR);
        } else {
          tempColor.copy(COLOR_PALETTE[day.level]);
        }
        meshRef.current.setColorAt(index, tempColor);
        index += 1;
      }
    }

    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const dayLabels = [
    { text: 'Mon', z: (-2.5) * 1.2 },
    { text: 'Wed', z: (-0.5) * 1.2 },
    { text: 'Fri', z: (1.5) * 1.2 },
    { text: 'Sun', z: (3.5) * 1.2 },
  ];

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, activity.length]}
        onPointerMove={(event) => {
          event.stopPropagation();
          const instanceId = event.instanceId;
          if (instanceId === undefined) return;
          setHoveredId(instanceId);
          document.body.style.cursor = 'pointer';
          onHover(activity[instanceId], { x: event.clientX, y: event.clientY });
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHoveredId(null);
          document.body.style.cursor = 'auto';
          onHover(null, null);
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.95, 1, 0.95]}>
          <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
        </boxGeometry>
        
        {/* Premium matte material matching LeetCode */}
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
    </group>
  );
}

export function GitHub3DScene({ activity, onHover }: GitHub3DSceneProps) {
  const { scale } = useSpring({
    from: { scale: 0.8 },
    to: { scale: 1 },
    config: { mass: 2, tension: 110, friction: 34 },
  });

  React.useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <a.group scale={scale}>
      <ContributionField activity={activity} onHover={onHover} />
    </a.group>
  );
}
