import { z } from 'zod'

export const INTERESTS = [
  'Technology',
  'Sports',
  'Music',
  'Travel',
  'Reading',
  'Gaming',
] as const

export const COUNTRIES = [
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Ireland',
  'New Zealand',
  'Japan',
] as const

export const UserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be 100 characters or fewer')
    // Must contain at least one Unicode letter so purely numeric or symbolic
    // strings are rejected, while still accepting accented characters,
    // hyphens, apostrophes, and non-Latin scripts (e.g. José, O'Brien, Müller).
    .refine((val) => /\p{L}/u.test(val), 'Full name must contain at least one letter'),
  age: z.coerce
    .number()
    .int('Age must be a whole number')
    .min(18, 'You must be 18 or older')
    .max(120, 'Please enter a valid age'),
  country: z.enum(COUNTRIES, { error: 'Please select a country' }),
  interests: z.array(z.enum(INTERESTS)).min(1, 'Please select at least one interest'),
})

export type UserFormData = z.infer<typeof UserSchema>
export type UserFormInput = z.input<typeof UserSchema>
