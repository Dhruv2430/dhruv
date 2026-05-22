'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Code2,
  GitPullRequest,
  MousePointer2,
  Move3d,
  Radio,
  RefreshCw,
  RotateCw,
  Star,
  TimerReset,
  Trophy,
} from 'lucide-react';
import { GitHub3DScene } from './GitHub3DScene';
import { useGitHub } from '@/hooks/useGitHub';
import { GitHubActivityDay } from '@/types/github';

// Tooltip data helpers removed because 3D Scene now only visualizes activity commits

function StatCard({
  icon,
  label,
  value,
  tint = '#6D9886',
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tint?: string;
}) {
  return (
    <div className="bg-[#FAF6F0]/90 border border-[#D9CAB3]/45 rounded-xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
      <div style={{ color: tint }}>{icon}</div>
      <div>
        <div className="text-[#6B6B6B] text-[10px] md:text-sm font-medium">{label}</div>
        <div className="text-[#212121] text-xl md:text-2xl font-bold leading-tight mt-1">{value}</div>
      </div>
    </div>
  );
}

export function GitHubAnalytics() {
  const { data, loading, refreshing, error } = useGitHub('Dhruv2430');
  const [autoRotate, setAutoRotate] = useState(true);
  const [tooltip, setTooltip] = useState<{
    data: GitHubActivityDay | null;
    pos: { x: number; y: number } | null;
  }>({ data: null, pos: null });

  const fetchedAt = data?.fetchedAt;
  const lastUpdated = useMemo(() => {
    if (!fetchedAt) return 'Loading...';
    const date = new Date(fetchedAt);
    return `${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} • ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }, [fetchedAt]);

  const topLanguage = data?.languages[0];

  return (
    <section className="w-full relative overflow-hidden bg-[#F6F6F6] font-sans pt-16 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FAF6F0]/80 border border-[#D9CAB3]/50 rounded-full px-4 py-2 mb-4">
            <Radio className={`w-4 h-4 text-[#6D9886] ${refreshing ? 'animate-pulse' : ''}`} />
            <span className="text-[#6B6B6B] text-xs font-semibold uppercase tracking-[0.18em]">
              Live GitHub Signal
            </span>
          </div>
          <h2 className="text-[#212121] text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
            GitHub Activity
          </h2>
          <p className="text-[#6B6B6B] text-sm md:text-lg font-medium px-4">
            Live repository, language, star, pull request, and contribution analytics for Dhruv2430.
          </p>
        </div>

        {data && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-4">
            <StatCard icon={<Star className="w-5 h-5 md:w-6 md:h-6" />} label="Stars" value={data.stats.totalStars} />
            <StatCard icon={<Code2 className="w-5 h-5 md:w-6 md:h-6" />} label="Repos" value={data.stats.publicRepos} />
            <StatCard icon={<GitPullRequest className="w-5 h-5 md:w-6 md:h-6" />} label="Pull Requests" value={data.stats.pullRequests} />
            <StatCard icon={<Activity className="w-5 h-5 md:w-6 md:h-6" />} label="Recent Commits" value={data.stats.recentCommits} />
            <StatCard icon={<Trophy className="w-5 h-5 md:w-6 md:h-6" />} label="Streak" value={`${data.stats.currentStreak}d`} tint="#35A98A" />
          </div>
        )}

        <div className="w-full h-[360px] md:h-[470px] lg:h-[540px] relative mb-6 rounded-2xl overflow-hidden border border-[#D9CAB3]/35 bg-[#F6F6F6]/70">
          {(loading || refreshing) && (
            <div className="absolute top-4 right-4 z-10 bg-[#FAF6F0]/90 border border-[#D9CAB3]/50 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <RefreshCw className="w-4 h-4 text-[#6D9886] animate-spin" />
              <span className="text-[#6B6B6B] text-xs font-semibold">{loading ? 'Loading GitHub' : 'Refreshing'}</span>
            </div>
          )}

          {error && !data && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-[#FAF6F0] border border-[#D9CAB3]/60 rounded-2xl p-6 text-center max-w-md">
                <h3 className="text-[#212121] text-xl font-bold mb-2">GitHub signal unavailable</h3>
                <p className="text-[#6B6B6B] text-sm">{error}</p>
              </div>
            </div>
          )}

          {data && (
            <Canvas camera={{ position: [0, 35, 40], fov: 35 }} dpr={[1, 2]}>
              <color attach="background" args={['#F6F6F6']} />
              <Suspense fallback={null}>
                <ambientLight intensity={1.5} color="#ffffff" />
                <directionalLight position={[20, 30, 10]} intensity={0.6} color="#ffffff" />
                <directionalLight position={[-10, 15, -15]} intensity={0.4} color="#f0efe9" />
                <GitHub3DScene
                  activity={data.activity}
                  onHover={(hoverData, position) => setTooltip({ data: hoverData, pos: position })}
                />
                <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={120} blur={3} far={10} color="#8c8c8c" />
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

        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 px-2">
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
            <span className={`w-1.5 h-1.5 rounded-full ml-1 ${autoRotate ? 'bg-[#6D9886]' : 'bg-[#D9CAB3]'}`} />
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-[#ffffff] border border-[#D9CAB3]/45 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <Move3d className="w-4 h-4 text-[#6B6B6B]" />
              <span className="text-[#6B6B6B] text-[11px] font-semibold">Drag to Rotate</span>
              <span className="w-1 h-1 rounded-full bg-[#6B6B6B]/30 mx-1"></span>
            </div>
            <div className="bg-[#ffffff] border border-[#D9CAB3]/45 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hidden lg:flex">
              <MousePointer2 className="w-4 h-4 text-[#6B6B6B]" />
              <span className="text-[#6B6B6B] text-[11px] font-semibold">Click + Drag to Pan</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6D9886] ml-1"></span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {tooltip.data && tooltip.pos && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.12 }}
              className="fixed z-[9999] pointer-events-none"
              style={{ left: tooltip.pos.x, top: tooltip.pos.y - 140, transform: 'translateX(-50%)' }}
            >
              <div className="bg-[#FAFAF8] border border-[#D9CAB3]/60 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative w-56">
                <div className="p-3 border-b border-[#D9CAB3]/30 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#6D9886]" />
                  <span className="text-[#212121] text-sm font-semibold">
                    {new Date(tooltip.data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="p-3 text-sm text-[#6B6B6B]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-semibold text-[#212121]">{tooltip.data.commits}</span> commits
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-semibold text-[#212121]">{tooltip.data.pullRequests}</span> PRs
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#212121]">{tooltip.data.count}</span> activity score
                  </div>
                </div>
                <div className="absolute left-1/2 bottom-[-36px] w-[2px] h-[36px] bg-gradient-to-b from-[#6D9886]/50 to-transparent -translate-x-1/2" />
                <div className="absolute left-1/2 bottom-[-36px] w-1.5 h-1.5 bg-[#6D9886] rounded-full -translate-x-1/2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {data && (
          <div className="w-full bg-[#F5F2EC] rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#6D9886]">
                  <TimerReset className="w-5 h-5" />
                  <h4 className="font-semibold text-[#212121]">Live Feed</h4>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  Auto-refreshes every 60 seconds from GitHub public APIs. Last updated {lastUpdated}.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#6D9886]">
                  <Code2 className="w-5 h-5" />
                  <h4 className="font-semibold text-[#212121]">Languages</h4>
                </div>
                <div className="space-y-2">
                  {data.languages.slice(0, 4).map((language) => (
                    <div key={language.name} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 text-[#6B6B6B]">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: language.color }} />
                        {language.name}
                      </span>
                      <span className="text-[#212121] font-semibold">{language.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#6D9886]">
                  <Trophy className="w-5 h-5" />
                  <h4 className="font-semibold text-[#212121]">Momentum</h4>
                </div>
                <ul className="text-sm text-[#6B6B6B] space-y-2 list-disc list-inside">
                  <li>Longest streak: {data.stats.longestStreak} days</li>
                  <li>Top language: {topLanguage?.name || 'N/A'}</li>
                  <li>Forks across repos: {data.stats.totalForks}</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#6D9886]">
                  <Activity className="w-5 h-5" />
                  <h4 className="font-semibold text-[#212121]">Recent Activity</h4>
                </div>
                <div className="space-y-2">
                  {data.events.slice(0, 3).map((event) => (
                    <div key={event.id} className="text-sm text-[#6B6B6B] leading-snug">
                      <span className="text-[#212121] font-semibold">{event.repo.split('/').pop()}</span> {event.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
