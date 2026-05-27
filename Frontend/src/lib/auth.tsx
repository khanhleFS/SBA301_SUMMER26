import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// Lightweight auth helpers using localStorage/sessionStorage.
// Replace with your real auth/context logic when available.

export function isAuthenticated(): boolean {
  try {
    return Boolean(localStorage.getItem('token'))
  } catch {
    return false
  }
}

export function getAuthUser(): any | null {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Guard that ensures only unauthenticated (guest) users can access children
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const auth = isAuthenticated()
  const location = useLocation()

  if (auth) {
    // If user is authenticated, send them to the app home or previous location
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <>{children}</>
}

// Guard that ensures only authenticated users can access children
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = isAuthenticated()
  const location = useLocation()

  if (!auth) {
    // Redirect to login and preserve the attempted path
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}

// Guard for payment pages: ensures there is an active pending payment id in sessionStorage
export function RequirePaymentAccess({ children }: { children: React.ReactNode }) {
  const pending = typeof window !== 'undefined' ? sessionStorage.getItem('pendingPaymentId') : null

  if (!pending) {
    return <Navigate to="/payment/create" replace />
  }

  return <>{children}</>
}

export default {
  isAuthenticated,
  getAuthUser,
  GuestOnly,
  RequireAuth,
  RequirePaymentAccess,
}
