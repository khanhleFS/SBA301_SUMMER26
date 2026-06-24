import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/features/admin-dashboard/dashboard-feature'
import FinancePage from '@/features/admin-finance/finance-feature'
import LeaderboardPage from '@/features/admin-leaderboard/leaderboard-feature'
import AuthorNovelsPage from '@/features/author-novel/novels-feature'
import AuthorNovelDetailPage from '@/features/author-novel/novel-detail-feature'
import AuthorChapterDetailPage from '@/features/author-novel/chapter-detail-feature'

export const authorRoutes: RouteObject[] = [
	{
		path: 'author',
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Navigate to="dashboard" replace /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'novels', element: <AuthorNovelsPage /> },
			{ path: 'novels/new', element: <AuthorNovelDetailPage /> },
			{ path: 'novels/:novelId', element: <AuthorNovelDetailPage /> },
			{ path: 'novels/:novelId/chapters/new', element: <AuthorChapterDetailPage /> },
			{ path: 'novels/:novelId/chapters/:chapterNumber', element: <AuthorChapterDetailPage /> },
			{ path: 'finance', element: <FinancePage /> },
			{ path: 'leaderboard', element: <LeaderboardPage /> },
		],
	},
]
