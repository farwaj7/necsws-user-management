import { describe, it, expect } from 'vitest'
import { UserSchema } from '@/features/users/schemas/userSchema'

describe('UserSchema', () => {
  const validData = {
    fullName: 'Jane Smith',
    age: 25,
    country: 'United Kingdom',
    interests: ['Technology', 'Reading'],
  }

  describe('valid submissions', () => {
    it('accepts a valid user object', () => {
      const result = UserSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('accepts age exactly at the minimum (18)', () => {
      const result = UserSchema.safeParse({ ...validData, age: 18 })
      expect(result.success).toBe(true)
    })

    it('coerces age from a string to a number', () => {
      const result = UserSchema.safeParse({ ...validData, age: '30' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.age).toBe(30)
      }
    })
  })

  describe('age validation', () => {
    it('rejects age below 18', () => {
      const result = UserSchema.safeParse({ ...validData, age: 17 })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('You must be 18 or older')
      }
    })

    it('rejects age of 0', () => {
      const result = UserSchema.safeParse({ ...validData, age: 0 })
      expect(result.success).toBe(false)
    })

    it('rejects a non-integer age', () => {
      const result = UserSchema.safeParse({ ...validData, age: 25.5 })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Age must be a whole number')
      }
    })
  })

  describe('fullName validation', () => {
    it('rejects an empty full name', () => {
      const result = UserSchema.safeParse({ ...validData, fullName: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Full name is required')
      }
    })

    it('rejects a whitespace-only full name', () => {
      const result = UserSchema.safeParse({ ...validData, fullName: '   ' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Full name is required')
      }
    })

    it('rejects a name exceeding 100 characters', () => {
      const result = UserSchema.safeParse({ ...validData, fullName: 'A'.repeat(101) })
      expect(result.success).toBe(false)
    })

    it('rejects a purely numeric name', () => {
      const result = UserSchema.safeParse({ ...validData, fullName: '12345' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Full name must contain at least one letter')
      }
    })

    it('rejects a name with only special characters', () => {
      const result = UserSchema.safeParse({ ...validData, fullName: '!!!---' })
      expect(result.success).toBe(false)
    })

    it('accepts a name with a hyphen (e.g. Mary-Jane)', () => {
      expect(UserSchema.safeParse({ ...validData, fullName: 'Mary-Jane' }).success).toBe(true)
    })

    it("accepts a name with an apostrophe (e.g. O'Brien)", () => {
      expect(UserSchema.safeParse({ ...validData, fullName: "O'Brien" }).success).toBe(true)
    })

    it('accepts a name with accented characters (e.g. José Müller)', () => {
      expect(UserSchema.safeParse({ ...validData, fullName: 'José Müller' }).success).toBe(true)
    })
  })

  describe('country validation', () => {
    it('rejects an empty country', () => {
      const result = UserSchema.safeParse({ ...validData, country: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select a country')
      }
    })

    it('rejects a country not in the allowed list', () => {
      const result = UserSchema.safeParse({ ...validData, country: 'Narnia' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select a country')
      }
    })
  })

  describe('interests validation', () => {
    it('rejects an empty interests array', () => {
      const result = UserSchema.safeParse({ ...validData, interests: [] })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select at least one interest')
      }
    })

    it('accepts a single interest', () => {
      const result = UserSchema.safeParse({ ...validData, interests: ['Music'] })
      expect(result.success).toBe(true)
    })

    it('accepts multiple interests', () => {
      const result = UserSchema.safeParse({
        ...validData,
        interests: ['Technology', 'Sports', 'Gaming'],
      })
      expect(result.success).toBe(true)
    })
  })
})
