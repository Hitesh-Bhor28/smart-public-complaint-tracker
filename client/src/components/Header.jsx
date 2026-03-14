import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Show = ({ when, children }) => {
  if (when === 'signedIn') {
    return <SignedIn>{children}</SignedIn>
  }

  if (when === 'signedOut') {
    return <SignedOut>{children}</SignedOut>
  }

  return null
}

const Header = () => {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white">
            SP
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Smart Public
            </p>
            <p className="text-base font-semibold text-slate-900">Complaint Tracker</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link className="transition hover:text-emerald-600" to="/">
            Citizen View
          </Link>
          <Link className="transition hover:text-emerald-600" to="/admin">
            Admin Dashboard
          </Link>
          <Link className="transition hover:text-emerald-600" to="/worker">
            Field Worker View
          </Link>
          <Link className="transition hover:text-emerald-600" to="/complaint/submit">
            Submit Complaint
          </Link>
          <Link className="transition hover:text-emerald-600" to="/complaints">
            Complaint Feed
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Show when="signedOut">
            <SignInButton mode="modal">
              <button className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50">
                Sign in
              </button>
            </SignInButton>
          </Show>
          <Show when="signedIn">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  )
}

export default Header
