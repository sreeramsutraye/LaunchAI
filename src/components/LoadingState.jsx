import { useEffect, useState } from 'react'

const MESSAGES = [
  'Analyzing your audience…',
  'Mapping your channels…',
  'Crafting your week-by-week plan…',
  'Generating content ideas…',
  'Identifying key metrics…',
  'Compiling quick wins…',
  'Finalizing your strategy…',
]

export default function LoadingState() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const msgInterval = setInterval(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), 2000)
    const progInterval = setInterval(() => setProgress((p) => (p >= 90 ? p : p + Math.random() * 8)), 800)
    return () => { clearInterval(msgInterval); clearInterval(progInterval) }
  }, [])

  return (
    <section className="py-20 px-5">
      <div className="max-w-md mx-auto text-center">
        <div className="w-14 h-14 mx-auto mb-8 rounded-full border-[3px] border-gray-200 dark:border-white/10 border-t-brand-600 dark:border-t-brand-400 animate-spin" />

        <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-2">
          Building Your Plan…
        </h3>

        <div className="h-6 overflow-hidden mb-8">
          <p key={msgIdx} className="text-brand-600 dark:text-brand-400 text-sm font-medium animate-fade-up">
            {MESSAGES[msgIdx]}
          </p>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1.5">
            <span>Generating strategy</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-10 space-y-3 text-left">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-5">
              <div className="skeleton h-3.5 w-1/3 rounded mb-3" />
              <div className="space-y-2">
                <div className="skeleton h-2.5 w-full rounded" />
                <div className="skeleton h-2.5 w-4/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
