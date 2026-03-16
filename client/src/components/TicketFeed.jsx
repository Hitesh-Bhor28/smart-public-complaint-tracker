import { useSelector } from 'react-redux'
import useTickets from '../hooks/useTickets'
import TicketCard from './TicketCard'

const TicketFeed = () => {
  useTickets()
  const ticketsList = useSelector((store) => store.tickets?.ticketsList)

  if (!ticketsList) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    )
  }

  if (!ticketsList.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/60">
        No maintenance tickets available right now.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {ticketsList.map((ticket) => (
        <TicketCard key={ticket._id || ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}

export default TicketFeed
