import { MOCK_FINANCE_DATA, type FinanceData } from '../../../services/mock-data'

export type {
  CashFlowItem,
  DepositItem,
  FinanceData,
  KpiData,
  PackageTier,
} from '../../../services/mock-data'

const SIMULATED_DELAY_MS = 800

// TODO: replace mock service with real API query when backend endpoint is available.
export async function fetchFinanceData(): Promise<FinanceData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_FINANCE_DATA)
    }, SIMULATED_DELAY_MS)
  })
}
