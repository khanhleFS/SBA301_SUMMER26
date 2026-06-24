import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/lib/api'
import type { User } from '@/types'

// ─── Types ───────────────────────────────────────────────────────────────────


interface AuthState {
  /** Authenticated user, or null when logged out */
  user: User | null
  /** JWT token, or null when logged out */
  token: string | null
  /** True while verifying token / fetching profile on startup */
  isLoading: boolean

  // ── Derived ──────────────────────────────────────────────────────────────
  /** Convenience getter: true when a user is present */
  isAuthenticated: boolean

  // ── Actions ──────────────────────────────────────────────────────────────
  /** Persist user + token after successful login */
  login: (user: User, token: string) => void
  /** Clear state and call the backend logout endpoint */
  logout: () => Promise<void>
  /** Re-fetch profile from the backend and update the stored user */
  refreshProfile: () => Promise<void>
  /** Internal: update loading flag */
  _setLoading: (v: boolean) => void
  /** Internal: update user without touching the token */
  _setUser: (user: User | null) => void
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ── Initial state ──────────────────────────────────────────────────
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

      // ── Actions ────────────────────────────────────────────────────────
      login(user, token) {
        set({ user, token, isAuthenticated: true, isLoading: false })
      },

      async logout() {
        try {
          await api.post('/auth/logout')
        } catch {
          try {
            await api.post('/logout')
          } catch (err) {
            console.warn('Backend logout call failed:', err)
          }
        } finally {
          set({ user: null, token: null, isAuthenticated: false, isLoading: false })
        }
      },

      async refreshProfile() {
        const { token, _setUser, _setLoading } = get()
        if (!token) {
          _setLoading(false)
          return
        }
        try {
          const response = await api.get('/auth/profile')
          if (response.data?.code === 200) {
            const profile = response.data.result
            const currentUser = get().user
            const updatedUser: User = {
              id: profile.id ?? currentUser?.id ?? 0,
              username: profile.username ?? currentUser?.username ?? '',
              email: profile.email ?? currentUser?.email ?? '',
              role: profile.role ?? currentUser?.role ?? 'USER',
              fullName: profile.fullName ?? currentUser?.fullName ?? '',
              avatarUrl: profile.avatarUrl ?? undefined,
            }
            _setUser(updatedUser)
          }
        } catch (error) {
          console.warn('Failed to verify profile session:', error)
          set({ user: null, token: null, isAuthenticated: false })
        } finally {
          _setLoading(false)
        }
      },

      // ── Internal helpers ───────────────────────────────────────────────
      _setLoading: (v) => set({ isLoading: v }),
      _setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),

    {
      name: 'auth', // localStorage key
      // Only persist user + token; isLoading always resets to true on startup
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)
