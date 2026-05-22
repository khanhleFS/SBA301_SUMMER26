import { useNavigate } from 'react-router-dom'
import useSubmit from '../../hooks/useSubmit'

export default function LoginPage() {
  const navigate = useNavigate()

  const { isSubmitting, wrap } = useSubmit()

  const handleSubmit = wrap(async () => {
    console.log('Login submitted')
    // TODO: replace with real login API call
  })

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="mb-1 font-sans text-xl font-bold text-white sm:text-2xl">Welcome Back</h2>
        <p className="text-xs text-white/70 sm:text-sm">Continue your journey into the pages.</p>
      </div>

      {/* Login Form */}
      <form className="w-full space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="space-y-1.5">
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
        <div className="space-y-1.5">
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

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between px-1 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
  type="checkbox"
  className="peer h-4 w-4 cursor-pointer appearance-none rounded-[2px] border border-white/15 bg-[#201f24] bg-center bg-no-repeat bg-[length:12px_12px] focus:outline-none focus:ring-2 focus:ring-primary/20 checked:border-primary checked:bg-primary checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%2220%206%209%2017%204%2012%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"
/>
            <span className="text-sm text-white/75">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm font-bold text-[#d8c3ff] transition-all hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Primary Action */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border-none bg-primary text-sm font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Login
          </button>
        </div>
      </form>

      {/* Secondary Action */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">Don't have an account?</span>
          <button
            onClick={() => navigate('/register')}
            className="text-sm font-bold text-[#d8c3ff] transition-all hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}