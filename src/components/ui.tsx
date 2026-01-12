import type { ReactNode } from 'react'
import { cn } from '../lib/ui'

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'gold' | 'platinum' | 'danger' | 'success'
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-zinc-800 text-zinc-200 border-zinc-700',
    gold: 'bg-yellow-500/15 text-yellow-200 border-yellow-500/30',
    platinum: 'bg-red-500/15 text-red-200 border-red-500/30',
    danger: 'bg-red-500/10 text-red-200 border-red-500/20',
    success: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide',
        tones[tone] ?? tones.neutral,
      )}
    >
      {children}
    </span>
  )
}

export function Button({
  children,
  onClick,
  type = 'button',
  intent = 'default',
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  intent?: 'default' | 'primary' | 'ghost' | 'danger'
  disabled?: boolean
}) {
  const intents: Record<string, string> = {
    default:
      'border-zinc-700 bg-zinc-900/50 text-zinc-100 hover:bg-zinc-900/80',
    primary:
      'border-red-500/40 bg-red-500/15 text-red-100 hover:bg-red-500/25',
    ghost: 'border-transparent bg-transparent text-zinc-200 hover:bg-zinc-800/60',
    danger:
      'border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/20',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition',
        'focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:ring-offset-0',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        intents[intent] ?? intents.default,
      )}
    >
      {children}
    </button>
  )
}

export function Card({
  title,
  value,
  sub,
}: {
  title: string
  value: ReactNode
  sub?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {title}
      </div>
      <div className="mt-2 font-mono text-2xl font-bold text-zinc-100">{value}</div>
      {sub ? <div className="mt-2 text-xs text-zinc-400">{sub}</div> : null}
    </div>
  )
}

export function Input({
  value,
  onChange,
  placeholder,
  inputMode,
  maxLength,
  autoFocus,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  maxLength?: number
  autoFocus?: boolean
}) {
  return (
    <input
      autoFocus={autoFocus}
      value={value}
      maxLength={maxLength}
      inputMode={inputMode}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2',
        'text-sm text-zinc-100 placeholder:text-zinc-500',
        'focus:outline-none focus:ring-2 focus:ring-red-500/60',
      )}
    />
  )
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 10,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2',
        'font-mono text-xs leading-relaxed text-zinc-100 placeholder:text-zinc-500',
        'focus:outline-none focus:ring-2 focus:ring-red-500/60',
      )}
    />
  )
}

