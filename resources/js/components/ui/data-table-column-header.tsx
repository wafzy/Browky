import * as React from "react"
import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn("text-xs font-medium text-slate-900 dark:text-slate-100 text-left select-none", className)}>
        {title}
      </div>
    )
  }

  const isSorted = column.getIsSorted()

  const handleClick = () => {
    if (!isSorted) {
      column.toggleSorting(false) // 1. Ascending (A-Z)
    } else if (isSorted === "asc") {
      column.toggleSorting(true)  // 2. Descending (Z-A)
    } else {
      column.clearSorting()       // 3. Reset (Unsorted)
    }
  }

  return (
    <div className={cn("flex items-center space-x-1 justify-start text-left", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className="-ml-1.5 h-auto py-1 px-1.5 text-xs font-medium text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer rounded hover:bg-muted/80 select-none transition-colors"
        title={
          isSorted === "asc"
            ? "Urutan: A-Z (Klik untuk Z-A)"
            : isSorted === "desc"
            ? "Urutan: Z-A (Klik untuk Reset)"
            : "Klik untuk Mengurutkan (A-Z)"
        }
      >
        <span>{title}</span>
        {isSorted === "asc" ? (
          <ArrowUp className="ml-1 h-3.5 w-3.5 text-slate-900 dark:text-slate-100" />
        ) : isSorted === "desc" ? (
          <ArrowDown className="ml-1 h-3.5 w-3.5 text-slate-900 dark:text-slate-100" />
        ) : (
          <ChevronsUpDown className="ml-1 h-3.5 w-3.5 text-slate-400" />
        )}
      </Button>
    </div>
  )
}
