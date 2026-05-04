import Link from 'next/link'
import type { User } from '../types/user'

interface UserCardProps {
  user: User
  compact?: boolean
}

export function UserCard({ user, compact = false }: UserCardProps) {
  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  if (compact) {
    return (
      <Link
        href={`/users/${user.id}`}
        className="group block p-4 hover:bg-govuk-light-grey visited:text-govuk-link-visited focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-bold text-govuk-blue text-lg">{user.fullName}</p>
            <p className="text-sm text-govuk-secondary-text mt-0.5">
              {user.age} years old &middot; {user.country}
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-block bg-govuk-light-grey px-2 py-0.5 text-xs font-medium text-govuk-text"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-2 text-sm text-govuk-blue font-bold underline group-hover:no-underline" aria-hidden="true">
            View
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
                d="m10.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7246z"
              />
            </svg>
          </span>
        </div>
      </Link>
    )
  }

  return (
    <section aria-label={`Profile of ${user.fullName}`}>
      <dl className="divide-y divide-govuk-border border border-govuk-border">
        <Row label="Full name" value={user.fullName} />
        <Row label="Age" value={`${user.age} years old`} />
        <Row label="Country" value={user.country} />
        <Row
          label="Interests"
          value={
            <ul className="list-none p-0 m-0 flex flex-wrap gap-1">
              {user.interests.map((interest) => (
                <li
                  key={interest}
                  className="inline-block bg-govuk-light-grey px-2 py-0.5 text-xs font-medium text-govuk-text"
                >
                  {interest}
                </li>
              ))}
            </ul>
          }
        />
        <Row label="Member since" value={formattedDate} />
      </dl>
    </section>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-bold text-govuk-secondary-text">{label}</dt>
      <dd className="text-base text-govuk-text sm:col-span-2">{value}</dd>
    </div>
  )
}
