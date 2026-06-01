import { LeaderboardProvider, useLeaderboard } from './context/leaderboard.context'
import { LeaderboardSkeleton } from './components/leaderboard-skeleton'
import { LeaderboardContentSection } from './components/leaderboard-sections'

function LeaderboardContent() {
  const { data, isLoading } = useLeaderboard()

  if (isLoading || !data) {
    return <LeaderboardSkeleton />
  }

  return (
    <LeaderboardContentSection data={data} />
  )
}

export default function LeaderboardFeature() {
  return (
    <LeaderboardProvider>
      <LeaderboardContent />
    </LeaderboardProvider>
  )
}
