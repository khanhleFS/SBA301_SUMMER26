import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './container'

export default function SiteFooter() {
	const containerRef = useRef<HTMLDivElement>(null)
	const [width, setWidth] = useState<number>(0)

	useEffect(() => {
		const updateWidth = () => {
			if (containerRef.current) {
				const style = window.getComputedStyle(containerRef.current)
				const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
				setWidth(containerRef.current.offsetWidth - paddingX)
			}
		}

		updateWidth()
		window.addEventListener('resize', updateWidth)
		return () => window.removeEventListener('resize', updateWidth)
	}, [])

	return (
		<footer className="bg-black text-white overflow-hidden">
			<Container ref={containerRef} className="pt-20 pb-0">
				{/* Top Section */}
				<div className="flex flex-col md:flex-row justify-between gap-12 mb-32 md:mb-48">
					<div className="max-w-md">
						<h2 className="text-2xl md:text-3xl font-medium leading-[1.2] tracking-tight text-white">
							Always open to new projects and collaborations — drop a line if you'd like to connect.
						</h2>
					</div>
					<div className="flex gap-16 md:gap-24">
						<div className="flex flex-col gap-1 text-sm md:text-base font-medium">
							<Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
							<Link to="/" className="hover:text-gray-400 transition-colors">Work</Link>
							<Link to="/" className="hover:text-gray-400 transition-colors">About</Link>
							<Link to="/" className="hover:text-gray-400 transition-colors">Notes</Link>
							<Link to="/" className="hover:text-gray-400 transition-colors">Contact</Link>
						</div>
						<div className="flex flex-col gap-1 text-sm md:text-base font-medium">
							<Link to="/" className="hover:text-gray-400 transition-colors">Style Guide</Link>
							<Link to="/" className="hover:text-gray-400 transition-colors">Components</Link>
							<Link to="/" className="hover:text-gray-400 transition-colors">Licenses</Link>
							<Link to="/" className="hover:text-gray-400 transition-colors">Changelog</Link>
						</div>
					</div>
				</div>

				{/* Middle Section */}
				<div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-4">
					<div className="flex flex-wrap gap-x-8 gap-y-2 text-sm md:text-base font-medium">
						<Link to="/" className="hover:text-gray-400 transition-colors">Twitter (X)</Link>
						<Link to="/" className="hover:text-gray-400 transition-colors">BlueSky</Link>
						<Link to="/" className="hover:text-gray-400 transition-colors">Behance</Link>
						<Link to="/" className="hover:text-gray-400 transition-colors">LinkedIn</Link>
					</div>
					<div className="text-xs md:text-sm text-white/50 font-medium">
						Powered by <Link to="/" className="text-white hover:text-gray-300 underline decoration-white/20 underline-offset-4 transition-colors">Webflow</Link>. Created by <Link to="/" className="text-white hover:text-gray-300 underline decoration-white/20 underline-offset-4 transition-colors">Robin</Link>.
					</div>
				</div>
			</Container>

			{/* Bottom Section - Proportional SVG Logo */}
			<Container className="pt-8 pb-0">
				<svg
					width={width || '100%'}
					viewBox="0 0 1000 220"
					preserveAspectRatio="xMidYMid meet"
					xmlns="http://www.w3.org/2000/svg"
					className="text-white"
					aria-label="R® LESSE"
				>
					<defs>
						<linearGradient id="logoGradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="currentColor" stopOpacity="1" />
							<stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
						</linearGradient>
					</defs>
					<text
						x="0"
						y="190"
						textLength="1000"
						lengthAdjust="spacing"
						fill="url(#logoGradient)"
						style={{
							fontFamily: "var(--font-sans), system-ui, sans-serif",
							fontWeight: 900,
							fontSize: '240',
							letterSpacing: '-16'
						}}
					>
						R® LESSE
					</text>
				</svg>
			</Container>
		</footer>
	)
}
