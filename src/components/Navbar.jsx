import { useState, useEffect } from 'react'
import { Zap, Moon, Sun, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useTheme()
  const { user, signInWithGoogle, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 dark:bg-[#0C1220]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">LaunchPlan AI</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <a href="#how-it-works" className="hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</a>
          <a href="#generator" className="hover:text-gray-900 dark:hover:text-white transition-colors">Generator</a>
          <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.user_metadata?.avatar_url}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-brand-200 dark:border-brand-800"
              />
              <button onClick={signOut} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 transition-colors">
                <LogOut className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="btn-primary text-sm py-2.5 px-5">
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
