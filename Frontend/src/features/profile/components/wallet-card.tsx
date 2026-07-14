import { Wallet, Plus, Coins } from 'lucide-react'
import { Link } from 'react-router-dom'
import { surfaceCardClass } from './profile-styles'
import { SectionTitle } from './section-title'
import { useProfile } from '../context/profile.context'

interface WalletCardProps {
  showActions?: boolean
}

export function WalletCard({ showActions = true }: WalletCardProps) {
  const { data } = useProfile()
  const wallet = data?.wallet

  const balance = wallet ? wallet.balance.toLocaleString('vi-VN') : '—'
  const currency = wallet?.currency ?? 'Lumi Coins'

  return (
    <section>
      <div className={`overflow-hidden rounded-lg ${surfaceCardClass}`}>
        <div className="border-b border-outline/5 px-5 py-4">
          <SectionTitle icon={Wallet}>Ví của tôi</SectionTitle>
        </div>
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          {/* Số dư */}
          <div className="flex items-center gap-3 rounded-xl bg-surface-container p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider">
                Số dư ví Lumi
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold tracking-tight text-on-surface">
                  {balance}
                </span>
                <span className="text-sm font-bold text-primary">{currency}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/payment/create"
                className="btn-primary flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all active:scale-95"
              >
                <Plus className="h-4 w-4" /> Nạp thêm Coins
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

