import Link from 'next/link'

export const metadata = {
  title: 'Page not found | User Management',
}

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold text-govuk-text">Page not found</h1>
      <p className="mb-6 text-govuk-secondary-text">
        If you typed the web address, check it is correct.
      </p>
      <Link
        href="/users"
        className="text-govuk-blue underline hover:no-underline visited:text-govuk-link-visited focus:outline-[3px] focus:outline-govuk-focus"
      >
        Go back to users
      </Link>
    </section>
  )
}
