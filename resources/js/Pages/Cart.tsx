import React, { useState, useEffect, useRef } from 'react';
import { Link, Head, useForm, router } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Minus, Plus, Trash2, CalendarIcon, Phone, User, ArrowRight, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { format, differenceInCalendarDays, addDays } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { type DateRange } from 'react-day-picker';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Empty } from '@/components/ui/empty';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartProps {
  cart?: Record<string | number, CartItem>;
  total?: number;
}

export default function Cart({ cart = {} }: CartProps) {
  const cartItems = Object.entries(cart);

  // Stable today reference
  const todayRef = useRef(new Date());
  const today = todayRef.current;

  // Selection state
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  // Initialize selected items when component mounts or cart changes
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(cart).forEach((id) => {
      initial[id] = selectedItems[id] !== undefined ? selectedItems[id] : true;
    });
    setSelectedItems(initial);
  }, [cart]);

  // Date range state
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 2),
  });

  // Duration in days derived from date range
  const duration = dateRange?.from && dateRange?.to
    ? Math.max(1, differenceInCalendarDays(dateRange.to, dateRange.from))
    : 1;

  // Form for checking out
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    whatsapp: '',
    start_date: today.toISOString().split('T')[0],
    duration: 1,
    selected_items: [] as string[]
  });

  // Keep form data in sync when date range changes
  useEffect(() => {
    if (dateRange?.from) {
      setData('start_date', dateRange.from.toISOString().split('T')[0]);
    }
  }, [dateRange?.from]);

  useEffect(() => {
    setData('duration', duration);
  }, [duration]);

  // Sync selection to form data
  useEffect(() => {
    const selectedKeys = Object.entries(selectedItems)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);
    setData('selected_items', selectedKeys);
  }, [selectedItems]);

  // Local calculation of total based on selected items
  const total = Object.entries(cart)
    .filter(([id]) => selectedItems[id])
    .reduce((sum, [_, item]) => sum + (item.price * item.quantity), 0);

  const grandTotal = total * duration;

  const prefix = typeof window !== 'undefined' && window.location.pathname.includes('/Browky/public') ? '/Browky/public' : '';

  const handleQuantityUpdate = (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    router.post(prefix + '/keranjang/update', {
      id: itemId,
      quantity: newQty
    }, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Jumlah produk diperbarui');
      }
    });
  };

  const handleRemoveItem = (itemId: string) => {
    router.post(prefix + '/keranjang/remove', {
      id: itemId
    }, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Produk dihapus dari keranjang');
      }
    });
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(prefix + '/keranjang/checkout');
  };

  return (
    <FrontendLayout>
      <Head>
        <title>Keranjang Saya | Browky Outdoor</title>
      </Head>

      <div className="bg-muted/30 py-10 sm:py-14 min-h-[calc(100vh-80px-300px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Title */}
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Keranjang Saya</h1>
            {cartItems.length > 0 && (
              <Badge variant="secondary" className="text-xs font-normal rounded-full px-3 py-1">
                {cartItems.length} Produk
              </Badge>
            )}
          </div>

          {cartItems.length > 0 ? (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start space-y-8 lg:space-y-0">

              {/* LEFT COLUMN: Cart Items List */}
              <div className="lg:col-span-7">
                <Card className="p-6 sm:p-7 border border-zinc-200 dark:border-zinc-800 shadow-none bg-card rounded-xl">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Daftar Barang Sewa</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-1">
                      Periksa jumlah dan daftar item perlengkapan outdoor Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {cartItems.map(([id, item]) => {
                        const getStorageUrl = (path?: string) => {
                          if (!path) return 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=200&q=80';
                          if (path.startsWith('http') || path.startsWith('https')) return path;
                          const hasPublicPrefix = path.startsWith('/storage') || path.startsWith('/images') || path.startsWith('/assets');
                          const cleanPath = hasPublicPrefix ? path : (path.startsWith('/') ? `/storage${path}` : `/storage/${path}`);
                          return prefix + cleanPath;
                        };
                        const imgSrc = getStorageUrl(item.image);

                        return (
                          <div
                            key={id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 px-0 hover:bg-muted/5 transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                          >
                            {/* Left Side: Checkbox, Image, Name & Category */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              {/* Checkbox */}
                              <Checkbox
                                id={`check-${id}`}
                                checked={!!selectedItems[id]}
                                onCheckedChange={(checked) => {
                                  setSelectedItems((prev) => ({
                                    ...prev,
                                    [id]: !!checked,
                                  }));
                                }}
                                className="shrink-0 cursor-pointer"
                              />

                              {/* Image (No border radius) */}
                              <div className="shrink-0 w-24 h-24 overflow-hidden rounded-none bg-muted border border-zinc-200 dark:border-zinc-800">
                                <img src={imgSrc} alt={item.name} className="w-full h-full object-cover rounded-none" />
                              </div>

                              {/* Name & Category */}
                              <div className="flex-1 min-w-0 space-y-1">
                                <h3 className="text-base font-semibold text-foreground line-clamp-2">
                                  {item.name}
                                </h3>
                                <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground rounded-none border-zinc-200 dark:border-zinc-800">
                                  Sewa Harian / Paket
                                </Badge>
                              </div>
                            </div>

                            {/* Right Side: Qty, Price, Delete */}
                            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0">
                              {/* Quantity Stepper */}
                              <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5 bg-background">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleQuantityUpdate(id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-40"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </Button>
                                <span className="w-8 text-center text-xs font-semibold text-foreground">
                                  {item.quantity}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleQuantityUpdate(id, item.quantity + 1)}
                                  className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </Button>
                              </div>

                              {/* Price */}
                              <div className="font-bold text-foreground text-base w-24 text-right">
                                Rp {Number(item.price * item.quantity).toLocaleString('id-ID')}
                              </div>

                              {/* Delete Button */}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(id)}
                                className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer rounded-md shrink-0"
                                title="Hapus produk"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN: Order Details / Checkout */}
              <div className="lg:col-span-5">
                <Card className="p-6 sm:p-7 border border-zinc-200 dark:border-zinc-800 shadow-none bg-card rounded-xl">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Detail Pemesanan</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      Isi data penyewa dan pilih rentang tanggal pengambilan sewa.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-5">

                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">

                      {/* Nama Lengkap */}
                      <Field>
                        <FieldLabel htmlFor="name" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          Nama Lengkap *
                        </FieldLabel>
                        <Input
                          id="name"
                          type="text"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          required
                          placeholder="Masukkan nama lengkap Anda"
                          className="h-11 text-base bg-background border-zinc-200 dark:border-zinc-800"
                        />
                        {errors.name && <FieldError>{errors.name}</FieldError>}
                      </Field>

                      {/* Nomor WhatsApp */}
                      <Field>
                        <FieldLabel htmlFor="whatsapp" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          Nomor WhatsApp *
                        </FieldLabel>
                        <Input
                          id="whatsapp"
                          type="text"
                          value={data.whatsapp}
                          onChange={(e) => setData('whatsapp', e.target.value)}
                          required
                          placeholder="Contoh: 081234567890"
                          className="h-11 text-base bg-background border-zinc-200 dark:border-zinc-800"
                        />
                        {errors.whatsapp && <FieldError>{errors.whatsapp}</FieldError>}
                      </Field>

                      {/* Tanggal Sewa */}
                      <Field>
                        <FieldLabel htmlFor="date-range-picker" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          Tanggal Sewa *
                        </FieldLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date-range-picker"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-11 px-3.5 text-base bg-background border-zinc-200 dark:border-zinc-800 shadow-none cursor-pointer",
                                !dateRange && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                              {dateRange?.from ? (
                                dateRange.to ? (
                                  <span>
                                    {format(dateRange.from, "dd MMM yyyy", { locale: idLocale })} —{" "}
                                    {format(dateRange.to, "dd MMM yyyy", { locale: idLocale })}
                                  </span>
                                ) : (
                                  format(dateRange.from, "dd MMM yyyy", { locale: idLocale })
                                )
                              ) : (
                                <span>Pilih tanggal sewa</span>
                              )}
                              {dateRange?.from && dateRange?.to && (
                                <Badge variant="secondary" className="ml-auto text-sm font-semibold px-2.5 py-0.5">
                                  {duration} hari
                                </Badge>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="range"
                              defaultMonth={dateRange?.from}
                              selected={dateRange}
                              onSelect={setDateRange}
                              numberOfMonths={1}
                              disabled={{ before: today }}
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.start_date && <FieldError>{errors.start_date}</FieldError>}
                        {errors.duration && <FieldError>{errors.duration}</FieldError>}
                      </Field>

                      {/* Price Calculations */}
                      <div className="space-y-3 text-base pt-5">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="font-normal">Subtotal / Hari</span>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                            Rp {Number(total).toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="font-normal">Durasi Sewa</span>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-50">{duration} hari</span>
                        </div>

                        <Separator className="my-3 bg-zinc-200 dark:bg-zinc-800 h-px" />

                        <div className="flex items-center justify-between text-base pt-1">
                          <span className="font-bold text-zinc-900 dark:text-zinc-50">Total Keseluruhan</span>
                          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                            Rp {Number(grandTotal).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Submit Checkout & Continue Shopping Buttons */}
                      <div className="space-y-2.5 pt-4">
                        <Button
                          type="submit"
                          disabled={processing}
                          className="w-full h-14 text-base font-medium text-zinc-50 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all shadow-none cursor-pointer rounded-md"
                        >
                          Checkout via WhatsApp
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full h-12 text-base font-medium border-zinc-200 dark:border-zinc-800 hover:bg-muted/50 shadow-none cursor-pointer rounded-md"
                        >
                          <Link href="/sewa-alat">
                            Lanjut Pilih Alat / Produk
                          </Link>
                        </Button>
                      </div>

                    </form>
                  </CardContent>
                </Card>
              </div>

            </div>
          ) : (
            /* EMPTY CART STATE using Shadcn Empty Component */
            <Card className="max-w-lg mx-auto border border-border shadow-xs bg-card rounded-xl p-6 sm:p-10">
              <Empty
                title="Keranjang Anda Kosong"
                description="Anda belum menambahkan perlengkapan outdoor apa pun ke keranjang sewa."
                action={
                  <Button asChild size="default" className="gap-2 px-5 font-semibold text-xs rounded-md cursor-pointer mt-2">
                    <Link href="/sewa-alat">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Mulai Sewa Alat</span>
                    </Link>
                  </Button>
                }
              />
            </Card>
          )}

        </div>
      </div>
    </FrontendLayout>
  );
}

