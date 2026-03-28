import { Check } from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'Try it out, no commitment.',
    features: ['1 marketing plan', 'Full 30-day strategy', 'Watermarked PDF export'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    desc: 'For founders who mean business.',
    features: ['Unlimited plans', 'Clean PDF export', 'Save & revisit history', 'Priority generation', 'Email support'],
    cta: 'Start Pro Free',
    highlighted: true,
  },
  {
    name: 'Agency',
    price: '$49',
    period: '/mo',
    desc: 'Built for teams and clients.',
    features: ['10 client workspaces', 'White-label PDF exports', 'Team collaboration', 'Custom branding', 'Priority support'],
    cta: 'Start Agency Trial',
    highlighted: false,
  },
]

export default function Pricing() {
  const ref = useScrollFadeIn()

  return (
    <section id="pricing" className="py-24 px-5 relative">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-30" />
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Pricing</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-7 transition-all duration-300 ${
              plan.highlighted
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 dark:shadow-brand-900/40 ring-2 ring-brand-600 scale-[1.02]'
                : 'card hover:shadow-md'
            }`}>
              {plan.highlighted && (
                <div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </div>
              )}

              <h3 className={`font-heading font-bold text-xl mb-0.5 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-5 ${plan.highlighted ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {plan.desc}
              </p>

              <div className="flex items-end gap-0.5 mb-6">
                <span className={`text-4xl font-heading font-black ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm pb-1 ${plan.highlighted ? 'text-brand-200' : 'text-gray-400'}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-2.5 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.highlighted ? 'text-brand-100' : 'text-gray-600 dark:text-gray-300'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlighted ? 'bg-white/20' : 'bg-brand-50 dark:bg-brand-900/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-brand-500 dark:text-brand-400'}`} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-2.5 px-6 rounded-full font-medium text-sm transition-all duration-200 ${
                plan.highlighted
                  ? 'bg-white text-brand-700 hover:bg-brand-50'
                  : 'bg-gray-900 dark:bg-white/10 text-white hover:bg-gray-800 dark:hover:bg-white/15'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
