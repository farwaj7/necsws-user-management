import type { User } from '../types/user'
import { UserCard } from './UserCard'

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="border-2 border-dashed border-govuk-border p-8 text-center">
        <p className="text-govuk-secondary-text">No users found. Add the first one.</p>
      </div>
    )
  }

  return (
    <ul role="list" className="divide-y divide-govuk-border border border-govuk-border" aria-label="User list">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} compact />
        </li>
      ))}
    </ul>
  )
}
