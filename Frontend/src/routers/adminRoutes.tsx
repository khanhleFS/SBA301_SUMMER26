import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import DashboardPage from '@/pages/admin/dashboard'

export const adminRoutes: RouteObject[] = [
	{
		path: 'admin',
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Navigate to="dashboard" replace /> },
			{ path: 'dashboard', element: <DashboardPage /> },
		],
	},
]
