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
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
            {/* Navigation */}
            <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 bg-[var(--color-surface)]/80 backdrop-blur-md z-50">
                <h1 className="text-xl font-bold text-[var(--color-primary)]">🏙️ CrowdFix</h1>
                <div className="flex items-center gap-4">
                    {clerkAvailable ? (
                        <>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </>
                    ) : (
                        <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-2)] px-3 py-1 rounded-full">
                            Auth disabled — add Clerk key
                        </span>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <div className="max-w-2xl mt-16">
                <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                    Smart Public Complaint &amp; Issue Tracker
                </h2>
                <p className="text-lg text-[var(--color-text-muted)] mb-10">
                    Report infrastructure issues, track resolutions, and help your community
                    — all powered by location intelligence and AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/citizen"
                        className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                        🧑‍💼 Citizen View
                    </Link>
                    <Link
                        to="/admin"
                        className="px-6 py-3 rounded-xl bg-[var(--color-surface-2)] text-white font-semibold hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-surface-2)]"
                    >
                        🛡️ Admin Dashboard
                    </Link>
                    <Link
                        to="/field-worker"
                        className="px-6 py-3 rounded-xl bg-[var(--color-surface-2)] text-white font-semibold hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-surface-2)]"
                    >
                        🔧 Field Worker
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
