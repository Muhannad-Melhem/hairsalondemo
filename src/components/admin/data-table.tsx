"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Search, ArrowUpDown } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  searchable?: boolean;
  searchKeys?: string[];
  pageSize?: number;
  actions?: (item: T) => React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  mobileCard?: (item: T) => React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  searchable = false,
  searchKeys,
  pageSize = 10,
  actions,
  loading = false,
  emptyMessage = "No items found.",
  mobileCard,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let items = data;
    if (search && searchKeys) {
      const q = search.toLowerCase();
      items = items.filter((item) =>
        searchKeys.some((key) => {
          const val = (item as Record<string, unknown>)[key];
          return String(val).toLowerCase().includes(q);
        }),
      );
    }
    if (sortKey) {
      items = [...items].sort((a, b) => {
        const aVal = (a as Record<string, number | string>)[sortKey];
        const bVal = (b as Record<string, number | string>)[sortKey];
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [data, search, searchKeys, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <Search className="size-10 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9"
          />
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "h-10 px-4 text-left align-middle font-medium text-muted-foreground",
                    col.sortable && "cursor-pointer select-none hover:text-foreground",
                    col.hideOnMobile && "hidden md:table-cell",
                  )}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <ArrowUpDown className="size-3" />
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "p-4 align-middle",
                      col.hideOnMobile && "hidden md:table-cell",
                    )}
                  >
                    {col.render
                      ? col.render(item)
                      : String((item as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 align-middle text-right">{actions(item)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {paginated.map((item) =>
          mobileCard ? (
            mobileCard(item)
          ) : (
            <div
              key={keyExtractor(item)}
              className="rounded-lg border bg-card p-4 space-y-2"
            >
              {columns
                .filter((col) => !col.hideOnMobile)
                .map((col) => (
                  <div key={col.key} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{col.label}</span>
                    <span>
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[col.key] ?? "")}
                    </span>
                  </div>
                ))}
              {actions && (
                <div className="flex justify-end pt-2 border-t">{actions(item)}</div>
              )}
            </div>
          ),
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={i === page ? "default" : "outline"}
                size="icon-xs"
                onClick={() => setPage(i)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon-xs"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
