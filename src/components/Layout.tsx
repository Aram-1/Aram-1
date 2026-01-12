import { Database, Gauge, Settings, UploadCloud } from 'lucide-react'
import { cn } from '../lib/ui'

export type RouteKey = 'overview' | 'ingest' | 'database' | 'settings'

export function Layout({
  route,
  setRoute,
  children,
}: {
  route: RouteKey
  setRoute: (route: RouteKey) => void
  children: React.ReactNode
}) {
  const items: Array<{ key: RouteKey; label: string; icon: React.ReactNode }> = [
    { key: 'overview', label: 'Overview', icon: <Gauge className="h-4 w-4" /> },
    { key: 'ingest', label: 'Ingest Data', icon: <UploadCloud className="h-4 w-4" /> },
    { key: 'database', label: 'Lead Database', icon: <Database className="h-4 w-4" /> },
    { key: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <aside className="hidden w-64 flex-col border-r border-zinc-900 bg-zinc-950/40 p-4 md:flex">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Vault System
            </div>
            <div className="mt-2 text-lg font-bold tracking-wide">LIV // BLACK OPS</div>
          </div>

          <nav className="mt-4 space-y-1">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => setRoute(item.key)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition',
                  'focus:outline-none focus:ring-2 focus:ring-red-500/60',
                  route === item.key
                    ? 'border-red-500/30 bg-red-500/10 text-red-100'
                    : 'border-transparent bg-transparent text-zinc-300 hover:border-zinc-800 hover:bg-zinc-900/40',
                )}
              >
                <span className="text-zinc-300">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 text-xs text-zinc-500">
            Storage: Local vault only (localStorage).
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <div className="text-sm font-bold tracking-wide">Lead Intelligence Vault</div>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value as RouteKey)}
              className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-sm"
            >
              {items.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}

