import { useNavigate } from 'react-router-dom'
import useSubmit from '../../hooks/useSubmit'

export default function RegisterPage() {
  const navigate = useNavigate()

  const { isSubmitting, wrap } = useSubmit()

  const handleSubmit = wrap(async () => {
    console.log('Register submitted')
    // TODO: call registration API
    navigate('/verify-otp')
  })

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="mb-1 font-sans text-xl font-bold text-white sm:text-2xl">Create an Account</h2>
        <p className="text-xs text-white/70 sm:text-sm">Join the community of readers.</p>
      </div>

      {/* Register Form */}
      <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="ml-1 block text-sm font-medium text-white/75" htmlFor="name">
            Full Name
          </label>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-white/10 bg-[#201f24] px-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-primary focus:outline-none"
              id="name"
              placeholder="John Doe"
              type="text"
              required
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5 sm:col-span-1">
          <label className="ml-1 block text-sm font-medium text-white/75" htmlFor="phone">
            Phone Number
          </label>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-white/10 bg-[#201f24] px-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-primary focus:outline-none"
              id="phone"
              placeholder="0912345678"
              type="tel"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="ml-1 block text-sm font-medium text-white/75" htmlFor="email">
            Email Address
          </label>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-white/10 bg-[#201f24] px-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-primary focus:outline-none"
              id="email"
              placeholder="name@domain.com"
              type="email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1 sm:col-span-2">
          <div className="flex items-center justify-between px-1">
            <label className="block text-sm font-medium text-white/75" htmlFor="password">
              Password
            </label>
          </div>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-white/10 bg-[#201f24] px-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-primary focus:outline-none"
              id="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1 sm:col-span-2">
          <div className="flex items-center justify-between px-1">
            <label className="block text-sm font-medium text-white/75" htmlFor="confirmPassword">
              Confirm Password
            </label>
          </div>
          <div className="group relative rounded-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <input
              className="h-10 w-full rounded-sm border border-white/10 bg-[#201f24] px-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-primary focus:outline-none"
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
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
            Create Account
          </button>
        </div>
      </form>

      {/* Secondary Action */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">Already have an account?</span>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-[#d8c3ff] transition-all hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}