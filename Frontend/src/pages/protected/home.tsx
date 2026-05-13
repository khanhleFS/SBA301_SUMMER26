export default function HomePage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Home</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This route is protected and rendered inside the dashboard shell.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-base font-medium">React + TypeScript</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Type-safe app structure with modern React patterns.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-base font-medium">Tailwind CSS</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Utility-first styling with a dashboard-friendly layout.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-base font-medium">Route composition</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Route groups are assembled from separate route files.
          </p>
        </div>
      </div>
    </div>
  )
}