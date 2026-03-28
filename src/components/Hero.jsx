import { ArrowRight, Calendar, BarChart2, Lightbulb } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center px-5 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Gradient washes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-brand-100/40 dark:from-brand-900/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-60 -right-32 w-64 h-64 bg-teal-100/30 dark:bg-teal-900/10 rounded-full blur-3xl" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-28 right-[12%] w-14 h-14 border border-brand-200/30 dark:border-brand-700/15 rounded-full" />
        <div className="absolute top-[55%] left-[6%] w-2.5 h-2.5 bg-brand-300/40 dark:bg-brand-600/20 rounded-full" />
        <div className="absolute top-[30%] right-[5%] text-brand-200/40 dark:text-brand-700/20 text-xl select-none">+</div>
        <div className="absolute bottom-[30%] left-[14%] w-4 h-4 border border-brand-200/25 dark:border-brand-700/10 rounded-sm rotate-45" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-20">
        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-brand-100 dark:border-brand-800/40">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
            AI-Powered Marketing
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-gray-900 dark:text-white mb-5 tracking-tight">
            Your 30-Day<br />
            Marketing Plan,{' '}
            <span className="text-brand-600 dark:text-brand-400">Built in 60s</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
            Describe your product and let AI create a personalized, actionable marketing strategy — complete with daily actions, content ideas, and KPIs.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#generator" className="btn-primary flex items-center gap-2 text-sm px-6 py-3">
              Generate My Plan <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#how-it-works" className="btn-secondary text-sm px-6 py-3">
              See How It Works
            </a>
          </div>
        </div>

        {/* Right — preview cards */}
        <div className="hidden lg:block relative">
          <div className="space-y-3">
            {/* Card 1 */}
            <div className="card p-5 ml-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Week 1</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Foundation & Setup</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full w-full" />
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full w-4/5" />
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full w-3/5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="card p-5 mr-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Content Ideas</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">5 tailored post ideas</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['Twitter Thread', 'Blog Post', 'Video'].map((t) => (
                  <span key={t} className="text-xs bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="card p-5 ml-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <BarChart2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Metrics</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">4 KPIs to track</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {[65, 42, 88, 73].map((v, i) => (
                  <div key={i} className="flex-1 bg-gray-50 dark:bg-white/[0.03] rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-brand-600 dark:text-brand-400">{v}%</p>
                    <p className="text-[10px] text-gray-400">Goal</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
