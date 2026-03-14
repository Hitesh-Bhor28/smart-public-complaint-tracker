import ComplaintContainer from '../components/ComplaintContainer'

const ComplaintFeedPage = () => {
  return (
    <section className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Community Feed</p>
          <h1 className="mt-3 text-3xl font-semibold">Recent Complaints</h1>
          <p className="mt-2 text-sm text-white/70">
            Track ongoing issues and see what matters most in your neighborhood.
          </p>
        </div>
        <ComplaintContainer />
      </div>
    </section>
  )
}

export default ComplaintFeedPage
