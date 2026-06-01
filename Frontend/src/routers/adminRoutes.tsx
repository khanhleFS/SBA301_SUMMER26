import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/admin/dashboard'
import FinancePage from '@/pages/admin/finance'
import LeaderboardPage from '@/pages/admin/leaderboard'

export const adminRoutes: RouteObject[] = [
	{
		path: 'admin',
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Navigate to="dashboard" replace /> },
			{ path: 'dashboard-old', element: <Dashboard /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'finance', element: <FinancePage /> },
			{ path: 'leaderboard', element: <LeaderboardPage /> },
		],
	},
]
