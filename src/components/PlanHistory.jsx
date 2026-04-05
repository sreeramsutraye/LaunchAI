import { useState, useEffect } from 'react'
import { Clock, ChevronRight, Trash2, X, Package } from 'lucide-react'
import { getUserPlans, deletePlan } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function PlanHistory({ isOpen, onClose, onSelectPlan }) {
  const { user, refreshPlanCount } = useAuth()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (isOpen && user) {
      setLoading(true)
      getUserPlans(user.id)
        .then(setPlans)
        .catch((err) => console.error('Failed to load plans:', err))
        .finally(() => setLoading(false))
    }
  }, [isOpen, user])

  const handleDelete = async (e, planId) => {
    e.stopPropagation()
    if (deletingId) return
    setDeletingId(planId)
    try {
      await deletePlan(planId)
      setPlans((prev) => prev.filter((p) => p.id !== planId))
      await refreshPlanCount()
    } catch (err) {
      console.error('Failed to delete plan:', err)
    }
    setDeletingId(null)
  }

  const handleSelect = (plan) => {
    onSelectPlan({
      id: plan.id,
      productName: plan.product_name,
      plan: plan.plan_data,
      formData: plan.form_data,
    })
    onClose()
  }

  if (!isOpen) return null

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-[#151F32] rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col border border-gray-100 dark:border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
              <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-gray-900 dark:text-white">My Plans</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{plans.length} saved plan{plans.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan list */}
        <div className="flex-1 overflow-y-auto p-3">
          {loading ? (
            <div className="space-y-2.5 p-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl skeleton" />
              ))}
            </div>
          ) : plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-3">
                <Package className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No plans yet</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Generate your first plan to see it here.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handleSelect(plan)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {plan.product_name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">
                        {formatDate(plan.created_at)}
                      </span>
                      {plan.form_data?.goal && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 capitalize">
                          {plan.form_data.goal}
                        </span>
                      )}
                      {plan.form_data?.budget && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
                          {plan.form_data.budget === 'organic' ? '$0' : `$${plan.form_data.budget}`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={(e) => handleDelete(e, plan.id)}
                      className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      title="Delete plan"
                    >
                      {deletingId === plan.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                      )}
                    </button>
                    <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
