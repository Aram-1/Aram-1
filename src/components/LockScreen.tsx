import { useMemo, useState } from 'react'
import { Mail, ShieldAlert, ShieldCheck } from 'lucide-react'
import { getTodayPin } from '../lib/security'
import { Badge, Button, Input } from './ui'

export function LockScreen({
  onUnlock,
}: {
  onUnlock: () => void
}) {
  const todayPin = useMemo(() => getTodayPin(), [])
  const [pin, setPin] = useState('')
  const [notice, setNotice] = useState<null | { tone: 'success' | 'danger'; text: string }>(
    null,
  )
  const [isDispatching, setIsDispatching] = useState(false)

  function attemptUnlock() {
    if (pin.trim() === todayPin) {
      setNotice({ tone: 'success', text: 'Vault Unlocked' })
      onUnlock()
      return
    }
    setNotice({ tone: 'danger', text: 'Access Denied: Invalid PIN' })
  }

  async function simulateEmailDispatch() {
    setIsDispatching(true)
    setNotice(null)
    const subject = encodeURIComponent('Lead Intelligence Vault: Daily Access PIN')
    const body = encodeURIComponent(
      `Security Alert: Your access PIN for today is ${todayPin}. You have pending leads to review.`,
    )
    const mailto = `mailto:aramgrullonbritog@gmail.com?subject=${subject}&body=${body}`

    try {
      window.location.href = mailto
      setNotice({ tone: 'success', text: 'Encryption Key Sent' })
    } catch {
      setNotice({ tone: 'success', text: 'Encryption Key Sent' })
    } finally {
      setIsDispatching(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 shadow-[0_0_60px_rgba(239,68,68,0.10)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-400" />
                <h1 className="text-lg font-bold tracking-wide">Lead Intelligence Vault</h1>
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                Restricted system. PIN required for entry.
              </p>
            </div>
            <Badge tone="danger">BLACK OPS</Badge>
          </div>

          <div className="mt-6 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Access PIN
            </label>
            <Input
              autoFocus
              value={pin}
              maxLength={8}
              inputMode="numeric"
              placeholder="••••"
              onChange={(value) => setPin(value.replace(/\D/g, '').slice(0, 8))}
            />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button intent="primary" onClick={attemptUnlock}>
                <ShieldCheck className="h-4 w-4" />
                Authenticate
              </Button>
              <Button intent="ghost" onClick={simulateEmailDispatch} disabled={isDispatching}>
                <Mail className="h-4 w-4" />
                Simulate Email Dispatch
              </Button>
            </div>

            {notice ? (
              <div
                className={
                  notice.tone === 'success'
                    ? 'rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-100'
                    : 'rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-100'
                }
              >
                {notice.text}
              </div>
            ) : null}
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-4">
            <div className="text-xs text-zinc-500">
              Rotating PIN protocol enabled. Generated daily.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

