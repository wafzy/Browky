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
} from "@/components/ui/alert-dialog";
import { Plus, Edit3, Trash2, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Porter {
  id: number;
  name: string;
  category?: string;
  mountain?: string;
  price_per_day: number;
  status: string;
  image?: string;
  special_badge?: string;
}

interface IndexProps {
  porters: {
    data: Porter[];
    total: number;
  };
}

export default function Index({ porters }: IndexProps) {
  const data = Array.isArray(porters) ? porters : (porters?.data || []);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<Porter | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.map((p) => p.category).filter(Boolean))) as string[];
    return cats;
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((porter) => {
      const matchCategory = categoryFilter === 'all' || porter.category === categoryFilter;
      return matchCategory;
    });
  }, [data, categoryFilter]);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const name = deleteTarget.name;
    router.delete(`/admin/porters/${deleteTarget.id}`, {
      onSuccess: () => {
        toast.success(`Paket porter "${name}" berhasil dihapus!`);
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error("Gagal menghapus paket porter. Silakan coba lagi.");
      }
    });
  };

  const columns: ColumnDef<Porter>[] = [
    {
      id: 'photo',
      header: () => <div className="text-left">Gambar</div>,
      cell: ({ row }) => {
        const porter = row.original;
        const imgSrc = porter.image 
          ? (porter.image.startsWith('http') ? porter.image : `/storage/${porter.image}`)
          : null;

        return (
          <div className="flex items-center justify-start">
            <div className="h-10 w-10 rounded-md overflow-hidden bg-muted border border-border flex items-center justify-center">
              {imgSrc ? (
                <img src={imgSrc} alt={porter.name} className="h-full w-full object-cover rounded-md" />
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Paket / Porter" />,
      cell: ({ row }) => {
        const porter = row.original;
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground text-sm">{porter.name}</span>
            {porter.special_badge && (
              <Badge variant="outline" className="w-fit text-[10px] font-normal bg-emerald-50 text-emerald-800 border-emerald-200">
                {porter.special_badge}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori Layanan" />,
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-normal text-xs rounded-xs">
          {row.original.category || 'Porter Tektok'}
        </Badge>
      ),
    },
    {
      accessorKey: 'mountain',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gunung / Lokasi" />,
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-normal text-xs rounded-xs">
          {row.original.mountain || 'Semua Gunung'}
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
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.original.status;
        const isActive = status === 'Available' || status === 'Tersedia' || status === 'Aktif';
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
        const porter = row.original;
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
                <DropdownMenuLabel>Aksi Porter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/porters/${porter.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                    <Edit3 className="size-4 text-muted-foreground" />
                    <span>Edit Porter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setDeleteTarget(porter)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  <span>Hapus Porter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout title="Jasa Porter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Jasa Porter & Guide</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola layanan dan tarif jasa porter pendakian di kawasan Dieng & sekitarnya.
          </p>
        </div>
        <Button asChild className="gap-2 h-10 rounded-md px-4 cursor-pointer text-xs font-medium">
          <Link href="/admin/porters/create">
            <Plus className="size-4" />
            <span>Tambah Porter</span>
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Cari porter / gunung..."
        filterElements={
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-8 w-[160px] text-xs font-normal cursor-pointer bg-background">
              <SelectValue placeholder="Kategori Layanan" />
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
        }
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Porter</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus porter <span className="font-semibold text-foreground">"{deleteTarget?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md text-xs font-medium h-9 px-4 cursor-pointer">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 hover:bg-rose-700 text-white rounded-md text-xs font-medium h-9 px-4 cursor-pointer">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
