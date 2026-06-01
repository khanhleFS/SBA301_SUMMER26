import { MOCK_DASHBOARD_DATA, type DashboardData } from '../../../services/mock-data'

export type {
  DashboardData,
  PackageTier,
} from '../../../services/mock-data'

const SIMULATED_DELAY_MS = 800

// TODO: replace mock service with real API query when backend endpoint is available.
export async function fetchDashboardData(): Promise<DashboardData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DASHBOARD_DATA)
    }, SIMULATED_DELAY_MS)
  })
}
