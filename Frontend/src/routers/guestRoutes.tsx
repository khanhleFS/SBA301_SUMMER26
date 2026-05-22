import type { RouteObject } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import GuestLayout from '@/layouts/GuestLayout'
import LoginPage from '@/pages/guest/login'
import RegisterPage from '@/pages/guest/register'
import ForgotPasswordPage from '@/pages/guest/forgot-password'
import VerifyOtpPage from '@/pages/guest/verify-otp'
import DemoPage from '@/pages/guest/demo'

// Import public content pages
import HomePage from '@/pages/guest/home'
import SearchPage from '@/pages/guest/search'
import StoryDetailPage from '@/pages/guest/story-detail'
import ReaderPage from '@/pages/guest/reader'



export const guestRoutes: RouteObject[] = [
	{
		element: <GuestLayout />,
		children: [
			{ path: 'login', element: <LoginPage /> },
			{ path: 'register', element: <RegisterPage /> },
			{ path: 'forgot-password', element: <ForgotPasswordPage /> },
			{ path: 'verify-otp', element: <VerifyOtpPage /> },
		],
	},
	{
		element: <SiteLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'demo', element: <DemoPage /> },
			{ path: 'search', element: <SearchPage /> },
			{ path: ':novelSlug', element: <StoryDetailPage /> },
			{ path: ':novelSlug/:chapterSlug', element: <ReaderPage /> }
		],
	}

]
