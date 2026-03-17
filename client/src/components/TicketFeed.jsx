import { useSelector } from 'react-redux'
import useTickets from '../hooks/useTickets'
import { addIssues } from '../utils/issueSlice'
import StudentTicketCard from './StudentTicketCard'

const TicketFeed = () => {
  useTickets()
  const issuesList = useSelector((store) => store.issues?.issuesList)
  const ticketsList = useSelector((store) => store.tickets?.ticketsList)
  const list = issuesList && issuesList.length ? issuesList : ticketsList

  if (!list) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    )
  }

  if (!list.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/60">
        No maintenance tickets available right now.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((ticket) => (
        <StudentTicketCard key={ticket._id || ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}

export default TicketFeed
