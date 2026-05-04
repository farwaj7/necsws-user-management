'use client'

// error.tsx must be a Client Component — it catches runtime errors thrown by
// Server Components and Client Components within the same route segment.

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // In a production app, forward to an error-reporting service (e.g. Sentry).
    console.error(error)
  }, [error])

  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold text-govuk-text">Something went wrong</h1>
      <p className="mb-6 text-govuk-secondary-text">
        An unexpected error occurred. You can try again or return to the user list.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="inline-block bg-govuk-green px-5 py-2 font-bold text-white shadow-[0_2px_0_#002d18] hover:bg-govuk-green-hover active:translate-y-[2px] active:shadow-none focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0"
        >
          Try again
        </button>
        <Link
          href="/users"
          className="text-govuk-blue underline hover:no-underline visited:text-govuk-link-visited focus:outline-[3px] focus:outline-govuk-focus"
        >
          Back to users
        </Link>
      </div>
    </section>
  )
}
