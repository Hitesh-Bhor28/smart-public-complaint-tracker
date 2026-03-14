import { Link } from 'react-router-dom'

function FieldWorkerView() {
    return (
        <div className="min-h-screen p-8">
            <nav className="flex items-center justify-between mb-8">
                <Link to="/" className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                    ← Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">Field Worker View</h1>
            </nav>

            <div className="max-w-4xl mx-auto">
                <div className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-surface-2)]">
                    <h2 className="text-xl font-semibold mb-4">🔧 Assigned Tasks</h2>
                    <p className="text-[var(--color-text-muted)]">
                        This view will show assigned complaints to field workers,
                        provide GPS navigation to issue locations, and allow
                        workers to upload resolution proof photos.
                    </p>

                    {/* Placeholder sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">📬</p>
                            <p className="font-medium">My Tasks</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Assigned complaints</p>
                        </div>
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">🧭</p>
                            <p className="font-medium">Navigate</p>
                            <p className="text-sm text-[var(--color-text-muted)]">GPS directions to location</p>
                        </div>
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">✅</p>
                            <p className="font-medium">Submit Proof</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Upload resolution photos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FieldWorkerView
