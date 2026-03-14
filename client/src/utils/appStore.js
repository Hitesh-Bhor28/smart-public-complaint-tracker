import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import complaintReducer from './complaintSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    complaints: complaintReducer,
  },
})

export default appStore
