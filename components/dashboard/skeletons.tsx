export function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-secondary ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

function CardShell({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-3xl border border-border bg-card p-5 ${className}`}>
      {children}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Shimmer className="h-6 w-44" />
          <Shimmer className="h-3.5 w-28" />
        </div>
        <Shimmer className="h-11 w-11 rounded-full" />
      </div>

      {/* streak */}
      <CardShell className="h-44">
        <Shimmer className="h-3.5 w-24" />
        <Shimmer className="mt-4 h-16 w-32" />
        <Shimmer className="mt-4 h-3 w-full" />
      </CardShell>

      {/* progress */}
      <CardShell>
        <div className="flex items-center justify-between">
          <Shimmer className="h-4 w-28" />
          <Shimmer className="h-4 w-16" />
        </div>
        <Shimmer className="mt-4 h-3 w-full rounded-full" />
      </CardShell>

      {/* stat row */}
      <div className="grid grid-cols-2 gap-4">
        <CardShell className="h-24" >
          <Shimmer className="h-4 w-4 rounded" />
          <Shimmer className="mt-3 h-6 w-20" />
        </CardShell>
        <CardShell className="h-24">
          <Shimmer className="h-4 w-4 rounded" />
          <Shimmer className="mt-3 h-6 w-20" />
        </CardShell>
      </div>

      {/* mission */}
      <CardShell className="h-40">
        <Shimmer className="h-4 w-28" />
        <Shimmer className="mt-3 h-6 w-3/4" />
        <Shimmer className="mt-6 h-11 w-full rounded-xl" />
      </CardShell>

      {/* coach */}
      <CardShell className="h-32">
        <div className="flex gap-3">
          <Shimmer className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-3.5 w-full" />
            <Shimmer className="h-3.5 w-5/6" />
          </div>
        </div>
      </CardShell>

      {/* heatmap */}
      <CardShell>
        <Shimmer className="h-4 w-40" />
        <div className="mt-4 flex justify-between gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Shimmer key={i} className="h-10 flex-1 rounded-xl" />
          ))}
        </div>
      </CardShell>
    </div>
  )
}
