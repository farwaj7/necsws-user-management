// loading.tsx is automatically wrapped in a <Suspense> boundary by Next.js.
// It renders while the /users Server Component is fetching data.

export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading users">
      {/* Header row skeleton */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="h-9 w-24 animate-pulse rounded bg-govuk-light-grey" />
        <div className="h-10 w-28 animate-pulse rounded bg-govuk-light-grey" />
      </div>

      {/* Count line skeleton */}
      <div className="mb-6 h-5 w-40 animate-pulse rounded bg-govuk-light-grey" />

      {/* List skeleton */}
      <ul className="divide-y divide-govuk-border border border-govuk-border">
        {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className="space-y-2 p-4">
            <div className="h-5 w-48 animate-pulse rounded bg-govuk-light-grey" />
            <div className="h-4 w-32 animate-pulse rounded bg-govuk-light-grey" />
            <div className="flex gap-1">
              <div className="h-4 w-16 animate-pulse rounded bg-govuk-light-grey" />
              <div className="h-4 w-16 animate-pulse rounded bg-govuk-light-grey" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
