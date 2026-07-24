import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Plus, Edit3, Trash2, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { toast } from 'sonner';

interface UserData {
  id: number;
  name: string;
  email: string;
  role?: string;
  created_at: string;
}

interface IndexProps {
  users: {
    data: UserData[];
    total: number;
  };
}

export default function Index({ users }: IndexProps) {
  const data = Array.isArray(users) ? users : (users?.data || []);
  const [deleteTarget, setDeleteTarget] = useState<UserData | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const name = deleteTarget.name;
    router.delete(`/admin/users/${deleteTarget.id}`, {
      onSuccess: () => {
        toast.success(`Pengguna "${name}" berhasil dihapus!`);
        setDeleteTarget(null);
      },
      onError: () => {
        toast.error("Gagal menghapus pengguna. Silakan coba lagi.");
      }
    });
  };

  const columns: ColumnDef<UserData>[] = [
    {
      id: 'avatar',
      header: () => <div className="text-left">Avatar</div>,
      cell: ({ row }) => {
        const u = row.original;
        const initials = u.name.substring(0, 2).toUpperCase();
        return (
          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Pengguna" />,
      cell: ({ row }) => (
        <span className="font-medium text-foreground text-sm">{row.original.name}</span>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => (
        <span className="text-sm font-normal text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
      cell: ({ row }) => (
        <Badge variant={row.original.role === 'admin' ? "default" : "secondary"} className="capitalize font-normal text-xs rounded-full">
          {row.original.role || 'Staff'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const u = row.original;
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
                <DropdownMenuLabel>Aksi User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/users/${u.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                    <Edit3 className="size-4 text-muted-foreground" />
                    <span>Edit User</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setDeleteTarget(u)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  <span>Hapus User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout title="Kelola Pengguna">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Kelola Akun Pengguna & Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola staf dan administrator sistem Browky Outdoor.
          </p>
        </div>
        <Button asChild className="gap-2 h-10 rounded-md px-4 cursor-pointer text-xs font-medium">
          <Link href="/admin/users/create">
            <Plus className="size-4" />
            <span>Tambah User Baru</span>
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Cari nama / email..."
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus Pengguna</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus pengguna <span className="font-semibold text-foreground">"{deleteTarget?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
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
