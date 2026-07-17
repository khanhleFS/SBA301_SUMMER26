import { useState } from 'react'
import { Plus, Edit2, Trash2, Sparkles, Coins, ShoppingBag } from 'lucide-react'
import { MOCK_FINANCE_DATA, type PackageTier } from '../../services/mock-data'

export default function PackagesFeature() {
  const [packages, setPackages] = useState<PackageTier[]>(MOCK_FINANCE_DATA.packageTiers)
  const [showModal, setShowModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState<PackageTier | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [coin, setCoin] = useState(0)
  const [bonus, setBonus] = useState(0)

  const openAddModal = () => {
    setEditingPackage(null)
    setName('')
    setPrice(20)
    setCoin(200)
    setBonus(0)
    setShowModal(true)
  }

  const openEditModal = (pkg: PackageTier) => {
    setEditingPackage(pkg)
    setName(pkg.name)
    setPrice(pkg.price)
    setCoin(pkg.coin)
    setBonus(pkg.bonus)
    setShowModal(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    if (editingPackage) {
      // Edit
      setPackages(prev =>
        prev.map(p =>
          p.id === editingPackage.id
            ? { ...p, name, price: Number(price), coin: Number(coin), bonus: Number(bonus) }
            : p
        )
      )
    } else {
      // Add
      const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1
      const newPkg: PackageTier = {
        id: newId,
        name,
        price: Number(price),
        coin: Number(coin),
        bonus: Number(bonus),
        isPopular: false // Đặt mặc định false để tránh lỗi type nếu PackageTier yêu cầu
      }
      setPackages(prev => [...prev, newPkg])
    }
    setShowModal(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa gói nạp này không?')) {
      setPackages(prev => prev.filter(p => p.id !== id))
    }
  }

  // Stats
  const totalPackages = packages.length
  const maxBonus = packages.reduce((max, p) => (p.bonus > max ? p.bonus : max), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Quản lý gói nạp (Coin Packages)</h1>
          <p className="text-sm text-muted-foreground">
            Cấu hình, điều chỉnh danh sách các gói nạp xu (Lumi Coins) và các ưu đãi đi kèm cho người dùng.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-95 sm:self-start"
        >
          <Plus className="h-4 w-4" />
          Thêm gói mới
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {packages.map((pkg) => {
          return (
            <div
              key={pkg.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              {/* Actions ở góc trên cùng bên phải */}
              <div className="flex justify-end gap-1 mb-1">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-surface-container hover:text-foreground transition-colors"
                  aria-label="Sửa gói"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400 transition-colors"
                  aria-label="Xóa gói"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-center">
                <h3 className="truncate text-base font-bold text-foreground">{pkg.name}</h3>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-4xl font-black tracking-tight text-primary">{pkg.price}K</span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-muted-foreground">
                  {(pkg.price * 1000).toLocaleString('vi-VN')} VNĐ
                </p>
              </div>

              <div className="mt-5 rounded-lg bg-surface-container p-3 text-center transition-colors hover:bg-surface-container-high">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quy đổi</p>
                <p className="mt-0.5 text-lg font-bold text-emerald-600">
                  {pkg.coin} <span className="text-xs font-medium">Coin</span>
                </p>
                {pkg.bonus > 0 ? (
                  <p className="mt-0.5 text-[11px] font-bold text-amber-600">+ Tặng {pkg.bonus} Coin</p>
                ) : (
                  <p className="mt-0.5 select-none text-[11px] text-transparent">No bonus</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-2xl animate-scale-up">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {editingPackage ? 'Cập nhật gói nạp xu' : 'Thêm gói nạp xu mới'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Tên gói
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Ví dụ: Gói Tân Thủ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Giá tiền (K)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">{(price * 1000).toLocaleString('vi-VN')} VNĐ</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Số xu gốc
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={coin}
                    onChange={e => setCoin(Number(e.target.value))}
                    className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Xu khuyến mãi (Bonus)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={bonus}
                  onChange={e => setBonus(Number(e.target.value))}
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant/60">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-outline-variant px-4 py-2 text-xs font-bold text-foreground hover:bg-surface-container transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-on-primary hover:opacity-90 transition-opacity"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}