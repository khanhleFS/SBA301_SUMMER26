import { useNavigate } from 'react-router-dom'
import { Coins, CheckCircle2, Landmark, Zap } from 'lucide-react'
import Container from '@/components/shared/site/container'
import { WalletCard } from '@/features/profile/components/wallet-card'

export default function PaymentCreatePage() {
  const navigate = useNavigate()

  return (
    <Container className="pb-16 pt-10 text-foreground max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-on-surface">Payment</h1>
        <p className="mt-2 text-lg text-on-surface-variant">Top up your Lumi Coins balance to continue reading.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column - Packages */}
        <div className="lg:col-span-7 space-y-8">
          <section>
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-on-surface">Choose Amount</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { coins: '200', price: '20,000 VND' },
                { coins: '550', price: '50,000 VND' },
                { coins: '1,150', price: '100,000 VND' },
                { coins: '2,400', price: '200,000 VND' },
                { coins: '6,250', price: '500,000 VND' },
              ].map((pkg, idx) => (
                <label key={pkg.coins} className="group relative cursor-pointer">
                  <input
                    defaultChecked={idx === 0}
                    className="peer sr-only"
                    name="recharge"
                    type="radio"
                  />
                  <div className="flex h-full flex-col justify-between rounded-md border border-outline/20 bg-surface-container-low p-5 transition-all hover:bg-surface-container hover:shadow-md peer-checked:border-primary peer-checked:bg-primary/20 peer-checked:text-primary peer-checked:shadow-sm peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2 peer-checked:ring-offset-background">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high transition-colors peer-checked:bg-primary/10">
                          <Coins className="h-5 w-5 text-tertiary transition-colors peer-checked:text-primary" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-on-surface">{pkg.coins} Coins</p>
                        </div>
                      </div>
                      <CheckCircle2 className="h-6 w-6 scale-50 text-primary opacity-0 transition-all peer-checked:scale-100 peer-checked:opacity-100" />
                    </div>
                    <div className="mt-4 pt-4 border-t border-outline/10">
                      <p className="text-lg font-bold text-on-surface-variant">
                        {pkg.price}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Summary & Payment */}
        <div className="lg:col-span-5 space-y-6">
          <WalletCard showActions={false} />

          <section className="rounded-lg border border-outline/10 bg-surface-container p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="font-serif text-xl font-bold text-on-surface">Payment Method</h2>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'VNPay', icon: Landmark },
              ].map((method, idx) => (
                <label key={method.label} className="flex cursor-pointer items-center justify-between rounded-md border border-outline/10 bg-surface p-4 transition-all hover:border-primary/30 hover:bg-surface-container-high has-[:checked]:border-primary has-[:checked]:bg-primary/20 has-[:checked]:text-primary has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:ring-offset-2 has-[:checked]:ring-offset-background">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest">
                      <method.icon className="h-5 w-5 text-on-surface-variant" />
                    </div>
                    <span className="text-sm font-bold text-on-surface">{method.label}</span>
                  </div>
                  <input defaultChecked={idx === 0} className="radio radio-primary radio-sm" name="method" type="radio" />
                </label>
              ))}
            </div>
          </section>

          <div className="pt-4">
            <button
              onClick={() => navigate('/payment/loading')}
              className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-lg rounded-md shadow-md hover:shadow-lg transition-all"
            >
              <Zap className="h-5 w-5 fill-current" />
              Confirm Recharge
            </button>
            <p className="mt-4 text-center text-xs font-semibold text-on-surface-variant">
              By tapping Confirm, you agree to our <a className="text-primary hover:underline" href="#">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
