"use client"


import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DatePickerDemo({data, setData}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-full border-0 justify-start text-left flex justify-center",
            !data && "text-muted-foreground"
          )}
        >
          {data ? format(data, "PPP") : <span className="text-white text-center">{data}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-[#337B5B]">
        <Calendar
          mode="single"
          selected={data}
          onSelect={setData}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
