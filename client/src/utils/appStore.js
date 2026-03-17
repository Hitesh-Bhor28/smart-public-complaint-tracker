import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import ticketReducer from './ticketSlice'
import taskReducer from './taskSlice'
import issueReducer from './issueSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tickets: ticketReducer,
    tasks: taskReducer,
    issues: issueReducer,
  },
})

export default appStore
