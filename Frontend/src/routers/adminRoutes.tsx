import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import DashboardPage from '@/pages/admin/dashboard'
import DashboardV2 from '@/pages/admin/dashboard_v2'
import FinancePage from '@/pages/admin/finance'
import LeaderboardPage from '@/pages/admin/leaderboard'

export const adminRoutes: RouteObject[] = [
	{
		path: 'admin',
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Navigate to="dashboard" replace /> },
			{ path: 'dashboard-old', element: <DashboardPage /> },
			{ path: 'dashboard', element: <DashboardV2 /> },
			{ path: 'finance', element: <FinancePage /> },
			{ path: 'leaderboard', element: <LeaderboardPage /> },
		],
	},
]
