import { Check, Crown } from 'lucide-react'
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'
import { useAuth } from '../context/AuthContext'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'Try it out, one plan on us.',
    features: ['Up to 5 marketing plans', 'Full 30-day strategy', 'Save & revisit history', 'Watermarked PDF export'],
    cta: 'Get Started',
    highlighted: false,
    tierKey: 'free',
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    desc: 'Unlimited plans for serious founders.',
    features: ['Unlimited plans', 'Clean PDF export', 'Save & revisit history', 'Priority generation', 'Email support'],
    cta: 'Upgrade to Pro',
    highlighted: true,
    tierKey: 'pro',
  },
  {
    name: 'Agency',
    price: '$49',
    period: '/mo',
    desc: 'For teams and client work.',
    features: ['10 client workspaces', 'White-label PDFs', 'Team collaboration', 'Custom branding', 'Priority support'],
    cta: 'Start Agency Trial',
    highlighted: false,
    tierKey: 'agency',
  },
]

export default function Pricing() {
  const ref = useScrollFadeIn()
  const { tier, user } = useAuth()

  return (
    <section id="pricing" className="py-20 px-5 bg-white dark:bg-[#0A0F1A] border-y border-gray-100 dark:border-white/5">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Pricing</p>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-2">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isCurrent = user && tier === plan.tierKey

            return (
              <div key={plan.name} className={`rounded-2xl p-6 transition-all duration-300 relative ${
                plan.highlighted
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 dark:shadow-brand-900/40 ring-1 ring-brand-600'
                  : 'card'
              }`}>
                {isCurrent && (
                  <div className={`absolute -top-2.5 left-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    plan.highlighted ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'
                  }`}>
                    Current Plan
                  </div>
                )}

                {plan.highlighted && !isCurrent && (
                  <div className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full mb-3">
                    <Crown className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <h3 className={`font-heading font-bold text-lg mb-0.5 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-4 ${plan.highlighted ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {plan.desc}
                </p>

                <div className="flex items-end gap-0.5 mb-5">
                  <span className={`text-3xl font-heading font-black ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs pb-1 ${plan.highlighted ? 'text-brand-200' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-xs ${plan.highlighted ? 'text-brand-100' : 'text-gray-600 dark:text-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlighted ? 'bg-white/20' : 'bg-brand-50 dark:bg-brand-900/20'
                      }`}>
                        <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-white' : 'text-brand-500 dark:text-brand-400'}`} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button disabled={isCurrent} className={`w-full py-2.5 px-5 rounded-full font-medium text-xs transition-all duration-200 disabled:opacity-50 ${
                  plan.highlighted
                    ? 'bg-white text-brand-700 hover:bg-brand-50'
                    : 'bg-gray-900 dark:bg-white/10 text-white hover:bg-gray-800 dark:hover:bg-white/15'
                }`}>
                  {isCurrent ? 'Current' : plan.cta}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
