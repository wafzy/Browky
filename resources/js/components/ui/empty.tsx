import * as React from "react"
import { PackageSearch } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType
  title?: string
  description?: string
  action?: React.ReactNode
}

export function Empty({
  className,
  icon: Icon = PackageSearch,
  title = "Tidak ada data ditemukan",
  description = "Coba ubah kata kunci pencarian atau filter yang Anda pilih.",
  action,
  children,
  ...props
}: EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted border border-border/60 mb-3 text-muted-foreground">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-semibold text-foreground tracking-tight mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-muted-foreground max-w-sm mb-3 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
      {children}
    </div>
  )
}
