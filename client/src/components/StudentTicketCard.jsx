import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { confirmResolution } from '../utils/issueConstants'
import { updateIssueStatus } from '../utils/issueSlice'

const statusStyles = {
  pending: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
  assigned: 'bg-sky-500/15 text-sky-200 border-sky-500/30',
  'in progress': 'bg-indigo-500/15 text-indigo-200 border-indigo-500/30',
  completed: 'bg-teal-500/15 text-teal-200 border-teal-500/30',
  closed: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
}

const StudentTicketCard = ({ ticket }) => {
  const { userId } = useAuth()
  const dispatch = useDispatch()
  const [isConfirming, setIsConfirming] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const statusKey = String(ticket.status || 'Pending').toLowerCase()
  const statusClass = statusStyles[statusKey] || statusStyles.pending
  const canConfirm = statusKey === 'completed'

  const handleConfirm = async () => {
    if (!ticket?._id && !ticket?.id) return

    setIsConfirming(true)
    setErrorMessage('')
    try {
      await confirmResolution(ticket._id || ticket.id, userId)
      dispatch(updateIssueStatus({ issueId: ticket._id || ticket.id, status: 'Closed' }))
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/30">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
          {ticket.status || 'Pending'}
        </span>
      </div>
      <p className="mt-3 text-sm text-white/70">{ticket.description}</p>

      <div className="mt-4 grid gap-3 text-xs text-white/60 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Assigned To</p>
          <p className="mt-1 text-sm text-white">{ticket.assignedToName || ticket.assignedTo || 'Unassigned'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Reported At</p>
          <p className="mt-1 text-sm text-white">{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>

      {canConfirm ? (
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isConfirming}
          className="mt-4 w-full rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-emerald-500"
        >
          {isConfirming ? 'Confirming...' : 'Confirm & Close Ticket'}
        </button>
      ) : null}

      {errorMessage ? <p className="mt-2 text-xs text-rose-200">{errorMessage}</p> : null}
    </article>
  )
}

export default StudentTicketCard
