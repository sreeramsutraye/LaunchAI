import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-5 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Soft gradient washes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-brand-100/50 dark:from-brand-900/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-48 -left-20 w-64 h-64 bg-emerald-100/40 dark:bg-emerald-900/15 rounded-full blur-3xl" />
        <div className="absolute top-32 -right-20 w-72 h-72 bg-teal-100/30 dark:bg-teal-900/10 rounded-full blur-3xl" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Thin ring */}
        <div className="absolute top-24 right-[15%] w-16 h-16 border border-brand-200/40 dark:border-brand-700/20 rounded-full" />
        {/* Small filled circle */}
        <div className="absolute top-[60%] left-[10%] w-3 h-3 bg-brand-300/50 dark:bg-brand-600/30 rounded-full" />
        {/* Cross */}
        <div className="absolute top-[35%] right-[8%] text-brand-200/50 dark:text-brand-700/30 text-2xl font-light select-none">+</div>
        {/* Small square */}
        <div className="absolute bottom-[25%] left-[18%] w-5 h-5 border border-brand-200/30 dark:border-brand-700/15 rounded-sm rotate-45" />
        {/* Dots cluster */}
        <div className="absolute top-[20%] left-[25%] flex gap-2">
          <div className="w-1.5 h-1.5 bg-brand-300/40 dark:bg-brand-600/25 rounded-full" />
          <div className="w-1.5 h-1.5 bg-brand-300/40 dark:bg-brand-600/25 rounded-full" />
          <div className="w-1.5 h-1.5 bg-brand-300/40 dark:bg-brand-600/25 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-brand-100 dark:border-brand-800/50">
          <span className="w-2 h-2 bg-brand-500 rounded-full" />
          AI-Powered Marketing Strategy
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-gray-900 dark:text-white mb-6 tracking-tight">
          Your 30-Day Marketing Plan,{' '}
          <span className="text-brand-600 dark:text-brand-400">Built in 60 Seconds</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Tell us about your product. AI builds a personalized, actionable marketing strategy — day by day.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#generator" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
            Generate My Plan
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#how-it-works" className="btn-secondary text-base px-8 py-4">
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
