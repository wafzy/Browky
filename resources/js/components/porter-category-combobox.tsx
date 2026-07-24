import React, { useState } from 'react';
import { Check, ChevronsUpDown, Plus, Search, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DEFAULT_PORTER_CATEGORIES = [
  'Porter Tektok (PP / 1 Hari)',
  'Porter Inap / Berkemah',
  'Guide & Pendamping',
  'Porter Carrier',
  'Porter Logistics & Equipment',
];

interface PorterCategoryComboboxProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  initialList?: string[];
}

export function PorterCategoryCombobox({ value, onChange, error, initialList }: PorterCategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [customInputMode, setCustomInputMode] = useState(false);
  const [categories, setCategories] = useState<string[]>(() => {
    const combined = Array.from(new Set([...(initialList || []), ...DEFAULT_PORTER_CATEGORIES]));
    if (value && !combined.includes(value)) {
      return [...combined, value];
    }
    return combined;
  });

  const filteredCategories = categories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (categoryName: string) => {
    onChange(categoryName);
    setOpen(false);
    setSearch('');
    setCustomInputMode(false);
  };

  const handleDeleteItem = (e: React.MouseEvent, catName: string) => {
    e.stopPropagation();
    setCategories((prev) => prev.filter((item) => item !== catName));
    if (value === catName) {
      onChange('');
    }
  };

  const handleAddCustom = (newCat: string) => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
    }
    onChange(trimmed);
    setOpen(false);
    setSearch('');
    setCustomInputMode(false);
  };

  return (
    <div className="space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "h-9.5 w-full justify-between rounded-md text-xs font-normal cursor-pointer bg-background px-3",
              !value && "text-muted-foreground",
              error && "border-destructive focus-visible:ring-destructive"
            )}
          >
            <span className="truncate">{value || "Pilih atau ketik kategori..."}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 shadow-md rounded-md" align="start" sideOffset={4}>
          {!customInputMode ? (
            <div className="space-y-2">
              <div className="relative flex items-center">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Cari atau ketik kategori layanan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-muted/40"
                  autoFocus
                />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((c) => (
                    <div
                      key={c}
                      onClick={() => handleSelect(c)}
                      className={cn(
                        "group w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer text-left",
                        value === c && "bg-zinc-100 dark:bg-zinc-800 font-medium text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {value === c && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                        <span className="truncate">{c}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteItem(e, c)}
                        title={`Hapus "${c}" dari daftar`}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive hover:bg-destructive/10 rounded-xs transition shrink-0 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="py-2 text-center text-xs text-muted-foreground">
                    Kategori layanan tidak ditemukan.
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-1">
                {search.trim() && !categories.some(c => c.toLowerCase() === search.trim().toLowerCase()) ? (
                  <button
                    type="button"
                    onClick={() => handleAddCustom(search)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-primary font-medium rounded-sm hover:bg-primary/10 transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Tambah "{search.trim()}"</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCustomInputMode(true)}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-sm hover:bg-muted transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Ketik kategori baru secara manual...</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2 p-1">
              <p className="text-xs font-medium text-foreground">Input Kategori Layanan Baru</p>
              <div className="flex gap-1.5">
                <Input
                  placeholder="Kategori layanan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustom(search);
                    }
                  }}
                  className="h-8 text-xs"
                  autoFocus
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleAddCustom(search)}
                  className="h-8 text-xs px-3 cursor-pointer"
                >
                  Tambah
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setCustomInputMode(false)}
                className="text-[11px] text-muted-foreground hover:underline cursor-pointer"
              >
                ← Kembali ke daftar pilihan
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
