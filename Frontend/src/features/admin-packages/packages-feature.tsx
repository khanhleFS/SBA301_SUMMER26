import { useState } from 'react'
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAllCoinPackagesAdmin,
  createCoinPackage,
  updateCoinPackage,
  deleteCoinPackage,
  toggleCoinPackageStatus
} from '@/services/coin-package-service'
import type { CoinCreateResponseDTO } from '@/types'

export default function PackagesFeature() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState<CoinCreateResponseDTO | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [priceVnd, setPriceVnd] = useState(20000)
  const [baseCoins, setBaseCoins] = useState(200)
  const [firstTimeBonus, setFirstTimeBonus] = useState(0)
  const [isActive, setIsActive] = useState(true)

  // Queries
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['admin-packages'],
    queryFn: getAllCoinPackagesAdmin,
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: createCoinPackage,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-packages'] })
      setShowModal(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, request }: { id: string; request: any }) => updateCoinPackage(id, request),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-packages'] })
      setShowModal(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCoinPackage,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-packages'] })
    },
  })

  const toggleMutation = useMutation({
    mutationFn: toggleCoinPackageStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-packages'] })
    },
  })

  const openAddModal = () => {
    setEditingPackage(null)
    setName('')
    setPriceVnd(20000)
    setBaseCoins(200)
    setFirstTimeBonus(0)
    setIsActive(true)
    setShowModal(true)
  }

  const openEditModal = (pkg: CoinCreateResponseDTO) => {
    setEditingPackage(pkg)
    setName(pkg.name)
    setPriceVnd(pkg.priceVnd)
    setBaseCoins(pkg.baseCoins)
    setFirstTimeBonus(pkg.firstTimeBonus)
    setIsActive(pkg.isActive)
    setShowModal(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const payload = {
      name,
      priceVnd: Number(priceVnd),
      baseCoins: Number(baseCoins),
      firstTimeBonus: Number(firstTimeBonus),
      isActive,
    }

    if (editingPackage) {
      updateMutation.mutate({ id: editingPackage.id, request: payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa gói nạp này không?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleToggle = (id: string) => {
    toggleMutation.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

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
              className={`relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                pkg.isActive ? 'border-outline-variant bg-surface-container-lowest' : 'border-outline/20 bg-surface-container-low opacity-75'
              }`}
            >
              {/* Actions ở góc trên cùng bên phải */}
              <div className="flex justify-between items-center mb-1">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  pkg.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {pkg.isActive ? 'Hoạt động' : 'Đang ẩn'}
                </span>
                <div className="flex gap-0.5">
                  <button
                    onClick={() => handleToggle(pkg.id)}
                    className="rounded-md p-1 text-muted-foreground hover:bg-surface-container hover:text-foreground transition-colors"
                    title={pkg.isActive ? 'Ẩn gói' : 'Hiện gói'}
                  >
                    {pkg.isActive ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                  </button>
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
              </div>

              <div className="text-center mt-2">
                <h3 className="truncate text-base font-bold text-foreground">{pkg.name}</h3>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-4xl font-black tracking-tight text-primary">{Math.round(pkg.priceVnd / 1000)}K</span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-muted-foreground">
                  {pkg.priceVnd.toLocaleString('vi-VN')} VNĐ
                </p>
              </div>

              <div className="mt-5 rounded-lg bg-surface-container p-3 text-center transition-colors hover:bg-surface-container-high">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quy đổi</p>
                <p className="mt-0.5 text-lg font-bold text-emerald-600">
                  {pkg.baseCoins} <span className="text-xs font-medium">Coin</span>
                </p>
                {pkg.firstTimeBonus > 0 ? (
                  <p className="mt-0.5 text-[11px] font-bold text-amber-600">+ Tặng {pkg.firstTimeBonus} Coin</p>
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
                    Giá tiền (VNĐ)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    required
                    value={priceVnd}
                    onChange={e => setPriceVnd(Number(e.target.value))}
                    className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">Tương đương {Math.round(priceVnd / 1000)}K</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Số xu gốc
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={baseCoins}
                    onChange={e => setBaseCoins(Number(e.target.value))}
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
                  value={firstTimeBonus}
                  onChange={e => setFirstTimeBonus(Number(e.target.value))}
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <label htmlFor="isActive" className="text-xs font-bold uppercase text-muted-foreground">
                  Cho phép hoạt động
                </label>
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
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}