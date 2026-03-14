import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import CitizenView from '../pages/CitizenView'
import AdminDashboard from '../pages/AdminDashboard'
import FieldWorkerView from '../pages/FieldWorkerView'
import ComplaintSubmitPage from '../pages/ComplaintSubmitPage'
import ComplaintFeedPage from '../pages/ComplaintFeedPage'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <CitizenView />,
      },
      {
        path: '/admin',
        element: <AdminDashboard />,
      },
      {
        path: '/worker',
        element: <FieldWorkerView />,
      },
      {
        path: '/complaint/submit',
        element: <ComplaintSubmitPage />,
      },
      {
        path: '/complaints',
        element: <ComplaintFeedPage />,
      },
    ],
  },
])

const Body = () => {
  return <RouterProvider router={appRouter} />
}

export default Body
