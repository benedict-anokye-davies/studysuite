import { DeadlineCalendar } from "@/components/deadline-calendar";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">
          Keep track of upcoming deadlines
        </p>
      </div>
      <DeadlineCalendar />
    </div>
  );
}
