import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'staff',
  });

  const handleReset = () => {
    reset();
    toast.info("Form input telah di-reset.");
  };

  const handleSaveDraft = () => {
    toast.success("Draf akun user berhasil disimpan sementara!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/users', {
      onSuccess: () => {
        toast.success("User admin baru berhasil ditambahkan!");
      },
      onError: () => {
        toast.error("Gagal menambahkan user admin. Silakan periksa kembali form Anda.");
      }
    });
  };

  return (
    <AdminLayout title="Tambah User Admin">
      <div className="pb-16 sm:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Tambah User Admin Baru</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Buat akun staf baru yang memiliki hak akses ke dashboard administrator.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md"
            >
              <span>Reset</span>
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSaveDraft}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md shrink-0"
            >
              <span>Save Draft</span>
            </Button>
            <Button 
              type="submit"
              form="create-user-form"
              disabled={processing}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md gap-1.5"
            >
              <Save className="size-3.5" />
              <span>Simpan User</span>
            </Button>
          </div>
        </div>

        <form id="create-user-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Account Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Akun</CardTitle>
                <CardDescription>Detail kredensial login dan profil pengguna.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="name">Nama Lengkap *</FieldLabel>
                  <Input 
                    id="name" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)} 
                    placeholder="Nama staf atau admin" 
                    required 
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Alamat Email *</FieldLabel>
                  <Input 
                    id="email" 
                    type="email" 
                    value={data.email} 
                    onChange={e => setData('email', e.target.value)} 
                    placeholder="admin@example.com" 
                    required 
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password *</FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      value={data.password} 
                      onChange={e => setData('password', e.target.value)} 
                      placeholder="Minimal 8 karakter" 
                      required 
                    />
                    {errors.password && <FieldError>{errors.password}</FieldError>}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password_confirmation">Konfirmasi Password *</FieldLabel>
                    <Input 
                      id="password_confirmation" 
                      type="password" 
                      value={data.password_confirmation} 
                      onChange={e => setData('password_confirmation', e.target.value)} 
                      placeholder="Ulangi password" 
                      required 
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Outer container with dashed border for Role & Permission */}
          <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/10 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hak Akses & Role</CardTitle>
                <CardDescription>Tingkat kewenangan staf pada sistem.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="role">Role Akses *</FieldLabel>
                  <Select value={data.role} onValueChange={v => setData('role', v)}>
                    <SelectTrigger id="role"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin (Akses Penuh)</SelectItem>
                      <SelectItem value="staff">Staff (Akses Terbatas)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </CardContent>
            </Card>
          </div>
        </form>

        {/* Mobile Sticky Bottom Action Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-3 z-50 flex items-center gap-2 shadow-lg">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            className="h-10 px-3 text-xs font-medium cursor-pointer rounded-md shrink-0"
          >
            <span>Reset</span>
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleSaveDraft}
            className="h-10 px-3 text-xs font-medium cursor-pointer rounded-md shrink-0"
          >
            <span>Draft</span>
          </Button>
          <Button 
            type="submit"
            form="create-user-form"
            disabled={processing}
            className="flex-1 h-10 text-xs font-medium cursor-pointer rounded-md gap-1.5"
          >
            <Save className="size-3.5" />
            <span>Simpan User</span>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
