import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: number; name: string; email: string; role: string; status: "Active" | "Inactive"; joined: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@company.com", role: "Admin", status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Mike Chen", email: "mike@company.com", role: "Editor", status: "Active", joined: "2024-02-20" },
  { id: 3, name: "Emily Davis", email: "emily@company.com", role: "Viewer", status: "Inactive", joined: "2023-11-08" },
  { id: 4, name: "James Wilson", email: "james@company.com", role: "Editor", status: "Active", joined: "2024-03-12" },
  { id: 5, name: "Anna Lee", email: "anna@company.com", role: "Admin", status: "Active", joined: "2023-09-01" },
  { id: 6, name: "Robert Brown", email: "robert@company.com", role: "Viewer", status: "Inactive", joined: "2024-04-05" },
  { id: 7, name: "Lisa Martinez", email: "lisa@company.com", role: "Editor", status: "Active", joined: "2024-05-18" },
  { id: 8, name: "David Kim", email: "david@company.com", role: "Viewer", status: "Active", joined: "2024-06-22" },
  { id: 9, name: "Karen White", email: "karen@company.com", role: "Admin", status: "Active", joined: "2023-07-14" },
  { id: 10, name: "Tom Harris", email: "tom@company.com", role: "Editor", status: "Inactive", joined: "2024-01-30" },
  { id: 11, name: "Nancy Clark", email: "nancy@company.com", role: "Viewer", status: "Active", joined: "2024-08-09" },
  { id: 12, name: "Chris Evans", email: "chris@company.com", role: "Admin", status: "Active", joined: "2023-12-25" },
];

const PAGE_SIZE = 6;

type SortKey = "name" | "email" | "role" | "status" | "joined";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockUsers
      .filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q))
      .sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortAsc ? cmp : -cmp;
      });
  }, [search, sortKey, sortAsc]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (sortAsc ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">All Users</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9 h-9" value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {([ ["name","Name"], ["email","Email"], ["role","Role"], ["status","Status"], ["joined","Date Joined"] ] as [SortKey,string][]).map(([key, label]) => (
                  <TableHead key={key} className="cursor-pointer select-none" onClick={() => toggleSort(key)}>
                    <span className="flex items-center gap-1">{label} <SortIcon col={key} /></span>
                  </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === "Active" ? "default" : "secondary"}>{u.status}</Badge>
                  </TableCell>
                  <TableCell>{u.joined}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
