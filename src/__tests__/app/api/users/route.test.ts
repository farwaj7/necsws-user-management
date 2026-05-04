import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET, POST } from '@/app/api/users/route'
import type { User } from '@/features/users/types/user'

// ─── Mock the data layer ───────────────────────────────────────────────────────
// vi.mock is hoisted to the top of the file, so factory-referenced variables
// must also be hoisted with vi.hoisted to avoid a TDZ ReferenceError.

const { mockGetAllUsers, mockCreateUser } = vi.hoisted(() => ({
  mockGetAllUsers: vi.fn<() => User[]>(),
  mockCreateUser: vi.fn<(data: Omit<User, 'id' | 'createdAt'>) => User>(),
}))

vi.mock('@/lib/mock-data/users', () => ({
  getAllUsers: mockGetAllUsers,
  createUser: mockCreateUser,
}))

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const STUB_USER: User = {
  id: 'abc-123',
  fullName: 'Alice Johnson',
  age: 30,
  country: 'United Kingdom',
  interests: ['Technology'],
  createdAt: '2024-01-01T00:00:00.000Z',
}

const VALID_INPUT = {
  fullName: 'Bob Smith',
  age: 25,
  country: 'Germany',
  interests: ['Sports'],
}

function makePostRequest(body: unknown) {
  return new Request('http://localhost/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('GET /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns the user list with status 200', async () => {
    mockGetAllUsers.mockReturnValue([STUB_USER])

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual([STUB_USER])
  })

  it('returns an empty array when there are no users', async () => {
    mockGetAllUsers.mockReturnValue([])

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual([])
  })
})

describe('POST /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a user and returns 201 with the new user', async () => {
    const created: User = { id: 'xyz-789', ...VALID_INPUT, createdAt: '2024-01-01T00:00:00.000Z' }
    mockCreateUser.mockReturnValue(created)

    const response = await POST(makePostRequest(VALID_INPUT))
    const body = await response.json()

    expect(response.status).toBe(201)
    expect(body).toEqual(created)
    expect(mockCreateUser).toHaveBeenCalledWith(VALID_INPUT)
  })

  it('returns 400 for malformed JSON', async () => {
    const request = new Request('http://localhost/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not valid json{{{',
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body).toEqual({ error: 'Invalid JSON body' })
    expect(mockCreateUser).not.toHaveBeenCalled()
  })

  it('returns 422 when required fields are missing', async () => {
    const response = await POST(makePostRequest({}))
    const body = await response.json()

    expect(response.status).toBe(422)
    expect(body.error).toBe('Validation failed')
    expect(body.issues).toBeInstanceOf(Array)
    expect(mockCreateUser).not.toHaveBeenCalled()
  })

  it('returns 422 when age is below 18', async () => {
    const response = await POST(makePostRequest({ ...VALID_INPUT, age: 16 }))

    expect(response.status).toBe(422)
    expect(mockCreateUser).not.toHaveBeenCalled()
  })

  it('returns 422 when country is not in the allowed list', async () => {
    const response = await POST(makePostRequest({ ...VALID_INPUT, country: 'Narnia' }))

    expect(response.status).toBe(422)
    expect(mockCreateUser).not.toHaveBeenCalled()
  })

  it('returns 422 when the interests array is empty', async () => {
    const response = await POST(makePostRequest({ ...VALID_INPUT, interests: [] }))

    expect(response.status).toBe(422)
    expect(mockCreateUser).not.toHaveBeenCalled()
  })

  it('returns 422 when fullName is whitespace only', async () => {
    const response = await POST(makePostRequest({ ...VALID_INPUT, fullName: '   ' }))

    expect(response.status).toBe(422)
    expect(mockCreateUser).not.toHaveBeenCalled()
  })
})
