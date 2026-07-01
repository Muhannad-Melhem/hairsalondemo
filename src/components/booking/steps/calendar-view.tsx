import { useState } from "react";
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isBefore,
  startOfToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarView({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (date: string) => void;
}) {
  const today = startOfToday();
  const [viewDate, setViewDate] = useState(today);

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const prevDisabled =
    !isBefore(startOfMonth(subMonths(viewDate, 1)), startOfMonth(addDays(today, 1))) &&
    isSameMonth(subMonths(viewDate, 1), today);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate(subMonths(viewDate, 1))}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
          disabled={prevDisabled}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm font-semibold text-foreground tracking-wide">
          {format(viewDate, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Next month"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="py-1.5 text-center text-xs font-medium text-muted-foreground"
          >
            {label}
          </div>
        ))}
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const isDisabled = isBefore(day, addDays(today, 1));
          const isSelected = selected === dateStr;
          const isCurrentMonth = isSameMonth(day, viewDate);

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(dateStr)}
              className={cn(
                "relative flex items-center justify-center rounded-lg py-2 text-sm transition-all",
                !isCurrentMonth && "text-muted-foreground/30",
                isDisabled && "cursor-not-allowed text-muted-foreground/20",
                !isDisabled && isCurrentMonth && "cursor-pointer text-foreground hover:bg-muted",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                isSelected && isDisabled && "bg-primary/50"
              )}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
              aria-selected={isSelected}
              aria-disabled={isDisabled}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
