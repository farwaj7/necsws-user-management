'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { UserSchema, UserFormData, UserFormInput, COUNTRIES, INTERESTS } from '../schemas/userSchema'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CheckboxGroup } from '@/components/ui/CheckboxGroup'
import { Button } from '@/components/ui/Button'

export function UserForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormInput, unknown, UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullName: '',
      age: undefined,
      country: undefined,
      interests: [],
    },
  })

  async function onSubmit(data: UserFormData) {
    setSubmitError(null)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let message = 'Failed to add user. Please try again.'
        try {
          const payload: unknown = await response.json()
          if (
            payload !== null &&
            typeof payload === 'object' &&
            'error' in payload &&
            typeof (payload as { error: unknown }).error === 'string'
          ) {
            message = (payload as { error: string }).error
          }
        } catch {
          // use default message if body cannot be parsed
        }
        throw new Error(message)
      }

      // Invalidate the Server Component cache before navigating so /users
      // immediately shows the newly created user.
      router.refresh()
      router.push('/users')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  const hasErrors = Object.keys(errors).length > 0

  // GOV.UK / WCAG 2.4 pattern: move focus to the error summary after a failed
  // submission so keyboard and screen-reader users land directly on the problem
  // list. The onError callback is the idiomatic RHF place to do this.
  function onError() {
    errorSummaryRef.current?.focus()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
      aria-label="Add new user"
    >
      {/* Error summary — GOV.UK pattern */}
      {hasErrors && (
        <div
          ref={errorSummaryRef}
          role="alert"
          aria-labelledby="error-summary-title"
          tabIndex={-1}
          className="mb-8 border-[5px] border-govuk-error p-4 focus:outline-none"
        >
          <h2 id="error-summary-title" className="mb-3 text-lg font-bold text-govuk-error">
            There is a problem
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            {errors.fullName && (
              <li>
                <a href="#fullName" className="text-govuk-error underline font-bold">
                  {errors.fullName.message}
                </a>
              </li>
            )}
            {errors.age && (
              <li>
                <a href="#age" className="text-govuk-error underline font-bold">
                  {errors.age.message}
                </a>
              </li>
            )}
            {errors.country && (
              <li>
                <a href="#country" className="text-govuk-error underline font-bold">
                  {errors.country.message}
                </a>
              </li>
            )}
            {errors.interests && (
              <li>
                <a href="#interests" className="text-govuk-error underline font-bold">
                  {errors.interests.message}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      {submitError && (
        <div role="alert" className="mb-6 border-4 border-govuk-error p-4 text-govuk-error font-bold">
          {submitError}
        </div>
      )}

      <Input
        id="fullName"
        label="Full name"
        required
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <Input
        id="age"
        label="Age"
        type="number"
        required
        hint="Must be 18 or older"
        error={errors.age?.message}
        min={18}
        {...register('age')}
      />

      <Select
        id="country"
        label="Country"
        options={[...COUNTRIES]}
        required
        placeholder="Select a country"
        error={errors.country?.message}
        {...register('country')}
      />

      <Controller
        name="interests"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            id="interests"
            label="Interests"
            options={INTERESTS}
            value={field.value ?? []}
            onChange={field.onChange}
            hint="Select all that apply"
            error={errors.interests?.message}
            required
          />
        )}
      />

      <div className="mt-8 flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding user…' : 'Add user'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
