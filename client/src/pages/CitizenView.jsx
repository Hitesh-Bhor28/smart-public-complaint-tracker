import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CitizenView() {
  const ticketsList = useSelector((store) => store.tickets?.ticketsList) || []
  const recentTickets = ticketsList.slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900/40 p-8 shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
                Student/Faculty Desk
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight">
                Campus Facility Maintenance Helpdesk
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-white/70">
                Submit maintenance tickets, track progress, and keep campus facilities running
                smoothly with real-time updates.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tickets/submit"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Submit Ticket
              </Link>
              <Link
                to="/tickets"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-emerald-300 hover:text-white"
              >
                View Ticket Feed
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Total Tickets</p>
            <p className="mt-3 text-3xl font-semibold">{ticketsList.length}</p>
            <p className="mt-2 text-xs text-white/60">Active campus requests</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Fast Actions</p>
            <p className="mt-3 text-lg font-semibold">Report in seconds</p>
            <p className="mt-2 text-xs text-white/60">Upload photo + set location</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Live Updates</p>
            <p className="mt-3 text-lg font-semibold">Track status</p>
            <p className="mt-2 text-xs text-white/60">See progress from assigned staff</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">How It Works</h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold">1. Submit a Ticket</p>
                <p className="mt-2 text-xs text-white/60">
                  Share issue details, upload a photo, and mark the exact campus location.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold">2. Get Assigned</p>
                <p className="mt-2 text-xs text-white/60">
                  Facilities Managers assign the right maintenance staff to your request.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold">3. Track Resolution</p>
                <p className="mt-2 text-xs text-white/60">
                  Follow updates and see when the issue has been resolved.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Tickets</h2>
              <Link
                to="/tickets"
                className="text-xs uppercase tracking-[0.3em] text-emerald-300"
              >
                View All
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {recentTickets.length ? (
                recentTickets.map((ticket) => (
                  <div
                    key={ticket._id || ticket.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{ticket.title}</p>
                      <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                        {ticket.status || 'Pending'}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-white/60">
                      {ticket.description || 'No description provided.'}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center text-sm text-white/60">
                  No tickets yet. Be the first to report an issue.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CitizenView
