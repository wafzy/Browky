import React from "react"
import { Link, usePage } from "@inertiajs/react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface BreadcrumbStep {
  label: string
  href?: string
}

function getBreadcrumbs(url: string): BreadcrumbStep[] {
  const root: BreadcrumbStep = { label: "Admin", href: "/dashboard" }

  if (url === "/dashboard") {
    return [{ label: "Dashboard" }]
  }

  // Products / Sewa Alat
  if (url === "/admin/products") {
    return [root, { label: "Sewa Alat" }]
  }
  if (url === "/admin/products/create") {
    return [root, { label: "Sewa Alat", href: "/admin/products" }, { label: "Tambah Produk" }]
  }
  if (url.startsWith("/admin/products/") && url.endsWith("/edit")) {
    return [root, { label: "Sewa Alat", href: "/admin/products" }, { label: "Edit Produk" }]
  }

  // Porters / Jasa Porter
  if (url === "/admin/porters") {
    return [root, { label: "Jasa Porter" }]
  }
  if (url === "/admin/porters/create") {
    return [root, { label: "Jasa Porter", href: "/admin/porters" }, { label: "Tambah Porter" }]
  }
  if (url.startsWith("/admin/porters/") && url.endsWith("/edit")) {
    return [root, { label: "Jasa Porter", href: "/admin/porters" }, { label: "Edit Porter" }]
  }

  // Camping Packages / Paket Camping
  if (url === "/admin/camping-packages") {
    return [root, { label: "Paket Camping" }]
  }
  if (url === "/admin/camping-packages/create") {
    return [root, { label: "Paket Camping", href: "/admin/camping-packages" }, { label: "Tambah Paket" }]
  }
  if (url.startsWith("/admin/camping-packages/") && url.endsWith("/edit")) {
    return [root, { label: "Paket Camping", href: "/admin/camping-packages" }, { label: "Edit Paket" }]
  }

  // Mountains / Destinasi Gunung
  if (url === "/admin/mountains") {
    return [root, { label: "Destinasi Gunung" }]
  }
  if (url === "/admin/mountains/create") {
    return [root, { label: "Destinasi Gunung", href: "/admin/mountains" }, { label: "Tambah Gunung" }]
  }
  if (url.startsWith("/admin/mountains/") && url.endsWith("/edit")) {
    return [root, { label: "Destinasi Gunung", href: "/admin/mountains" }, { label: "Edit Gunung" }]
  }

  // Orders / Data Pesanan
  if (url.startsWith("/admin/orders")) {
    return [root, { label: "Data Pesanan" }]
  }

  // Users / User Admin
  if (url === "/admin/users") {
    return [root, { label: "User Admin" }]
  }
  if (url === "/admin/users/create") {
    return [root, { label: "User Admin", href: "/admin/users" }, { label: "Tambah User" }]
  }
  if (url.startsWith("/admin/users/") && url.endsWith("/edit")) {
    return [root, { label: "User Admin", href: "/admin/users" }, { label: "Edit User" }]
  }

  return [root, { label: "Kelola Data" }]
}

export function SiteHeader() {
  const { url } = usePage()
  const breadcrumbs = getBreadcrumbs(url)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/40 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((step, index) => {
              const isLast = index === breadcrumbs.length - 1
              const hideOnMobile = breadcrumbs.length > 2 && index < breadcrumbs.length - 2

              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem className={hideOnMobile ? "hidden sm:inline-flex" : ""}>
                    {isLast ? (
                      <BreadcrumbPage>{step.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={step.href || "#"}>{step.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator className={hideOnMobile ? "hidden sm:inline-flex" : ""} />}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-2">
        <ModeToggle />
        <Button asChild variant="outline" size="sm" className="h-9 px-2.5 sm:px-3 text-xs font-medium gap-1.5 cursor-pointer rounded-md border-0 sm:border border-input" title="Lihat Website">
          <a href="/" target="_blank" rel="noreferrer">
            <span className="hidden sm:inline">Lihat Website</span>
            <ExternalLink className="size-3.5 text-muted-foreground" />
          </a>
        </Button>
      </div>
    </header>
  )
}
