import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import Dashboard from '@/pages/author/dashboard'
import FinancePage from '@/pages/author/finance'
import LeaderboardPage from '@/pages/author/leaderboard'
import AuthorNovelsPage from '@/pages/author/novels'
import AuthorNovelDetailPage from '@/pages/author/novel-detail'
import AuthorChapterDetailPage from '@/pages/author/chapter-detail'

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
