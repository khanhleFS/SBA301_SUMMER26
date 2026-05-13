export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Guest route example for new users.
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input className="h-10 w-full rounded-md border bg-background px-3 text-sm" type="text" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input className="h-10 w-full rounded-md border bg-background px-3 text-sm" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input className="h-10 w-full rounded-md border bg-background px-3 text-sm" type="password" placeholder="••••••••" />
        </div>
        <button className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
          Create account
        </button>
      </form>
    </div>
  )
}