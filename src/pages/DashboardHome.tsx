import { Users, DollarSign, ShoppingCart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Users", value: "2,847", icon: Users, change: "+12%" },
  { label: "Revenue", value: "$48,352", icon: DollarSign, change: "+8.2%" },
  { label: "Orders", value: "1,205", icon: ShoppingCart, change: "+4.5%" },
  { label: "Active Sessions", value: "342", icon: Activity, change: "+18%" },
];

const recentActivity = [
  { user: "Sarah Johnson", action: "Created new order #1042", time: "2 min ago" },
  { user: "Mike Chen", action: "Updated product pricing", time: "15 min ago" },
  { user: "Emily Davis", action: "Deleted user account", time: "1 hr ago" },
  { user: "James Wilson", action: "Exported sales report", time: "3 hr ago" },
  { user: "Anna Lee", action: "Added new product SKU", time: "5 hr ago" },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary font-medium">{s.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((a, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{a.user}</TableCell>
                  <TableCell>{a.action}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{a.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
