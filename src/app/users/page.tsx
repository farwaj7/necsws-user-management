import Link from 'next/link'
import { getAllUsers } from '@/lib/mock-data/users'
import { UserList } from '@/features/users/components/UserList'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Users | User Management',
}

export default function UsersPage() {
  const users = getAllUsers()

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-govuk-text">Users</h1>
        <Link
          href="/users/new"
          className="inline-block bg-govuk-green px-5 py-2 font-bold text-white shadow-[0_2px_0_#002d18] hover:bg-govuk-green-hover active:shadow-none active:translate-y-[2px] visited:text-[#ffffff] focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0"
        >
          Add user
        </Link>
      </div>

      <p className="mb-6 text-govuk-secondary-text">
        {users.length} {users.length === 1 ? 'user' : 'users'} registered
      </p>

      <UserList users={users} />
    </section>
  )
}
