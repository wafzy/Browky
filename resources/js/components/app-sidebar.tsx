import * as React from "react"
import { Link, usePage } from "@inertiajs/react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  PackageIcon,
  UserCheckIcon,
  TentIcon,
  MountainIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboardIcon />,
    items: [],
  },
  {
    title: "Sewa Alat",
    url: "/admin/products",
    icon: <PackageIcon />,
    items: [],
  },
  {
    title: "Jasa Porter",
    url: "/admin/porters",
    icon: <UserCheckIcon />,
    items: [],
  },
  {
    title: "Paket Camping",
    url: "/admin/camping-packages",
    icon: <TentIcon />,
    items: [],
  },
  {
    title: "Destinasi Gunung",
    url: "/admin/mountains",
    icon: <MountainIcon />,
    items: [],
  },
  {
    title: "Data Pesanan",
    url: "/admin/orders",
    icon: <ShoppingBagIcon />,
    items: [],
  },
  {
    title: "User Admin",
    url: "/admin/users",
    icon: <UsersIcon />,
    items: [],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { auth } = usePage().props as any
  const user = auth?.user

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
                  B
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Browky Outdoor</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.name || "Admin",
          email: user?.email || "hello@browkyoutdoor.com",
          avatar: "",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
