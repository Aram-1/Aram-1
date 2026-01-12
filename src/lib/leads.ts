export type LeadPriority = 'PLATINUM' | 'GOLD' | 'STANDARD'
export type LeadStatus = 'NEW' | 'CALLED'

export type Lead = {
  id: string
  createdAt: number
  address: string
  valuation: number
  type: string
  priority: LeadPriority
  status: LeadStatus
}

const STORAGE_KEY = 'liv.leads.v1'

export function loadLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Lead[]
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((lead) => lead && typeof lead === 'object')
      .map((lead) => ({
        ...lead,
        createdAt: typeof lead.createdAt === 'number' ? lead.createdAt : Date.now(),
        valuation: typeof lead.valuation === 'number' ? lead.valuation : 0,
        status: lead.status === 'CALLED' ? 'CALLED' : 'NEW',
        priority:
          lead.priority === 'PLATINUM'
            ? 'PLATINUM'
            : lead.priority === 'GOLD'
              ? 'GOLD'
              : 'STANDARD',
      }))
  } catch {
    return []
  }
}

export function saveLeads(leads: Lead[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
}

export function formatCurrency(amount: number): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `$${Math.round(amount).toLocaleString('en-US')}`
  }
}

export function getPriorityForValuation(valuation: number): LeadPriority {
  if (valuation > 400_000) return 'PLATINUM'
  if (valuation > 150_000) return 'GOLD'
  return 'STANDARD'
}

export function parseCurrencyToNumber(raw: string): number {
  const normalized = raw.replace(/[^0-9]/g, '')
  const value = Number.parseInt(normalized || '0', 10)
  return Number.isFinite(value) ? value : 0
}

function extractMatches(text: string, regex: RegExp): string[] {
  const matches: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1] ?? match[0])
    if (!regex.global) break
  }
  return matches
}

export type ParsedLead = Omit<Lead, 'id' | 'createdAt' | 'status'>

export function parseConstructionMonitorText(text: string): ParsedLead[] {
  const valuations = extractMatches(text, /\$\s?([0-9]{1,3}(?:,[0-9]{3})+)/g).map((v) =>
    parseCurrencyToNumber(v),
  )

  const addresses = extractMatches(
    text,
    /\b(\d{1,6}\s+[A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,6}\s+(?:Rd|Road|St|Street|Ave|Avenue|Blvd|Boulevard|Dr|Drive|Ln|Lane|Ct|Court|Way|Cir|Circle|Pkwy|Parkway|Trl|Trail)\b[^\n,]*)/gi,
  ).map((a) => a.trim())

  const types = extractMatches(
    text,
    /\b(New\s+Home|Remodel|Addition|Renovation|Commercial|Tenant\s+Improvement|Foundation|Roofing|Solar)\b/gi,
  ).map((t) => t.trim())

  const count = Math.max(valuations.length, addresses.length, types.length)
  const parsed: ParsedLead[] = []

  for (let index = 0; index < count; index++) {
    const valuation = valuations[index] ?? 0
    const address = addresses[index] ?? 'Unknown Address'
    const type = types[index] ?? 'Unknown'
    const priority = getPriorityForValuation(valuation)
    parsed.push({ address, valuation, type, priority })
  }

  return parsed.filter((lead) => lead.address !== 'Unknown Address' || lead.valuation > 0)
}

export function createLeadFromParsed(parsed: ParsedLead): Lead {
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  return {
    id,
    createdAt: Date.now(),
    status: 'NEW',
    ...parsed,
  }
}

