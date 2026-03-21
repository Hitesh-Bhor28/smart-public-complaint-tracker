import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Navbar'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 w-full flex flex-col">
        <Outlet />
      </div>
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default RootLayout
