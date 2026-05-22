import { Wallet } from 'lucide-react'
import { surfaceCardClass } from './profile-styles'
import { SectionTitle } from './section-title'
import { useProfile } from '../context/profile.context'

interface WalletCardProps {
  showActions?: boolean
}

export function WalletCard({ showActions = true }: WalletCardProps) {
  const { data } = useProfile()
  const wallet = data?.wallet

  const balance = wallet ? wallet.balance.toFixed(2) : '—'
  const currency = wallet?.currency ?? ''

  return (
    <section>
      <div className={`overflow-hidden rounded-lg ${surfaceCardClass}`}>
        <div className="border-b border-outline/5 px-5 py-4">
          <SectionTitle icon={Wallet}>Ví của tôi</SectionTitle>
        </div>
        <div className="flex flex-col gap-6 p-5 sm:p-6">
          <div className="min-w-0">
            <span className="mb-1 block text-sm font-semibold text-on-surface-variant/70">
              Số dư ví Lumi
            </span>
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-on-surface">
                {balance}
              </span>
              <span className="text-sm font-bold text-primary">{currency}</span>
            </div>
          </div>

          {showActions && (
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-primary flex items-center justify-center text-xs">
                Nạp thêm
              </button>
              <button className="btn-secondary flex items-center justify-center text-xs">
                Sử dụng
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
