import { useSelector } from 'react-redux'
import useComplaints from '../hooks/useComplaints'
import ComplaintCard from './ComplaintCard'

const ComplaintContainer = () => {
  useComplaints()
  const complaintsList = useSelector((store) => store.complaints?.complaintsList)

  if (!complaintsList) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    )
  }

  if (!complaintsList.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/60">
        No complaints available right now.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {complaintsList.map((complaint) => (
        <ComplaintCard key={complaint._id || complaint.id} complaint={complaint} />
      ))}
    </div>
  )
}

export default ComplaintContainer
