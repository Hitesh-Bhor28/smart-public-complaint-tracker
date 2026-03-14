import { Link } from 'react-router-dom'

function CitizenView() {
    return (
        <div className="min-h-screen p-8">
            <nav className="flex items-center justify-between mb-8">
                <Link to="/" className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                    ← Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">Citizen View</h1>
            </nav>

            <div className="max-w-4xl mx-auto">
                <div className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-surface-2)]">
                    <h2 className="text-xl font-semibold mb-4">📋 Report & Track Issues</h2>
                    <p className="text-[var(--color-text-muted)]">
                        This page will allow citizens to report public infrastructure issues,
                        upload images, view nearby complaints on a map, upvote existing complaints,
                        and track the resolution status of their submissions.
                    </p>

                    {/* Placeholder sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">📷</p>
                            <p className="font-medium">Report Issue</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Upload photo + location</p>
                        </div>
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">🗺️</p>
                            <p className="font-medium">Map View</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Google Maps integration</p>
                        </div>
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">👍</p>
                            <p className="font-medium">Upvote</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Support existing complaints</p>
                        </div>
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">🔔</p>
                            <p className="font-medium">Notifications</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Real-time status updates</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CitizenView
