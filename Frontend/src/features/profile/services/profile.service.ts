import type { ProfileData } from '../types/profile.types'
import { MOCK_PROFILE_DATA } from '@/services/mock-data'

const SIMULATED_DELAY_MS = 1200

/**
 * Simulates an async API call to fetch the current user's profile data.
 * Replace this with a real fetch/axios call when the backend is ready.
 */
// TODO: replace mock service with real API query when backend endpoint is available.
export async function fetchProfileData(): Promise<ProfileData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROFILE_DATA)
    }, SIMULATED_DELAY_MS)
  })
}
