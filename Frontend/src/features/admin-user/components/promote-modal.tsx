import { X, Shield, AlertTriangle } from 'lucide-react'
import type { UserItem, PromoteModalProps } from '../types/admin-user.types'

export function PromoteModal({ user, onConfirm, onClose, isLoading }: PromoteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/20 ring-4 ring-violet-50 dark:ring-violet-500/10">
                <Shield className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Thăng cấp lên Tác giả
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Thao tác này không thể hoàn tác ngay
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* User info */}
        <div className="px-6 py-2 space-y-4">
          <div className="flex items-center gap-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-4">
            <div className="relative shrink-0">
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900 shadow-sm"
              />
              <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-zinc-900 bg-green-500"></div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                {user.fullName}
              </p>
              <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                {user.email}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex gap-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 p-4 text-amber-800 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" />
            <div className="text-sm leading-relaxed">
              Người dùng sẽ có quyền tạo và quản lý truyện. Quyền này sẽ được áp dụng ngay lập tức.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 p-6">
          <button
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            id="confirm-promote-btn"
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Xác nhận thăng cấp
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
