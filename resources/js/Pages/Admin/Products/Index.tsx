import React, { useState, useMemo } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Plus, Edit3, Trash2, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { cn } from '@/lib/utils';

interface ProductImage {
  id: number;
  image_path: string;
  is_primary: boolean;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price_per_day: number;
  stock: number;
  cover_image?: string;
  special_badge?: string;
  images?: ProductImage[];
  status?: string;
}

interface IndexProps {
  products: {
    data: Product[];
    links: any[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

export default function Index({ products }: IndexProps) {
  const rawData = Array.isArray(products) ? products : (products?.data || []);

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(rawData.map((p) => p.category).filter(Boolean)));
    return cats;
  }, [rawData]);

  const filteredData = useMemo(() => {
    return rawData.filter((product) => {
      const matchCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchStock = stockFilter === 'all'
        ? true
        : stockFilter === 'available'
          ? product.stock > 0
          : product.stock === 0;
      return matchCategory && matchStock;
    });
  }, [rawData, categoryFilter, stockFilter]);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    router.delete(`/admin/products/${deleteTarget.id}`, {
      onSuccess: () => {
        toast.success(`Produk "${deleteTarget.name}" berhasil dihapus!`);
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error(`Gagal menghapus produk "${deleteTarget.name}".`);
      },
    });
  };

  const columns: ColumnDef<Product>[] = [
    {
      id: 'cover',
      header: () => <div className="text-left">Gambar</div>,
      cell: ({ row }) => {
        const product = row.original;
        const imgSrc = product.cover_image
          ? (product.cover_image.startsWith('http') ? product.cover_image : `/storage/${product.cover_image}`)
          : (product.images && product.images.length > 0 ? `/storage/${product.images[0].image_path}` : null);

        return (
          <div className="flex items-center justify-start">
            <div className="h-10 w-10 rounded-md overflow-hidden bg-muted border border-border flex items-center justify-center">
              {imgSrc ? (
                <img src={imgSrc} alt={product.name} className="h-full w-full object-cover rounded-md" />
              ) : (
                <ImageIcon className="size-4 text-muted-foreground" />
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Produk" />,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground text-sm">{product.name}</span>
            {product.special_badge && (
              <Badge variant="outline" className="w-fit text-[10px] font-normal bg-amber-50 text-amber-800 border-amber-200">
                {product.special_badge}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-normal text-xs rounded-xs">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: 'price_per_day',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Harga / Hari" />,
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-foreground">
          Rp {Number(row.original.price_per_day).toLocaleString('id-ID')}
        </span>
      ),
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Stok" />,
      cell: ({ row }) => {
        const stock = Number(row.original.stock || 0);
        const isLow = stock <= 5;
        const maxCapacity = 20;
        const percentage = Math.min(100, Math.max(0, (stock / maxCapacity) * 100));

        return (
          <div className="flex flex-col gap-1.5 w-32">
            <div className="flex items-center gap-1.5 text-xs text-foreground font-normal">
              <span>{stock} unit</span>
              <span className="text-muted-foreground/60">•</span>
              <span className={cn("font-medium", isLow ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400")}>
                {isLow ? "Low" : "High"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/30">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  isLow ? "bg-rose-500" : "bg-emerald-500"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const product = row.original;
        const isActive = (product.status ? (product.status === 'Active' || product.status === 'Aktif' || product.status === 'Available') : product.stock > 0);
        return (
          <Badge
            variant="outline"
            className={cn(
              "font-normal text-xs rounded-full px-2.5",
              isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                : "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800"
            )}
          >
            {isActive ? "Aktif" : "Draf"}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const product = row.original;
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
                <DropdownMenuLabel>Aksi Produk</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/products/${product.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                    <Edit3 className="size-4 text-muted-foreground" />
                    <span>Edit Produk</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteTarget(product)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  <span>Hapus Produk</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout title="Manajemen Produk">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Katalog & Persewaan Alat</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola daftar inventaris peralatan pendakian, stok barang, dan tarif sewa harian.
          </p>
        </div>
        <Button asChild className="gap-2 h-10 rounded-md px-4 cursor-pointer text-xs font-medium">
          <Link href="/admin/products/create">
            <Plus className="size-4" />
            <span>Tambah Produk</span>
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Cari produk..."
        createUrl="/admin/products/create"
        createLabel="Tambah Produk"
        filterElements={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-8 w-[160px] text-xs cursor-pointer bg-background">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="h-8 w-[140px] text-xs cursor-pointer bg-background">
                <SelectValue placeholder="Semua Stok" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Stok</SelectItem>
                <SelectItem value="available">Stok Tersedia</SelectItem>
                <SelectItem value="empty">Stok Habis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">Konfirmasi Hapus Produk</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              Apakah Anda yakin ingin menghapus produk <strong className="text-foreground">"{deleteTarget?.name}"</strong> dari katalog? Data yang telah dihapus tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-9 px-4 text-xs font-medium cursor-pointer rounded-md">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="h-9 px-4 text-xs font-medium cursor-pointer rounded-md bg-rose-600 hover:bg-rose-700 text-white border-transparent"
            >
              Hapus Produk
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
