import {
  ArrowDownToLine,
  ArrowUpFromLine,
  BadgeCheck,
  Bell,
  Bookmark,
  Calendar,
  ChevronRight,
  History,
  List,
  Mail,
  PlayCircle,
  Settings,
  ShoppingBag,
  User,
  UserRound,
  WalletCards,
  Repeat2,
  AtSign
} from 'lucide-react'
import type React from 'react'
import Container from '@/components/shared/site/container'

const glassCardClass =
  'border border-white/20 bg-white/[0.12] dark:bg-white/[0.08] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.08)]'

const walletActions = [
  { label: 'Send', icon: ArrowUpFromLine },
  { label: 'Receive', icon: ArrowDownToLine },
  { label: 'Exchange', icon: Repeat2 },
  { label: 'Buy', icon: ShoppingBag }
]

const collectionItems = [
  { label: 'Bookmarks', icon: Bookmark },
  { label: 'Reading List', icon: List }
]

const personalInfo = [
  { label: 'Username', value: '@elaris_thorne', icon: AtSign },
  { label: 'Email Address', value: 'elaris.t@luminovels.com', icon: Mail },
  { label: 'Thanh vien tu', value: 'October 2023', icon: Calendar }
]

export default function ProfilePage() {
  return (
    <Container className="max-w-md sm:max-w-lg lg:max-w-xl">
      <section className="mb-8 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-surface-container-high">
            <User className="h-8 w-8 text-primary/40" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate font-serif text-2xl font-bold text-on-surface">
                Elaris Thorne
              </h2>
              <BadgeCheck className="h-4 w-4 shrink-0 fill-primary text-primary" />
            </div>
            <p className="text-sm font-semibold text-on-surface-variant/60">
              Thanh vien Bach kim
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container text-on-surface transition-colors hover:bg-surface-variant">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container text-on-surface transition-colors hover:bg-surface-variant">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="mb-8">
        <div className={`flex flex-col gap-6 rounded-[2rem] p-6 ${glassCardClass}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="mb-1 block text-sm font-semibold text-on-surface-variant/70">
                So du vi Lumi
              </span>
              <div className="flex flex-wrap items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-on-surface">
                  500.00
                </span>
                <span className="text-sm font-bold text-primary">Lumi Coins</span>
              </div>
            </div>
            <button className="shrink-0 rounded-full bg-primary px-5 py-2 text-xs font-bold text-on-primary shadow-lg shadow-primary/20 transition-opacity hover:opacity-90">
              Nap them
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {walletActions.map(({ label, icon: Icon }) => (
              <button key={label} className="group flex flex-col items-center gap-2">
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.10] shadow-inner transition-colors group-hover:bg-primary/10">
                  <Icon className="h-5 w-5 text-on-surface transition-colors group-hover:text-primary" />
                </div>
                <span className="text-[10px] font-semibold text-on-surface-variant">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-8">
        <section>
          <SectionTitle icon={WalletCards}>Bo suu tap</SectionTitle>
          <div className={`overflow-hidden rounded-lg ${glassCardClass}`}>
            {collectionItems.map(({ label, icon: Icon }, index) => (
              <button
                key={label}
                className={`group flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/5 ${index === 0 ? 'border-b border-outline/5' : ''
                  }`}
              >
                <span className="flex items-center gap-4">
                  <Icon className="h-5 w-5 text-primary/70 transition-colors group-hover:text-primary" />
                  <span className="text-sm font-medium text-on-surface">{label}</span>
                </span>
                <ChevronRight className="h-5 w-5 text-outline/40" />
              </button>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={History}>Reading History</SectionTitle>
          <div className={`rounded-lg p-4 ${glassCardClass}`}>
            <button className="group flex w-full gap-4 text-left">
              <div className="h-[72px] w-12 shrink-0 overflow-hidden rounded-sm shadow-lg">
                <img
                  alt="Book cover"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGLl8c3JoTxUTAXMvStFatxo3UEuaAVtwB4pIDnyKnxvJSpsC5KLnZ5zBdLlCFvEXu8ToDD_eVvU3wLD5jnwe8DSJjzhHgHMPpDySckK1MlYmrA98Zav30oQlXWDVrzs4k4R8ee3DLbCPhjy-Go9iuJUQFlYIH2P83qPZs2o2LWYj2Jzz5NJ6Gr_f-gQDoKjjEWiDOtJNpjZjBmswiffpB0-y1rA-LwJ8X6p4_1SyOHurGjDY0Hgaa3WMXHir3dC6kn38CxKTyrw"
                />
              </div>
              <div className="flex min-w-0 flex-grow flex-col justify-center">
                <h4 className="truncate text-sm font-bold text-on-surface transition-colors group-hover:text-primary">
                  The Obsidian Spires
                </h4>
                <div className="mt-2 h-1.5 w-full rounded-full bg-surface-container-highest">
                  <div className="h-full w-[72%] rounded-full bg-primary" />
                </div>
                <span className="mt-1.5 text-[11px] font-semibold text-on-surface-variant">
                  72% Completed - 2 hours ago
                </span>
              </div>
              <PlayCircle className="self-center h-6 w-6 shrink-0 fill-primary text-primary" />
            </button>
          </div>
        </section>

        <section>
          <SectionTitle icon={UserRound}>Thong tin ca nhan</SectionTitle>
          <div className={`space-y-6 rounded-lg p-6 ${glassCardClass}`}>
            {personalInfo.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary/70" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-normal text-on-surface-variant/60">
                    {label}
                  </p>
                  <p className="truncate text-sm font-medium text-on-surface">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  )
}

function SectionTitle({
  icon: Icon,
  children
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <h3 className="mb-3 flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-primary/80">
      <Icon className="h-5 w-5" />
      {children}
    </h3>
  )
}
