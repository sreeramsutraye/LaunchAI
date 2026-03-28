import { FileText, BrainCircuit, TrendingUp } from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'

const steps = [
  {
    icon: FileText,
    step: '1',
    title: 'Describe Your Product',
    desc: 'Fill out a quick form with your product type, target audience, budget, and goal.',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    stepBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/30',
  },
  {
    icon: BrainCircuit,
    step: '2',
    title: 'AI Builds Your Plan',
    desc: 'We analyze your inputs and generate a tailored 30-day strategy with daily actions and KPIs.',
    iconBg: 'bg-brand-100 dark:bg-brand-900/30',
    iconColor: 'text-brand-600 dark:text-brand-400',
    stepBg: 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border-brand-100 dark:border-brand-800/30',
  },
  {
    icon: TrendingUp,
    step: '3',
    title: 'Execute & Grow',
    desc: 'Follow your week-by-week roadmap, track metrics, and watch your product gain traction.',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    stepBg: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-800/30',
  },
]

export default function HowItWorks() {
  const ref = useScrollFadeIn()

  return (
    <section id="how-it-works" className="py-24 px-5 relative">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Simple Process</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
            Three steps to your marketing plan
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg mx-auto">
            From zero to a complete strategy in under a minute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map(({ icon: Icon, step, title, desc, iconBg, iconColor, stepBg }) => (
            <div key={step} className="card p-7 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <span className={`w-7 h-7 rounded-full ${stepBg} border text-xs font-bold flex items-center justify-center`}>
                  {step}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
