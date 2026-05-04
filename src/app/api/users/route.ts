import { NextResponse } from 'next/server'
import { getAllUsers, createUser } from '@/lib/mock-data/users'
import { UserSchema } from '@/features/users/schemas/userSchema'

export async function GET() {
  const users = getAllUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const result = UserSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.issues },
      { status: 422 }
    )
  }

  const newUser = createUser(result.data)
  return NextResponse.json(newUser, { status: 201 })
}
