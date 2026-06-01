import { MOCK_LEADERBOARD_DATA, type LeaderboardData } from '../../../services/mock-data'

export type {
  AuthorItem,
  LeaderboardData,
  StoryItem,
} from '../../../services/mock-data'

const SIMULATED_DELAY_MS = 800

// TODO: replace mock service with real API query when backend endpoint is available.
export async function fetchLeaderboardData(): Promise<LeaderboardData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LEADERBOARD_DATA)
    }, SIMULATED_DELAY_MS)
  })
}
