import { Outlet, Navigate } from 'react-router-dom'
import SiteHeader from '../components/shared/site/site-header'
import SiteFooter from '../components/shared/site/site-footer'
import SmoothScroll from '../components/shared/SmoothScroll'
import { useAuth } from '@/lib/auth'

interface SiteLayoutProps {
	/**
	 * Whether the layout requires the user to be authenticated.
	 */
	requireAuth?: boolean
}

/**
 * The standard site layout featuring a header and footer.
 * Can be configured to require authentication.
 */
export default function SiteLayout({ requireAuth = false }: SiteLayoutProps) {
	const { isAuthenticated, isLoading } = useAuth()

	if (requireAuth && isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background text-foreground">
				<span className="loading loading-spinner loading-lg text-primary"></span>
			</div>
		)
	}

	if (requireAuth && !isAuthenticated) {
		return <Navigate to="/login" replace />
	}

	return (
		<SmoothScroll>
			<div className="
				min-h-screen bg-background text-foreground transition-colors duration-500
				[--content-padding-x:1rem] 
				[--content-max-width:1440px] 
				sm:[--content-padding-x:1.5rem] 
				lg:[--content-padding-x:2rem]"
			>
				<SiteHeader />

				<main className="pt-20 pb-8 md:pb-12 lg:pb-16">
					<Outlet />
				</main>

				<SiteFooter />
			</div>
		</SmoothScroll>
	)
}