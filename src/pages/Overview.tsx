import type { Lead } from '../lib/leads'
import { Card } from '../components/ui'
import { formatCurrency } from '../lib/leads'

export function Overview({ leads }: { leads: Lead[] }) {
  const totalValue = leads.reduce((sum, lead) => sum + (lead.valuation || 0), 0)
  const platinumCount = leads.filter((lead) => lead.priority === 'PLATINUM').length
  const pendingCount = leads.filter((lead) => lead.status === 'NEW').length

  return (
    <div>
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Overview
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-wide">Vault Intelligence</h2>
        <p className="mt-2 text-sm text-zinc-400">
          High-level KPIs extracted from the local lead vault.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Total Value" value={formatCurrency(totalValue)} sub="All leads" />
        <Card title="Platinum Leads" value={platinumCount} sub="Valuation > $400k" />
        <Card title="Pending Actions" value={pendingCount} sub="Status: New" />
      </div>

      <div className="mt-8 rounded-xl border border-zinc-900 bg-zinc-950/30 p-4 text-sm text-zinc-400">
        Numbers are rendered in a local-only environment. No backend, no external AI.
      </div>
    </div>
  )
}

