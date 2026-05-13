import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import { adminRoutes } from './adminRoutes'
import { guestRoutes } from './guestRoutes'
import { protectedRoutes } from './protectedRoutes'

const router = createBrowserRouter([
	{
		element: React.createElement(RootLayout),
		children: [
			...guestRoutes,
			...protectedRoutes,
			...adminRoutes
		],
	},
])

export default router
