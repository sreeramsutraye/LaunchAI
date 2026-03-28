import { useState } from 'react'
import { X, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()
  const [mode, setMode] = useState('signin') // signin | signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const reset = () => { setError(''); setSuccess('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    reset()
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (!name.trim()) { setError('Name is required'); setLoading(false); return }
        const { error: err } = await signUpWithEmail(email, password, name.trim())
        if (err) throw err
        setSuccess('Check your email to confirm your account.')
      } else {
        const { error: err } = await signInWithEmail(email, password)
        if (err) throw err
        onClose()
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    reset()
    await signInWithGoogle()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#151F32] rounded-2xl shadow-2xl w-full max-w-sm p-8 border border-gray-100 dark:border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {mode === 'signin' ? 'Sign in to generate marketing plans' : 'Start building marketing plans for free'}
          </p>
        </div>

        {/* Google button */}
        <button onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-medium text-sm transition-colors mb-5">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          <span className="text-xs text-gray-400 dark:text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <input type="text" placeholder="Full name" value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field text-sm py-2.5" />
          )}
          <input type="email" placeholder="Email address" value={email} required
            onChange={(e) => setEmail(e.target.value)}
            className="input-field text-sm py-2.5" />
          <input type="password" placeholder="Password" value={password} required minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field text-sm py-2.5" />

          {error && <p className="text-red-500 dark:text-red-400 text-xs">{error}</p>}
          {success && <p className="text-brand-600 dark:text-brand-400 text-xs">{success}</p>}

          <button type="submit" disabled={loading}
            className="w-full btn-primary py-2.5 text-sm flex items-center justify-center gap-2 rounded-xl disabled:opacity-60">
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Mail className="w-4 h-4" />
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          {mode === 'signin' ? (
            <>Don't have an account?{' '}
              <button onClick={() => { setMode('signup'); reset() }}
                className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                Sign Up
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => { setMode('signin'); reset() }}
                className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
