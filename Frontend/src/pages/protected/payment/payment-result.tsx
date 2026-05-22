import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Coins } from 'lucide-react'
import Container from '@/components/shared/site/container'

export default function PaymentResultPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/profile')
    }, 5000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <Container className="flex flex-col items-center justify-center pb-16 pt-8 text-foreground relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(55,38,94,0.08)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="flex w-full max-w-[680px] animate-fade-slide-up flex-col items-center space-y-8 relative z-10 text-center">
        <div className="relative">
          <div className="absolute inset-0 scale-150 rounded-full bg-primary opacity-20 blur-3xl"></div>
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-outline/20 bg-surface-container-high shadow-[0_0_20px_rgba(233,221,255,0.3)] md:h-32 md:w-32">
            <CheckCircle2 className="h-16 w-16 text-primary md:h-20 md:w-20" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Payment Successful!
          </h1>
          <p className="mx-auto max-w-sm text-base text-on-surface-variant">
            Your transaction has been processed safely. Redirecting to your profile shortly...
          </p>
        </div>

        <div className="w-full space-y-6 rounded-lg border border-outline/10 bg-surface-container p-6 shadow-xl md:p-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-outline/5 pb-4">
              <span className="text-sm font-semibold text-on-surface-variant">Amount Paid</span>
              <span className="font-serif text-2xl font-bold text-on-surface">500,000 VND</span>
            </div>
            <div className="flex items-center justify-between border-b border-outline/5 pb-4">
              <span className="text-sm font-semibold text-on-surface-variant">Transaction ID</span>
              <span className="font-mono text-sm font-semibold text-on-surface">TXN-8829-LM-2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-on-surface-variant">New Balance</span>
              <div className="flex items-center gap-1">
                <Coins className="h-5 w-5 text-tertiary" />
                <span className="text-sm font-bold text-tertiary">7,500 Lumi Coins</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col gap-4 pt-6 md:flex-row">
          <button className="btn-primary flex-1">
            Continue Reading
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex h-[48px] flex-1 items-center justify-center rounded-xl border border-outline/20 bg-surface-container-high font-bold text-on-surface shadow-sm transition-all hover:bg-surface-bright active:scale-95"
          >
            Back to Profile
          </button>
        </div>

        <p className="pt-4 text-xs font-medium text-on-surface-variant">
          Having trouble? <a className="text-primary hover:underline" href="#">Contact LumiSupport</a>
        </p>
      </div>
    </Container>
  )
}
