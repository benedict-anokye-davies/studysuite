import { ApplicationTracker } from "@/components/application-tracker";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
        <p className="text-muted-foreground">
          Track your application progress
        </p>
      </div>
      <ApplicationTracker />
    </div>
  );
}
