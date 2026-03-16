import { createSlice } from '@reduxjs/toolkit'

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    ticketsList: null,
  },
  reducers: {
    addTickets: (state, action) => {
      state.ticketsList = action.payload
    },
  },
})

export const { addTickets } = ticketSlice.actions
export default ticketSlice.reducer
