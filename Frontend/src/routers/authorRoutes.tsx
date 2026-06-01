import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/author/dashboard'
import FinancePage from '@/pages/author/finance'
import LeaderboardPage from '@/pages/author/leaderboard'

export const authorRoutes: RouteObject[] = [
	{
		path: 'author',
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Navigate to="dashboard" replace /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'finance', element: <FinancePage /> },
			{ path: 'leaderboard', element: <LeaderboardPage /> },
		],
	},
]
