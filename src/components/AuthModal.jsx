import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

export default function AuthModal({ onClose, onSuccess, intent }) {
  const [tab, setTab] = useState('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (tab === 'signup') {
        await signUp({ email, password, username, displayName })
      } else {
        await signIn({ email, password })
      }
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">×</button>

        {intent && (
          <div className="auth-intent">
            <div className="auth-intent-dot" />
            {intent}
          </div>
        )}

        <h2 className="auth-h">
          {tab === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="auth-sub">
          {tab === 'signup'
            ? 'Join the ClipSmart creator network'
            : 'Sign in to your ClipSmart account'}
        </p>

        <div className="auth-tabs">
          <button className={'auth-tab' + (tab === 'signup' ? ' active' : '')} onClick={() => { setTab('signup'); setError('') }}>
            Sign Up
          </button>
          <button className={'auth-tab' + (tab === 'login' ? ' active' : '')} onClick={() => { setTab('login'); setError('') }}>
            Log In
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <>
              <div className="auth-field">
                <label>Display Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="auth-field">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="@yourhandle"
                  value={username}
                  onChange={e => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
                  required
                  autoComplete="username"
                />
              </div>
            </>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder={tab === 'signup' ? 'Min. 8 characters' : '••••••••'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit btn-primary" disabled={loading}>
            {loading ? 'Please wait…' : tab === 'signup' ? 'Create account →' : 'Sign in →'}
          </button>
        </form>

        <p className="auth-footer">
          {tab === 'signup'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <button className="auth-switch" onClick={() => { setTab(tab === 'signup' ? 'login' : 'signup'); setError('') }}>
            {tab === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}
