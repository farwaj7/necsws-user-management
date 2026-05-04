import type { Metadata } from 'next'
import { cache } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUserById } from '@/lib/mock-data/users'
import { UserCard } from '@/features/users/components/UserCard'

// cache() deduplicates calls within a single request — generateMetadata and
// the page component both need the same user, and React.cache ensures the
// lookup function runs only once per request rather than twice.
const getCachedUser = cache(getUserById)

interface UserProfilePageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: UserProfilePageProps): Promise<Metadata> {
  const { id } = await params
  const user = getCachedUser(id)
  return {
    title: user ? `${user.fullName} | User Management` : 'User not found | User Management',
  }
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = await params
  const user = getCachedUser(id)

  if (!user) {
    notFound()
  }

  return (
    <section>
      {/* GOV.UK back link — appears before the <h1>. For a single-level
          journey (list → detail) a back link is correct; breadcrumbs are for
          multi-level hierarchies. GOV.UK DS says do not use both. */}
      <div className="mb-6">
        <Link
          href="/users"
          className="inline-flex items-center gap-2 text-govuk-blue underline hover:no-underline visited:text-govuk-link-visited focus:outline-[3px] focus:outline-govuk-focus"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
            />
          </svg>
          Back to users
        </Link>
      </div>

      <div className="mb-8 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold text-govuk-text">{user.fullName}</h1>
      </div>

      <div className="max-w-2xl">
        <UserCard user={user} />
      </div>
    </section>
  )
}
