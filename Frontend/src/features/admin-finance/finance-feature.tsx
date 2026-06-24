import { useFinance } from './context/finance.context'
import { FinanceSkeleton } from './components/finance-skeleton'
import {
  FinanceChartsAndDepositsSection,
  FinanceKpiSection,
  FinancePackagesSection,
} from './components/finance-sections'

function FinanceContent() {
  const { data, isLoading } = useFinance()

  if (isLoading || !data) {
    return <FinanceSkeleton />
  }

  const { kpiData, cashFlow, recentDeposits, packageTiers } = data

  return (
    <div className="space-y-6">
      <FinanceKpiSection kpiData={kpiData} />
      <FinanceChartsAndDepositsSection cashFlow={cashFlow} recentDeposits={recentDeposits} />
      <FinancePackagesSection packageTiers={packageTiers} />
    </div>
  )
}

export default function FinanceFeature() {
  return <FinanceContent />
}

