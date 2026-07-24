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
import { ProductChecklist } from '@/components/product-checklist';

interface CampingPackage {
  id: number;
  name: string;
  mountain?: string;
  price: number;
  description?: string;
  facilities?: string;
  tags?: string;
  status: string;
  special_badge?: string;
  image?: string;
}

interface EditProps {
  package: CampingPackage;
  mountains?: Array<{ id: number; name: string }>;
  products?: Array<{ id: number; name: string; category?: string }>;
}

export default function Edit({ package: pkg, mountains = [], products = [] }: EditProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: 'PUT',
    name: pkg.name,
    mountain: pkg.mountain || 'Semua Gunung (All-in)',
    price: pkg.price,
    description: pkg.description || '',
    facilities: pkg.facilities || '',
    tags: pkg.tags || '',
    status: pkg.status || 'Available',
    special_badge: pkg.special_badge || '',
    image: null as File | null,
  });

  const currentImg = pkg.image
    ? (pkg.image.startsWith('http') ? pkg.image : `/storage/${pkg.image}`)
    : null;

  const [preview, setPreview] = useState<string | null>(currentImg);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    reset();
    setPreview(currentImg);
    toast.info("Perubahan form telah di-reset.");
  };

  const handleSaveDraft = () => {
    toast.success("Draf perubahan paket berhasil disimpan!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/admin/camping-packages/${pkg.id}`, {
      onSuccess: () => {
        toast.success(`Paket camping "${data.name}" berhasil diperbarui!`);
      },
      onError: () => {
        toast.error("Gagal memperbarui paket camping. Silakan periksa kembali form Anda.");
      }
    });
  };

  return (
    <AdminLayout title="Edit Paket Camping">
      <div className="pb-16 sm:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Edit Paket "{pkg.name}"</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Perbarui harga dan fasilitas paket berkemah.
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
              form="edit-package-form"
              disabled={processing}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md gap-1.5"
            >
              <Save className="size-3.5" />
              <span>Simpan Perubahan</span>
            </Button>
          </div>
        </div>

        <form id="edit-package-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Package Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Paket</CardTitle>
                <CardDescription>Detail foto, nama paket, fasilitas, dan deskripsi berkemah.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Package Thumbnail Section */}
                <Field>
                  <FieldLabel className="text-xs font-semibold text-foreground">Foto Sampul Paket</FieldLabel>
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
                      <h4 className="text-xs font-semibold text-foreground">Gambar Paket</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        JPG atau PNG. Disarankan foto produk berkemah dengan pencahayaan jelas.
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

                {/* Package Name */}
                <Field>
                  <FieldLabel htmlFor="name">Nama Paket *</FieldLabel>
                  <Input 
                    id="name" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)} 
                    required 
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                {/* Description */}
                <Field>
                  <FieldLabel htmlFor="description">Deskripsi Paket *</FieldLabel>
                  <Textarea 
                    id="description" 
                    rows={4} 
                    value={data.description} 
                    onChange={e => setData('description', e.target.value)} 
                    required 
                  />
                  {errors.description && <FieldError>{errors.description}</FieldError>}
                </Field>

                {/* Facilities Checklist */}
                <Field>
                  <FieldLabel htmlFor="facilities">Fasilitas yang Disertakan *</FieldLabel>
                  <ProductChecklist
                    value={data.facilities}
                    onChange={val => setData('facilities', val)}
                    products={products}
                  />
                  <FieldDescription>Pilih produk & peralatan dari katalog yang disertakan dalam paket ini.</FieldDescription>
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
                <CardDescription>Biaya paket harian dan ketersediaan stok.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="price">Harga Paket (Rp) *</FieldLabel>
                  <Input 
                    id="price" 
                    type="number" 
                    value={data.price} 
                    onChange={e => setData('price', Number(e.target.value) || 0)} 
                    required 
                  />
                  {errors.price && <FieldError>{errors.price}</FieldError>}
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

            {/* Card 2: Lokasi & Lencana */}
            <Card>
              <CardHeader>
                <CardTitle>Lokasi & Lencana</CardTitle>
                <CardDescription>Target gunung, tag pencarian, dan badge promo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="mountain">Gunung / Lokasi Target</FieldLabel>
                  <MountainCombobox
                    value={data.mountain}
                    onChange={val => setData('mountain', val)}
                    initialList={mountains.map(m => m.name)}
                    error={errors.mountain}
                  />
                  {errors.mountain && <FieldError>{errors.mountain}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="badge">Special Badge (Opsional)</FieldLabel>
                  <Input 
                    id="badge" 
                    value={data.special_badge} 
                    onChange={e => setData('special_badge', e.target.value)} 
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="tags">Tags (Opsional)</FieldLabel>
                  <Input 
                    id="tags" 
                    value={data.tags} 
                    onChange={e => setData('tags', e.target.value)} 
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
            form="edit-package-form"
            disabled={processing}
            className="flex-1 h-10 text-xs font-medium cursor-pointer rounded-md gap-1.5"
          >
            <Save className="size-3.5" />
            <span>Simpan Perubahan</span>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
