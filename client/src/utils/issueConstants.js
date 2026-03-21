export const confirmResolution = async (issueId, userId) => {
  const response = await fetch(`http://localhost:7777/api/issues/confirm/${issueId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId || '',
    },
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(errorBody?.message || 'Unable to confirm resolution')
  }

  return response.json()
}

export const upvoteIssue = async (issueId, userId) => {
  const response = await fetch(`http://localhost:7777/api/tickets/${issueId}/upvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId || '',
    },
    body: JSON.stringify({ userId: userId || '' })
  })
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(errorBody?.message || 'Upvote failed')
  }
  return response.json()
}
