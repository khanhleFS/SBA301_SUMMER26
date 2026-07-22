import React, { useState, useEffect } from 'react'
import { 
  Tags, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Loader2, 
  RefreshCw,
  FolderTree,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react'
import { 
  getAllCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '@/services/category-service'
import type { CategoryResponseDTO } from '@/types'

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<CategoryResponseDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingCategory, setEditingCategory] = useState<CategoryResponseDTO | null>(null)
  const [categoryName, setCategoryName] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Delete Confirm Modal State
  const [deletingCategory, setDeletingCategory] = useState<CategoryResponseDTO | null>(null)
  const [deleting, setDeleting] = useState<boolean>(false)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setErrorMsg(null)
      const data = await getAllCategories()
      setCategories(data || [])
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải danh sách thể loại.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Clear auto-hide alerts
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [successMsg])

  // Filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenAddModal = () => {
    setEditingCategory(null)
    setCategoryName('')
    setFormError(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (cat: CategoryResponseDTO) => {
    setEditingCategory(cat)
    setCategoryName(cat.name)
    setFormError(null)
    setIsModalOpen(true)
  }

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryName.trim()) {
      setFormError('Tên thể loại không được để trống.')
      return
    }

    try {
      setSubmitting(true)
      setFormError(null)

      if (editingCategory) {
        // Update
        const updated = await updateCategory(editingCategory.id, { name: categoryName.trim() })
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
        setSuccessMsg(`Cập nhật thể loại "${updated.name}" thành công!`)
      } else {
        // Create
        const created = await createCategory({ name: categoryName.trim() })
        setCategories((prev) => [created, ...prev])
        setSuccessMsg(`Thêm thể loại "${created.name}" thành công!`)
      }

      setIsModalOpen(false)
    } catch (err: any) {
      setFormError(err.message || 'Thao tác thất bại. Vui lòng kiểm tra lại.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return

    try {
      setDeleting(true)
      await deleteCategory(deletingCategory.id)
      setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id))
      setSuccessMsg(`Đã xóa thể loại "${deletingCategory.name}".`)
      setDeletingCategory(null)
    } catch (err: any) {
      setErrorMsg(err.message || 'Xóa thể loại thất bại.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary text-on-primary shadow-md">
            <FolderTree className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Quản lý Thể loại
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Quản lý danh sách thể loại / phân loại cho truyện trên hệ thống
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCategories}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50"
            title="Làm mới dữ liệu"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </button>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Thêm thể loại
          </button>
        </div>
      </div>

      {/* Alerts Notification */}
      {successMsg && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium text-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive font-medium text-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Search & Statistics Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium self-end sm:self-center">
          <Tags className="h-4 w-4 text-primary" />
          Tổng số: <span className="font-bold text-foreground">{categories.length}</span> thể loại
        </div>
      </div>

      {/* Categories Table Card */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Đang tải danh sách thể loại...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground space-y-3">
            <Tags className="h-12 w-12 stroke-[1.5] text-muted-foreground/50" />
            <p className="text-base font-semibold text-foreground">Không tìm thấy thể loại nào</p>
            <p className="text-sm text-center max-w-sm">
              {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Bấm nút "Thêm thể loại" ở trên để bắt đầu.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                  <th className="py-3.5 px-5">STT</th>
                  <th className="py-3.5 px-5">Tên Thể Loại</th>
                  <th className="py-3.5 px-5">Slug</th>
                  <th className="py-3.5 px-5">ID (UUID)</th>
                  <th className="py-3.5 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCategories.map((cat, idx) => (
                  <tr 
                    key={cat.id} 
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 px-5 text-muted-foreground font-mono text-xs">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-5 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                        {cat.name}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-muted-foreground font-mono text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-muted-foreground font-mono text-xs truncate max-w-[200px]" title={cat.id}>
                      {cat.id}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(cat)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Sửa thể loại"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeletingCategory(cat)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Xóa thể loại"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-lg text-foreground">
                {editingCategory ? 'Chỉnh sửa thể loại' : 'Thêm thể loại mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Tên thể loại <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên thể loại (VD: Tiên Hiệp, Huyền Huyễn...)"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-xl border border-input bg-background font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingCategory ? 'Lưu thay đổi' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 p-6 space-y-4">
            <div className="flex items-center gap-3 text-destructive">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-foreground">Xác nhận xóa thể loại</h3>
            </div>

            <p className="text-sm text-muted-foreground">
              Bạn có chắc chắn muốn xóa thể loại <span className="font-bold text-foreground">"{deletingCategory.name}"</span>? Thao tác này không thể hoàn tác.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingCategory(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl border border-input bg-background font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Hủy bỏ
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                Xác nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
