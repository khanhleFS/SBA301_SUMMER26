import { useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle, ReceiptText, X } from 'lucide-react'
import { SectionTitle } from './section-title'
import { surfaceCardClass } from './profile-styles'
import { useProfile } from '../context/profile.context'
import type { Transaction } from '../types/profile.types'

export function TransactionSection() {
  const { data } = useProfile()
  const transactions = data?.transactions ?? []
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  return (
    <section>
      <div className={`overflow-hidden rounded-lg ${surfaceCardClass}`}>
        <div className="border-b border-outline/5 px-5 py-4">
          <SectionTitle icon={ReceiptText}>Giao dịch</SectionTitle>
        </div>
        {transactions.map((transaction, index) => {
          const isTopup = transaction.type === 'topup'
          const Icon = isTopup ? ArrowDownCircle : ArrowUpCircle

          return (
            <button
              key={transaction.id}
              onClick={() => setSelectedTransaction(transaction)}
              className={`group flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-container ${
                index !== transactions.length - 1 ? 'border-b border-outline/5' : ''
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isTopup
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary-container text-on-secondary-container'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-bold text-on-surface">{transaction.title}</p>
                  <span
                    className={`shrink-0 text-sm font-bold ${
                      isTopup ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    {transaction.amount}
                  </span>
                </div>
                <p className="truncate text-xs font-medium text-on-surface-variant/70">
                  {transaction.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </section>
  )
}

function TransactionDetailModal({
  transaction,
  onClose
}: {
  transaction: Transaction
  onClose: () => void
}) {
  const isTopup = transaction.type === 'topup'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <button
        className="absolute inset-0 cursor-default"
        aria-label="Close transaction detail"
        onClick={onClose}
      />
      <div className={`relative w-full max-w-sm rounded-lg p-5 ${surfaceCardClass}`}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary/80">
              Chi tiết giao dịch
            </p>
            <h3 className="mt-1 text-xl font-bold text-on-surface">{transaction.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-container text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 rounded-md bg-surface-container p-4 text-center">
          <p className={`text-3xl font-bold ${isTopup ? 'text-primary' : 'text-on-surface'}`}>
            {transaction.amount}
          </p>
          <p className="mt-1 text-xs font-semibold text-on-surface-variant">
            {transaction.status}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <DetailRow label="Mã giao dịch" value={transaction.id} />
          <DetailRow label="Mô tả" value={transaction.description} />
          <DetailRow label="Thời gian" value={transaction.date} />
          <DetailRow label="Phương thức" value={transaction.method} />
          <DetailRow label="Tham chiếu" value={transaction.reference} />
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-outline/5 pb-3 last:border-b-0 last:pb-0">
      <span className="text-on-surface-variant">{label}</span>
      <span className="max-w-[60%] text-right font-semibold text-on-surface">{value}</span>
    </div>
  )
}
