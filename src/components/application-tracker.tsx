'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const columns = [
  { id: 'saved', label: 'Saved', color: 'border-blue-500' },
  { id: 'applied', label: 'Applied', color: 'border-yellow-500' },
  { id: 'interview', label: 'Interview', color: 'border-purple-500' },
  { id: 'offer', label: 'Offer', color: 'border-green-500' },
  { id: 'rejected', label: 'Rejected', color: 'border-red-500' },
];

export function ApplicationTracker() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {columns.map((col) => (
        <div key={col.id} className="space-y-3">
          <h3 className={`border-t-2 ${col.color} pt-2 text-sm font-semibold`}>
            {col.label}
          </h3>
          <Card>
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground">
            Drop applications here
          </p>
        </div>
      ))}
    </div>
  );
}
