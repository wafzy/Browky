import React from 'react';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Eye, PhoneCall, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { toast } from 'sonner';

interface Order {
  id: number;
  order_number?: string;
  customer_name: string;
  name?: string;
  whatsapp_number?: string;
  whatsapp?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  duration?: number;
  total_price: number;
  status: string;
  created_at: string;
}

interface IndexProps {
  orders: {
    data: Order[];
    total: number;
  };
}

export default function Index({ orders }: IndexProps) {
  const data = Array.isArray(orders) ? orders : (orders?.data || []);

  const handleStatusChange = (id: number, newStatus: string) => {
    router.put(`/admin/orders/${id}`, { status: newStatus }, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Status transaksi berhasil diperbarui!");
      },
      onError: () => {
        toast.error("Gagal memperbarui status transaksi.");
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-normal text-xs rounded-full px-2.5">Selesai/Terkonfirmasi</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300 font-normal text-xs rounded-full px-2.5">Menunggu Konfirmasi</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="font-normal text-xs rounded-full px-2.5">Dibatalkan</Badge>;
      default:
        return <Badge variant="secondary" className="font-normal text-xs rounded-full px-2.5">{status}</Badge>;
    }
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'order_number',
      header: ({ column }) => <DataTableColumnHeader column={column} title="No. Pesanan" />,
      cell: ({ row }) => {
        const order = row.original;
        const ordNum = order.order_number || `#ORD-${String(order.id).padStart(5, '0')}`;
        return <span className="font-mono text-sm font-normal text-foreground">{ordNum}</span>;
      },
    },
    {
      accessorKey: 'customer_name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Pelanggan" />,
      cell: ({ row }) => {
        const order = row.original;
        const custName = order.customer_name || order.name || 'Pelanggan';
        return <span className="font-medium text-foreground text-sm">{custName}</span>;
      },
    },
    {
      accessorKey: 'whatsapp_number',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kontak WhatsApp" />,
      cell: ({ row }) => {
        const order = row.original;
        const phone = order.whatsapp_number || order.whatsapp || '-';
        if (phone === '-') return <span className="text-xs text-muted-foreground">-</span>;
        return (
          <a 
            href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-normal hover:underline"
          >
            <PhoneCall className="size-3.5" />
            <span>{phone}</span>
          </a>
        );
      },
    },
    {
      accessorKey: 'total_price',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Total Tagihan" />,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <span className="text-sm font-normal text-foreground">
            Rp {Number(order.total_price || 0).toLocaleString('id-ID')}
          </span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status Transaksi" />,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <Select 
            defaultValue={order.status} 
            onValueChange={(val) => handleStatusChange(order.id, val)}
          >
            <SelectTrigger className="h-8 w-[160px] text-xs font-normal">
              <SelectValue>{getStatusBadge(order.status)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                  <span className="sr-only">Buka menu aksi</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Aksi Pesanan</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/orders/${order.id}`} className="flex items-center gap-2 cursor-pointer">
                    <Eye className="size-4 text-muted-foreground" />
                    <span>Lihat Rincian</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout title="Data Pesanan">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Riwayat Pesanan & Transaksi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola transaksi sewa alat camping dan pemesanan jasa porter pendaki.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Cari nama / no. pesanan..."
      />
    </AdminLayout>
  );
}
