import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-white/5 py-10 px-5 bg-white dark:bg-[#0A0F1A]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-600 rounded-lg flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="font-heading font-bold text-sm text-gray-900 dark:text-white">LaunchPlan AI</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-xs">Built with AI. Designed for builders.</p>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Twitter</a>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-50 dark:border-white/5 text-center text-gray-300 dark:text-gray-600 text-xs">
          © {new Date().getFullYear()} LaunchPlan AI
        </div>
      </div>
    </footer>
  )
}
