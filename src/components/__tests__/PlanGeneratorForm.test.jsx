import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlanGeneratorForm from '../PlanGeneratorForm'
import { ThemeProvider } from '../../context/ThemeContext'

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '123' },
    canGenerate: true,
    tier: 'free',
    planCount: 0,
    tierLimits: { maxPlans: 5, label: 'Free', pdfWatermark: true },
  }),
}))

// Mock supabase
vi.mock('../../lib/supabase', () => ({
  supabase: { auth: { getSession: vi.fn(), onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })) } },
}))

function renderForm(props = {}) {
  const defaults = { onGenerate: vi.fn(), isLoading: false }
  return render(
    <ThemeProvider>
      <PlanGeneratorForm {...defaults} {...props} />
    </ThemeProvider>
  )
}

describe('PlanGeneratorForm', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders all form fields', () => {
    renderForm()
    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('Product Type')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Target Audience')).toBeInTheDocument()
    expect(screen.getByText('Marketing Channels')).toBeInTheDocument()
    expect(screen.getByText('Monthly Budget')).toBeInTheDocument()
    expect(screen.getByText('Primary Goal')).toBeInTheDocument()
  })

  it('renders all channel chips', () => {
    renderForm()
    const channels = ['SEO', 'Twitter/X', 'Instagram', 'TikTok', 'Email', 'Reddit', 'YouTube', 'LinkedIn', 'None']
    channels.forEach((ch) => {
      expect(screen.getByRole('button', { name: ch })).toBeInTheDocument()
    })
  })

  it('pre-fills default values', () => {
    renderForm()
    expect(screen.getByDisplayValue('LaunchAI')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Website/SaaS')).toBeInTheDocument()
    expect(screen.getByDisplayValue('entrepreneurs')).toBeInTheDocument()
  })

  it('calls onGenerate with form data when submitted with defaults', async () => {
    const onGenerate = vi.fn()
    const user = userEvent.setup()
    renderForm({ onGenerate })

    await user.click(screen.getByRole('button', { name: /generate my 30-day plan/i }))
    expect(onGenerate).toHaveBeenCalledTimes(1)
    expect(onGenerate).toHaveBeenCalledWith(expect.objectContaining({
      productName: 'LaunchAI',
      productType: 'Website/SaaS',
      targetAudience: 'entrepreneurs',
      budget: 'organic',
      goal: 'signups',
    }))
  })

  it('shows validation error when product name is empty', async () => {
    const onGenerate = vi.fn()
    const user = userEvent.setup()
    renderForm({ onGenerate })

    // Clear product name
    const nameInput = screen.getByDisplayValue('LaunchAI')
    await user.clear(nameInput)
    await user.click(screen.getByRole('button', { name: /generate my 30-day plan/i }))

    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(onGenerate).not.toHaveBeenCalled()
  })

  it('shows validation error when description is too short', async () => {
    const onGenerate = vi.fn()
    const user = userEvent.setup()
    renderForm({ onGenerate })

    const descInput = screen.getByPlaceholderText('What does your product do?')
    await user.clear(descInput)
    await user.type(descInput, 'Short')
    await user.click(screen.getByRole('button', { name: /generate my 30-day plan/i }))

    expect(screen.getByText('At least 20 characters')).toBeInTheDocument()
    expect(onGenerate).not.toHaveBeenCalled()
  })

  it('toggles channel chips on click', async () => {
    const user = userEvent.setup()
    renderForm()

    const redditBtn = screen.getByRole('button', { name: 'Reddit' })

    // Reddit should not be active initially
    expect(redditBtn.className).toContain('bg-gray-50')

    // Click to activate
    await user.click(redditBtn)
    expect(redditBtn.className).toContain('bg-brand-600')

    // Click again to deactivate
    await user.click(redditBtn)
    expect(redditBtn.className).toContain('bg-gray-50')
  })

  it('selecting None deselects other channels', async () => {
    const user = userEvent.setup()
    renderForm()

    const noneBtn = screen.getByRole('button', { name: 'None' })
    const twitterBtn = screen.getByRole('button', { name: 'Twitter/X' })

    // Twitter/X is active by default
    expect(twitterBtn.className).toContain('bg-brand-600')

    // Click None
    await user.click(noneBtn)
    expect(noneBtn.className).toContain('bg-brand-600')
    expect(twitterBtn.className).toContain('bg-gray-50')
  })

  it('shows loading state when isLoading is true', () => {
    renderForm({ isLoading: true })
    expect(screen.getByText('Generating…')).toBeInTheDocument()
  })
})
