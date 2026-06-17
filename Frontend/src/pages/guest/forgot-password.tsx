import { useNavigate } from 'react-router-dom'
import useSubmit from '../../hooks/useSubmit'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
    const navigate = useNavigate()

    const { isSubmitting, wrap } = useSubmit()

    const handleSubmit = wrap(async () => {
        console.log('Forgot password submitted')
        // TODO: call forgot-password API
    })

    return (
        <div className="w-full space-y-6">
            {/* Header Section */}
            <div className="text-center">
                <h2 className="mb-1 font-sans text-xl font-bold text-white sm:text-2xl">Reset Password</h2>
                <p className="text-xs text-white/70 sm:text-sm">Enter your email to receive reset instructions.</p>
            </div>

            {/* Forgot Password Form */}
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

                {/* Primary Action */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-md border-none bg-primary text-sm font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Send Reset Link
                    </button>
                </div>
            </form>

            {/* Secondary Action */}
            <div className="flex justify-center">
                <button
                    onClick={() => navigate('/login', { replace: true })}
                    className="flex items-center gap-2 text-sm font-medium text-[#d8c3ff] transition-opacity hover:opacity-80"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </button>
            </div>
        </div>
    )
}