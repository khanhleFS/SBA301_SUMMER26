import { DashboardProvider, useDashboard } from './context/dashboard.context'
import { DashboardSkeleton } from './components/dashboard-skeleton'
import {
  DashboardChartSection,
  DashboardPackagesSection,
  DashboardTransactionsSection,
  DashboardUserPulseSection,
} from './components/dashboard-sections'

function DashboardContent() {
  const { data, isLoading } = useDashboard()

  if (isLoading || !data) {
    return <DashboardSkeleton />
  }

  const { chartData, platformNet, userPulse, recentTransactions, packageTiers } = data

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <DashboardChartSection chartData={chartData} platformNet={platformNet} />
      <section className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
        <DashboardUserPulseSection
          readersOnline={userPulse.readersOnline}
          newSignupsToday={userPulse.newSignupsToday}
          totalNovels={userPulse.totalNovels}
          totalCategories={userPulse.totalCategories}
        />
        <DashboardTransactionsSection recentTransactions={recentTransactions} />
      </section>
      <DashboardPackagesSection packageTiers={packageTiers} />
    </div>
  )
}

export default function DashboardFeature() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
