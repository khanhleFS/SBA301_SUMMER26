import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/features/admin-dashboard/dashboard-feature'
import FinancePage from '@/features/admin-finance/finance-feature'
import LeaderboardPage from '@/features/admin-leaderboard/leaderboard-feature'

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
