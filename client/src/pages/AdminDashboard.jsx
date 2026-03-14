import { Link } from 'react-router-dom'

function AdminDashboard() {
    return (
        <div className="min-h-screen p-8">
            <nav className="flex items-center justify-between mb-8">
                <Link to="/" className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                    ← Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-[var(--color-primary)]">Admin Dashboard</h1>
            </nav>

            <div className="max-w-6xl mx-auto">
                <div className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-surface-2)]">
                    <h2 className="text-xl font-semibold mb-4">🛡️ Complaint Management</h2>
                    <p className="text-[var(--color-text-muted)]">
                        This dashboard will provide a centralized view of all complaints,
                        area-wise monitoring, heatmap visualization, status management,
                        task assignment to field workers, and analytics.
                    </p>

                    {/* Placeholder sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">📊</p>
                            <p className="font-medium">Analytics</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Complaint stats & trends</p>
                        </div>
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">🗺️</p>
                            <p className="font-medium">Heatmap</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Density visualization</p>
                        </div>
                        <div className="bg-[var(--color-surface-2)] rounded-xl p-6 text-center">
                            <p className="text-3xl mb-2">👷</p>
                            <p className="font-medium">Assign Tasks</p>
                            <p className="text-sm text-[var(--color-text-muted)]">Send to field workers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
