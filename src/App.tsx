import { useEffect, useMemo, useState } from 'react'
import { LockScreen } from './components/LockScreen'
import { Layout, type RouteKey } from './components/Layout'
import type { Lead } from './lib/leads'
import { loadLeads, saveLeads } from './lib/leads'
import { Overview } from './pages/Overview'
import { Ingest } from './pages/Ingest'
import { Database } from './pages/Database'
import { Settings } from './pages/Settings'

function useLocalStorageLeads() {
  const [leads, setLeads] = useState<Lead[]>(() => loadLeads())
  useEffect(() => {
    saveLeads(leads)
  }, [leads])
  return { leads, setLeads }
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const { leads, setLeads } = useLocalStorageLeads()
  const [route, setRoute] = useState<RouteKey>('overview')

  const sortedLeads = useMemo(() => {
    const weight: Record<string, number> = { PLATINUM: 3, GOLD: 2, STANDARD: 1 }
    return [...leads].sort((a, b) => {
      const byPriority = (weight[b.priority] ?? 0) - (weight[a.priority] ?? 0)
      if (byPriority !== 0) return byPriority
      if (b.valuation !== a.valuation) return b.valuation - a.valuation
      return b.createdAt - a.createdAt
    })
  }, [leads])

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />
  }

  return (
    <Layout route={route} setRoute={setRoute}>
      {route === 'overview' ? <Overview leads={sortedLeads} /> : null}
      {route === 'ingest' ? <Ingest leads={sortedLeads} setLeads={setLeads} /> : null}
      {route === 'database' ? <Database leads={sortedLeads} setLeads={setLeads} /> : null}
      {route === 'settings' ? <Settings setLeads={setLeads} /> : null}
    </Layout>
  )
}
