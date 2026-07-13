import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Coins, CheckCircle2, Landmark, Plus, Minus, X } from 'lucide-react'
import Container from '@/components/shared/site/container'

const PACKAGES = [
  { id: 'pkg-1', coins: 200, price: 20000 },
  { id: 'pkg-2', coins: 550, price: 50000 },
  { id: 'pkg-3', coins: 1150, price: 100000 },
  { id: 'pkg-4', coins: 2400, price: 200000 },
  { id: 'pkg-5', coins: 6250, price: 500000 },
  { id: 'pkg-6', coins: 13000, price: 1000000 },
]

export default function PaymentCreateFeature() {
  const navigate = useNavigate()

  // Giả lập số dư hiện tại của người dùng trong ví
  const currentBalance = 1250

  // States
  const [selectedPkgId, setSelectedPkgId] = useState(PACKAGES[0].id)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedPkg = PACKAGES.find(p => p.id === selectedPkgId)
  const totalPrice = selectedPkg.price * quantity
  const totalCoins = selectedPkg.coins * quantity

  // Tổng số xu sau khi nạp (số nạp + số hiện tại)
  const finalBalance = currentBalance + totalCoins

  // Format tiền tệ
  const formatVND = (amount) => amount.toLocaleString('vi-VN') + ' VND'

  const handlePackageChange = (id) => {
    setSelectedPkgId(id)
    setQuantity(1)
  }

  return (
    <>
      <Container className="pb-16 pt-10 text-foreground max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* CỘT TRÁI (8/12) - Các gói nạp */}
          <div className="lg:col-span-8 space-y-8">
            <section>
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold text-on-surface">Chọn mệnh giá</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PACKAGES.map((pkg) => {
                  // Biến phụ trợ để đồng bộ hiển thị với state
                  const isSelected = selectedPkgId === pkg.id
                  const displayQty = isSelected ? quantity : 1
                  const displayPrice = pkg.price * displayQty

                  return (
                    <label key={pkg.id} className="group relative cursor-pointer h-full flex flex-col">
                      <input
                        checked={isSelected}
                        onChange={() => handlePackageChange(pkg.id)}
                        className="peer sr-only"
                        name="recharge"
                        type="radio"
                      />
                      <div className="relative flex flex-1 flex-col items-center justify-between rounded-2xl border border-outline/20 bg-surface-container-low p-4 sm:p-5 transition-all hover:bg-surface-container hover:shadow-md peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:shadow-sm peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2 peer-checked:ring-offset-background">

                        {/* Dấu check - Định vị tuyệt đối ở góc phải trên */}
                        <div className="absolute right-3 top-3">
                          <CheckCircle2 className="h-5 w-5 text-primary opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100" />
                        </div>

                        {/* PHẦN TRÊN: Icon -> Coin -> Giá */}
                        <div className="flex flex-col items-center pt-2 pb-4">
                          {/* 2 & 3. Coin và Tiền mặt (Gần nhau để dễ đọc) */}
                          <div className="flex flex-col items-center gap-1">
                            <p className="text-2xl font-extrabold text-on-surface tracking-tight">
                              {pkg.coins.toLocaleString()} <span className="text-sm font-semibold text-on-surface-variant">Coins</span>
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {formatVND(displayPrice)}
                            </p>
                          </div>
                        </div>

                        {/* PHẦN DƯỚI: Nút số lượng */}
                        <div className="mt-auto w-full pt-4 border-t border-outline/10 flex justify-center">
                          <div className={`flex items-center gap-4 rounded-full border bg-surface p-1 transition-colors ${isSelected ? 'border-primary/40 shadow-sm' : 'border-outline/20'}`}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                if (!isSelected) {
                                  handlePackageChange(pkg.id)
                                } else {
                                  setQuantity(Math.max(1, quantity - 1))
                                }
                              }}
                              disabled={isSelected && quantity <= 1}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high disabled:opacity-50 transition-colors text-on-surface"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="w-8 text-center font-bold text-on-surface">{displayQty}</span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                if (!isSelected) {
                                  setSelectedPkgId(pkg.id)
                                  setQuantity(2)
                                } else {
                                  setQuantity(quantity + 1)
                                }
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </label>
                  )
                })}
              </div>
            </section>
          </div>

          {/* CỘT PHẢI (4/12) - Sidebar */}
          <div className="lg:col-span-4 sticky top-24 self-start h-fit space-y-6">

            <section className="rounded-2xl border border-outline/10 bg-surface-container-low shadow-sm overflow-hidden">

              {/* Phần 1: Ví tạm tính */}
              <div className="p-4 sm:p-5 border-b border-outline/10 bg-surface-container/30">
                <div className="rounded-xl bg-surface border border-outline/10 p-5 shadow-sm">

                  {/* LINE 1: TRÁI (Ví tạm tính) - PHẢI (a + b) */}
                  <div className="mb-2 flex items-center justify-between text-sm font-bold text-on-surface-variant">
                    <span className="uppercase tracking-wider text-xs">Ví tạm tính</span>
                    <div className="flex items-center gap-1.5">
                      <span>{currentBalance.toLocaleString()}</span>
                      <span>+</span>
                      <span className="text-primary">{totalCoins.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* C (TỔNG SAU NẠP LỚN KÈM ICON) - Căn phải */}
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {finalBalance.toLocaleString()}
                    </span>
                    <Coins className="h-7 w-7" strokeWidth={2.5} />
                  </div>

                </div>
              </div>

              {/* Phần 2: Chi tiết thanh toán */}
              <div className="p-5 sm:p-6">
                <h2 className="font-serif text-xl font-bold text-on-surface mb-4">Chi tiết giao dịch</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Gói nạp:</span>
                    <span className="font-bold text-on-surface text-base">{selectedPkg.coins.toLocaleString()} Coins</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Đơn giá:</span>
                    <span className="font-semibold text-on-surface">{formatVND(selectedPkg.price)}</span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-on-surface-variant">Số lượng:</span>
                    <div className="flex items-center gap-3 rounded-lg border border-outline/20 bg-surface p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-container hover:bg-surface-container-high disabled:opacity-50 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center font-semibold text-on-surface">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-container hover:bg-surface-container-high transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* GỘP TỔNG VÀO NÚT THANH TOÁN */}
                <div className="mt-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex w-full items-center justify-between px-5 py-4 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <span className="font-semibold text-base flex items-center gap-2">
                      Thanh toán
                    </span>
                    <span className="font-extrabold">{formatVND(totalPrice)}</span>
                  </button>
                  <p className="mt-4 text-center text-xs font-medium text-on-surface-variant">
                    Bằng việc bấm Thanh toán, bạn đồng ý với <a className="text-primary hover:underline font-semibold" href="#">Điều khoản dịch vụ</a> của chúng tôi.
                  </p>
                </div>
              </div>
            </section>

          </div>

        </div>
      </Container>

      {/* MODAL CHỌN PHƯƠNG THỨC THANH TOÁN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl border border-outline/10 relative">

            {/* Nút đóng */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-on-surface mb-2">Xác nhận thanh toán</h2>
            <p className="text-sm text-on-surface-variant mb-6">
              Bạn đang thanh toán <span className="font-bold text-primary">{formatVND(totalPrice)}</span> cho <span className="font-bold text-tertiary">{totalCoins.toLocaleString()} Coins</span>.
            </p>

            {/* KHỐI THÔNG TIN VNPAY - BỎ HOÀN TOÀN RADIO SELECT */}
            <div className="mb-8 flex items-center gap-4 rounded-md border border-outline/20 bg-white p-4">
              <div className="flex h-10 w-14 items-center justify-center bg-white rounded-md p-1">
                <img
                  src="https://cdn.brandfetch.io/idV02t6WJs/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1781707965196"
                  alt="VNPay Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-on-surface">Cổng thanh toán VNPay</span>
                <span className="text-xs font-medium text-on-surface-variant">Hỗ trợ QR, Thẻ ATM, Visa/Master</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/payment/loading')}
              className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-lg rounded-xl shadow-md"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      )}
    </>
  )
}