import { useState } from 'react'
import {
  BarChart2, Lightbulb, Target, Zap, Calendar,
  Hash, Copy, Check, RefreshCw, ChevronDown, ChevronUp,
} from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'

const SECTIONS = {
  summary:   { icon: Target,     color: 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' },
  channels:  { icon: Hash,       color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' },
  weeks:     { icon: Calendar,   color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' },
  content:   { icon: Lightbulb,  color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  metrics:   { icon: BarChart2,  color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
  quickWins: { icon: Zap,        color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
}

function SectionCard({ sectionKey, title, children }) {
  const { icon: Icon, color } = SECTIONS[sectionKey]
  return (
    <div className="card p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-heading font-semibold text-base text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function WeekCard({ week, theme, actions }) {
  const [open, setOpen] = useState(week === 1)
  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
      <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
        onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center">{week}</span>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">Week {week}</p>
            <p className="text-gray-900 dark:text-white font-medium text-sm">{theme}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-white/5">
          <ul className="mt-3 space-y-2">
            {actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400 text-xs flex items-center justify-center flex-shrink-0 font-medium">{i + 1}</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function planToText(plan, productName) {
  return [
    `30-DAY MARKETING PLAN — ${productName}`, '='.repeat(50), '',
    'EXECUTIVE SUMMARY', plan.summary, '',
    'TOP RECOMMENDED CHANNELS', ...plan.channels.map((c) => `- ${c.name}: ${c.reason}`), '',
    'WEEK-BY-WEEK BREAKDOWN', ...plan.weeks.flatMap((w) => [`Week ${w.week}: ${w.theme}`, ...w.actions.map((a, i) => `  ${i + 1}. ${a}`), '']),
    'CONTENT IDEAS', ...plan.contentIdeas.map((idea, i) => `${i + 1}. ${idea}`), '',
    'KEY METRICS', ...plan.metrics.map((m) => `- ${m.name}: ${m.description}`), '',
    'QUICK WINS', ...plan.quickWins.map((w, i) => `${i + 1}. ${w}`),
  ].join('\n')
}

export default function Results({ plan, productName, onRegenerate }) {
  const [copied, setCopied] = useState(false)
  const ref = useScrollFadeIn()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(planToText(plan, productName))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="results" className="py-16 px-5">
      <div ref={ref} className="fade-in-section max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-1">Your Strategy</p>
            <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">
              30-Day Plan for <span className="text-brand-600 dark:text-brand-400">{productName}</span>
            </h2>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button onClick={onRegenerate} className="btn-secondary text-sm py-2 px-4 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Redo
            </button>
            <button onClick={handleCopy}
              className={`text-sm py-2 px-4 rounded-full font-medium flex items-center gap-1.5 transition-all duration-200 ${
                copied ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : 'btn-primary'
              }`}>
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <SectionCard sectionKey="summary" title="Executive Summary">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{plan.summary}</p>
          </SectionCard>

          <SectionCard sectionKey="channels" title="Top 3 Recommended Channels">
            <div className="space-y-3">
              {plan.channels.map((ch, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03]">
                  <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{ch.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 leading-relaxed">{ch.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard sectionKey="weeks" title="Week-by-Week Breakdown">
            <div className="space-y-2.5">
              {plan.weeks.map((w) => <WeekCard key={w.week} week={w.week} theme={w.theme} actions={w.actions} />)}
            </div>
          </SectionCard>

          <SectionCard sectionKey="content" title="Content Ideas">
            <ul className="space-y-2.5">
              {plan.contentIdeas.map((idea, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-5 h-5 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{idea}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard sectionKey="metrics" title="Key Metrics to Track">
            <div className="grid sm:grid-cols-2 gap-3">
              {plan.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03]">
                  <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">{m.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard sectionKey="quickWins" title="Quick Wins — Do These Today">
            <div className="space-y-2.5">
              {plan.quickWins.map((win, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/60 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20">
                  <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-rose-500 dark:text-rose-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{win}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="mt-8 card p-6 text-center border-brand-100 dark:border-brand-900/30 bg-brand-50/50 dark:bg-brand-900/10">
          <p className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-1.5">Want unlimited plans?</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Upgrade to Pro for clean PDF exports and saved history.</p>
          <a href="#pricing" className="btn-primary inline-flex items-center gap-2 text-sm">View Pricing</a>
        </div>
      </div>
    </section>
  )
}
