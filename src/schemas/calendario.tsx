"use client"


import { format } from "date-fns"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { cn } from "../lib/utils"

export function DatePickerDemo({data, setData}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-full border-0 text-left flex justify-center",
            !data && "text-muted-foreground"
          )}
        >
          <span className="text-white text-center">{format(data, "dd/MM/yyyy")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-[#337B5B]">
        <Calendar
          mode="single"
          onSelect={setData}
          initialFocus
          defaultMonth={data}
        />
      </PopoverContent>
    </Popover>
  )
}
