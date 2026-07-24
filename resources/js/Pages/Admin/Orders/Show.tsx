import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, PhoneCall, Calendar, User, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  product?: { name: string };
  porter?: { name: string };
}

interface OrderProps {
  order: {
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
    items?: OrderItem[];
  };
}

export default function Show({ order }: OrderProps) {
  const custName = order.customer_name || order.name || 'Pelanggan';
  const phone = order.whatsapp_number || order.whatsapp || '-';
  const ordNum = order.order_number || `#ORD-${String(order.id).padStart(5, '0')}`;

  const handleStatusChange = (newStatus: string) => {
    router.put(`/admin/orders/${order.id}`, { status: newStatus }, {
      preserveScroll: true
    });
  };

  return (
    <AdminLayout title={`Detail Pesanan ${ordNum}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/admin/orders">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Detail Transaksi {ordNum}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Dibuat pada {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Status:</span>
          <Select defaultValue={order.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Rincian Item Dipesan</CardTitle>
            <CardDescription>Daftar perlengkapan atau jasa yang masuk dalam tagihan ini.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Item</TableHead>
                  <TableHead>Harga / Hari</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => {
                    const itemName = item.product?.name || item.porter?.name || 'Item Alat/Porter';
                    const subtotal = item.price * item.quantity * (order.duration || 1);

                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-semibold text-foreground">{itemName}</TableCell>
                        <TableCell>Rp {Number(item.price).toLocaleString('id-ID')}</TableCell>
                        <TableCell>{item.quantity} Unit</TableCell>
                        <TableCell className="text-right font-bold">Rp {subtotal.toLocaleString('id-ID')}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      Detail item pesanan tidak tersedia.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between">
              <span className="font-bold text-foreground">Total Tagihan</span>
              <span className="text-xl font-extrabold text-primary">Rp {Number(order.total_price || 0).toLocaleString('id-ID')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Informasi Pemesan</CardTitle>
            <CardDescription>Kontak & tanggal persewaan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
              <User className="size-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Nama Pelanggan</p>
                <p className="text-sm font-semibold text-foreground">{custName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
              <PhoneCall className="size-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">WhatsApp</p>
                <a 
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-semibold text-emerald-600 hover:underline"
                >
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
              <Calendar className="size-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Periode Sewa</p>
                <p className="text-sm font-semibold text-foreground">
                  {order.start_date || '-'} s/d {order.end_date || '-'}
                </p>
              </div>
            </div>

            <Button asChild className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(custName)},%20kami%20dari%20Browky%20Outdoor%20mengenai%20pesanan%20${encodeURIComponent(ordNum)}`} target="_blank" rel="noreferrer">
                <PhoneCall className="size-4" />
                <span>Hubungi via WhatsApp</span>
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
