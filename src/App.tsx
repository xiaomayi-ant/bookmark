import React, { useState } from 'react';
import { MessageSquare, ChevronDown, Bookmark, CheckCircle2, Zap, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PickItem, AppStats } from './types';

const MOCK_PICKS: PickItem[] = [
  {
    id: '1',
    number: 10,
    username: '@miantiao',
    title: 'Cloudflare Containers 上运行 OpenCode',
    status: '待确认',
    tag: 'High Value',
    description: '这篇文章展示了如何利用 Cloudflare Containers 上运行 OpenCode，并实现了持久化与远程访问。',
    summary: '该教程详细演示了如何在 Cloudflare Containers 上运行 OpenCode，并通过 S3FS、Cloudflared 隧道进行访问，从而实现随时随地的云端编程体验。',
    whyItMatters: '这套内容兼具技术实现探索和实际部署价值，适合直接进入你的实验和宽现清单。Next Step: 记录其核心组件组合，并试着在防御自己的在线开发需求中复现该方案。',
    source: '这个项目太酷了，在 Cloudflare Containers 运行 OpenCode，再通过 S3FS 实现数据持久化，通过 Cloudflared 进行远程访问。随时随地，任意终端，任意浏览器都可以 Vide 编程了。言简意赅的 10 分钟视频教程，不容错过。代码量 200 行，但极具参考价值。',
    sourceUrl: 'https://fi.co/o/uWROWzJD7...'
  },
  {
    id: '2',
    number: 8,
    username: '@indie_maker_fox',
    title: 'Indie Maker 的增长策略',
    status: '待确认',
    tag: 'High Value',
    description: '这篇文章分享了独立开发者如何通过内容营销和社区驱动实现早期增长。',
    summary: '作者总结了过去一年的增长经验，强调了在 Twitter 和 Reddit 上建立个人品牌的重要性。',
    whyItMatters: '对于正在寻找第一批用户的开发者来说，这些实战经验非常有参考价值。',
    source: '来自 Indie Hackers 社区的深度分享，包含了大量的具体案例和数据支持。'
  },
  {
    id: '3',
    number: 55,
    username: '@bozhou_ai',
    title: 'AI 驱动的工作流优化',
    status: '待确认',
    tag: 'High Value',
    description: '探讨了如何利用大语言模型自动化日常重复性任务，提升团队整体效率。',
    summary: '本文介绍了几种常见的 AI 集成模式，包括文档摘要、代码审查和自动化周报生成。',
    whyItMatters: '随着 AI 技术的普及，优化工作流已成为提升竞争力的关键。',
    source: '一篇关于企业级 AI 应用的综述性文章，提供了清晰的实施路径。'
  }
];

const MOCK_STATS: AppStats = {
  bookmarks: 390,
  decisions: 4,
  todayTokens: 100453
};

export default function App() {
  const [selectedId, setSelectedId] = useState<string>(MOCK_PICKS[0].id);
  const selectedPick = MOCK_PICKS.find(p => p.id === selectedId) || MOCK_PICKS[0];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[45%] flex flex-col border-r border-app-border bg-app-bg px-10 py-12 overflow-y-auto custom-scrollbar">
        <header className="mb-12">
          <h1 className="font-serif text-4xl font-medium mb-3">Today's Picks</h1>
          <p className="text-sm text-app-muted mb-8">
            先选一个最近更想推进的主题。默认只看 3-5 条，完整队列放在折叠区。
          </p>
          
          <div className="flex gap-4">
            <StatBadge label="Bookmarks" value={MOCK_STATS.bookmarks} />
            <StatBadge label="Decisions" value={MOCK_STATS.decisions} />
            <StatBadge label="Today Tokens" value={MOCK_STATS.todayTokens} />
          </div>
        </header>

        <section>
          <h2 className="text-lg font-semibold mb-6">Focus Picks</h2>
          <div className="space-y-4">
            {MOCK_PICKS.map((pick) => (
              <PickCard 
                key={pick.id} 
                pick={pick} 
                isSelected={selectedId === pick.id}
                onClick={() => setSelectedId(pick.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Main Detail View */}
      <div className="flex-1 flex flex-col bg-app-bg overflow-y-auto custom-scrollbar">
        <div className="px-12 py-12 max-w-3xl">
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-app-border rounded-lg text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors">
              Theme Selector
              <ChevronDown size={14} className="text-app-muted" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPick.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-semibold leading-tight mb-8">
                #{selectedPick.number} {selectedPick.username}<br />
                {selectedPick.title}
              </h2>

              <div className="space-y-8 text-sm leading-relaxed">
                <section>
                  <h3 className="font-semibold mb-2">Summary:</h3>
                  <p className="text-app-muted">{selectedPick.summary}</p>
                </section>

                <section>
                  <h3 className="font-semibold mb-2">Why It Matters:</h3>
                  <p className="text-app-muted">{selectedPick.whyItMatters}</p>
                </section>

                <section>
                  <h3 className="font-semibold mb-2">Source:</h3>
                  <div className="text-app-muted">
                    {selectedPick.source}
                    {selectedPick.sourceUrl && (
                      <a href={selectedPick.sourceUrl} className="text-blue-600 hover:underline ml-1 break-all">
                        {selectedPick.sourceUrl}
                      </a>
                    )}
                  </div>
                </section>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Comment</h3>
                <div className="bg-white border border-app-border rounded-2xl p-4 shadow-sm">
                  <textarea 
                    placeholder="Add your thoughts here..."
                    className="w-full h-32 bg-transparent border-none focus:ring-0 text-sm resize-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-app-border rounded-full shadow-sm">
      <span className="text-xs text-app-muted">{label}</span>
      <span className="text-sm font-medium">{value.toLocaleString()}</span>
    </div>
  );
}

const PickCard: React.FC<{ pick: PickItem; isSelected: boolean; onClick: () => void }> = ({ pick, isSelected, onClick }) => {
  return (
    <motion.div
      layoutId={pick.id}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden
        ${isSelected 
          ? 'bg-white border-app-text shadow-md ring-1 ring-app-text' 
          : 'bg-white border-app-border shadow-sm hover:border-gray-400'}
      `}
    >
      {isSelected && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-app-text"
        />
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm font-semibold">#{pick.number} {pick.username}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-app-muted uppercase tracking-wider font-medium">{pick.status}</span>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-app-text text-white rounded-full text-[10px] font-bold tracking-tight">
          <Zap size={10} fill="currentColor" className="text-yellow-400" />
          {pick.tag}
        </div>
      </div>
      <p className="text-xs leading-relaxed text-app-muted line-clamp-3 font-medium">
        {pick.description}
      </p>
    </motion.div>
  );
};
