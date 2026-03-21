import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CitizenView() {
  const ticketsList = useSelector((store) => store.tickets?.ticketsList) || []
  
  // Use mock data if real data is empty to fulfill request
  const mockTickets = [
    { id: '#TK-4592', title: 'Broken Light Fixture', location: 'Main Library - Floor 2', status: 'Pending', date: 'Oct 24, 2023' },
    { id: '#TK-4588', title: 'HVAC Noise Issue', location: 'Science Lab 304', status: 'In Progress', date: 'Oct 23, 2023' },
    { id: '#TK-4581', title: 'Elevator 2 Malfunction', location: 'Dormitory B', status: 'Resolved', date: 'Oct 22, 2023' },
    { id: '#TK-4575', title: 'Water Fountain Leak', location: 'Gymnasium', status: 'Resolved', date: 'Oct 21, 2023' }
  ]

  const displayTickets = ticketsList.length > 0 ? ticketsList.slice(0, 4) : mockTickets

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Pending</span>
      case 'in progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">In Progress</span>
      case 'resolved':
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Resolved</span>
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">{status || 'Pending'}</span>
    }
  }

  return (
    <div className="flex-1 w-full bg-slate-950 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 text-slate-100 font-sans pb-20">
      <main className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Campus Facility Maintenance Helpdesk
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Effortlessly report issues, track repairs, and ensure our campus environment stays at its best. Fast resolutions for a better learning experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tickets/submit" className="shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.8)] hover:-translate-y-px bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
              Submit Ticket
            </Link>
            <Link to="/tickets" className="bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all">
              View Ticket Feed
            </Link>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-slate-800/70 backdrop-blur-md border border-white/10 p-8 rounded-xl">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Tickets</p>
            <h3 className="text-4xl font-bold">{ticketsList.length > 0 ? ticketsList.length : '1,248'}</h3>
            <p className="text-indigo-400 text-xs mt-2 font-medium">↑ 12% from last month</p>
          </div>
          <div className="bg-slate-800/70 backdrop-blur-md border border-white/10 p-8 rounded-xl">
            <p className="text-slate-400 text-sm font-medium mb-1">Fast Actions</p>
            <h3 className="text-4xl font-bold">4.2h</h3>
            <p className="text-emerald-400 text-xs mt-2 font-medium">Average response time</p>
          </div>
          <div className="bg-slate-800/70 backdrop-blur-md border border-white/10 p-8 rounded-xl">
            <p className="text-slate-400 text-sm font-medium mb-1">Live Updates</p>
            <h3 className="text-4xl font-bold">84</h3>
            <p className="text-amber-400 text-xs mt-2 font-medium">Tasks currently in progress</p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/40 to-indigo-500/20"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Submit Ticket</h4>
              <p className="text-slate-400 text-sm">Provide details and upload photos of the maintenance issue.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Get Assigned</h4>
              <p className="text-slate-400 text-sm">Our facility team evaluates and assigns a specialist to the task.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Track Resolution</h4>
              <p className="text-slate-400 text-sm">Monitor progress in real-time until the issue is fully resolved.</p>
            </div>
          </div>
        </section>

        {/* Recent Tickets Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recent Tickets</h2>
            <Link to="/tickets" className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors">
              View All
            </Link>
          </div>
          
          <div className="bg-slate-800/70 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/30">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Ticket ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Issue Title</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Location</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {displayTickets.map((ticket, index) => {
                    // Extract location string if it's an object
                    let locationString = 'Campus Grounds';
                    if (ticket.location) {
                      if (typeof ticket.location === 'string') {
                        locationString = ticket.location;
                      } else if (ticket.location.type === 'Point' && ticket.location.coordinates) {
                        locationString = `Lat: ${ticket.location.coordinates[1].toFixed(4)}, Lng: ${ticket.location.coordinates[0].toFixed(4)}`;
                      } else {
                        locationString = 'Location tagged mapping';
                      }
                    }

                    return (
                      <tr key={ticket.id || ticket._id || index} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-slate-400">
                          {ticket.id ? ticket.id : `#TK-${ticket._id?.substring(0,4) || '1234'}`}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{ticket.title}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {locationString}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(ticket.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {ticket.date || new Date(ticket.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default CitizenView
