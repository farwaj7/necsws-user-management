import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserForm } from '@/features/users/components/UserForm'

// Mock Next.js navigation
const mockPush = vi.fn()
const mockRefresh = vi.fn()
const mockBack = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
    back: mockBack,
  }),
}))

// Mock fetch
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('UserForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ id: '123' }) })
  })

  describe('rendering', () => {
    it('renders all form fields', () => {
      render(<UserForm />)

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument()
      expect(screen.getByRole('group', { name: /interests/i })).toBeInTheDocument()
    })

    it('renders all interest checkboxes', () => {
      render(<UserForm />)

      expect(screen.getByLabelText('Technology')).toBeInTheDocument()
      expect(screen.getByLabelText('Sports')).toBeInTheDocument()
      expect(screen.getByLabelText('Music')).toBeInTheDocument()
      expect(screen.getByLabelText('Travel')).toBeInTheDocument()
      expect(screen.getByLabelText('Reading')).toBeInTheDocument()
      expect(screen.getByLabelText('Gaming')).toBeInTheDocument()
    })

    it('renders submit and cancel buttons', () => {
      render(<UserForm />)

      expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('shows validation errors when submitting an empty form', async () => {
      const user = userEvent.setup()
      render(<UserForm />)

      await user.click(screen.getByRole('button', { name: /add user/i }))

      await waitFor(() => {
        // Error appears in both the error summary and next to the field — use getAllByText
        expect(screen.getAllByText('Full name is required').length).toBeGreaterThan(0)
      })
      expect(screen.getAllByText('Please select a country').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Please select at least one interest').length).toBeGreaterThan(0)
    })

    it('shows an error summary when there are validation errors', async () => {
      const user = userEvent.setup()
      render(<UserForm />)

      await user.click(screen.getByRole('button', { name: /add user/i }))

      await waitFor(() => {
        // The h2 title of the error summary — unique in the document
        expect(screen.getByText('There is a problem')).toBeInTheDocument()
      })
    })

    it('shows an age error when age is below 18', async () => {
      const user = userEvent.setup()
      render(<UserForm />)

      await user.type(screen.getByLabelText(/age/i), '16')
      await user.click(screen.getByRole('button', { name: /add user/i }))

      await waitFor(() => {
        expect(screen.getAllByText('You must be 18 or older').length).toBeGreaterThan(0)
      })
    })
  })

  describe('failed submission', () => {
    it('shows a submit error when the server returns a non-OK response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false })
      const user = userEvent.setup()
      render(<UserForm />)

      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/age/i), '25')
      await user.selectOptions(screen.getByLabelText(/country/i), 'United Kingdom')
      await user.click(screen.getByLabelText('Technology'))
      await user.click(screen.getByRole('button', { name: /add user/i }))

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Failed to add user. Please try again.')
      })
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('successful submission', () => {
    it('submits the form and redirects to /users on success', async () => {
      const user = userEvent.setup()
      render(<UserForm />)

      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/age/i), '25')
      await user.selectOptions(screen.getByLabelText(/country/i), 'United Kingdom')
      await user.click(screen.getByLabelText('Technology'))
      await user.click(screen.getByRole('button', { name: /add user/i }))

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/users', expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }))
        expect(mockPush).toHaveBeenCalledWith('/users')
      })
    })
  })
})
