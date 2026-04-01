import { render } from '@testing-library/react'
import { ThemeProvider } from '../context/ThemeContext'

// Minimal auth context mock
import { createContext, useContext } from 'react'
const AuthContext = createContext()

export function MockAuthProvider({ children, value = {} }) {
  const defaults = {
    user: null,
    profile: null,
    loading: false,
    tier: 'free',
    planCount: 0,
    canGenerate: true,
    tierLimits: { maxPlans: 1, label: 'Free', pdfWatermark: true },
    signInWithGoogle: vi.fn(),
    signInWithEmail: vi.fn(),
    signUpWithEmail: vi.fn(),
    signOut: vi.fn(),
    refreshPlanCount: vi.fn(),
  }
  return (
    <AuthContext.Provider value={{ ...defaults, ...value }}>
      {children}
    </AuthContext.Provider>
  )
}

export function renderWithProviders(ui, { authValue = {}, ...options } = {}) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider>
        <MockAuthProvider value={authValue}>
          {children}
        </MockAuthProvider>
      </ThemeProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}
