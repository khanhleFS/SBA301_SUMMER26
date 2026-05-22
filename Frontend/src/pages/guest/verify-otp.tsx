import { useState, useRef, useEffect } from 'react'
import type { ClipboardEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function VerifyOtpPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timeLeft <= 0) return
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timerId)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus()
    }
  }

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]

    // Take the last character if they typed multiple characters
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Move to next input if value is entered, or blur if it's the last one
    if (value) {
      if (index < 5) {
        focusInput(index + 1)
      } else {
        inputRefs.current[5]?.blur()
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Prevent typing if all 6 are filled, unless it's a delete or arrow key, or they are replacing the current digit
    if (
      otp.join('').length === 6 &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Tab' &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      // If the input doesn't have selected text, prevent the new keystroke
      const target = e.target as HTMLInputElement
      if (target.selectionStart === target.selectionEnd) {
        e.preventDefault()
      }
    }

    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      focusInput(index - 1)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight' && index < 5) {
      focusInput(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty input or blur if full
    const nextIndex = Math.min(pastedData.length, 5)
    if (pastedData.length === 6) {
      inputRefs.current[5]?.blur()
    } else {
      focusInput(nextIndex)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length === 6) {
      console.log('Verifying OTP:', otpValue)
      // Navigate to success or home
      // navigate('/')
    }
  }

  const handleResend = () => {
    console.log('Resend OTP logic here')
    setTimeLeft(300)
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="text-center">
    <h2 className="mb-1 font-sans text-xl font-bold text-white sm:text-2xl">Verify Email</h2>
    <p className="text-xs text-white/70 sm:text-sm">We've sent a 6-digit code to your email.</p>
      </div>

      {/* OTP Form */}
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={2}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              onPaste={handlePaste}
              className="h-9 w-9 rounded-sm border border-white/10 bg-[#201f24] text-center text-base font-bold text-white transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:h-10 sm:w-10 sm:text-lg"
            />
          ))}
        </div>

        {/* Primary Action */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={otp.join('').length !== 6}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border-none bg-primary text-sm font-bold text-on-primary shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verify Account
          </button>
        </div>
      </form>

      {/* Secondary Action */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">Didn't receive the code?</span>
          <button
            type="button"
            disabled={timeLeft > 0}
            className={`text-sm font-bold transition-all ${timeLeft > 0
              ? 'cursor-not-allowed text-white/45'
              : 'text-[#d8c3ff] hover:underline'
              }`}
            onClick={handleResend}
          >
            {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend OTP'}
          </button>
        </div>
      </div>
      {/* Back Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/register')}
          className="flex items-center gap-2 text-sm font-medium text-[#d8c3ff] transition-opacity hover:opacity-80"
        >
          <ArrowLeft size={16} />
          Back to Register
        </button>
      </div>
    </div>
  )
}
