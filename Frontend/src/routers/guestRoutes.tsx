import type { RouteObject } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import LoginPage from '@/pages/guest/login'
import RegisterPage from '@/pages/guest/register'
import DemoPage from '@/pages/guest/demo'

// Import public content pages
import HomePage from '@/pages/guest/home'
import SearchPage from '@/pages/guest/search'
import StoryDetailPage from '@/pages/guest/story-detail'
import ReaderPage from '@/pages/guest/reader'

export const guestRoutes: RouteObject[] = [
	{
		element: <SiteLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'login', element: <LoginPage /> },
			{ path: 'register', element: <RegisterPage /> },
			{ path: 'demo', element: <DemoPage /> },
			{ path: 'search', element: <SearchPage /> },
			{ path: ':novelSlug', element: <StoryDetailPage /> },
			{ path: ':novelSlug/:chapterSlug', element: <ReaderPage /> }
		],
	},
]
