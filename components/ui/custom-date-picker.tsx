"use client"

import * as React from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomDatePickerProps {
  date?: Date
  setDate: (date: Date) => void
  className?: string
}

export function CustomDatePicker({ date, setDate, className }: CustomDatePickerProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

  React.useEffect(() => {
    if (date) {
      setSelectedDate(date)
    }
  }, [date])

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const onDateClick = (day: Date) => {
    setSelectedDate(day)
    setDate(day)
  }

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth} className="hover:bg-primary/10">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button variant="ghost" size="icon" onClick={nextMonth} className="hover:bg-primary/10">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const renderDays = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div
            key={day.toString()}
            className={cn(
              "h-9 w-9 p-0 font-normal text-center flex items-center justify-center rounded-md",
              !isSameMonth(day, monthStart) && "text-muted-foreground opacity-50",
              isSameMonth(day, monthStart) && "hover:bg-accent hover:text-accent-foreground cursor-pointer",
              isToday(day) && "bg-accent text-accent-foreground",
              selectedDate &&
                isSameDay(day, selectedDate) &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            )}
            onClick={() => isSameMonth(day, monthStart) && onDateClick(cloneDay)}
          >
            {formattedDate}
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>,
      )
      days = []
    }
    return <div className="mb-2">{rows}</div>
  }

  return (
    <div className={cn("p-3 border rounded-md bg-background", className)}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

// Helper function to add days
function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
