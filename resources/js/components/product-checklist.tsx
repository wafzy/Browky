import React, { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEFAULT_EQUIPMENTS = [
  { id: -1, name: 'Tenda Kapasitas 4 Orang', category: 'Tenda' },
  { id: -2, name: 'Sleeping Bag Polar', category: 'Perlengkapan Tidur' },
  { id: -3, name: 'Matras Foil / Matras Foam', category: 'Perlengkapan Tidur' },
  { id: -4, name: 'Kompor Portable & Gas', category: 'Alat Masak' },
  { id: -5, name: 'Nesting / Cookware Set', category: 'Alat Masak' },
  { id: -6, name: 'Lampu Tenda & Headlamp', category: 'Penerangan' },
  { id: -7, name: 'Flysheet 3x4 Meter', category: 'Tenda' },
  { id: -8, name: 'Kursi & Meja Lipat Outdoor', category: 'Furnitur' },
  { id: -9, name: 'Tracking Pole / Tongkat', category: 'Aksesoris' },
  { id: -10, name: 'Peralatan Makan (Mangkuk/Gelas)', category: 'Alat Masak' },
  { id: -11, name: 'Logistik & Bahan Makanan', category: 'Layanan' },
  { id: -12, name: 'Tiket Masuk & Simaksi', category: 'Layanan' },
];

interface Product {
  id: number;
  name: string;
  category?: string;
}

interface ProductChecklistProps {
  value: string;
  onChange: (val: string) => void;
  products?: Product[];
}

export function ProductChecklist({ value, onChange, products = [] }: ProductChecklistProps) {
  const [search, setSearch] = useState('');
  const [customItem, setCustomItem] = useState('');

  // Parse existing string value into an array of selected names
  const selectedList = useMemo(() => {
    if (!value) return [];
    return value
      .split(/,\s*|\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [value]);

  // Combine database products with default equipment fallbacks
  const allProducts = useMemo(() => {
    const combined = [...products];
    DEFAULT_EQUIPMENTS.forEach((def) => {
      if (!combined.some((p) => p.name.toLowerCase() === def.name.toLowerCase())) {
        combined.push(def);
      }
    });
    return combined;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return allProducts;
    const query = search.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query))
    );
  }, [allProducts, search]);

  const toggleItem = (name: string) => {
    let nextList: string[];
    if (selectedList.includes(name)) {
      nextList = selectedList.filter((item) => item !== name);
    } else {
      nextList = [...selectedList, name];
    }
    onChange(nextList.join(', '));
  };

  const handleAddCustom = () => {
    const trimmed = customItem.trim();
    if (!trimmed) return;
    if (!selectedList.includes(trimmed)) {
      const nextList = [...selectedList, trimmed];
      onChange(nextList.join(', '));
    }
    setCustomItem('');
  };

  const removeItem = (name: string) => {
    const nextList = selectedList.filter((item) => item !== name);
    onChange(nextList.join(', '));
  };

  return (
    <div className="space-y-3">
      {/* Selected Items Preview Chips */}
      <div className="rounded-md border border-border bg-muted/30 p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <PackageCheck className="h-4 w-4 text-primary" />
            <span>Fasilitas Terpilih ({selectedList.length})</span>
          </div>
          {selectedList.length > 0 && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-muted-foreground hover:text-destructive transition cursor-pointer"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {selectedList.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
            {selectedList.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="text-xs font-normal py-0.5 px-2 bg-background border border-border shadow-2xs flex items-center gap-1.5"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  className="hover:text-destructive transition cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            Belum ada fasilitas / produk yang dipilih. Centang produk di bawah.
          </p>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari produk / peralatan camping..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 h-9 text-xs bg-background"
        />
      </div>

      {/* Checklist Grid */}
      <div className="max-h-56 overflow-y-auto border border-border rounded-md p-2 space-y-1 bg-background">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => {
            const isChecked = selectedList.includes(p.name);
            return (
              <label
                key={`${p.id}-${p.name}`}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition text-xs select-none",
                  isChecked && "bg-muted/80 font-medium"
                )}
              >
                <div className="flex items-center gap-2.5 truncate pr-2">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleItem(p.name)}
                    className="shrink-0"
                  />
                  <span className="truncate text-foreground">{p.name}</span>
                </div>
                {p.category && (
                  <Badge variant="outline" className="text-[10px] font-normal shrink-0 text-muted-foreground">
                    {p.category}
                  </Badge>
                )}
              </label>
            );
          })
        ) : (
          <p className="py-4 text-center text-xs text-muted-foreground">
            Produk tidak ditemukan.
          </p>
        )}
      </div>

      {/* Add Custom Facility Bar */}
      <div className="flex gap-2">
        <Input
          placeholder="Tambah fasilitas/layanan lain secara manual..."
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddCustom();
            }
          }}
          className="h-9 text-xs bg-background"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleAddCustom}
          className="h-9 px-3 text-xs font-medium shrink-0 cursor-pointer gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Tambah</span>
        </Button>
      </div>
    </div>
  );
}
