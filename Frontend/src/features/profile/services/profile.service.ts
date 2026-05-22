import type { ProfileData } from '../types/profile.types'
import { MOCK_PROFILE_DATA } from '../data/profile-mock-data'

const SIMULATED_DELAY_MS = 1200

/**
 * Simulates an async API call to fetch the current user's profile data.
 * Replace this with a real fetch/axios call when the backend is ready.
 */
export async function fetchProfileData(): Promise<ProfileData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROFILE_DATA)
    }, SIMULATED_DELAY_MS)
  })
}
