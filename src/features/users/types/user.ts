import { INTERESTS } from '../schemas/userSchema'

export type Interest = (typeof INTERESTS)[number]

export interface User {
  id: string
  fullName: string
  age: number
  country: string
  interests: Interest[]
  createdAt: string
}
