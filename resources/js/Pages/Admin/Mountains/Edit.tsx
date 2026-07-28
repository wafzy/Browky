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

interface Mountain {
  id: number;
  name: string;
  location: string;
  elevation?: string;
  description?: string;
  image?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;
}

export default function Edit({ mountain }: { mountain: Mountain }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: 'PUT',
    name: mountain.name,
    location: mountain.location,
    elevation: mountain.elevation || '',
    description: mountain.description || '',
    image: null as File | null,
    image_1: null as File | null,
    image_2: null as File | null,
    image_3: null as File | null,
    image_4: null as File | null,
    image_5: null as File | null,
  });

  const getInitialImg = (fieldVal?: string) => {
    if (!fieldVal) return null;
    return fieldVal.startsWith('http') ? fieldVal : `/storage/${fieldVal}`;
  };

  const [previewCover, setPreviewCover] = useState<string | null>(getInitialImg(mountain.image));
  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    image_1: getInitialImg(mountain.image_1),
    image_2: getInitialImg(mountain.image_2),
    image_3: getInitialImg(mountain.image_3),
    image_4: getInitialImg(mountain.image_4),
    image_5: getInitialImg(mountain.image_5),
  });

  const handleImageChange = (key: 'image' | 'image_1' | 'image_2' | 'image_3' | 'image_4' | 'image_5', file: File | null) => {
    if (file) {
      setData(key, file);
      const url = URL.createObjectURL(file);
      if (key === 'image') setPreviewCover(url);
      else setPreviews(prev => ({ ...prev, [key]: url }));
    }
  };

  const handleRemoveImage = (key: 'image' | 'image_1' | 'image_2' | 'image_3' | 'image_4' | 'image_5') => {
    setData(key, null);
    if (key === 'image') setPreviewCover(null);
    else setPreviews(prev => ({ ...prev, [key]: null }));
  };

  const handleReset = () => {
    reset();
    setPreviewCover(getInitialImg(mountain.image));
    setPreviews({
      image_1: getInitialImg(mountain.image_1),
      image_2: getInitialImg(mountain.image_2),
      image_3: getInitialImg(mountain.image_3),
      image_4: getInitialImg(mountain.image_4),
      image_5: getInitialImg(mountain.image_5),
    });
    toast.info("Perubahan form telah di-reset.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/admin/mountains/${mountain.id}`, {
      onSuccess: () => {
        toast.success(`Destinasi "${data.name}" berhasil diperbarui!`);
      },
      onError: () => {
        toast.error("Gagal memperbarui destinasi gunung. Silakan periksa kembali form Anda.");
      }
    });
  };

  const articleImagesConfig = [
    { key: 'image_1' as const, label: 'Gambar Artikel 1: Panorama Puncak' },
    { key: 'image_2' as const, label: 'Gambar Artikel 2: Akses Transportasi & Basecamp' },
    { key: 'image_3' as const, label: 'Gambar Artikel 3: Camping Ground & Musim' },
    { key: 'image_4' as const, label: 'Gambar Artikel 4: Trek & Jalur Pendakian' },
    { key: 'image_5' as const, label: 'Gambar Artikel 5: Service Porter & Fitting Alat' },
  ];

  return (
    <AdminLayout title="Edit Destinasi Gunung">
      <div className="pb-16 sm:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Edit Destinasi "{mountain.name}"</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Perbarui data gunung dan konten landing page SEO.
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
              type="submit"
              form="edit-mountain-form"
              disabled={processing}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md gap-1.5"
            >
              <Save className="size-3.5" />
              <span>Simpan Perubahan</span>
            </Button>
          </div>
        </div>

        <form id="edit-mountain-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Mountain Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Utama</CardTitle>
                <CardDescription>Detail lokasi, gambar hero utama, dan deskripsi pendakian.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Main Thumbnail */}
                <Field>
                  <FieldLabel className="text-xs font-semibold text-foreground">Cover Utama Destinasi (Hero Header)</FieldLabel>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                    <label htmlFor="cover-upload" className="relative size-24 shrink-0 block cursor-pointer group">
                      <div className="size-full rounded-2xl border border-dashed border-border bg-muted/40 hover:bg-muted/70 transition flex items-center justify-center overflow-hidden">
                        {previewCover ? (
                          <img src={previewCover} alt="Cover preview" className="h-full w-full object-cover" />
                        ) : (
                          <ImagePlus className="size-7 text-muted-foreground/60 group-hover:scale-110 transition-transform duration-200" />
                        )}
                      </div>
                    </label>

                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-semibold text-foreground">Gambar Header Hero</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Tampil di bagian atas hero halaman detail gunung.
                      </p>
                      <div className="flex items-center gap-3 pt-1.5">
                        <label htmlFor="cover-upload" className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition shadow-2xs">
                          <span>{previewCover ? 'Ganti Cover' : 'Upload Cover'}</span>
                        </label>
                        <Input id="cover-upload" type="file" accept="image/*" onChange={e => handleImageChange('image', e.target.files?.[0] || null)} className="hidden" />
                        {previewCover && (
                          <button type="button" onClick={() => handleRemoveImage('image')} className="text-xs text-muted-foreground hover:text-destructive transition font-medium cursor-pointer">
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.image && <FieldError>{errors.image}</FieldError>}
                </Field>

                {/* Mountain Name */}
                <Field>
                  <FieldLabel htmlFor="name">Nama Gunung *</FieldLabel>
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
                  <FieldLabel htmlFor="description">Deskripsi Destinasi</FieldLabel>
                  <Textarea 
                    id="description" 
                    rows={4} 
                    value={data.description} 
                    onChange={e => setData('description', e.target.value)} 
                  />
                </Field>
              </CardContent>
            </Card>

            {/* Article Images Upload Card (Gambar 1 - 5) */}
            <Card>
              <CardHeader>
                <CardTitle>Gambar Ilustrasi Artikel (Gambar 1 – 5)</CardTitle>
                <CardDescription>Upload foto spesifik untuk disisipkan di dalam artikel panduan detail gunung.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {articleImagesConfig.map(({ key, label }) => (
                  <div key={key} className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
                    <FieldLabel className="text-xs font-semibold text-foreground">{label}</FieldLabel>
                    <div className="flex items-center gap-4">
                      <label htmlFor={`upload-${key}`} className="relative h-20 w-32 shrink-0 block cursor-pointer group">
                        <div className="size-full rounded-lg border border-dashed border-border bg-background hover:bg-muted/50 transition flex items-center justify-center overflow-hidden">
                          {previews[key] ? (
                            <img src={previews[key]!} alt={label} className="h-full w-full object-cover" />
                          ) : (
                            <ImagePlus className="size-6 text-muted-foreground/60 group-hover:scale-110 transition-transform duration-200" />
                          )}
                        </div>
                      </label>
                      <div className="flex flex-col gap-1">
                        <label htmlFor={`upload-${key}`} className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition w-fit shadow-2xs">
                          <span>{previews[key] ? 'Ganti Foto' : 'Upload Foto'}</span>
                        </label>
                        <Input id={`upload-${key}`} type="file" accept="image/*" onChange={e => handleImageChange(key, e.target.files?.[0] || null)} className="hidden" />
                        {previews[key] && (
                          <button type="button" onClick={() => handleRemoveImage(key)} className="text-xs text-muted-foreground hover:text-destructive transition font-medium cursor-pointer w-fit">
                            Hapus Foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Specification & Location Card */}
          <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/10 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spesifikasi & Lokasi</CardTitle>
                <CardDescription>Wilayah kabupaten dan ketinggian mdpl.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="location">Lokasi / Kabupaten *</FieldLabel>
                  <Input 
                    id="location" 
                    value={data.location} 
                    onChange={e => setData('location', e.target.value)} 
                    required 
                  />
                  {errors.location && <FieldError>{errors.location}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="elevation">Ketinggian Gunung</FieldLabel>
                  <div className="relative flex items-center">
                    <Input 
                      id="elevation" 
                      value={data.elevation} 
                      onChange={e => setData('elevation', e.target.value)} 
                      placeholder="2565"
                      className="pr-14"
                    />
                    <span className="absolute right-3 text-xs text-muted-foreground font-medium pointer-events-none select-none">
                      mdpl
                    </span>
                  </div>
                  <FieldDescription>Cukup ketik angkanya saja (misal: 2565). "mdpl" terisi otomatis.</FieldDescription>
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
            type="submit"
            form="edit-mountain-form"
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
