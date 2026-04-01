// Mock for ../lib/supabase
export const supabase = {
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    signInWithOAuth: vi.fn(),
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  },
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
  }),
  functions: {
    invoke: vi.fn(),
  },
}

export const generateMarketingPlan = vi.fn()
export const getUserProfile = vi.fn()
export const getUserPlanCount = vi.fn().mockResolvedValue(0)
export const savePlan = vi.fn()
export const getUserPlans = vi.fn().mockResolvedValue([])
