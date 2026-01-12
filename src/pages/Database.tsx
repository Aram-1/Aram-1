import type { Lead } from '../lib/leads'
import { Badge, Button } from '../components/ui'
import { formatCurrency } from '../lib/leads'
import { PhoneCall, Trash2 } from 'lucide-react'

export function Database({
  leads,
  setLeads,
}: {
  leads: Lead[]
  setLeads: (leads: Lead[]) => void
}) {
  function deleteLead(id: string) {
    setLeads(leads.filter((l) => l.id !== id))
  }

  function markCalled(id: string) {
    setLeads(
      leads.map((l) =>
        l.id === id
          ? {
              ...l,
              status: 'CALLED',
            }
          : l,
      ),
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Lead Database
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-wide">Vault Records</h2>
        <p className="mt-2 text-sm text-zinc-400">
          High-density table. All records stored locally.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/30">
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="sticky top-0 bg-zinc-950/95 text-zinc-400">
              <tr>
                <th className="px-3 py-2">Priority</th>
                <th className="px-3 py-2">Address</th>
                <th className="px-3 py-2">Valuation</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-zinc-200">
              {leads.length === 0 ? (
                <tr>
                  <td className="px-3 py-10 text-zinc-500" colSpan={6}>
                    No leads in vault. Use Ingest Data.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-zinc-900">
                    <td className="px-3 py-2">
                      <Badge
                        tone={
                          lead.priority === 'PLATINUM'
                            ? 'platinum'
                            : lead.priority === 'GOLD'
                              ? 'gold'
                              : 'neutral'
                        }
                      >
                        {lead.priority}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">{lead.address}</td>
                    <td className="px-3 py-2 font-mono">{formatCurrency(lead.valuation)}</td>
                    <td className="px-3 py-2">{lead.type}</td>
                    <td className="px-3 py-2">
                      <Badge tone={lead.status === 'CALLED' ? 'success' : 'neutral'}>
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-2">
                        <Button
                          intent="ghost"
                          onClick={() => markCalled(lead.id)}
                          disabled={lead.status === 'CALLED'}
                        >
                          <PhoneCall className="h-4 w-4" />
                          Mark Called
                        </Button>
                        <Button intent="danger" onClick={() => deleteLead(lead.id)}>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

