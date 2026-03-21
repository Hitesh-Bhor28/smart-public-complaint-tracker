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
    upvoteIssueInStore: (state, action) => {
      const { issueId, userId } = action.payload
      state.issuesList = state.issuesList.map((issue) => {
        if (issue._id === issueId || issue.id === issueId) {
          const upvotedBy = issue.upvotedBy || []
          if (!upvotedBy.includes(userId)) {
            return { 
              ...issue, 
              upvotes: (issue.upvotes || 0) + 1,
              upvotedBy: [...upvotedBy, userId]
            }
          }
        }
        return issue
      })
    },
  },
})

export const { addIssues, updateIssueStatus, upvoteIssueInStore } = issueSlice.actions
export default issueSlice.reducer
