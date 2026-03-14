import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

// Import Clerk publishable key from env
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

/**
 * Wrapper that conditionally uses ClerkProvider.
 * If no valid Clerk key is set, the app renders without authentication
 * so developers can work on the UI without needing a Clerk account.
 */
function AuthWrapper({ children }) {
  if (PUBLISHABLE_KEY) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        {children}
      </ClerkProvider>
    )
  }

  console.warn(
    '⚠️  Missing VITE_CLERK_PUBLISHABLE_KEY — running without Clerk auth. ' +
    'Add your key to .env to enable authentication.'
  )
  return <>{children}</>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </StrictMode>,
)
