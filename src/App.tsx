import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import './App.css'

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  return (
    <main className="auth-page">
      {authMode === 'login' ? (
        <LoginPage onGoSignup={() => setAuthMode('signup')} />
      ) : (
        <SignupPage onGoLogin={() => setAuthMode('login')} />
      )}
    </main>
  )
}

export default App
