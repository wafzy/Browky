"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, PackageIcon, UserCheckIcon, ShoppingBagIcon, DollarSignIcon } from "lucide-react"

interface SectionCardsProps {
  stats?: {
    productCount: number;
    porterCount: number;
    orderCount: number;
    revenue: number;
    pendingCount: number;
  };
}

export function SectionCards({ stats }: SectionCardsProps) {
  const revenueFormatted = `Rp ${Number(stats?.revenue || 0).toLocaleString('id-ID')}`;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {/* Card 1: Total Revenue */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pendapatan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenueFormatted}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
              <DollarSignIcon className="size-3 mr-1" />
              Aktif
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-emerald-600">
            Pendapatan Pesanan Terkonfirmasi{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Status pesanan selesai & dikonfirmasi
          </div>
        </CardFooter>
      </Card>

      {/* Card 2: Total Orders */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pesanan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.orderCount || 0} <span className="text-sm font-normal text-muted-foreground">transaksi</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ShoppingBagIcon className="size-3 mr-1" />
              {stats?.pendingCount || 0} Pending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pesanan Masuk{" "}
          </div>
          <div className="text-muted-foreground">
            {stats?.pendingCount || 0} pesanan menunggu konfirmasi
          </div>
        </CardFooter>
      </Card>

      {/* Card 3: Products */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Sewa Alat (Produk)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.productCount || 0} <span className="text-sm font-normal text-muted-foreground">unit</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <PackageIcon className="size-3 mr-1" />
              Katalog
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Perlengkapan Terdaftar{" "}
          </div>
          <div className="text-muted-foreground">Tenda, Carrier, Sleeping Bag, dll</div>
        </CardFooter>
      </Card>

      {/* Card 4: Porters */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Jasa Porter</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats?.porterCount || 0} <span className="text-sm font-normal text-muted-foreground">orang</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <UserCheckIcon className="size-3 mr-1" />
              Porter
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tim Porter Berpengalaman{" "}
          </div>
          <div className="text-muted-foreground">Hafal rute Gunung Dieng</div>
        </CardFooter>
      </Card>
    </div>
  )
}
