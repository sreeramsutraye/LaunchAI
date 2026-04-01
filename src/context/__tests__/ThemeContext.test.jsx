import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '../ThemeContext'

function ThemeConsumer() {
  const { dark, toggle } = useTheme()
  return (
    <div>
      <span data-testid="mode">{dark ? 'dark' : 'light'}</span>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('defaults to light mode when no preference saved', () => {
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('respects saved dark preference', () => {
    localStorage.setItem('theme', 'dark')
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })

  it('toggles from light to dark', async () => {
    const user = userEvent.setup()
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)

    expect(screen.getByTestId('mode')).toHaveTextContent('light')
    await user.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('toggles back to light', async () => {
    localStorage.setItem('theme', 'dark')
    const user = userEvent.setup()
    render(<ThemeProvider><ThemeConsumer /></ThemeProvider>)

    await user.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
