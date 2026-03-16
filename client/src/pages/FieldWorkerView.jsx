import { Link } from 'react-router-dom'

function FieldWorkerView() {
    return (
        <div className="min-h-screen p-8">
            <nav className="mb-8 flex items-center justify-between">
                <Link to="/" className="text-[var(--color-text-muted)] transition-colors hover:text-white">
                    Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">Maintenance Staff View</h1>
            </nav>

            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border border-[var(--color-surface-2)] bg-[var(--color-surface)] p-8">
                    <h2 className="mb-4 text-xl font-semibold">Assigned Tasks</h2>
                    <p className="text-[var(--color-text-muted)]">
                        This view will show assigned maintenance tickets, provide
                        navigation to campus locations, and allow staff to upload
                        proof of resolution.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-xl bg-[var(--color-surface-2)] p-6 text-center">
                            <p className="mb-2 text-3xl">My Tasks</p>
                            <p className="font-medium">Assigned tickets</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Work queue</p>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-2)] p-6 text-center">
                            <p className="mb-2 text-3xl">Navigate</p>
                            <p className="font-medium">Campus directions</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Get to the location</p>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-2)] p-6 text-center">
                            <p className="mb-2 text-3xl">Submit Proof</p>
                            <p className="font-medium">Resolution updates</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Upload completion photos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FieldWorkerView
