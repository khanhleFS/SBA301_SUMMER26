import type { RouteObject } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import HomePage from '@/pages/protected/home'
import ProfilePage from '@/pages/protected/profile'

export const protectedRoutes: RouteObject[] = [
	{
		element: <SiteLayout requireAuth />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'profile', element: <ProfilePage /> },
		],
	},
]
