import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';
import { Save, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { MountainCombobox } from '@/components/mountain-combobox';
import { PorterCategoryCombobox } from '@/components/porter-category-combobox';

interface CreateProps {
  mountains?: Array<{ id: number; name: string }>;
}

export default function Create({ mountains = [] }: CreateProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    category: '',
    mountain: 'Semua Gunung (All-in)',
    price_per_day: '',
    description: '',
    status: 'Available',
    special_badge: '',
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    reset();
    setPreview(null);
    toast.info("Form input telah di-reset.");
  };

  const handleSaveDraft = () => {
    toast.success("Draf paket porter berhasil disimpan sementara!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/porters', {
      onSuccess: () => {
        toast.success("Layanan porter baru berhasil ditambahkan!");
      },
      onError: () => {
        toast.error("Gagal menambahkan layanan porter. Silakan periksa kembali form Anda.");
      }
    });
  };

  return (
    <AdminLayout title="Tambah Layanan Porter">
      <div className="pb-16 sm:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Tambah Layanan Porter Baru</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Tambahkan data paket jasa pendampingan dan porter pendakian.
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
              form="create-porter-form"
              disabled={processing}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md gap-1.5"
            >
              <Save className="size-3.5" />
              <span>Simpan Porter</span>
            </Button>
          </div>
        </div>

        <form id="create-porter-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Porter Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Layanan</CardTitle>
                <CardDescription>Detail foto, nama paket, dan deskripsi layanan porter.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Porter Thumbnail Section */}
                <Field>
                  <FieldLabel className="text-xs font-semibold text-foreground">Foto Porter / Profil</FieldLabel>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                    <label htmlFor="image-upload" className="relative size-24 shrink-0 block cursor-pointer group">
                      <div className="size-full rounded-2xl border border-dashed border-border bg-muted/40 hover:bg-muted/70 transition flex items-center justify-center overflow-hidden">
                        {preview ? (
                          <img src={preview} alt="Thumbnail preview" className="h-full w-full object-cover" />
                        ) : (
                          <ImagePlus className="size-7 text-muted-foreground/60 group-hover:scale-110 transition-transform duration-200" />
                        )}
                      </div>
                    </label>

                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-semibold text-foreground">Foto Layanan</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        JPG atau PNG. Disarankan foto portrait/persegi dengan tampilan jelas.
                      </p>
                      <div className="flex items-center gap-3 pt-1.5">
                        <label htmlFor="image-upload" className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition shadow-2xs">
                          <span>Upload image</span>
                        </label>
                        <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        {preview && (
                          <button
                            type="button"
                            onClick={() => {
                              setData('image', null);
                              setPreview(null);
                            }}
                            className="text-xs text-muted-foreground hover:text-destructive transition font-medium cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.image && <FieldError>{errors.image}</FieldError>}
                </Field>

                {/* Porter Name */}
                <Field>
                  <FieldLabel htmlFor="name">Nama Paket / Porter *</FieldLabel>
                  <Input 
                    id="name" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)} 
                    placeholder="Contoh: Porter Gunung Prau Profesional" 
                    required 
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                {/* Description */}
                <Field>
                  <FieldLabel htmlFor="description">Deskripsi Layanan *</FieldLabel>
                  <Textarea 
                    id="description" 
                    rows={4} 
                    value={data.description} 
                    onChange={e => setData('description', e.target.value)} 
                    placeholder="Jelaskan detail fasilitas dan jangkauan pendampingan porter..." 
                    required 
                  />
                  {errors.description && <FieldError>{errors.description}</FieldError>}
                </Field>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Outer container with dashed border */}
          <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/10 space-y-4">
            {/* Card 1: Harga & Status */}
            <Card>
              <CardHeader>
                <CardTitle>Harga & Status</CardTitle>
                <CardDescription>Tarif harian dan ketersediaan layanan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="price">Harga per Hari (Rp) *</FieldLabel>
                  <Input 
                    id="price" 
                    type="number" 
                    value={data.price_per_day} 
                    onChange={e => setData('price_per_day', e.target.value)} 
                    placeholder="150000" 
                    required 
                  />
                  {errors.price_per_day && <FieldError>{errors.price_per_day}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="status">Status Ketersediaan *</FieldLabel>
                  <Select value={data.status} onValueChange={v => setData('status', v)}>
                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </CardContent>
            </Card>

            {/* Card 2: Lokasi & Badge */}
            <Card>
              <CardHeader>
                <CardTitle>Lokasi & Kategori</CardTitle>
                <CardDescription>Target gunung dan tag khusus.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="mountain">Gunung / Lokasi</FieldLabel>
                  <MountainCombobox
                    value={data.mountain}
                    onChange={val => setData('mountain', val)}
                    initialList={mountains.map(m => m.name)}
                    error={errors.mountain}
                  />
                  {errors.mountain && <FieldError>{errors.mountain}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="category">Kategori Layanan</FieldLabel>
                  <PorterCategoryCombobox
                    value={data.category}
                    onChange={val => setData('category', val)}
                    error={errors.category}
                  />
                  {errors.category && <FieldError>{errors.category}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="badge">Special Badge (Opsional)</FieldLabel>
                  <Input 
                    id="badge" 
                    value={data.special_badge} 
                    onChange={e => setData('special_badge', e.target.value)} 
                    placeholder="Berpengalaman, Top Rated..." 
                  />
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
            form="create-porter-form"
            disabled={processing}
            className="flex-1 h-10 text-xs font-medium cursor-pointer rounded-md gap-1.5"
          >
            <Save className="size-3.5" />
            <span>Simpan Porter</span>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
