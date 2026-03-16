import { Link } from 'react-router-dom'

// Conditionally import Clerk components
let SignedIn, SignedOut, SignInButton, UserButton, clerkAvailable
try {
    const clerk = await import('@clerk/clerk-react')
    SignedIn = clerk.SignedIn
    SignedOut = clerk.SignedOut
    SignInButton = clerk.SignInButton
    UserButton = clerk.UserButton
    clerkAvailable = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
} catch {
    clerkAvailable = false
}

function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
            <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[var(--color-surface)]/80 px-8 py-4 backdrop-blur-md">
                <h1 className="text-xl font-bold text-[var(--color-primary)]">Campus Facility Helpdesk</h1>
                <div className="flex items-center gap-4">
                    {clerkAvailable ? (
                        <>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="cursor-pointer rounded-lg bg-[var(--color-primary)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </>
                    ) : (
                        <span className="rounded-full bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
                            Auth disabled -- add Clerk key
                        </span>
                    )}
                </div>
            </nav>

            <div className="mt-16 max-w-2xl">
                <h2 className="mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-5xl font-extrabold text-transparent">
                    Campus Facility Maintenance Helpdesk
                </h2>
                <p className="mb-10 text-lg text-[var(--color-text-muted)]">
                    Report campus facility issues, track resolutions, and keep the campus
                    running smoothly with real-time updates.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        to="/"
                        className="rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
                    >
                        Student/Faculty View
                    </Link>
                    <Link
                        to="/admin"
                        className="rounded-xl border border-[var(--color-surface-2)] bg-[var(--color-surface-2)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-surface)]"
                    >
                        Facilities Manager
                    </Link>
                    <Link
                        to="/worker"
                        className="rounded-xl border border-[var(--color-surface-2)] bg-[var(--color-surface-2)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-surface)]"
                    >
                        Maintenance Staff
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
