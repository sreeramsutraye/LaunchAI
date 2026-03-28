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
