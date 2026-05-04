# ADR 001: Form Management Library Selection

**Date:** 2026-05-02  
**Status:** Accepted

---

## Context

The application requires a form with four fields (full name, age, country, interests), each with validation rules. The decision was which approach to use for form state and validation.

Options considered:

1. **Plain `useState` + manual validation** — no dependencies, full control
2. **React Hook Form + Zod** — library-driven, schema-first approach
3. **Formik + Yup** — established alternative, heavier bundle

---

## Decision

Use **React Hook Form v7** for form state management, integrated with **Zod v4** for schema-driven validation via `@hookform/resolvers`.

---

## Rationale

### React Hook Form over plain `useState`

React Hook Form uses **uncontrolled inputs** backed by refs. This means:
- No re-render on every keystroke — only on validation triggers
- Less boilerplate than building a controlled form with `useState` for each field
- Built-in support for async validation, field arrays, and nested objects

At the scale of this task, the difference is minor. However, on larger forms (10+ fields, dynamic field arrays, complex dependencies), the performance and DX gap becomes significant. Choosing RHF here reflects how the solution would be built in a production context.

### Zod over manual validation

Zod provides schema-first validation with full TypeScript inference. The `UserFormData` type is derived directly from `UserSchema`:

```ts
export const UserSchema = z.object({ ... })
export type UserFormData = z.infer<typeof UserSchema>
```

This means the form data type, API contract, and validation rules are defined in **one place** and stay in sync automatically. Manual validation would require duplicating type definitions alongside imperative checks.

Zod v4 is used here (the current major version), which offers improved performance and a cleaner internal error format.

### Why not Formik + Yup?

Formik re-renders on every change (similar drawback to `useState`). Yup has a similar design to Zod but lacks the same TypeScript inference quality. The React Hook Form + Zod combination has become the community standard for new React projects in 2025/2026.

---

## Consequences

**Positive:**
- Single source of truth for types and validation rules
- Accessible error messages are automatically derived from the schema
- The same `UserSchema` is reused in the API Route Handler for server-side validation, preventing data inconsistencies

**Negative:**
- Additional dependencies (`react-hook-form`, `zod`, `@hookform/resolvers`)
- Developers unfamiliar with RHF's `register`/`Controller` pattern need a short onboarding

---

## Related decisions

- See also: the `UserSchema` is intentionally shared between the client form and the `/api/users` POST handler to avoid divergence between client and server validation.
