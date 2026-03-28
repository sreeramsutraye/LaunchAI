import { FileText, BrainCircuit, TrendingUp, ArrowRight } from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'

const steps = [
  {
    icon: FileText,
    title: 'Describe',
    desc: 'Tell us about your product, audience, budget, and goals.',
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  },
  {
    icon: BrainCircuit,
    title: 'Generate',
    desc: 'AI analyzes your inputs and builds a tailored 30-day strategy.',
    color: 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400',
  },
  {
    icon: TrendingUp,
    title: 'Execute',
    desc: 'Follow your roadmap, track metrics, and grow your product.',
    color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  },
]

export default function HowItWorks() {
  const ref = useScrollFadeIn()

  return (
    <section id="how-it-works" className="py-20 px-5 bg-white dark:bg-[#0A0F1A] border-y border-gray-100 dark:border-white/5">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label mb-2">How It Works</p>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
            Three simple steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 items-start">
          {steps.map(({ icon: Icon, title, desc, color }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center px-6">
              {/* Connector arrow (between cards) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-7 -right-3 z-10">
                  <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-base text-gray-900 dark:text-white mb-1.5">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[220px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
