import { useState } from 'react'
import { Zap } from 'lucide-react'
import PrivacyModal from './PrivacyModal'
import TermsModal from './TermsModal'

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <footer className="py-8 px-5 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-brand-600 rounded-md flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              LaunchPlan AI — Built with AI, designed for builders.
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-gray-400 dark:text-gray-500">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Privacy</button>
            <button onClick={() => setTermsOpen(true)} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Terms</button>
            <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  )
}
