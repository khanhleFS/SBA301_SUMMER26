import Container from '@/components/shared/site/container'
import {
  ProfileProvider,
  useProfile
} from '@/features/profile/context/profile.context'
import { ProfileHeader } from '@/features/profile/components/profile-header'
import { WalletCard } from '@/features/profile/components/wallet-card'
import { TransactionSection } from '@/features/profile/components/transaction-section'
import { PersonalInfoSection } from '@/features/profile/components/personal-info-section'
import { CollectionSection } from '@/features/profile/components/collection-section'
import { ProfilePageSkeleton } from '@/features/profile/components/profile-skeleton'

function ProfileContent() {
  const { isLoading } = useProfile()

  if (isLoading) return <ProfilePageSkeleton />

  return (
    <Container className="pb-12 pt-10 text-foreground">
      <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-none">
        <ProfileHeader />

        <div className="grid gap-8 lg:grid-cols-[minmax(340px,420px)_1fr] lg:items-start">
          <div className="space-y-8">
            <WalletCard />
            <TransactionSection />
          </div>

          <div className="space-y-8">
            <PersonalInfoSection />
            <CollectionSection />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  )
}
