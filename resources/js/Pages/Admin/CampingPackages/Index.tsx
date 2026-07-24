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

interface CampingPackage {
  id: number;
  name: string;
  mountain?: string;
  facilities?: string;
  price: number;
  status: string;
  image?: string;
  special_badge?: string;
  tags?: string;
}

interface IndexProps {
  packages: {
    data: CampingPackage[];
    total: number;
  };
}

export default function Index({ packages }: IndexProps) {
  const data = Array.isArray(packages) ? packages : (packages?.data || []);
  const [mountainFilter, setMountainFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<CampingPackage | null>(null);

  const mountains = useMemo(() => {
    const list = Array.from(new Set(data.map((p) => p.mountain).filter(Boolean))) as string[];
    return list;
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((pkg) => {
      const matchMountain = mountainFilter === 'all' || pkg.mountain === mountainFilter;
      return matchMountain;
    });
  }, [data, mountainFilter]);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const name = deleteTarget.name;
    router.delete(`/admin/camping-packages/${deleteTarget.id}`, {
      onSuccess: () => {
        toast.success(`Paket camping "${name}" berhasil dihapus!`);
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error("Gagal menghapus paket camping. Silakan coba lagi.");
      }
    });
  };

function FacilitiesCell({ facilities }: { facilities?: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!facilities) return <span className="text-xs text-muted-foreground italic">-</span>;
  const items = facilities.split(/,\s*|\n+/).map((s) => s.trim()).filter(Boolean);
  if (items.length === 0) return <span className="text-xs text-muted-foreground italic">-</span>;

  const displayItems = expanded ? items : items.slice(0, 2);
  const remaining = items.length - 2;

  return (
    <div className="space-y-1 py-1">
      <ul className="space-y-0.5 text-xs text-foreground/90 list-disc list-inside">
        {displayItems.map((item, idx) => (
          <li key={idx} className="truncate max-w-[220px]">
            {item}
          </li>
        ))}
      </ul>
      {items.length > 2 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 cursor-pointer block mt-1 transition-colors"
        >
          {expanded ? "← Sembunyikan" : `+ ${remaining} fasilitas lagi (Tampilkan semua)`}
        </button>
      )}
    </div>
  );
}

  const columns: ColumnDef<CampingPackage>[] = [
    {
      id: 'photo',
      header: () => <div className="text-left">Gambar</div>,
      cell: ({ row }) => {
        const pkg = row.original;
        const imgSrc = pkg.image 
          ? (pkg.image.startsWith('http') ? pkg.image : `/storage/${pkg.image}`)
          : null;

        return (
          <div className="flex items-center justify-start">
            <div className="h-10 w-10 rounded-md overflow-hidden bg-muted border border-border flex items-center justify-center">
              {imgSrc ? (
                <img src={imgSrc} alt={pkg.name} className="h-full w-full object-cover rounded-md" />
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Paket Camping" />,
      cell: ({ row }) => {
        const pkg = row.original;
        return (
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground text-sm">{pkg.name}</span>
            {pkg.special_badge && (
              <Badge variant="outline" className="w-fit text-[10px] font-normal bg-emerald-50 text-emerald-800 border-emerald-200">
                {pkg.special_badge}
              </Badge>
            )}
          </div>
        );
      },
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
      accessorKey: 'facilities',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fasilitas Disertakan" />,
      cell: ({ row }) => <FacilitiesCell facilities={row.original.facilities} />,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Harga Paket" />,
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-foreground">
          Rp {Number(row.original.price).toLocaleString('id-ID')}
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
        const pkg = row.original;
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
                <DropdownMenuLabel>Aksi Paket</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/camping-packages/${pkg.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                    <Edit3 className="size-4 text-muted-foreground" />
                    <span>Edit Paket</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setDeleteTarget(pkg)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  <span>Hapus Paket</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout title="Paket Camping">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Paket Camping All-In</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola paket perlengkapan camping lengkap dan paket trip berkemah Dieng.
          </p>
        </div>
        <Button asChild className="gap-2 h-10 rounded-md px-4 cursor-pointer text-xs font-medium">
          <Link href="/admin/camping-packages/create">
            <Plus className="size-4" />
            <span>Tambah Paket Camping</span>
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Cari paket camping..."
        filterElements={
          <Select value={mountainFilter} onValueChange={setMountainFilter}>
            <SelectTrigger className="h-8 w-[160px] text-xs font-normal cursor-pointer bg-background">
              <SelectValue placeholder="Lokasi Gunung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Gunung</SelectItem>
              {mountains.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Paket Camping</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus paket camping <span className="font-semibold text-foreground">"{deleteTarget?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
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
