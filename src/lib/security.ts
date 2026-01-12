export function getTodayPin(date = new Date()): string {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const yyyymmdd = `${year}${month}${day}`

  const raw = (Number.parseInt(yyyymmdd, 10) * 3).toString()
  return raw.slice(-4).padStart(4, '0')
}

