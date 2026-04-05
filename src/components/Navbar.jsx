import { useState, useEffect } from 'react'
import { Zap, Moon, Sun, LogOut, Crown, Clock } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Navbar({ onOpenHistory }) {
  const [scrolled, setScrolled] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { dark, toggle } = useTheme()
  const { user, profile, tier, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tierColors = {
    free: 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400',
    pro: 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300',
    agency: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#0C1220]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading font-bold text-base text-gray-900 dark:text-white">LaunchPlan AI</span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-sm text-gray-500 dark:text-gray-400 font-medium">
            <a href="#how-it-works" className="hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</a>
            <a href="#generator" className="hover:text-gray-900 dark:hover:text-white transition-colors">Generator</a>
            <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={toggle}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 transition-colors"
              aria-label="Toggle theme">
              {dark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-gray-500" />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                {/* My Plans button */}
                <button onClick={onOpenHistory}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2.5 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  title="My Plans">
                  <Clock className="w-3.5 h-3.5" /> My Plans
                </button>

                {/* Tier badge */}
                <span className={`hidden sm:flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${tierColors[tier]}`}>
                  {tier !== 'free' && <Crown className="w-3 h-3" />}
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </span>

                <img
                  src={profile?.avatar_url || user.user_metadata?.avatar_url}
                  alt=""
                  className="w-7 h-7 rounded-full border border-gray-200 dark:border-white/10 object-cover"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <button onClick={signOut}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 transition-colors"
                  title="Sign out">
                  <LogOut className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => setAuthOpen(true)}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5">
                  Sign In
                </button>
                <button onClick={() => setAuthOpen(true)}
                  className="btn-primary text-sm py-2 px-4">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
