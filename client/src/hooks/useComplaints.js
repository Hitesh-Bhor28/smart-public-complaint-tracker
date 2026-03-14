import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addComplaints } from '../utils/complaintSlice'

const useComplaints = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:7777/api/complaints/all')
        if (!response.ok) {
          return
        }
        const data = await response.json()
        const complaints = data?.data ?? []
        dispatch(addComplaints(complaints))
      } catch (error) {
        console.error('Failed to fetch complaints', error)
      }
    }

    fetchComplaints()
  }, [dispatch])
}

export default useComplaints
