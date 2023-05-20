"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@ui/components/Button";
import { Calendar } from "@ui/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/Popover";
import { cn } from "@ui/lib/utils";
import { DayPickerSingleProps } from "react-day-picker";

type DatePickerProps = Omit<DayPickerSingleProps, "mode">;

export function DatePicker({ selected, ...props }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !selected && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? (
            format(selected, "dd/MM/yy", {
              locale: ptBR,
            })
          ) : (
            <span>Selecionar</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selected} initialFocus {...props} />
      </PopoverContent>
    </Popover>
  );
}
