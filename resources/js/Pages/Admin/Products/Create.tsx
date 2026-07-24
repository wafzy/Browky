import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';
import { Save, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { CategoryCombobox } from '@/components/category-combobox';

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    category: 'Tenda',
    brand: '',
    price_per_day: '',
    stock: 1,
    special_badge: '',
    description: '',
    specifications: '',
    cover_image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('cover_image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    reset();
    setPreview(null);
    toast.info("Form input telah di-reset.");
  };

  const handleSaveDraft = () => {
    toast.success("Draf produk berhasil disimpan sementara!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/products', {
      onSuccess: () => {
        toast.success("Produk baru berhasil ditambahkan!");
      },
      onError: () => {
        toast.error("Gagal menambahkan produk. Mohon periksa kembali form input Anda.");
      }
    });
  };

  return (
    <AdminLayout title="Tambah Produk Baru">
      <div className="pb-16 sm:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Tambah Produk Sewa Baru</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Masukkan rincian peralatan outdoor untuk katalog persewaan.
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
              form="create-product-form"
              disabled={processing}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md gap-1.5"
            >
              <Save className="size-3.5" />
              <span>Simpan Produk</span>
            </Button>
          </div>
        </div>

        <form id="create-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Product Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Produk</CardTitle>
                <CardDescription>Detail nama, gambar utama, dan ulasan lengkap mengenai barang.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Thumbnail Section */}
                <Field>
                  <FieldLabel className="text-xs font-semibold text-foreground">Thumbnail</FieldLabel>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                    {/* Left Square Box (Clickable Upload Area) */}
                    <label htmlFor="image-upload" className="relative size-24 shrink-0 block cursor-pointer group">
                      <div className="size-full rounded-2xl border border-dashed border-border bg-muted/40 hover:bg-muted/70 transition flex items-center justify-center overflow-hidden">
                        {preview ? (
                          <img src={preview} alt="Thumbnail preview" className="h-full w-full object-cover" />
                        ) : (
                          <ImagePlus className="size-7 text-muted-foreground/60 group-hover:scale-110 transition-transform duration-200" />
                        )}
                      </div>
                    </label>

                    {/* Right Description & Action Buttons */}
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-semibold text-foreground">Product thumbnail</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        JPG or PNG. Keep it square and at least 1000 by 1000 pixels.
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
                              setData('cover_image', null);
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
                  {errors.cover_image && <FieldError>{errors.cover_image}</FieldError>}
                </Field>

                {/* Product Name */}
                <Field>
                  <FieldLabel htmlFor="name">Nama Produk *</FieldLabel>
                  <Input 
                    id="name" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)} 
                    placeholder="Contoh: Tenda Dome 4 Person" 
                    required 
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                {/* Product Description */}
                <Field>
                  <FieldLabel htmlFor="description">Deskripsi Produk *</FieldLabel>
                  <Textarea 
                    id="description" 
                    rows={4} 
                    value={data.description} 
                    onChange={e => setData('description', e.target.value)} 
                    placeholder="Deskripsikan kondisi dan kelengkapan produk..." 
                    required 
                  />
                  {errors.description && <FieldError>{errors.description}</FieldError>}
                </Field>

                {/* Product Specifications */}
                <Field>
                  <FieldLabel htmlFor="specifications">Spesifikasi Teknis (Opsional)</FieldLabel>
                  <Textarea 
                    id="specifications" 
                    rows={3} 
                    value={data.specifications} 
                    onChange={e => setData('specifications', e.target.value)} 
                    placeholder="Misal: Kapasitas 4 orang, Bahan waterproof 3000mm..." 
                  />
                  <FieldDescription>Tuliskan detail dimensi, bahan, atau kapasitas barang.</FieldDescription>
                </Field>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Outer container with dashed border (No outer heading), containing solid cards inside */}
          <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/10 space-y-4">
            {/* Card 1: Harga & Stok */}
            <Card>
              <CardHeader>
                <CardTitle>Harga & Stok</CardTitle>
                <CardDescription>Tarif sewa harian dan jumlah unit ketersediaan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="price">Harga per Hari (Rp) *</FieldLabel>
                  <Input 
                    id="price" 
                    type="number" 
                    value={data.price_per_day} 
                    onChange={e => setData('price_per_day', e.target.value)} 
                    placeholder="50000" 
                    required 
                  />
                  {errors.price_per_day && <FieldError>{errors.price_per_day}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="stock">Stok Unit *</FieldLabel>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={data.stock} 
                    onChange={e => setData('stock', Number(e.target.value))} 
                    min={0} 
                    required 
                  />
                  {errors.stock && <FieldError>{errors.stock}</FieldError>}
                </Field>
              </CardContent>
            </Card>

            {/* Card 2: Organisasi & Lencana */}
            <Card>
              <CardHeader>
                <CardTitle>Organisasi & Lencana</CardTitle>
                <CardDescription>Pengelompokan kategori, brand, dan tag khusus.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="category">Kategori *</FieldLabel>
                  <CategoryCombobox 
                    value={data.category} 
                    onChange={val => setData('category', val)} 
                    error={errors.category} 
                  />
                  {errors.category && <FieldError>{errors.category}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="brand">Merek / Brand (Opsional)</FieldLabel>
                  <Input 
                    id="brand" 
                    value={data.brand} 
                    onChange={e => setData('brand', e.target.value)} 
                    placeholder="Contoh: Eiger, Consina, Deuter, Naturehike..." 
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="badge">Special Badge (Opsional)</FieldLabel>
                  <Input 
                    id="badge" 
                    value={data.special_badge} 
                    onChange={e => setData('special_badge', e.target.value)} 
                    placeholder="Paling Diminati, Pilihan Lokal..." 
                  />
                </Field>
              </CardContent>
            </Card>
          </div>
        </form>

        {/* Mobile Sticky Bottom Action Bar (Fixed at bottom on mobile) */}
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
            form="create-product-form"
            disabled={processing}
            className="flex-1 h-10 text-xs font-medium cursor-pointer rounded-md gap-1.5"
          >
            <Save className="size-3.5" />
            <span>Simpan Produk</span>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
