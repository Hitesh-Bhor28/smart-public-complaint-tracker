import { createSlice } from '@reduxjs/toolkit'

const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    issuesList: [],
  },
  reducers: {
    addIssues: (state, action) => {
      state.issuesList = action.payload
    },
    updateIssueStatus: (state, action) => {
      const { issueId, status } = action.payload
      state.issuesList = state.issuesList.map((issue) =>
        issue._id === issueId || issue.id === issueId ? { ...issue, status } : issue,
      )
    },
  },
})

export const { addIssues, updateIssueStatus } = issueSlice.actions
export default issueSlice.reducer
