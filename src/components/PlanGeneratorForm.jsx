import { useState } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'

const PRODUCT_TYPES = [
  'Website/SaaS', 'Book', 'Physical Product',
  'Mobile App', 'Service/Freelance', 'Other',
]

const CHANNELS = [
  'SEO', 'Twitter/X', 'Instagram', 'TikTok',
  'Email', 'Reddit', 'YouTube', 'LinkedIn', 'None',
]

const BUDGETS = [
  { label: '$0 — Organic Only', value: 'organic' },
  { label: '$1 – $500', value: '1-500' },
  { label: '$500 – $2,000', value: '500-2000' },
  { label: '$2,000+', value: '2000+' },
]

const GOALS = [
  { label: 'Drive Sales', value: 'sales' },
  { label: 'Get Signups', value: 'signups' },
  { label: 'Build Audience', value: 'audience' },
  { label: 'Get Press/Visibility', value: 'press' },
]

const INITIAL_FORM = {
  productName: 'LaunchAI',
  productType: 'Website/SaaS',
  description: 'Generates a 30-day marketing plan for newly launched products',
  targetAudience: 'entrepreneurs',
  channels: ['Twitter/X'],
  budget: 'organic',
  goal: 'signups',
}

export default function PlanGeneratorForm({ onGenerate, isLoading }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const ref = useScrollFadeIn()

  const toggleChannel = (channel) => {
    setForm((prev) => {
      if (channel === 'None') {
        return { ...prev, channels: prev.channels.includes('None') ? [] : ['None'] }
      }
      const next = prev.channels.filter((c) => c !== 'None')
      return {
        ...prev,
        channels: next.includes(channel) ? next.filter((c) => c !== channel) : [...next, channel],
      }
    })
  }

  const validate = () => {
    const e = {}
    if (!form.productName.trim()) e.productName = 'Required'
    if (!form.productType) e.productType = 'Required'
    if (!form.description.trim() || form.description.trim().length < 20) e.description = 'At least 20 characters'
    if (!form.targetAudience.trim()) e.targetAudience = 'Required'
    if (form.channels.length === 0) e.channels = 'Pick at least one'
    if (!form.budget) e.budget = 'Required'
    if (!form.goal) e.goal = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onGenerate(form)
  }

  return (
    <section id="generator" className="py-24 px-5 relative">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-30" />
      <div ref={ref} className="fade-in-section max-w-2xl mx-auto relative">
        <div className="text-center mb-10">
          <p className="section-label mb-3">AI-Powered</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
            Build Your Marketing Plan
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Fill in a few details and let AI handle the rest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-7 sm:p-9 space-y-6">
          {/* Product Name */}
          <Field label="Product Name" error={errors.productName}>
            <input type="text" className="input-field" placeholder="e.g. TaskFlow"
              value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
          </Field>

          {/* Product Type */}
          <Field label="Product Type" error={errors.productType}>
            <div className="relative">
              <select className="input-field appearance-none pr-10 cursor-pointer"
                value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })}>
                <option value="" disabled>Select…</option>
                {PRODUCT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </Field>

          {/* Description */}
          <Field label="Description" error={errors.description}>
            <textarea className="input-field min-h-[100px] resize-y" placeholder="What does your product do? Who is it for?"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">{form.description.length} characters</p>
          </Field>

          {/* Target Audience */}
          <Field label="Target Audience" error={errors.targetAudience}>
            <input type="text" className="input-field" placeholder="e.g. indie hackers, B2B startups"
              value={form.targetAudience} onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} />
          </Field>

          {/* Marketing Channels */}
          <Field label="Marketing Channels" error={errors.channels}>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((ch) => {
                const active = form.channels.includes(ch)
                return (
                  <button key={ch} type="button" onClick={() => toggleChannel(ch)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                      active
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400'
                    }`}
                  >
                    {ch}
                  </button>
                )
              })}
            </div>
          </Field>

          {/* Budget */}
          <Field label="Monthly Budget" error={errors.budget}>
            <div className="grid grid-cols-2 gap-2.5">
              {BUDGETS.map(({ label, value }) => (
                <label key={value} className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                  form.budget === value
                    ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20'
                }`}>
                  <input type="radio" name="budget" className="sr-only" checked={form.budget === value}
                    onChange={() => setForm({ ...form, budget: value })} />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    form.budget === value ? 'border-brand-500' : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {form.budget === value && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
          </Field>

          {/* Goal */}
          <Field label="Primary Goal" error={errors.goal}>
            <div className="grid grid-cols-2 gap-2.5">
              {GOALS.map(({ label, value }) => (
                <label key={value} className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                  form.goal === value
                    ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300'
                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20'
                }`}>
                  <input type="radio" name="goal" className="sr-only" checked={form.goal === value}
                    onChange={() => setForm({ ...form, goal: value })} />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    form.goal === value ? 'border-brand-500' : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {form.goal === value && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
          </Field>

          {/* Submit */}
          <button type="submit" disabled={isLoading}
            className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate My 30-Day Plan
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-red-500 dark:text-red-400 text-xs">{error}</p>}
    </div>
  )
}
