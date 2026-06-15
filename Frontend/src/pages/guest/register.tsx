import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSubmit from '../../hooks/useSubmit'
import { api } from '../../lib/api'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { isSubmitting, wrap } = useSubmit()

  const handleSubmit = wrap(async () => {
    setError(null)
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không trùng khớp.')
      return
    }

    try {
      const response = await api.post('/auth/register', {
        fullName,
        phone,
        email,
        password,
        confirmPassword,
        address,
        isActive: false
      })

      if (response.data && response.data.code === 200) {
        // Redirect to OTP verification, passing email via state
        navigate('/verify-otp', { state: { email } })
      } else {
        setError(response.data?.message || 'Đăng ký thất bại')
      }
    } catch (err: any) {
      setError(err?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.')
    }
  })

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="mb-1 font-sans text-xl font-bold text-foreground sm:text-2xl">Create an Account</h2>
        <p className="text-xs text-muted-foreground sm:text-sm">Join the community of readers.</p>
      </div>

      {error && (
        <div className="alert alert-error rounded-sm text-xs py-2 px-3 text-error-content">
          <span>{error}</span>
        </div>
      )}

      {/* Register Form */}
      <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="ml-1 block text-sm font-medium text-foreground/75" htmlFor="name">
            Full Name
          </label>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-border bg-muted/40 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              id="name"
              placeholder="John Doe"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="ml-1 block text-sm font-medium text-foreground/75" htmlFor="phone">
            Phone Number
          </label>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-border bg-muted/40 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              id="phone"
              placeholder="0912345678"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="ml-1 block text-sm font-medium text-foreground/75" htmlFor="email">
            Email Address
          </label>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-border bg-muted/40 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              id="email"
              placeholder="name@domain.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1 sm:col-span-2">
          <div className="flex items-center justify-between px-1">
            <label className="block text-sm font-medium text-foreground/75" htmlFor="password">
              Password
            </label>
          </div>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-border bg-muted/40 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1 sm:col-span-2">
          <div className="flex items-center justify-between px-1">
            <label className="block text-sm font-medium text-foreground/75" htmlFor="confirmPassword">
              Confirm Password
            </label>
          </div>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-border bg-muted/40 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Primary Action */}
        <div className="pt-2 sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border-none bg-primary text-sm font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </form>

      {/* Secondary Action */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Already have an account?</span>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-primary transition-all hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}