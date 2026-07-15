import { useState } from 'react'
import { ArrowDownCircle, ReceiptText, Loader2, PackageOpen, ExternalLink, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionTitle } from './section-title'
import { surfaceCardClass } from './profile-styles'
import { useQuery } from '@tanstack/react-query'
import { getMyOrders, createMomoPayment } from '@/services/payment-service'
import type { OrderResponseDTO } from '@/types'

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ thanh toán', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  COMPLETED: { label: 'Thành công', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  FAILED: { label: 'Thất bại', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  CANCELLED: { label: 'Đã hủy', color: 'bg-gray-500/10 text-gray-500' },
}

export function TransactionSection() {
  const [selectedOrder, setSelectedOrder] = useState<OrderResponseDTO | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [payError, setPayError] = useState<string | null>(null)

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['my-orders'],
    queryFn: getMyOrders,
  })

  const handleCloseModal = () => {
    setSelectedOrder(null)
    setIsPaying(false)
    setPayError(null)
  }

  return (
    <section>
      <div className={`overflow-hidden rounded-lg ${surfaceCardClass}`}>
        <div className="border-b border-outline/5 px-5 py-4">
          <SectionTitle icon={ReceiptText}>Lịch sử giao dịch</SectionTitle>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-on-surface-variant">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tải giao dịch...
          </div>
        )}

        {error && (
          <div className="px-5 py-8 text-center text-xs text-red-500">
            Không thể tải lịch sử giao dịch.
          </div>
        )}

        {!isLoading && !error && (!orders || orders.length === 0) && (
          <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
            <PackageOpen className="h-9 w-9 text-on-surface-variant/40" />
            <p className="text-sm font-semibold text-on-surface-variant">Chưa có giao dịch nào</p>
            <Link
              to="/payment/create"
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              Nạp Coins ngay <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        )}

        {(orders ?? []).map((order) => {
          const statusMeta = STATUS_LABEL[order.status] ?? { label: order.status, color: 'bg-gray-500/10 text-gray-500' }
          const dateStr = new Date(order.createdAt).toLocaleDateString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })

          const isCompleted = order.status === 'COMPLETED'
          const isFailed = order.status === 'FAILED' || order.status === 'CANCELLED'

          return (
            <button
              key={order.id}
              onClick={() => {
                setSelectedOrder(order)
                setIsPaying(false)
                setPayError(null)
              }}
              className="group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-container"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isCompleted
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : isFailed
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isFailed ? (
                  <XCircle className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-on-surface">{order.coinPackageName}</p>
                <p className="mt-0.5 text-[11px] text-on-surface-variant/70">{dateStr}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-extrabold text-primary">+{order.coins.toLocaleString()}</p>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">{order.amountVnd.toLocaleString()} đ</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <button className="absolute inset-0 cursor-default" onClick={handleCloseModal} />
          <div className={`relative w-full max-w-sm rounded-xl p-5 shadow-2xl ${surfaceCardClass}`}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary/80">Chi tiết đơn hàng</p>
                <h3 className="mt-1 text-lg font-bold text-on-surface">{selectedOrder.coinPackageName}</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-container text-on-surface transition-colors hover:bg-surface-container-high"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 rounded-lg bg-surface-container p-4 text-center">
              <p className="text-3xl font-extrabold text-primary">+{selectedOrder.coins.toLocaleString()} Coins</p>
              <p className="mt-0.5 text-sm text-on-surface-variant">{selectedOrder.amountVnd.toLocaleString()} VND</p>
            </div>

            <div className="space-y-2.5 text-sm">
              {([
                ['Mã đơn hàng', selectedOrder.id],
                ['Trạng thái', STATUS_LABEL[selectedOrder.status]?.label ?? selectedOrder.status],
                ['Thời gian', new Date(selectedOrder.createdAt).toLocaleString('vi-VN')],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-outline/5 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-on-surface-variant">{label}</span>
                  <span className="max-w-[55%] break-all text-right font-semibold text-on-surface text-xs">{value}</span>
                </div>
              ))}
            </div>

            {selectedOrder.status === 'PENDING' && (
              <div className="mt-5 pt-4 border-t border-outline/5">
                {payError && (
                  <p className="mb-3 text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 text-center">
                    {payError}
                  </p>
                )}
                <button
                  onClick={async () => {
                    setPayError(null)
                    setIsPaying(true)
                    try {
                      const res = await createMomoPayment({
                        orderId: selectedOrder.id,
                        amount: selectedOrder.amountVnd,
                        orderInfo: `Nap ${selectedOrder.coins} Coins cho tai khoan ${selectedOrder.username}`,
                        requestType: 'captureWallet',
                      })
                      if (res.payUrl) {
                        window.location.replace(res.payUrl)
                      } else {
                        throw new Error('Không nhận được link thanh toán từ MoMo')
                      }
                    } catch (err) {
                      setPayError(err instanceof Error ? err.message : 'Thanh toán thất bại')
                      setIsPaying(false)
                    }
                  }}
                  disabled={isPaying}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg font-bold shadow-md disabled:opacity-50"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Đang tạo giao dịch...
                    </>
                  ) : (
                    'Tiếp tục thanh toán'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
