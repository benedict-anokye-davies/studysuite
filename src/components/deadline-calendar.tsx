'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';

export function DeadlineCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          Deadline Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="py-1 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="flex h-10 items-center justify-center rounded-md text-xs hover:bg-accent"
            >
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>
  );
}
