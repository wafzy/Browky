import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface MountainData {
  id: number;
  name: string;
  location: string;
  elevation?: string;
  image?: string;
  slug: string;
  status?: string;
}

interface IndexProps {
  mountains: MountainData[];
}

export default function Index({ mountains = [] }: IndexProps) {
  const data = Array.isArray(mountains) ? mountains : [];
  const [deleteTarget, setDeleteTarget] = useState<MountainData | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const name = deleteTarget.name;
    router.delete(`/admin/mountains/${deleteTarget.id}`, {
      onSuccess: () => {
        toast.success(`Destinasi gunung "${name}" berhasil dihapus!`);
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error("Gagal menghapus destinasi gunung. Silakan coba lagi.");
      }
    });
  };

  const columns: ColumnDef<MountainData>[] = [
    {
      id: 'cover',
      header: () => <div className="text-left">Gambar</div>,
      cell: ({ row }) => {
        const m = row.original;
        const imgSrc = m.image 
          ? (m.image.startsWith('http') ? m.image : `/storage/${m.image}`)
          : null;

        return (
          <div className="flex items-center justify-start">
            <div className="h-10 w-10 rounded-md overflow-hidden bg-muted border border-border flex items-center justify-center">
              {imgSrc ? (
                <img src={imgSrc} alt={m.name} className="h-full w-full object-cover rounded-md" />
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Gunung" />,
      cell: ({ row }) => (
        <span className="font-medium text-foreground text-sm">{row.original.name}</span>
      ),
    },
    {
      accessorKey: 'location',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Lokasi" />,
      cell: ({ row }) => (
        <span className="text-sm font-normal text-muted-foreground">{row.original.location}</span>
      ),
    },
    {
      accessorKey: 'elevation',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ketinggian" />,
      cell: ({ row }) => {
        const rawEl = row.original.elevation;
        if (!rawEl) return <Badge variant="secondary" className="font-normal text-xs rounded-full">2.565 mdpl</Badge>;
        const cleanNum = String(rawEl).replace(/[^0-9]/g, '');
        const formatted = cleanNum ? `${Number(cleanNum).toLocaleString('id-ID')} mdpl` : rawEl;
        return (
          <Badge variant="secondary" className="font-normal text-xs rounded-full">
            {formatted}
          </Badge>
        );
      },
    },
    {
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.original.status;
        const isActive = !status || status === 'Aktif' || status === 'Buka' || status === 'Available';
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
        const m = row.original;
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
                <DropdownMenuLabel>Aksi Gunung</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/mountains/${m.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                    <Edit3 className="size-4 text-muted-foreground" />
                    <span>Edit Gunung</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setDeleteTarget(m)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  <span>Hapus Gunung</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout title="Destinasi Gunung">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Destinasi Gunung & SEO Landing Pages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data destinasi pendakian untuk optimalisasi SEO Dieng (Prau, Sumbing, Sindoro, Pakuwaja).
          </p>
        </div>
        <Button asChild className="gap-2 h-10 rounded-md px-4 cursor-pointer text-xs font-medium">
          <Link href="/admin/mountains/create">
            <Plus className="size-4" />
            <span>Tambah Gunung</span>
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Cari gunung / lokasi..."
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Destinasi Gunung</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data gunung <span className="font-semibold text-foreground">"{deleteTarget?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
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
