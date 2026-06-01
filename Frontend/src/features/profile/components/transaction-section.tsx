import { useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle, ReceiptText } from 'lucide-react'
import { SectionTitle } from './section-title'
import { surfaceCardClass } from './profile-styles'
import { useProfile } from '../context/profile.context'
import type { Transaction } from '../types/profile.types'
import { TransactionDetailModal } from './transaction-detail-modal'

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

      {selectedTransaction && <TransactionDetailModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
    </section>
  )
}
