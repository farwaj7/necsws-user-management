import { randomUUID } from 'crypto'
import type { User } from '@/features/users/types/user'

// Anchor the store to globalThis so it is shared across all module instances
// within the same Node.js process (Route Handlers and Server Components may
// each receive their own module cache in Next.js App Router).
// The store still resets on server restart, which is acceptable for mock data.
declare global {
  var __mockUsersStore: User[] | undefined
}

const store: User[] = globalThis.__mockUsersStore ?? (globalThis.__mockUsersStore = [
  {
    id: randomUUID(),
    fullName: 'Alice Johnson',
    age: 32,
    country: 'United Kingdom',
    interests: ['Technology', 'Reading'],
    createdAt: new Date('2024-11-10T09:00:00.000Z').toISOString(),
  },
  {
    id: randomUUID(),
    fullName: 'Ben Clarke',
    age: 27,
    country: 'Ireland',
    interests: ['Sports', 'Gaming', 'Travel'],
    createdAt: new Date('2025-01-22T14:30:00.000Z').toISOString(),
  },
  {
    id: randomUUID(),
    fullName: 'Priya Sharma',
    age: 41,
    country: 'Canada',
    interests: ['Music', 'Technology'],
    createdAt: new Date('2025-03-05T11:15:00.000Z').toISOString(),
  },
])

export function getAllUsers(): User[] {
  return [...store]
}

export function getUserById(id: string): User | undefined {
  return store.find((user) => user.id === id)
}

export function createUser(data: Omit<User, 'id' | 'createdAt'>): User {
  const newUser: User = {
    id: randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  }
  store.push(newUser)
  return newUser
}
