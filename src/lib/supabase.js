import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function generateMarketingPlan(formData) {
  const { data, error } = await supabase.functions.invoke('generate-plan', {
    body: formData,
  })
  if (error) throw error
  return data
}

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error && error.code === 'PGRST116') {
    // No profile row exists — create one from the current auth user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: newProfile, error: insertErr } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
        tier: 'free',
      })
      .select()
      .single()

    if (insertErr) throw insertErr
    return newProfile
  }

  if (error) throw error
  return data
}

export async function getUserPlanCount(userId) {
  const { count, error } = await supabase
    .from('plans')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
  if (error) throw error
  return count || 0
}

export async function savePlan(userId, productName, formData, planData) {
  const { data, error } = await supabase
    .from('plans')
    .insert({
      user_id: userId,
      product_name: productName,
      form_data: formData,
      plan_data: planData,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getUserPlans(userId) {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updatePlan(planId, planData) {
  const { data, error } = await supabase
    .from('plans')
    .update({ plan_data: planData })
    .eq('id', planId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deletePlan(planId) {
  const { error } = await supabase
    .from('plans')
    .delete()
    .eq('id', planId)
  if (error) throw error
}
