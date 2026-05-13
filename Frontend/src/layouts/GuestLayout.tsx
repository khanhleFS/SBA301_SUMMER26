import { Outlet } from 'react-router-dom'
import SiteHeader from '../components/shared/site/site-header'
import SiteFooter from '../components/shared/site/site-footer'

/**
 * The default layout for guest users, featuring a site header, 
 * footer, and consistent content constraints.
 */
export default function GuestLayout() {
  return (
    <div className="
			min-h-screen bg-white text-gray-900 
			[--content-padding-x:1rem] 
			[--content-max-width:1440px] 
			sm:[--content-padding-x:1.5rem] 
			lg:[--content-padding-x:2rem]"
    >
      <SiteHeader />

      <main className="py-12 lg:py-16">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}