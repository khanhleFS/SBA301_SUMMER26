import type { RouteObject } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import ProfilePage from '@/pages/protected/profile'

export const protectedRoutes: RouteObject[] = [
	{
		element: <SiteLayout requireAuth />,
		children: [
			{ path: 'profile', element: <ProfilePage /> }
		],
	}
]

