// This adapter helps with compatibility between date-fns v4 and components expecting v2
import { format as dateFnsFormat } from "date-fns"

export function format(date: Date, formatStr: string): string {
  // Map old format tokens to new ones if needed
  let updatedFormat = formatStr

  // Common replacements for date-fns v4
  if (formatStr === "PPP") {
    updatedFormat = "PPPP" // Full date with weekday
  }

  try {
    return dateFnsFormat(date, updatedFormat)
  } catch (error) {
    console.error("Date formatting error:", error)
    return date.toDateString()
  }
}
