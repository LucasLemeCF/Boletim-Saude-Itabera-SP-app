"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { DayPicker } from "react-day-picker"

import { ptBR } from "date-fns/locale"
import { buttonVariants } from "../../components/ui/button"
import { cn } from "../../lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {

  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-[#337B5B] border border-black rounded-[5px]", className)}
      classNames={{
        months: "flex flex-col bg-[#E2EFDB] sm:flex-row sm:space-x-4 sm:space-y-0 rounded-[5px]",
        month: "rounded-[5px]",
        caption: "flex justify-center pb-4 pt-1 relative items-center bg-[#337B5B]",
        caption_label: "text-sm font-medium text-white capitalize rounded-[5px]",
        nav: "space-x-1 flex items-center bg-[#337B5B] rounded-[5px]",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 hover:text-white rounded-[5px]"
        ),
        nav_button_previous: "absolute left-0 text-white border-black hover:bg-[#255941] hover:border-[#255941]",
        nav_button_next: "absolute right-0 text-white border-black hover:bg-[#255941] hover:border-[#255941]",
        table: "border border-black rounded-[5px]",
        head_row: "flex rounded-[5px]",
        head_cell: "rounded-md w-9 font-normal rounded-[5px] text-[0.8rem]",
        row: "flex w-full mt-2 rounded-[5px]",
        cell: "h-9 w-9 text-center text-sm p-0 relative hover:border-black hover:rounded-[5px] hover:border [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:"bg-[#337B5B] text-white",
        day_today: "bg-accent text-black rounded-[5px]",
        day_outside: "day-outside opacity-50 aria-selected:rounded-[5px] aria-selected:bg-accent/50 aria-selected:opacity-30 rounded-[5px]",
        day_disabled: "opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:rounded-[5px]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
