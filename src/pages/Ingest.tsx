import { useMemo, useState } from 'react'
import type { Lead } from '../lib/leads'
import {
  createLeadFromParsed,
  parseConstructionMonitorText,
  formatCurrency,
} from '../lib/leads'
import { Badge, Button, Textarea } from '../components/ui'
import { FileSearch, ShieldPlus, Trash2 } from 'lucide-react'

export function Ingest({
  leads,
  setLeads,
}: {
  leads: Lead[]
  setLeads: (leads: Lead[]) => void
}) {
  const [raw, setRaw] = useState('')
  const parsed = useMemo(() => parseConstructionMonitorText(raw), [raw])
  const platinumCount = parsed.filter((l) => l.priority === 'PLATINUM').length
  const goldCount = parsed.filter((l) => l.priority === 'GOLD').length

  function ingestParsed() {
    const created = parsed.map((p) => createLeadFromParsed(p))
    setLeads([...created, ...leads])
    setRaw('')
  }

  return (
    <div>
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Ingest Data
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-wide">The Parser</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Paste Construction Monitor PDF text. Regex extraction runs locally.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-900 bg-zinc-950/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-zinc-200">Raw Intake</div>
            <Button intent="ghost" onClick={() => setRaw('')} disabled={!raw}>
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
          <Textarea
            value={raw}
            onChange={setRaw}
            rows={16}
            placeholder={
              'Paste text here. Example:\nValuation: $521,096\nAddress: 544 Robie Creek Rd\nType: New Home'
            }
          />
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <Badge tone="neutral">Matches: {parsed.length}</Badge>
            <Badge tone="platinum">PLATINUM: {platinumCount}</Badge>
            <Badge tone="gold">GOLD: {goldCount}</Badge>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-900 bg-zinc-950/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSearch className="h-4 w-4 text-zinc-300" />
              <div className="text-sm font-semibold text-zinc-200">Parsed Preview</div>
            </div>
            <Button intent="primary" onClick={ingestParsed} disabled={parsed.length === 0}>
              <ShieldPlus className="h-4 w-4" />
              Save to Vault
            </Button>
          </div>

          <div className="max-h-[28rem] overflow-auto rounded-lg border border-zinc-900">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="sticky top-0 bg-zinc-950/90 text-zinc-400">
                <tr>
                  <th className="px-3 py-2">Priority</th>
                  <th className="px-3 py-2">Address</th>
                  <th className="px-3 py-2">Valuation</th>
                  <th className="px-3 py-2">Type</th>
                </tr>
              </thead>
              <tbody className="text-zinc-200">
                {parsed.length === 0 ? (
                  <tr>
                    <td className="px-3 py-6 text-zinc-500" colSpan={4}>
                      No matches yet.
                    </td>
                  </tr>
                ) : (
                  parsed.map((lead, index) => (
                    <tr key={index} className="border-t border-zinc-900">
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

