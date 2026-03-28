import { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import PlanGeneratorForm from './components/PlanGeneratorForm'
import LoadingState from './components/LoadingState'
import Results from './components/Results'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import { generateMarketingPlan } from './lib/supabase'

export default function App() {
  const [state, setState] = useState('idle')
  const [plan, setPlan] = useState(null)
  const [productName, setProductName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [lastForm, setLastForm] = useState(null)
  const resultsRef = useRef(null)

  const handleGenerate = async (formData) => {
    setState('loading')
    setProductName(formData.productName)
    setLastForm(formData)
    setErrorMsg('')

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)

    try {
      const data = await generateMarketingPlan(formData)
      if (data.error) throw new Error(data.error)
      setPlan(data)
      setState('results')
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setState('error')
    }
  }

  const handleRegenerate = () => {
    if (lastForm) handleGenerate(lastForm)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#0C1220] transition-colors duration-300">
      <Navbar />
      <Hero />
      <HowItWorks />
      <PlanGeneratorForm onGenerate={handleGenerate} isLoading={state === 'loading'} />

      <div ref={resultsRef}>
        {state === 'loading' && <LoadingState />}

        {state === 'error' && (
          <section className="py-16 px-5">
            <div className="max-w-md mx-auto text-center card p-8">
              <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-red-500">!</span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-2">Something went wrong</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{errorMsg}</p>
              <button onClick={handleRegenerate} className="btn-primary">Try Again</button>
            </div>
          </section>
        )}

        {state === 'results' && plan && (
          <Results plan={plan} productName={productName} onRegenerate={handleRegenerate} />
        )}
      </div>

      <Pricing />
      <Footer />
    </div>
  )
}
