import { useState, useRef } from 'react'
import {
  BarChart2, Lightbulb, Target, Zap, Calendar,
  Hash, Copy, Check, RefreshCw, ChevronDown, ChevronUp,
  Download, MessageSquare, Pencil, Save, X,
} from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'
import { useAuth } from '../context/AuthContext'

const SECTIONS = {
  summary:   { icon: Target,     color: 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400' },
  channels:  { icon: Hash,       color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' },
  weeks:     { icon: Calendar,   color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' },
  content:   { icon: Lightbulb,  color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  metrics:   { icon: BarChart2,  color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
  quickWins:       { icon: Zap,            color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
  channelContent:  { icon: MessageSquare,  color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400' },
}

/* ── Editable text field ── */
function EditableText({ value, onChange, editing, className = '', multiline = false }) {
  if (!editing) return <span className={className}>{value}</span>

  const Tag = multiline ? 'textarea' : 'input'
  return (
    <Tag
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-white dark:bg-white/5 border border-brand-300 dark:border-brand-700 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900/40 w-full ${multiline ? 'min-h-[60px] resize-y' : ''}`}
    />
  )
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

function WeekCard({ week, theme, actions, editing, onChangeTheme, onChangeAction }) {
  const [open, setOpen] = useState(week === 1)
  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
      <button className="w-full flex items-center justify-between p-3.5 text-left hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors"
        onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="w-6 h-6 rounded-md bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{week}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">Week {week}</p>
            <EditableText value={theme} onChange={onChangeTheme} editing={editing}
              className="text-gray-900 dark:text-white font-medium text-sm block truncate" />
          </div>
        </div>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 border-t border-gray-100 dark:border-white/5">
          <ul className="mt-2.5 space-y-1.5">
            {actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-500 dark:text-brand-400 text-[10px] flex items-center justify-center flex-shrink-0 font-medium">{i + 1}</span>
                <EditableText value={action} onChange={(v) => onChangeAction(i, v)} editing={editing}
                  className="flex-1" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function ChannelPostCard({ channel, posts, editing, onChangeChannel, onChangePost }) {
  const [copiedIdx, setCopiedIdx] = useState(null)

  const handleCopyPost = async (text, idx) => {
    await navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="p-3.5 border-b border-gray-100 dark:border-white/5">
        <EditableText value={channel} onChange={onChangeChannel} editing={editing}
          className="font-medium text-gray-900 dark:text-white text-sm" />
      </div>
      <div className="p-3.5 space-y-2.5">
        {posts.map((post, i) => (
          <div key={i} className="group relative p-3 rounded-lg bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
            {editing ? (
              <textarea
                value={post}
                onChange={(e) => onChangePost(i, e.target.value)}
                className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed w-full bg-white dark:bg-white/5 border border-brand-300 dark:border-brand-700 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900/40 min-h-[50px] resize-y"
              />
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed pr-8">{post}</p>
                <button
                  onClick={() => handleCopyPost(post, i)}
                  className="absolute top-2.5 right-2.5 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                  title="Copy to clipboard"
                >
                  {copiedIdx === i
                    ? <Check className="w-3 h-3 text-emerald-500" />
                    : <Copy className="w-3 h-3 text-gray-400" />}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
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
    ...(plan.channelContent?.length ? [
      'READY-TO-POST CONTENT',
      ...plan.channelContent.flatMap((ch) => [`\n--- ${ch.channel} ---`, ...ch.posts.map((p, i) => `${i + 1}. ${p}`), '']),
    ] : []),
    'KEY METRICS', ...plan.metrics.map((m) => `- ${m.name}: ${m.description}`), '',
    'QUICK WINS', ...plan.quickWins.map((w, i) => `${i + 1}. ${w}`),
  ].join('\n')
}

export default function Results({ plan, productName, onRegenerate, onPlanChange, planId, onSave, saving }) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [snapshot, setSnapshot] = useState(null)
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

  const startEditing = () => {
    setSnapshot(JSON.parse(JSON.stringify(plan)))
    setEditing(true)
  }

  const cancelEditing = () => {
    if (snapshot) onPlanChange(snapshot)
    setSnapshot(null)
    setEditing(false)
  }

  const saveEditing = async () => {
    setSnapshot(null)
    setEditing(false)
    if (onSave) await onSave()
  }

  /* ── Immutable update helpers ── */
  const updatePlan = (updater) => onPlanChange(updater(plan))

  const setSummary = (v) => updatePlan((p) => ({ ...p, summary: v }))

  const setChannelName = (i, v) => updatePlan((p) => ({
    ...p, channels: p.channels.map((c, j) => j === i ? { ...c, name: v } : c),
  }))
  const setChannelReason = (i, v) => updatePlan((p) => ({
    ...p, channels: p.channels.map((c, j) => j === i ? { ...c, reason: v } : c),
  }))

  const setWeekTheme = (wi, v) => updatePlan((p) => ({
    ...p, weeks: p.weeks.map((w, j) => j === wi ? { ...w, theme: v } : w),
  }))
  const setWeekAction = (wi, ai, v) => updatePlan((p) => ({
    ...p, weeks: p.weeks.map((w, j) => j === wi ? { ...w, actions: w.actions.map((a, k) => k === ai ? v : a) } : w),
  }))

  const setContentIdea = (i, v) => updatePlan((p) => ({
    ...p, contentIdeas: p.contentIdeas.map((c, j) => j === i ? v : c),
  }))

  const setMetricName = (i, v) => updatePlan((p) => ({
    ...p, metrics: p.metrics.map((m, j) => j === i ? { ...m, name: v } : m),
  }))
  const setMetricDesc = (i, v) => updatePlan((p) => ({
    ...p, metrics: p.metrics.map((m, j) => j === i ? { ...m, description: v } : m),
  }))

  const setQuickWin = (i, v) => updatePlan((p) => ({
    ...p, quickWins: p.quickWins.map((w, j) => j === i ? v : w),
  }))

  const setChContentChannel = (i, v) => updatePlan((p) => ({
    ...p, channelContent: p.channelContent.map((ch, j) => j === i ? { ...ch, channel: v } : ch),
  }))
  const setChContentPost = (ci, pi, v) => updatePlan((p) => ({
    ...p, channelContent: p.channelContent.map((ch, j) => j === ci ? { ...ch, posts: ch.posts.map((post, k) => k === pi ? v : post) } : ch),
  }))

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
            {editing ? (
              <>
                <button onClick={cancelEditing}
                  className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
                <button onClick={saveEditing} disabled={saving}
                  className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 disabled:opacity-60">
                  {saving ? (
                    <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                  ) : (
                    <><Save className="w-3.5 h-3.5" /> Save Changes</>
                  )}
                </button>
              </>
            ) : (
              <>
                <button onClick={onRegenerate} className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Redo
                </button>
                <button onClick={startEditing}
                  className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5">
                  <Pencil className="w-3.5 h-3.5" /> Edit
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
              </>
            )}
          </div>
        </div>

        {/* Edit mode banner */}
        {editing && (
          <div className="mb-4 p-3 rounded-xl bg-brand-50 dark:bg-brand-900/15 border border-brand-200 dark:border-brand-800/30 flex items-center gap-2.5">
            <Pencil className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
            <p className="text-brand-800 dark:text-brand-300 text-xs">
              Click any text to edit. Changes are saved when you click <strong>Save Changes</strong>.
            </p>
          </div>
        )}

        {/* Exportable content */}
        <div ref={exportRef}>
          {tierLimits?.pdfWatermark && (
            <div className="hidden print:block text-center text-gray-300 text-xs mb-4">
              Generated by LaunchPlan AI — Free Tier
            </div>
          )}

          {/* Row 1: Summary + Channels */}
          <div className="grid lg:grid-cols-5 gap-4 mb-4">
            <SectionCard sectionKey="summary" title="Executive Summary" className="lg:col-span-3">
              <EditableText value={plan.summary} onChange={setSummary} editing={editing} multiline
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm" />
            </SectionCard>

            <SectionCard sectionKey="channels" title="Top Channels" className="lg:col-span-2">
              <div className="space-y-2.5">
                {plan.channels.map((ch, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
                    <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <EditableText value={ch.name} onChange={(v) => setChannelName(i, v)} editing={editing}
                        className="font-medium text-gray-900 dark:text-white text-xs" />
                      <EditableText value={ch.reason} onChange={(v) => setChannelReason(i, v)} editing={editing}
                        className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5 leading-relaxed block" />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Row 2: Week-by-Week */}
          <div className="mb-4">
            <SectionCard sectionKey="weeks" title="Week-by-Week Breakdown">
              <div className="grid md:grid-cols-2 gap-2.5">
                {plan.weeks.map((w, wi) => (
                  <WeekCard key={w.week} week={w.week} theme={w.theme} actions={w.actions}
                    editing={editing}
                    onChangeTheme={(v) => setWeekTheme(wi, v)}
                    onChangeAction={(ai, v) => setWeekAction(wi, ai, v)} />
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Row 3: Content Ideas + Metrics */}
          <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <SectionCard sectionKey="content" title="Content Ideas">
              <ul className="space-y-2">
                {plan.contentIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <EditableText value={idea} onChange={(v) => setContentIdea(i, v)} editing={editing}
                      className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed flex-1" />
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard sectionKey="metrics" title="Key Metrics to Track">
              <div className="grid grid-cols-2 gap-2.5">
                {plan.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03]">
                    <EditableText value={m.name} onChange={(v) => setMetricName(i, v)} editing={editing}
                      className="font-medium text-gray-900 dark:text-white text-xs mb-0.5 block" />
                    <EditableText value={m.description} onChange={(v) => setMetricDesc(i, v)} editing={editing}
                      className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed block" />
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Row 4: Channel-Specific Content */}
          {plan.channelContent?.length > 0 && (
            <div className="mb-4">
              <SectionCard sectionKey="channelContent" title="Ready-to-Post Content">
                <div className="grid md:grid-cols-2 gap-2.5">
                  {plan.channelContent.map((ch, i) => (
                    <ChannelPostCard key={i} channel={ch.channel} posts={ch.posts}
                      editing={editing}
                      onChangeChannel={(v) => setChContentChannel(i, v)}
                      onChangePost={(pi, v) => setChContentPost(i, pi, v)} />
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* Row 5: Quick Wins */}
          <SectionCard sectionKey="quickWins" title="Quick Wins — Do These Today">
            <div className="grid sm:grid-cols-3 gap-2.5">
              {plan.quickWins.map((win, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/60 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20">
                  <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-2.5 h-2.5 text-rose-500 dark:text-rose-400" />
                  </div>
                  <EditableText value={win} onChange={(v) => setQuickWin(i, v)} editing={editing}
                    className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed flex-1" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 card p-5 text-center border-brand-100 dark:border-brand-900/30 bg-brand-50/50 dark:bg-brand-900/10">
          <p className="font-heading font-semibold text-base text-gray-900 dark:text-white mb-1">Want unlimited plans?</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">Upgrade to Pro for unlimited plans and clean PDF exports.</p>
          <a href="#pricing" className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-5">View Pricing</a>
        </div>
      </div>
    </section>
  )
}
