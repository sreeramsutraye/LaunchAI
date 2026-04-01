import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, getUserProfile, getUserPlanCount } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [planCount, setPlanCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (userId) => {
    try {
      const p = await getUserProfile(userId)
      setProfile(p)
      const count = await getUserPlanCount(userId)
      setPlanCount(count)
    } catch (err) {
      console.error('Profile load error:', err)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadProfile(u.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadProfile(u.id)
      else { setProfile(null); setPlanCount(0) }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })

  const signInWithEmail = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signUpWithEmail = (email, password, fullName) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setPlanCount(0)
  }

  const refreshPlanCount = async () => {
    if (user) {
      const count = await getUserPlanCount(user.id)
      setPlanCount(count)
    }
  }

  const tier = profile?.tier || 'free'
  const canGenerate = tier !== 'free' || planCount < 5

  const tierLimits = {
    free: { maxPlans: 5, label: 'Free', pdfWatermark: true },
    pro: { maxPlans: Infinity, label: 'Pro', pdfWatermark: false },
    agency: { maxPlans: Infinity, label: 'Agency', pdfWatermark: false },
  }

  return (
    <AuthContext.Provider value={{
      user, profile, loading, tier, planCount, canGenerate,
      tierLimits: tierLimits[tier],
      signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, refreshPlanCount,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
