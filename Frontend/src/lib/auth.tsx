import React, { createContext, useContext, useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { api } from './api'

export interface User {
  id: string | number
  username: string
  email: string
  role: string
  avatarUrl?: string
  fullName?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)

  const login = (userData: User, tokenData: string) => {
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenData)
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (e) {
      // Fallback for custom path if backend uses root /logout
      try {
        await api.post('/logout')
      } catch (err) {
        console.warn('Backend logout call failed:', err)
      }
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }

  const refreshProfile = async () => {
    try {
      const response = await api.get('/auth/profile')
      if (response.data && response.data.code === 200) {
        const profile = response.data.result
        const updatedUser: User = {
          id: profile.id || user?.id || 0,
          username: profile.username || user?.username || '',
          email: profile.email || user?.email || '',
          role: profile.role || user?.role || 'USER',
          fullName: profile.fullName || user?.fullName || '',
          avatarUrl: profile.avatarUrl || undefined,
        }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    } catch (error) {
      console.warn('Failed to verify profile session:', error)
      setUser(null)
      setToken(null)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      refreshProfile()
    } else {
      setUser(null)
      setIsLoading(false)
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

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
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (isAuthenticated) {
    // If user is authenticated, send them to the app home
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <>{children}</>
}

// Guard that ensures only authenticated users can access children
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (!isAuthenticated) {
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
