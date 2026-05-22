import type { RouteObject } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import ProfilePage from '@/pages/protected/profile'
import PaymentCreatePage from '@/pages/protected/payment/payment-create'
import PaymentLoadingPage from '@/pages/protected/payment/payment-loading'
import PaymentResultPage from '@/pages/protected/payment/payment-result'


export const protectedRoutes: RouteObject[] = [
	{
		element: <SiteLayout requireAuth />,
		children: [
			{ path: 'profile', element: <ProfilePage /> },
			{ path: 'payment/create', element: <PaymentCreatePage /> },
			{ path: 'payment/loading', element: <PaymentLoadingPage /> },
			{ path: 'payment/result', element: <PaymentResultPage /> }
		],
	}
]
