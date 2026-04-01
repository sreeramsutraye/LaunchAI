import { useState, useRef } from 'react'
import {
  BarChart2, Lightbulb, Target, Zap, Calendar,
  Hash, Copy, Check, RefreshCw, ChevronDown, ChevronUp,
  Download,
} from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'
import { useAuth } from '../context/AuthContext'

const SECTIONS = {
  summary:   { icon: Target,     color: 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' },
  channels:  { icon: Hash,       color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' },
  weeks:     { icon: Calendar,   color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' },
  content:   { icon: Lightbulb,  color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  metrics:   { icon: BarChart2,  color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
  quickWins: { icon: Zap,        color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
}

function SectionCard({ sectionKey, title, className = '', children }) {
  const { icon: Icon, color } = SECTIONS[sectionKey]
  return (
    <div className={`card p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-heading font-semibold text-sm text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function WeekCard({ week, theme, actions }) {
  const [open, setOpen] = useState(week === 1)
  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
      <button className="w-full flex items-center justify-between p-3.5 text-left hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
        onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center">{week}</span>
          <div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">Week {week}</p>
            <p className="text-gray-900 dark:text-white font-medium text-sm">{theme}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 border-t border-gray-100 dark:border-white/5">
          <ul className="mt-2.5 space-y-1.5">
            {actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400 text-[10px] flex items-center justify-center flex-shrink-0 font-medium">{i + 1}</span>
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
  const [exporting, setExporting] = useState(false)
  const ref = useScrollFadeIn()
  const exportRef = useRef(null)
  const { tierLimits } = useAuth()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(planToText(plan, productName))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const el = exportRef.current
      const opt = {
        margin: [12, 12, 12, 12],
        filename: `${productName.replace(/\s+/g, '-').toLowerCase()}-30day-plan.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      }
      await html2pdf().set(opt).from(el).save()
    } catch (err) {
      console.error('PDF export failed:', err)
    }
    setExporting(false)
  }

  return (
    <section id="results" className="py-14 px-5">
      <div ref={ref} className="fade-in-section max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-1">Your Strategy</p>
            <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">
              30-Day Plan for <span className="text-brand-600 dark:text-brand-400">{productName}</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <button onClick={onRegenerate} className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Redo
            </button>
            <button onClick={handleCopy}
              className={`text-xs py-2 px-3.5 rounded-full font-medium flex items-center gap-1.5 transition-all duration-200 ${
                copied ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : 'btn-secondary'
              }`}>
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
            <button onClick={handleExportPDF} disabled={exporting}
              className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 disabled:opacity-60">
              {exporting ? (
                <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Exporting…</>
              ) : (
                <><Download className="w-3.5 h-3.5" /> Export PDF</>
              )}
            </button>
          </div>
        </div>

        {/* Exportable content */}
        <div ref={exportRef}>
          {/* Watermark for free tier */}
          {tierLimits?.pdfWatermark && (
            <div className="hidden print:block text-center text-gray-300 text-xs mb-4">
              Generated by LaunchPlan AI — Free Tier
            </div>
          )}

          {/* Row 1: Summary + Channels side by side */}
          <div className="grid lg:grid-cols-5 gap-4 mb-4">
            <SectionCard sectionKey="summary" title="Executive Summary" className="lg:col-span-3">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{plan.summary}</p>
            </SectionCard>

            <SectionCard sectionKey="channels" title="Top Channels" className="lg:col-span-2">
              <div className="space-y-2.5">
                {plan.channels.map((ch, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
                    <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-xs">{ch.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5 leading-relaxed">{ch.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Row 2: Week-by-Week full width */}
          <div className="mb-4">
            <SectionCard sectionKey="weeks" title="Week-by-Week Breakdown">
              <div className="grid md:grid-cols-2 gap-2.5">
                {plan.weeks.map((w) => (
                  <WeekCard key={w.week} week={w.week} theme={w.theme} actions={w.actions} />
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Row 3: Content Ideas + Metrics side by side */}
          <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <SectionCard sectionKey="content" title="Content Ideas">
              <ul className="space-y-2">
                {plan.contentIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{idea}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard sectionKey="metrics" title="Key Metrics to Track">
              <div className="grid grid-cols-2 gap-2.5">
                {plan.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
                    <p className="font-medium text-gray-900 dark:text-white text-xs mb-0.5">{m.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Row 4: Quick Wins full width */}
          <SectionCard sectionKey="quickWins" title="Quick Wins — Do These Today">
            <div className="grid sm:grid-cols-3 gap-2.5">
              {plan.quickWins.map((win, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/60 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20">
                  <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-2.5 h-2.5 text-rose-500 dark:text-rose-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">{win}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 card p-5 text-center border-brand-100 dark:border-brand-900/30 bg-brand-50/50 dark:bg-brand-900/10">
          <p className="font-heading font-semibold text-base text-gray-900 dark:text-white mb-1">Want unlimited plans?</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">Upgrade to Pro for clean PDF exports and saved history.</p>
          <a href="#pricing" className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-5">View Pricing</a>
        </div>
      </div>
    </section>
  )
}
