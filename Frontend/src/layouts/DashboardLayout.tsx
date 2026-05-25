"use client"

import type React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AppSidebar } from '@/components/shared/dashboard/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export default function DashboardLayout() {
  // TODO: Replace with real auth/admin logic
  const isAuthenticated = true
  const isAdmin = true

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <SidebarProvider
      defaultOpen={true}
      className="h-screen overflow-hidden bg-primary text-[var(--on-primary)]"
      style={{
        '--sidebar': 'var(--inverse-primary)',
        '--sidebar-foreground': 'var(--on-primary-container)',
        '--sidebar-accent': 'var(--primary)',
        '--sidebar-accent-foreground': 'var(--on-primary)',
        '--sidebar-border': 'color-mix(in srgb, var(--primary) 22%, white)',
        '--sidebar-ring': 'var(--primary)',
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset className="flex h-screen min-h-0 flex-col overflow-hidden bg-transparent">
        <div className="flex-1 min-h-0 p-4">
          <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl">
            <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="flex flex-none items-center gap-2 border-b border-gray-100 px-6 py-4">
                <SidebarTrigger size="icon" className="shrink-0 rounded-full bg-primary text-[var(--on-primary)] hover:bg-primary/90 hover:text-[var(--on-primary)]" />
                <Separator orientation="vertical" className="h-6" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Content</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 pr-3">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}