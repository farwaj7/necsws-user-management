import Link from 'next/link'
import { UserForm } from '@/features/users/components/UserForm'

export const metadata = {
  title: 'Add User | User Management',
}

export default function NewUserPage() {
  return (
    <section>
      {/* GOV.UK back link — appears before the <h1>. For a single-level
          journey (list → form) a back link is correct; breadcrumbs are for
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

      <h1 className="mb-8 text-3xl font-bold text-govuk-text">Add a new user</h1>

      <div className="max-w-xl">
        <UserForm />
      </div>
    </section>
  )
}
