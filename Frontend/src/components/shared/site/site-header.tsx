import { Search, ShoppingCart, User, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Container from './container'

const navItems = [
	// ... (rest of navItems)
	{
		label: 'Sản phẩm',
		href: '/products',
		submenu: [
			{ title: 'Danh mục', items: ['Sữa chua uống', 'Sữa tươi', 'Sữa cô đặc', 'Sữa bột'] },
			{ title: 'Độ tuổi', items: ['Trẻ sơ sinh', 'Bé 1-3 tuổi', 'Trẻ 3-6 tuổi', 'Học sinh'] },
			{ title: 'Loại sản phẩm', items: ['Sữa uống', 'Sữa bột', 'Sữa chua', 'Tư nhân đánh dấu'] },
		],
	},
	{
		label: 'Trẻ nhỏ',
		href: '/kids',
		submenu: [
			{ title: 'Độ tuổi', items: ['Sơ sinh', '6 tháng', '1 tuổi', '2 tuổi'] },
			{ title: 'Nhu cầu dinh dưỡng', items: ['Tăng cân', 'Tiêu hóa', 'Miễn dịch', 'Phát triển não'] },
			{ title: 'Dòng sản phẩm', items: ['Vinamilk Premium', 'Vinamilk Alpha', 'Vinamilk Gold', 'Vinamilk Pro'] },
		],
	},
	{
		label: 'Thiếu niên',
		href: '/teen',
		submenu: [
			{ title: 'Độ tuổi', items: ['6-9 tuổi', '9-12 tuổi', '12-15 tuổi', '15-18 tuổi'] },
			{ title: 'Nhu cầu dinh dưỡng', items: ['Chiều cao', 'Xương chắc khỏe', 'Tập trung học tập', 'Năng lượng'] },
			{ title: 'Sản phẩm nổi bật', items: ['Vinamilk Teen', 'Vinamilk Growth', 'Vinamilk Smart', 'Vinamilk Active'] },
		],
	},
	{
		label: 'Người lớn',
		href: '/adults',
		submenu: [
			{ title: 'Độ tuổi', items: ['20-40 tuổi', '40-60 tuổi', 'Trên 60 tuổi', 'Cho nữ'] },
			{ title: 'Nhu cầu sức khỏe', items: ['Xương chắc khỏe', 'Tim mạch khỏe', 'Tiêu hóa tốt', 'Miễn dịch mạnh'] },
			{ title: 'Dòng sản phẩm', items: ['Vinamilk Ensure', 'Vinamilk Gold Adult', 'Vinamilk Pure', 'Vinamilk Organic'] },
		],
	},
	{
		label: 'Thương hiệu',
		href: '/brands',
		submenu: [
			{ title: 'Về Vinamilk', items: ['Lịch sử', 'Tầm nhìn', 'Giá trị', 'Đội ngũ'] },
			{ title: 'Cam kết', items: ['Chất lượng', 'Bền vững', 'Cộng đồng', 'Đổi mới'] },
			{ title: 'Tin tức', items: ['Bản tin', 'Sự kiện', 'Giải thưởng', 'Tin công ty'] },
		],
	},
]

const iconButtons = [
	{ label: 'Search', icon: Search, href: '/search' },
	{ label: 'Cart', icon: ShoppingCart, href: '/cart' },
	{ label: 'Account', icon: User, href: '/account' },
]

export default function SiteHeader() {
	const [activeMenu, setActiveMenu] = useState<string | null>(null)

	return (
		<header className="sticky top-0 z-40 bg-gray-950">
			{/* Main header row */}
			<Container>
				<div className="flex h-20 items-center justify-between" onMouseLeave={() => setActiveMenu(null)}>
					<Link to="/" className="flex shrink-0 items-center gap-1">
						<div className="flex flex-col leading-tight">
							<span className="text-2xl font-bold text-white">Vinamilk</span>
							<span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
								Est 1976
							</span>
						</div>
					</Link>

					{/* Center navigation */}
					<nav className="flex flex-1 items-center justify-center gap-1">
						{navItems.map((item) => (
							<div
								key={item.label}
								className="relative"
								onMouseEnter={() => item.submenu && setActiveMenu(item.label)}
							>
								<Link
									to={item.href}
									className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gray-300"
								>
									{item.label}
									{item.submenu && <ChevronDown className="h-4 w-4" />}
								</Link>

								{/* Mega menu dropdown - fixed to page */}
								{item.submenu && activeMenu === item.label && (
									<div className="fixed left-0 top-20 z-30 w-full border-t border-gray-800 bg-gradient-to-b from-gray-900/95 to-gray-900/85 backdrop-blur-md text-white">
										<Container className="py-8">
											<div className="grid grid-cols-3 gap-8">
												{item.submenu.map((column) => (
													<div key={column.title} className="space-y-4">
														<h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
															{column.title}
														</h3>
														<ul className="space-y-2">
															{column.items.map((subitem) => (
																<li key={subitem}>
																	<Link
																		to="#"
																		className="text-sm text-gray-400 transition-colors hover:text-white"
																	>
																		{subitem}
																	</Link>
																</li>
															))}
														</ul>
													</div>
												))}
											</div>
										</Container>
									</div>
								)}
							</div>
						))}
					</nav>

					{/* Right icon buttons */}
					<div className="flex shrink-0 items-center gap-4">
						{iconButtons.map((item) => {
							const Icon = item.icon
							return (
								<Link
									key={item.label}
									to={item.href}
									aria-label={item.label}
									className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
								>
									<Icon className="h-5 w-5" />
								</Link>
							)
						})}
					</div>
				</div>
			</Container>
		</header>
	)
}