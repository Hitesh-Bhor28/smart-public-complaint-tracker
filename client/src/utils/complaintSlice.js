import { createSlice } from '@reduxjs/toolkit'

const complaintSlice = createSlice({
  name: 'complaints',
  initialState: {
    complaintsList: null,
  },
  reducers: {
    addComplaints: (state, action) => {
      state.complaintsList = action.payload
    },
  },
})

export const { addComplaints } = complaintSlice.actions
export default complaintSlice.reducer
