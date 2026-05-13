import type { RouteObject } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import AdminDashboard from '@/pages/admin/dashboard'
import AdminUsersPage from '@/pages/admin/users'

export const adminRoutes: RouteObject[] = [
	{
		element: <DashboardLayout />,
		children: [
			{ path: 'admin', element: <AdminDashboard /> },
			{ path: 'admin/users', element: <AdminUsersPage /> },
		],
	},
]
