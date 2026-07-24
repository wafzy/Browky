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

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    location: '',
    elevation: '',
    description: '',
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
    toast.success("Draf destinasi berhasil disimpan sementara!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/mountains', {
      onSuccess: () => {
        toast.success("Destinasi gunung baru berhasil ditambahkan!");
      },
      onError: () => {
        toast.error("Gagal menambahkan destinasi gunung. Mohon periksa kembali form Anda.");
      }
    });
  };

  return (
    <AdminLayout title="Tambah Destinasi Gunung">
      <div className="pb-16 sm:pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">Tambah Destinasi Gunung Baru</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Daftarkan destinasi gunung sebagai target SEO dan landing page Browky Outdoor.
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
              form="create-mountain-form"
              disabled={processing}
              className="h-9 px-3.5 text-xs font-medium cursor-pointer rounded-md gap-1.5"
            >
              <Save className="size-3.5" />
              <span>Simpan Gunung</span>
            </Button>
          </div>
        </div>

        <form id="create-mountain-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Mountain Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Gunung</CardTitle>
                <CardDescription>Detail lokasi, gambar utama, dan deskripsi pendakian.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mountain Thumbnail Section */}
                <Field>
                  <FieldLabel className="text-xs font-semibold text-foreground">Thumbnail Cover</FieldLabel>
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
                      <h4 className="text-xs font-semibold text-foreground">Cover Destinasi</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        JPG atau PNG. Disarankan lanskap/persegi dengan resolusi tinggi.
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

                {/* Mountain Name */}
                <Field>
                  <FieldLabel htmlFor="name">Nama Gunung *</FieldLabel>
                  <Input 
                    id="name" 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)} 
                    placeholder="Contoh: Gunung Prau" 
                    required 
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                {/* Description */}
                <Field>
                  <FieldLabel htmlFor="description">Deskripsi Destinasi</FieldLabel>
                  <Textarea 
                    id="description" 
                    rows={5} 
                    value={data.description} 
                    onChange={e => setData('description', e.target.value)} 
                    placeholder="Ceritakan keindahan, jalur, dan kondisi pendakian gunung ini untuk konten SEO..." 
                  />
                </Field>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Outer container with dashed border */}
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
                    placeholder="Wonosobo, Jawa Tengah" 
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
            type="button" 
            variant="outline" 
            onClick={handleSaveDraft}
            className="h-10 px-3 text-xs font-medium cursor-pointer rounded-md shrink-0"
          >
            <span>Draft</span>
          </Button>
          <Button 
            type="submit"
            form="create-mountain-form"
            disabled={processing}
            className="flex-1 h-10 text-xs font-medium cursor-pointer rounded-md gap-1.5"
          >
            <Save className="size-3.5" />
            <span>Simpan Gunung</span>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
