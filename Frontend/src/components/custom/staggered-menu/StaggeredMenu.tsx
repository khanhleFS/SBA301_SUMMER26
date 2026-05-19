"use client"

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { User, Sun, Moon, LogOut, SunMoon, Check } from 'lucide-react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

export interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface SocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  isDark?: boolean;
  toggleTheme?: () => void;
  themeMode?: 'light' | 'dark' | 'system';
  setThemeMode?: (mode: 'light' | 'dark' | 'system') => void;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  isDark = false,
  toggleTheme,
  themeMode = 'system',
  setThemeMode
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const lineMiddleRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const mid = lineMiddleRef.current;
      const icon = iconRef.current;
      if (!panel || !plusH || !plusV || !mid || !icon) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll<HTMLElement>('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
      
      // Hamburger Initial State
      gsap.set(plusH, { y: -5, rotate: 0 });
      gsap.set(mid, { y: 0, opacity: 1 });
      gsap.set(plusV, { y: 5, rotate: 0 });
      gsap.set(icon, { rotate: 0 });
      
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position, mounted]);

  // Handle dynamic positioning of the toggle button when portaled
  useLayoutEffect(() => {
    if (!mounted || !toggleBtnRef.current || !placeholderRef.current) return;
    
    let rafId: number;
    const updatePosition = () => {
      const rect = placeholderRef.current?.getBoundingClientRect();
      if (rect && toggleBtnRef.current) {
        toggleBtnRef.current.style.top = `${rect.top}px`;
        toggleBtnRef.current.style.left = `${rect.left}px`;
        toggleBtnRef.current.style.width = `${rect.width}px`;
        toggleBtnRef.current.style.height = `${rect.height}px`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
    };
  }, [mounted, open]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const panelStart = offscreen;

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    
    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const top = plusHRef.current;
    const mid = lineMiddleRef.current;
    const bot = plusVRef.current;
    if (!icon || !top || !mid || !bot) return;
    
    gsap.to(icon, { rotate: opening ? 180 : 0, duration: 0.6, ease: 'power4.out' });
    
    if (opening) {
      gsap.to(top, { y: 0, rotate: 45, duration: 0.5, ease: 'power4.out' });
      gsap.to(mid, { opacity: 0, duration: 0.3 });
      gsap.to(bot, { y: 0, rotate: -45, duration: 0.5, ease: 'power4.out' });
    } else {
      gsap.to(top, { y: -5, rotate: 0, duration: 0.5, ease: 'power4.out' });
      gsap.to(mid, { opacity: 1, duration: 0.3 });
      gsap.to(bot, { y: 5, rotate: 0, duration: 0.5, ease: 'power4.out' });
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );


  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (open) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`${className} staggered-menu-wrapper`}
      style={{ '--sm-accent': accentColor } as React.CSSProperties}
      data-position={position}
      data-open={open || undefined}
    >
      {/* Placeholder in the DOM flow to maintain layout */}
      <div ref={placeholderRef} className="sm-toggle-placeholder" aria-hidden="true" />

      {mounted && createPortal(
        <>
          {/* Toggle Button moved to Portal to escape Header's stacking context */}
          <button
            ref={toggleBtnRef}
            className="sm-toggle sm-toggle-portal"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
            data-open={open || undefined}
          >
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={plusHRef} className="sm-icon-line" />
              <span ref={lineMiddleRef} className="sm-icon-line" />
              <span ref={plusVRef} className="sm-icon-line" />
            </span>
          </button>

          <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true" data-open={open || undefined}>
            {(() => {
              const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
              let arr = [...raw];
              if (arr.length >= 3) {
                const mid = Math.floor(arr.length / 2);
                arr.splice(mid, 1);
              }
              return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
            })()}
          </div>

          <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open} data-open={open || undefined} data-position={position}>
            <div className="sm-panel-inner">
              <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                {items && items.length ? (
                  items.map((it, idx) => (
                    <li className="sm-panel-itemWrap" key={it.label + idx}>
                      <Link className="sm-panel-item" to={it.link} aria-label={it.ariaLabel} data-index={idx + 1} onClick={closeMenu}>
                        <span className="sm-panel-itemLabel">{it.label}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="sm-panel-itemWrap" aria-hidden="true">
                    <span className="sm-panel-item">
                      <span className="sm-panel-itemLabel">No items</span>
                    </span>
                  </li>
                )}
              </ul>
              
              <div className="sm-socials mt-auto pt-4 border-t border-border/10 flex flex-col w-full" aria-label="Tài khoản và cài đặt giao diện">
                
                {/* 3-Mode Visual Square Cards Grid */}
                <div className="sm-socials-link grid grid-cols-3 gap-2.5 w-full mb-4 select-none">
                  
                  {/* Light Mode Card */}
                  <div 
                    onClick={() => setThemeMode?.('light')} 
                    className={`relative w-full py-3 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all hover:scale-102 border ${
                      themeMode === 'light' 
                        ? 'border-primary bg-primary/20 text-primary shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'border-border/40 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {themeMode === 'light' && (
                      <div 
                        style={{ backgroundColor: '#4F378A' }}
                        className="absolute -top-1 -right-1 h-4 w-4 text-white rounded-full flex items-center justify-center z-10 shadow-sm border border-background"
                      >
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                      </div>
                    )}
                    <Sun className="h-5 w-5 mb-1.5" />
                    <span className="text-[10px] font-bold">
                      Sáng
                    </span>
                  </div>

                  {/* Dark Mode Card */}
                  <div 
                    onClick={() => setThemeMode?.('dark')} 
                    className={`relative w-full py-3 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all hover:scale-102 border ${
                      themeMode === 'dark' 
                        ? 'border-primary bg-primary/20 text-primary shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'border-border/40 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {themeMode === 'dark' && (
                      <div 
                        style={{ backgroundColor: '#4F378A' }}
                        className="absolute -top-1 -right-1 h-4 w-4 text-white rounded-full flex items-center justify-center z-10 shadow-sm border border-background"
                      >
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                      </div>
                    )}
                    <Moon className="h-5 w-5 mb-1.5" />
                    <span className="text-[10px] font-bold">
                      Tối
                    </span>
                  </div>

                  {/* System Mode Card */}
                  <div 
                    onClick={() => setThemeMode?.('system')} 
                    className={`relative w-full py-3 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all hover:scale-102 border ${
                      themeMode === 'system' 
                        ? 'border-primary bg-primary/20 text-primary shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'border-border/40 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {themeMode === 'system' && (
                      <div 
                        style={{ backgroundColor: '#4F378A' }}
                        className="absolute -top-1 -right-1 h-4 w-4 text-white rounded-full flex items-center justify-center z-10 shadow-sm border border-background"
                      >
                        <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                      </div>
                    )}
                    <SunMoon className="h-5 w-5 mb-1.5" />
                    <span className="text-[10px] font-bold">
                      Hệ thống
                    </span>
                  </div>

                </div>

                {/* User Row: (avt) user name (logout icon) */}
                <div className="sm-socials-link flex items-center justify-between gap-3 w-full pt-1">
                  <div className="flex items-center gap-3">
                    {/* (avt) Avatar */}
                    <Link 
                      to="/profile" 
                      className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 flex items-center justify-center text-primary transition-all hover:scale-105" 
                      onClick={closeMenu}
                      title="Hồ sơ cá nhân"
                    >
                      <User className="h-4.5 w-4.5" />
                    </Link>
                    {/* User Name */}
                    <span className="text-xs font-semibold text-foreground truncate max-w-[150px]">
                      Khánh Lê
                    </span>
                  </div>

                  {/* (logout icon) Logout Icon Button */}
                  <button 
                    onClick={() => {
                      alert('Đăng xuất thành công!');
                      closeMenu();
                    }}
                    className="h-8 w-8 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors bg-transparent border-0 outline-none cursor-pointer"
                    title="Đăng xuất"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
          
          <div className="sm-backdrop" onClick={closeMenu} aria-hidden="true" data-open={open || undefined} />
        </>,
        document.body
      )}
    </div>
  );
};

export default StaggeredMenu;
