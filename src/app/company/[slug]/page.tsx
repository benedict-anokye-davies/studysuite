import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight capitalize">
            {slug.replace(/-/g, " ")}
          </h1>
          <div className="flex gap-2">
            <Badge variant="secondary">Industry</Badge>
            <Badge variant="outline">Location</Badge>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
          <p className="mt-4 text-sm text-muted-foreground">
            Company profile coming soon
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Open Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No opportunities listed yet
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
