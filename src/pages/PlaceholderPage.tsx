import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Package, ShoppingCart } from "lucide-react";

const meta: Record<string, { title: string; icon: React.ElementType }> = {
  "/dashboard/products": { title: "Products", icon: Package },
  "/dashboard/orders": { title: "Orders", icon: ShoppingCart },
};

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const info = meta[pathname] || { title: "Page", icon: Package };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{info.title}</h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <info.icon className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium">{info.title} page coming soon</p>
          <p className="text-sm">This section is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
}
