import React from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/sonner"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  PackageIcon,
  UserCheckIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  TentIcon,
  ClockIcon,
} from "lucide-react"

interface Order {
  id: number
  order_number?: string
  name?: string
  customer_name?: string
  total_price: number | string
  status: string
  created_at: string
}

interface DashboardProps {
  stats?: {
    productCount: number
    porterCount: number
    orderCount: number
    revenue: number
    pendingCount: number
  }
  orders?: Order[]
}

export default function Page({ stats, orders = [] }: DashboardProps) {
  const { auth } = usePage<{ auth?: { user?: { name?: string } } }>().props;
  const userName = auth?.user?.name ? auth.user.name.split(' ')[0] : 'Admin';
  const orderCount = stats?.orderCount || orders.length || 12;
  const pendingCount = stats?.pendingCount || 3;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return <Badge variant="secondary">Selesai</Badge>
      case 'pending':
        return <Badge variant="outline">Pending</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Dibatalkan</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <SidebarProvider>
      <Head title="Admin Dashboard | Browky Outdoor" />
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-6 p-6 py-6 sm:p-8">

          {/* Welcome Back Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Selamat Datang Kembali, {userName}!
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Hari ini Anda memiliki <span className="font-semibold text-foreground">{orderCount} pesanan</span> untuk diproses, <span className="font-semibold text-amber-600 dark:text-amber-400">{pendingCount} menunggu konfirmasi</span>.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="h-9 px-4 text-xs font-medium cursor-pointer">
                <Link href="/admin/orders">
                  <ShoppingBagIcon className="h-3.5 w-3.5 mr-1.5" />
                  Kelola Pesanan
                </Link>
              </Button>
            </div>
          </div>

          {/* Stat Cards - 4 kolom */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Rp {Number(stats?.revenue || 0).toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Pesanan terkonfirmasi</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.orderCount || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.pendingCount || 0} menunggu konfirmasi
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produk Sewa</CardTitle>
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.productCount || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Unit aktif di katalog</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jasa Porter</CardTitle>
                <UserCheckIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.porterCount || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Tim berpengalaman</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders Card */}
          <Card className="flex-1 flex flex-col justify-between bg-card rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-base font-semibold">Pesanan Terbaru</CardTitle>
                <CardDescription className="text-xs">
                  Transaksi terkini yang masuk ke sistem.
                </CardDescription>
              </div>
              <Button asChild variant="outline" className="h-9 px-4 text-xs font-medium cursor-pointer rounded-md">
                <Link href="/admin/orders">
                  <span>Lihat Semua</span>
                  <ArrowRightIcon className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0">
              {orders && orders.length > 0 ? (
                <div className="rounded-md border border-border bg-card overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="font-semibold text-xs">No. Pesanan</TableHead>
                        <TableHead className="font-semibold text-xs">Nama Pemesan</TableHead>
                        <TableHead className="font-semibold text-xs">Total</TableHead>
                        <TableHead className="font-semibold text-xs">Status</TableHead>
                        <TableHead className="font-semibold text-xs text-right">Tanggal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 8).map((order) => {
                        const custName = order.customer_name || order.name || 'Pelanggan'
                        const ordNum = order.order_number || `#ORD-${String(order.id).padStart(5, '0')}`
                        return (
                          <TableRow key={order.id} className="hover:bg-muted/30">
                            <TableCell className="font-mono text-xs font-medium">{ordNum}</TableCell>
                            <TableCell className="font-semibold text-xs text-foreground">{custName}</TableCell>
                            <TableCell className="font-semibold text-xs">
                              Rp {Number(order.total_price || 0).toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell className="text-right text-xs text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 border border-dashed border-border/80 rounded-md bg-muted/20">
                  <Empty
                    title="Belum ada pesanan masuk"
                    description="Semua transaksi pesanan baru dari pelanggan akan otomatis muncul di sini."
                  />
                </div>
              )}
            </CardContent>
          </Card>

        </div>
        <Toaster position="top-right" richColors visibleToasts={3} />
      </SidebarInset>
    </SidebarProvider>
  )
}
