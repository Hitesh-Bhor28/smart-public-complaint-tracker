import { Link } from 'react-router-dom'

function CitizenView() {
    return (
        <div className="min-h-screen p-8">
            <nav className="mb-8 flex items-center justify-between">
                <Link to="/" className="text-[var(--color-text-muted)] transition-colors hover:text-white">
                    Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">Student/Faculty View</h1>
            </nav>

            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-[var(--color-surface-2)] bg-[var(--color-surface)] p-8">
                    <h2 className="mb-4 text-xl font-semibold">Report & Track Maintenance Tickets</h2>
                    <p className="text-[var(--color-text-muted)]">
                        This area lets students and faculty report campus facility issues,
                        attach photos, view tickets on the map, upvote important requests,
                        and track resolution status.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-[var(--color-surface-2)] p-6 text-center">
                            <p className="mb-2 text-3xl">Report Issue</p>
                            <p className="font-medium">Submit a ticket</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Upload photo + location</p>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-2)] p-6 text-center">
                            <p className="mb-2 text-3xl">Map View</p>
                            <p className="font-medium">Campus map</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Track issue hotspots</p>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-2)] p-6 text-center">
                            <p className="mb-2 text-3xl">Upvote</p>
                            <p className="font-medium">Support tickets</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Help prioritize fixes</p>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-2)] p-6 text-center">
                            <p className="mb-2 text-3xl">Notifications</p>
                            <p className="font-medium">Status updates</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Real-time progress</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CitizenView
