import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign in to StudySuite</CardTitle>
          <p className="text-sm text-muted-foreground">
            Find and track your next opportunity
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input type="email" placeholder="Email" />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Password" />
          </div>
          <Button className="w-full">Sign in</Button>
          <p className="text-center text-xs text-muted-foreground">
            Coming soon — auth integration with Supabase
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
