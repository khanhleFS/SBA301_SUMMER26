import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, Moon, Sun, BookOpen } from 'lucide-react'
import Container from './container'
import StaggeredMenu from '@/components/creative/staggered-menu/StaggeredMenu'

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(prev => (prev === scrolled ? prev : scrolled))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      setIsDark(false)
    } else {
      html.classList.add('dark')
      setIsDark(true)
    }
  }

  const baseMenuItems = useMemo(() => [
    { label: 'Trang chủ', link: '/' },
    { label: 'Khám phá', link: '/discover' },
    { label: 'Thư viện', link: '/library' },
    { label: 'Viết lách', link: '/write' },
  ], [])

  const socialItems = useMemo(() => [
    { label: 'FB', link: '#' },
    { label: 'IG', link: '#' },
    { label: 'X', link: '#' },
  ], [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-[background-color,padding,border-color,backdrop-filter] duration-300 py-4 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5' : 'bg-transparent'
        }`}
    >
      <Container className="flex items-center justify-between gap-6">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white dark:text-background" />
          </div>
          <span className="font-bold text-xl md:text-2xl tracking-tighter text-primary">Storya</span>
        </Link>

        {/* Search Bar - Center (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm truyện, tác giả..."
            className="w-full bg-muted border border-border/50 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link to="/account" className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted transition-colors text-foreground">
            <User className="h-5 w-5" />
          </Link>

          <StaggeredMenu
            items={baseMenuItems}
            socialItems={socialItems}
            accentColor="var(--primary)"
            colors={['var(--lumina-dim)', 'var(--primary)']}
            menuButtonColor="var(--foreground)"
            openMenuButtonColor="var(--foreground)"
          />
        </div>
      </Container>
    </header>
  )
}