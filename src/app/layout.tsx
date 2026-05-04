import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Add and manage users',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-white font-sans text-govuk-text antialiased">
        {/* Skip link for keyboard/screen-reader users — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="absolute left-0 top-0 z-50 -translate-y-full bg-govuk-focus px-4 py-2 font-bold text-govuk-text focus:translate-y-0"
        >
          Skip to main content
        </a>

        <header className="bg-govuk-blue">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link
              href="/users"
              className="font-bold text-white text-lg no-underline hover:underline visited:text-[#ffffff] focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0"
            >
              User Management
            </Link>
            <nav aria-label="Main navigation">
              <Link
                href="/users/new"
                className="inline-block bg-govuk-green px-4 py-2 font-bold text-white text-sm shadow-[0_2px_0_#002d18] hover:bg-govuk-green-hover active:shadow-none active:translate-y-[2px] visited:text-[#ffffff] focus:outline-[3px] focus:outline-govuk-focus focus:outline-offset-0"
              >
                Add user
              </Link>
            </nav>
          </div>
        </header>

        <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>

        <footer className="mt-auto border-t border-govuk-border bg-govuk-light-grey">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-govuk-secondary-text">
            Built as a technical assessment for NECSWS.
          </div>
        </footer>
      </body>
    </html>
  )
}
