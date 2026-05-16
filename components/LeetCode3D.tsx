'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Lock, 
  MousePointer2, 
  Move3d, 
  RotateCw, 
  ZoomIn,
  User,
  Settings2,
  PieChart,
  BarChart2,
  Clock,
  RefreshCw,
  TrendingUp,
  Network,
  Package
} from 'lucide-react';
import * as THREE from 'three';
import { useLeetCode } from '@/hooks/useLeetCode';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';
import { SubmissionData } from '@/types/leetcode';

export function LeetCode3D() {
  const { data, stats, loading, error } = useLeetCode('2S4eTOtSDy');
  const [tooltip, setTooltip] = useState<{ data: SubmissionData | null; pos: { x: number; y: number } | null }>({ data: null, pos: null });
  const [autoRotate, setAutoRotate] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' • ' + now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  }, [data]);

  const handleHover = (hoverData: SubmissionData | null, position: { x: number; y: number } | null) => {
    setTooltip({ data: hoverData, pos: position });
  };

  const handleRefresh = () => {
    window.location.reload(); // Simple refresh for now
  };

  return (
    <section className="w-full relative overflow-hidden bg-[#F6F6F6] font-sans pt-16 pb-12 px-4 md:px-8">
      
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-[#212121] text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
            LeetCode Activity
          </h2>
          <p className="text-[#6B6B6B] text-sm md:text-lg font-medium px-4">
            Real-time visualization of my problem solving journey.
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center items-center gap-3 md:gap-4 mb-8 md:mb-4">
            <div className="bg-[#EAECEB] border border-[#D9CAB3]/45 rounded-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 w-full lg:min-w-[160px] lg:w-auto shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
              <TrendingUp className="text-[#6D9886] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div>
                <div className="text-[#6B6B6B] text-[10px] md:text-sm font-medium">Total Solved</div>
                <div className="text-[#212121] text-xl md:text-2xl font-bold leading-tight mt-1">{stats.total}</div>
              </div>
            </div>

            <div className="bg-[#FAF6F0] border border-[#D9CAB3]/45 rounded-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 w-full lg:min-w-[160px] lg:w-auto shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
              <Network className="text-[#6D9886] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div>
                <div className="text-[#6B6B6B] text-[10px] md:text-sm font-medium">Easy</div>
                <div className="text-[#212121] text-xl md:text-2xl font-bold leading-tight mt-1">{stats.easy}</div>
              </div>
            </div>

            <div className="bg-[#FAF6F0] border border-[#D9CAB3]/45 rounded-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 w-full lg:min-w-[160px] lg:w-auto shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
              <Lock className="text-[#6D9886] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div>
                <div className="text-[#6B6B6B] text-[10px] md:text-sm font-medium">Medium</div>
                <div className="text-[#212121] text-xl md:text-2xl font-bold leading-tight mt-1">{stats.medium}</div>
              </div>
            </div>

            <div className="bg-[#FAF6F0] border border-[#D9CAB3]/45 rounded-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 w-full lg:min-w-[160px] lg:w-auto shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
              <Package className="text-[#6D9886] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div>
                <div className="text-[#6B6B6B] text-[10px] md:text-sm font-medium">Hard</div>
                <div className="text-[#212121] text-xl md:text-2xl font-bold leading-tight mt-1">{stats.hard}</div>
              </div>
            </div>
          </div>
        )}

        {/* 3D Canvas Area */}
        <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] relative mb-6">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-[#6D9886] z-10">
              <div className="w-8 h-8 border-2 border-[#6D9886] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <Canvas
              camera={{ position: [0, 35, 40], fov: 35 }}
              dpr={[1, 2]}
            >
              <color attach="background" args={['#F6F6F6']} />
              
              <Suspense fallback={null}>
                {/* Clean, soft studio lighting */}
                <ambientLight intensity={1.5} color="#ffffff" />
                <directionalLight position={[20, 30, 10]} intensity={0.6} color="#ffffff" />
                <directionalLight position={[-10, 15, -15]} intensity={0.4} color="#f0efe9" />
                
                <LeetCodeHeatmap data={data} onHover={handleHover} />
                
                {/* Soft floor shadow */}
                <ContactShadows 
                  position={[0, -0.5, 0]} 
                  opacity={0.4} 
                  scale={120} 
                  blur={3} 
                  far={10} 
                  color="#8c8c8c"
                />

                <OrbitControls 
                  enablePan={true}
                  enableZoom={false}
                  enableRotate={true}
                  autoRotate={autoRotate}
                  autoRotateSpeed={0.5}
                  maxPolarAngle={Math.PI / 2.3}
                  minPolarAngle={Math.PI / 4}
                  minDistance={20}
                  maxDistance={60}
                />
              </Suspense>
            </Canvas>
          )}

        </div>

        {/* Controls Row (Below Canvas) */}
        <div className="w-full flex justify-between items-center mb-6 px-2">
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)] ${
              autoRotate 
                ? 'bg-[#ffffff] border-[#6D9886] shadow-sm' 
                : 'bg-[#ffffff] border-[#D9CAB3]/45 text-[#6B6B6B] hover:border-[#D9CAB3]'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'text-[#6D9886] animate-spin' : ''}`} />
            <span className={`text-xs font-semibold ${autoRotate ? 'text-[#6D9886]' : 'text-[#6B6B6B]'}`}>Auto Rotate</span>
            <span className={`w-1.5 h-1.5 rounded-full ml-1 ${autoRotate ? 'bg-[#6D9886]' : 'bg-[#D9CAB3]'}`}></span>
          </button>

          <div className="flex items-center gap-2">
            <div className="bg-[#ffffff] border border-[#D9CAB3]/45 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <Move3d className="w-4 h-4 text-[#6B6B6B]" />
              <span className="text-[#6B6B6B] text-[11px] font-semibold">Drag to Rotate</span>
              <span className="w-1 h-1 rounded-full bg-[#6B6B6B]/30 mx-1"></span>
            </div>
            {/* Adding Scroll to Zoom back conditionally to match the image, but kept as a static pill */}
            <div className="bg-[#ffffff] border border-[#D9CAB3]/45 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hidden md:flex">
              <ZoomIn className="w-4 h-4 text-[#6B6B6B]" />
              <span className="text-[#6B6B6B] text-[11px] font-semibold">Scroll to Zoom</span>
            </div>
            <div className="bg-[#ffffff] border border-[#D9CAB3]/45 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hidden lg:flex">
              <MousePointer2 className="w-4 h-4 text-[#6B6B6B]" />
              <span className="text-[#6B6B6B] text-[11px] font-semibold">Click + Drag to Pan</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6D9886] ml-1"></span>
            </div>
          </div>
        </div>

        {/* Minimalist Tooltip — Fixed to viewport so it tracks the cursor */}
        <AnimatePresence>
          {tooltip.data && tooltip.pos && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.12 }}
              className="fixed z-[9999] pointer-events-none"
              style={{
                left: tooltip.pos.x,
                top: tooltip.pos.y - 140,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="bg-[#FAFAF8] border border-[#D9CAB3]/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative w-48">
                <div className="p-3 border-b border-[#D9CAB3]/30 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6D9886]" />
                  <span className="text-[#212121] text-sm font-semibold">
                    {tooltip.data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#6D9886]"></div>
                    <span className="text-[#6B6B6B] text-sm font-medium">{tooltip.data.count} submissions</span>
                  </div>
                  <div className="text-[#212121] text-xs font-medium">Keep it up! 🚀</div>
                </div>
                
                {/* Vertical Tracking Line */}
                <div className="absolute left-1/2 bottom-[-36px] w-[2px] h-[36px] bg-gradient-to-b from-[#6D9886]/50 to-transparent -translate-x-1/2"></div>
                <div className="absolute left-1/2 bottom-[-36px] w-1.5 h-1.5 bg-[#6D9886] rounded-full -translate-x-1/2"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Information Dashboard Panel */}
        <div className="w-full bg-[#F5F2EC] rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* About */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#6D9886]">
                <User className="w-5 h-5" />
                <h4 className="font-semibold text-[#212121]">About</h4>
              </div>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                This 3D heatmap shows my LeetCode submissions over the past year. Taller blocks mean more submissions on that day.
              </p>
            </div>

            {/* How it works */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#6D9886]">
                <Settings2 className="w-5 h-5" />
                <h4 className="font-semibold text-[#212121]">How it works</h4>
              </div>
              <ul className="text-sm text-[#6B6B6B] space-y-2 list-disc list-inside">
                <li>Live data from LeetCode GraphQL</li>
                <li>Updates every 60 seconds</li>
                <li>3D visualization with WebGL</li>
                <li>Interaction: rotate, zoom, pan</li>
              </ul>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#6D9886]">
                <PieChart className="w-5 h-5" />
                <h4 className="font-semibold text-[#212121]">Legend</h4>
              </div>
              <div className="space-y-2 text-sm text-[#6B6B6B]">
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#D9CAB3]"></div> 0 submissions</div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#b4cbbd]"></div> 1 - 2 submissions</div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#90b1a2]"></div> 3 - 5 submissions</div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-[#567A6B]"></div> 6+ submissions</div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#6D9886]">
                <BarChart2 className="w-5 h-5" />
                <h4 className="font-semibold text-[#212121]">Stats</h4>
              </div>
              <ul className="text-sm text-[#6B6B6B] space-y-2 list-disc list-inside">
                <li>Consistency is the key</li>
                <li>Keep solving, keep growing</li>
                <li>Quality over quantity</li>
                <li>One step at a time</li>
              </ul>
            </div>

            {/* Last Updated */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#6D9886]">
                <Clock className="w-5 h-5" />
                <h4 className="font-semibold text-[#212121]">Last Updated</h4>
              </div>
              <p className="text-sm text-[#6B6B6B] font-medium">
                {lastUpdated || 'Loading...'}
              </p>
              <button 
                onClick={handleRefresh}
                className="mt-4 flex items-center gap-2 bg-[#6D9886] hover:bg-[#567A6B] text-[#F6F6F6] px-4 py-2 rounded-lg text-sm font-medium transition-colors w-max"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Now
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
