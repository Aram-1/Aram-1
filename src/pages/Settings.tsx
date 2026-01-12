import type { Lead } from '../lib/leads'
import { Button } from '../components/ui'
import { getTodayPin } from '../lib/security'
import { Eraser, KeyRound } from 'lucide-react'

export function Settings({
  setLeads,
}: {
  setLeads: (leads: Lead[]) => void
}) {
  function wipeVault() {
    localStorage.removeItem('liv.leads.v1')
    setLeads([])
  }

  return (
    <div>
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Settings
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-wide">Vault Controls</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Local-only configuration. No server-side operations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-900 bg-zinc-950/30 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <KeyRound className="h-4 w-4" />
            Daily PIN
          </div>
          <div className="mt-3 rounded-lg border border-zinc-900 bg-zinc-950/40 p-3 font-mono text-lg">
            {getTodayPin()}
          </div>
          <div className="mt-2 text-xs text-zinc-500">
            Derived from date: (YYYYMMDD * 3).slice(-4)
          </div>
        </div>

        <div className="rounded-xl border border-zinc-900 bg-zinc-950/30 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <Eraser className="h-4 w-4" />
            Vault Reset
          </div>
          <div className="mt-2 text-xs text-zinc-500">
            Deletes all local lead records from this browser.
          </div>
          <div className="mt-4">
            <Button intent="danger" onClick={wipeVault}>
              <Eraser className="h-4 w-4" />
              Wipe Vault
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

