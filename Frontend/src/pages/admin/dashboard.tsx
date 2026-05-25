import React from 'react';
import { Eye, Users, BookOpen, TrendingUp, TrendingDown, Zap, Heart, Search, Rocket, Trophy, Crown, BarChart3 } from 'lucide-react';

const kpiCards = [
	{
		label: 'Total Views',
		value: '1,284,042',
		delta: '12.5% from last month',
		trend: 'up',
		icon: Eye,
	},
	{
		label: 'Active Readers',
		value: '84,921',
		delta: '4.2% from last week',
		trend: 'up',
		icon: Users,
	},
	{
		label: 'New Chapters',
		value: '3,402',
		delta: '248 published today',
		trend: 'up',
		icon: BookOpen,
	},
]

const genreTrends = [
	{ label: 'Fantasy', pct: '+18.2%', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
	{ label: 'Romance', pct: '+12.4%', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
	{ label: 'Mystery', pct: '+8.7%', icon: Search, color: 'text-purple-500', bg: 'bg-purple-50' },
	{ label: 'Sci-Fi', pct: '-2.1%', icon: Rocket, color: 'text-amber-500', bg: 'bg-amber-50' },
	{ label: 'Horror', pct: '+4.5%', icon: Trophy, color: 'text-orange-500', bg: 'bg-orange-50' },
	{ label: 'Historical', pct: '+1.2%', icon: BarChart3, color: 'text-slate-500', bg: 'bg-slate-50' },
]

const podiumStories = [
	{
		rank: 2,
		title: 'The Silent Echo',
		reads: '42k reads',
		cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjjLvwBTH5b5bUumyiWHagEZiq-DrDVqc8vBpEP4Nv4IxPoYLzg5LG9WVB4GkHCUZHkXVT-bA0C7F0EEHxhsWfJuWkReXjfXzsoASsM1t3jhkPAJgx6gPzq2LN6GZEdX7axjlr4cjRP9UyMUU1nY5JQb3r15nTfU-3lMYHBpF3TRbe9eRO8obonszqoY4ZMB4SJPT67O_O66BG2GRBcfNFL7GHzhI4QwpERogdoggmUZiZcv9knlB_OPfHAoiBm5HqKeL9JLYMrw',
	},
	{
		rank: 1,
		title: 'Shadow of the Archive',
		reads: '128k reads',
		cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwnG1TDGyZyEaz_M-xz1ZbQt8-GmC1rJcq8ebfWZ10i3BiRIxDYTWNMWIxfuTX6_DI16jRMFvrRKgsJEfNaKiC2Zk8mt2XK0j78vC6CzL6_SdO4kl_4qB7u-YFK_XFSTglllkBq8FKZq3ITaSqmf4r4Q4sgZyjZKTXG-FD-KxjIEUMuk7PiYP0HmsnjmagVC10OW8kfUqLpPVi6eR3PQQVHtWjCsMUhEVJ-k9xSvPqbeAQb6EOaTPypf-CyH5RpvB7CyIY2z8qUQ',
	},
	{
		rank: 3,
		title: 'Clockwork Crown',
		reads: '38k reads',
		cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF_N2Qg_WCzMj-pC6HFovjoVSMLjrMycnCb1XWNLfDGYXtuUYW-Jkfe1UZQPipSLlv3b4SZVM_j-rmtn6n-bOACFwtxBrqO9gT-UVYxEFhHdaB-3KMo-2ZDtBbnH07ic0WmiJNyFvL-_50qKWE04plrzJWfT5jE1DsjHDJQT0QZgNcyzBFwO7sRgkv1Yp7L5u195sPQPlttXPSCFQlMOv4bsxSDwJJdB9d4sHMcW5YztFjTLXGCAgpRXEMhgLNRUu3rh5q5CfgQA',
	},
]

const runnerStories = [
	{
		rank: 4,
		title: "The Alchemist's Burden",
		reads: '32.1k reads',
		trend: 'neutral',
		cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAljMYYRLENYHtGOd1H-luK0E2FIqGtyIiwpCKVLEP5fiZvKDk2X7hcO_QTiE1WmIyly7ljCfpWnXgechgbzmfDoPvnsuo5ZGKsGlVOgoLffkFVpAvoUj49tG3qREaw9gQmWi6-0LG555RzZeunINWHoQXQyeM_BIz_1t4Ml-DyVL0DI_J2T7GJRgV86Z5stNd24eSO7ZVy_tTFAiPyTKnm85AsqlEV0nujTtL17SyHxHRsd4SB2yLwG1vF9l7BdhDYDdvS16GdIA',
	},
	{
		rank: 5,
		title: 'Beyond the Red Gate',
		reads: '29.4k reads',
		trend: 'down',
		cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY49YDoKRM5FI5gIAtGle96AK6h7Yboxm1Eagmg70iRed-nX72QUElRXPUIAug3hhm_5gJlb6M9NQvvJ_p_F7UlPSmVgwTV1nNcChDuU3dCIPU9WRjs7E_RtcKJE7sZs7QkqVcwZOok9kvESD8mpqEIFu0NRT4womVwl5HeGNlszbuxsqNm-Vplp1-HIGgB2WGGQRygAV6TtW9jEknKnEwgk2RSG5SEe_O3scuqPR83HpxgpG2jTOo6nxqvC0RuzYV8DGccd4jmw',
	},
	{
		rank: 6,
		title: 'Neon Monolith',
		reads: '27.8k reads',
		trend: 'up',
		cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtQdYKMsg0pRNNhiGskEjxrQZzUWDw-rvsLa6MjJMmr4-5wwlJo-52lbP8mJ9WGdf6NRK30Y_wxom_P9I9cgB9KYHwF5wFaOXAHeyYHnwC4z7A9425JKAJyVJt7oiaHAMyxLpWRz6G2K_wwZ961EOaMPbz-kKuWvvEuRPArMyJWMRKZFVwTyBRByrvLPXEDkxmN6Jdl3maduI9qjL0a_L1l1S0jeNAsyWbZnIJjr6vnvPj493bhDfqL1xYRtDyUz18ghh5Beoe0g',
	},
]

const authorPodium = [
	{
		rank: 2,
		name: 'Elena Sterling',
		stat: '1.2m Total Views',
		avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRJ7e6ChOsxOeB0-z8Z-WohVR-MzvpxrXD6FPVOIIrw120GaFSDo56-aajX_sDtgjYpnenJqNWP9t8wLRjSVjQju-BHT0AIN0pgIos0_mQgTQOlgst9WeQ_zXxGfXyusjf4vbq7jpj_g3itaSGA9q2xHbBSPkbIB0R8VjkBXLzJcZYfJdgnfNvvhOJdusz8bLAwtM1Lpv-go-vRFgNp-inbnD6HekGvZ7iUPxORr97uqgwKqNMjNOId3zuw-gOvKG8kGVz1YMQVA',
	},
	{
		rank: 1,
		name: 'Julian Thorne',
		stat: '2.4m Total Views',
		avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkTaUysHfBsLjeVxyV8StVwQYMzXXNayYunYKKhaSnoMPIRC2NZJJJjjYViNi_0MxFh3N_fScHJvF0BkSVz6eXSMqr4Pk8L7-wb8LVDq3xm8f6zWpij5urxAsqeqNjEsWMeKxI68IW3GPkbZYqct8OSJOvt4kiea04LtofjPeWXJhh8fldXWIMK7a7Nufwgzb8jBbrSwcsfKYMsSs7eATY6rUZQBHqh9FvsJq8xIaVQlKZZz-caXJs5JrYC-A7zKozglGDq01tsw',
		badge: true,
	},
	{
		rank: 3,
		name: 'S. J. Moon',
		stat: '980k Total Views',
		avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW3KpM0w97XCjtpOWwngYMHVEBDnLl4dc8ZeJvHQ8ElgcCAHx5s9e_KCAV4AQdcZp6GBv6a_jfmZAb-0dlqIJcCi3iHkEUOk3phnBhr5VXDBj9rZ6kP9aVtR9kq3iGGSZfq6aWoX6LRDRTrHh9q2aSVJmI-udljASvc1JrqYOMYQgKjpQsr7_0PnESdbuYRX_p2vV2xH4SATTRp5_vaGfbN6WKsBUQPmBkepmquLTgoXLO9EQeEtBW8agzaYEth-Hmq0jeKPXcFw',
	},
]

const authorList = [
	{ rank: 4, name: 'V. K. Vance', sub: '12 published novels', stat: '850k views', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfZXgIDpwiD3bN7f81q5FUSHAcwO3MpgpNh7pbqCtud2veN-31RUIg3nyERr-Mop7XfxOqf4lTWo6dq6WlC2lCRm-vSJ4e9pTG3OtwUMR_UMzEKNgS7wbHitmCbxJGHQs7QA2uQ_xFYlnPNZ0qWEikqJlq6XoKYAnaxy9iyD8IFTfaSsjMpS4cEeZpAyoT5tYeUClG_nXR_rtzHKpCDENmQeSwgdwnqVFXZE0ZWHXGtqmKcAGfvQ907e0u_p30VKWEawBjVEyE4A' },
	{ rank: 5, name: 'Isabella Night', sub: '8 published novels', stat: '720k views', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC37zdq3OstStIFOrOgGbqRwPl3W9v2zqWWkOcXF-dmcvyqZJpm4PFQMuW59l5pQjPWwAbXOdxVn-RSkRliWvwC9Ia_eieOixwapEVGq6-9Zvk9K3P524d9DDDdRJM7GXAuHaXNTsIWHLwEQLHo_QWE_vImiXcdV12ndZ5VukJZUHlI-U8arvqB6XjQ_AvzYDyLYXC7qvl61KPEfh6YZPvAZrgb6UE1Vh28WbzUGSRjsM-fwuIp8rLPhdW1VvKGJ0dBSI1pFs7pMw' },
	{ rank: 6, name: 'Marcus Pen', sub: '15 published novels', stat: '695k views', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Rfh0cQ5tZ1-fErnNfmeQZ5vlC3tiOnpdqzxUXB4GuO4BEvVqQQfF-bNxc87_RMRRrNjwVO7tntddCCErHAeXHSotZEvxMEYUfA81KTjLGDnqdz7KRE9JG0weiAMI4K54-uvuahd0rDNJ3lmnBHjxClqbvfgtQzXumul8xMUMMJzH0OMoAmmBh2p4MltG-Gfa_QQ1BDs3DXjA_2s-wblGPo4g6LaSJZdiAPox9qAWi1QQrBgTvcHXtIYGIfG4arrY5kHCw73I5g' },
]

function TrendIcon({ trend }) {
	if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />
	if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />
	return <div className="w-4 h-4 text-gray-400" />
}

export default function AdminDashboard() {
	const onlineUsers = [
		{ name: 'Maren Maureen', id: '1094882001', avatar: 'https://i.pravatar.cc/40?img=10' },
		{ name: 'Jenniffer Jane', id: '1094672000', avatar: 'https://i.pravatar.cc/40?img=20' },
		{ name: 'Ryan Herwinds', id: '1094342003', avatar: 'https://i.pravatar.cc/40?img=30' },
		{ name: 'Kierra Culhane', id: '1094662002', avatar: 'https://i.pravatar.cc/40?img=40' },
	]

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-8">
					<section className="grid grid-cols-1 md:grid-cols-3 gap-5">
				{kpiCards.map(({ label, value, delta, trend, icon: Icon }) => (
					<div key={label} className="rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors">
						<div className="bg-white p-6">
							<div className="flex justify-between items-start mb-3">
								<span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</span>
								<Icon className="w-5 h-5 text-primary" />
							</div>
							<div className="text-3xl font-bold text-gray-900 mb-3">{value}</div>
							<div className="flex items-center gap-2 text-sm">
								<TrendIcon trend={trend} />
								<span className="text-gray-600">{delta}</span>
							</div>
						</div>
						{/* Footer strip in primary color */}
						<div className="px-4 py-3 bg-primary text-[var(--on-primary)]">
							<div className="flex items-center justify-between text-sm">
								<span className="font-medium">Summary</span>
								<span className="opacity-90">{delta}</span>
							</div>
						</div>
					</div>
				))}
				    </section>

				    <section className="space-y-5 pb-8 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold text-gray-900">Top Stories</h2>
					<button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All Content</button>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="flex items-end justify-start gap-3 min-h-96">
						{podiumStories.map(({ rank, title, reads, cover }) => (
							<div key={rank} className={`flex flex-col items-center flex-1 ${rank === 1 ? '-translate-y-4' : ''}`}>
								<div className={`rounded-lg overflow-hidden mb-3 ${
									rank === 1 ? 'w-28 h-40 shadow-lg border-2 border-blue-300' :
									rank === 2 ? 'w-20 h-32 shadow border-2 border-gray-300' :
									'w-20 h-28 shadow-sm border border-gray-300'
								}`}>
									<img className="w-full h-full object-cover" src={cover} alt={title} />
								</div>
								<div className={`w-full text-center rounded-t-lg p-3 ${
									rank === 1 ? 'bg-blue-50 border-t-2 border-blue-300' :
									rank === 2 ? 'bg-gray-50 border-t border-gray-300' :
									'bg-gray-50 border-t border-gray-200'
								}`}>
									<div className={`font-bold text-blue-600 ${rank === 1 ? 'text-2xl mb-1' : 'text-lg'}`}>
										#{rank}
									</div>
									<p className={`truncate text-gray-900 ${rank === 1 ? 'text-sm font-semibold' : 'text-xs font-medium'}`}>
										{title}
									</p>
									<p className={`text-gray-600 ${rank === 1 ? 'text-xs font-semibold text-blue-600' : 'text-xs'}`}>
										{reads}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
						{runnerStories.map(({ rank, title, reads, trend, cover }) => (
							<div key={rank} className="p-4 flex items-center gap-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
								<span className="text-xs font-semibold text-gray-600 w-6">{rank}</span>
								<div className="w-10 h-14 rounded-md overflow-hidden flex-shrink-0">
									<img className="w-full h-full object-cover" src={cover} alt={title} />
								</div>
								<div className="flex-grow min-w-0">
									<p className="text-sm font-medium text-gray-900 truncate">{title}</p>
									<p className="text-xs text-gray-600">{reads}</p>
								</div>
								<TrendIcon trend={trend} />
							</div>
						))}
					</div>
				</div>
				    </section>

				    <section className="space-y-5 pb-8 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold text-gray-900">Genre Trends</h2>
					<div className="flex gap-2">
						<button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 rounded-full hover:bg-gray-200">
							Monthly
						</button>
						<button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">
							Weekly
						</button>
					</div>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{genreTrends.map(({ label, pct, icon: Icon, color, bg }) => (
						<div key={label} className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:border-gray-300 transition-colors">
							<div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-2 mx-auto`}>
								<Icon className={`w-5 h-5 ${color}`} />
							</div>
							<p className="text-sm font-medium text-gray-900">{label}</p>
							<p className="text-xs font-semibold text-blue-600">{pct}</p>
						</div>
					))}
				</div>
				    </section>

				    <section className="space-y-5 pb-8">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold text-gray-900">Top Authors</h2>
					<button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All Authors</button>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="flex items-end justify-start gap-4 min-h-96">
						{authorPodium.map(({ rank, name, stat, avatar, badge }) => (
							<div key={rank} className={`flex flex-col items-center flex-1 ${rank === 1 ? '-translate-y-4' : ''}`}>
								{badge && (
									<div className="mb-2">
										<Crown className="w-6 h-6 text-amber-500" />
									</div>
								)}
								<div className={`rounded-full overflow-hidden mb-3 ${
									rank === 1 ? 'w-24 h-24 shadow-lg border-2 border-blue-300' :
									rank === 2 ? 'w-20 h-20 shadow border-2 border-gray-300' :
									'w-16 h-16 shadow-sm border border-gray-300'
								}`}>
									<img className="w-full h-full object-cover" src={avatar} alt={name} />
								</div>
								<div className={`w-full text-center rounded-t-lg p-3 ${
									rank === 1 ? 'bg-blue-50 border-t-2 border-blue-300' :
									rank === 2 ? 'bg-gray-50 border-t border-gray-300' :
									'bg-gray-50 border-t border-gray-200'
								}`}>
									<div className={`font-bold text-blue-600 ${rank === 1 ? 'text-2xl mb-1' : 'text-lg'}`}>
										#{rank}
									</div>
									<p className={`truncate text-gray-900 ${rank === 1 ? 'text-sm font-semibold' : 'text-xs font-medium'}`}>
										{name}
									</p>
									<p className={`text-gray-600 ${rank === 1 ? 'text-xs font-semibold text-blue-600' : 'text-xs'}`}>
										{stat}
									</p>
									{rank === 1 && (
										<div className="mt-2 text-xs font-bold text-blue-600">DIAMOND STATUS</div>
									)}
								</div>
							</div>
						))}
					</div>
					<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
						{authorList.map(({ rank, name, sub, stat, avatar }) => (
							<div key={rank} className="p-4 flex items-center gap-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
								<span className="text-xs font-semibold text-gray-600 w-6">{rank}</span>
								<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
									<img className="w-full h-full object-cover" src={avatar} alt={name} />
								</div>
								<div className="flex-grow min-w-0">
									<p className="text-sm font-medium text-gray-900">{name}</p>
									<p className="text-xs text-gray-600">{sub}</p>
								</div>
								<p className="text-xs font-medium text-gray-600">{stat}</p>
							</div>
						))}
					</div>
				</div>
					</section>
				</div>

				{/* Right sidebar */}
				<aside className="hidden lg:block">
					<div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-3">Nov 2020</h3>
						<div className="grid grid-cols-7 gap-1 text-xs text-gray-600">
							{Array.from({ length: 30 }).map((_, i) => (
								<div key={i} className={`py-2 rounded ${[8,9,13].includes(i+1) ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-50'}`}>
									<div className="text-center">{i+1}</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-lg font-semibold text-gray-900">Online Users</h3>
							<button className="text-sm text-blue-600">See all</button>
						</div>
						<ul className="space-y-3">
							{onlineUsers.map(u => (
								<li key={u.id} className="flex items-center gap-3">
									<img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
									<div className="flex-1 min-w-0">
										<div className="text-sm font-medium text-gray-900 truncate">{u.name}</div>
										<div className="text-xs text-gray-500">{u.id}</div>
									</div>
									<div className="w-2 h-2 rounded-full bg-blue-500" />
								</li>
							))}
						</ul>
					</div>
				</aside>
			</div>
		</div>
	)
}