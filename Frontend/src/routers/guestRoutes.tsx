import type { RouteObject } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import LoginPage from '@/pages/guest/login'
import RegisterPage from '@/pages/guest/register'
import DemoPage from '@/pages/guest/demo'

export const guestRoutes: RouteObject[] = [
	{
		element: <SiteLayout />,
		children: [
			{ path: 'login', element: <LoginPage /> },
			{ path: 'register', element: <RegisterPage /> },
			{ path: 'demo', element: <DemoPage /> },
		],
	},
]
