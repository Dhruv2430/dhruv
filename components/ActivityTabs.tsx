'use client';

import React, { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, GitBranch } from 'lucide-react';
import { LeetCode3D } from './LeetCode3D';

const GitHubAnalytics = lazy(() =>
  import('./GitHubAnalytics').then((module) => ({ default: module.GitHubAnalytics }))
);

type ActivityTab = 'leetcode' | 'github';

export function ActivityTabs() {
  const [activeTab, setActiveTab] = useState<ActivityTab>('leetcode');

  return (
    <section id="activity" className="relative border-t border-border/40 bg-[#F6F6F6]">
      <div className="sticky top-0 z-30 border-b border-[#D9CAB3]/45 bg-[#F6F6F6]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="mx-auto flex w-full max-w-md rounded-full border border-[#D9CAB3]/55 bg-[#FAF6F0]/80 p-1 shadow-[0_8px_32px_rgb(0,0,0,0.04)]">
            {[
              { id: 'leetcode' as const, label: 'LeetCode', icon: Code2 },
              { id: 'github' as const, label: 'GitHub', icon: GitBranch },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${
                    isActive ? 'text-[#F6F6F6]' : 'text-[#6B6B6B] hover:text-[#212121]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activity-tab-indicator"
                      className="absolute inset-0 rounded-full bg-[#6D9886] shadow-[0_0_24px_rgba(109,152,134,0.35)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.985 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          {activeTab === 'leetcode' ? (
            <LeetCode3D />
          ) : (
            <Suspense
              fallback={
                <div className="min-h-[620px] flex items-center justify-center bg-[#F6F6F6]">
                  <div className="w-8 h-8 border-2 border-[#6D9886] border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <GitHubAnalytics />
            </Suspense>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
