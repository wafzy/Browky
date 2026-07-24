<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Tenda Dome Eiger 4 Person',
                'description' => 'Tenda berkualitas tinggi dari Eiger, kapasitas 4 orang, double layer, tahan hujan badai.',
                'price_per_day' => 45000,
                'stock' => 15,
                'category' => 'Tenda',
                'cover_image' => 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Carrier Consina Centurion 60L',
                'description' => 'Tas carrier kapasitas 60 liter, ergonomis, nyaman dipakai untuk pendakian jangka menengah.',
                'price_per_day' => 25000,
                'stock' => 20,
                'category' => 'Tas',
                'cover_image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Sleeping Bag Polar Thick',
                'description' => 'Sleeping bag dengan lapisan polar tebal, menjamin kehangatan saat suhu ekstrim di puncak.',
                'price_per_day' => 10000,
                'stock' => 40,
                'category' => 'Perlengkapan Tidur',
                'cover_image' => 'https://images.unsplash.com/photo-1501168122995-5b5839954937?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Kompor Camping Portable Kovar',
                'description' => 'Kompor mini portable yang praktis, menggunakan gas kaleng, api stabil dan mudah dinyalakan.',
                'price_per_day' => 7000,
                'stock' => 30,
                'category' => 'Alat Masak',
                'cover_image' => 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Cooking Set / Nesting DS-308',
                'description' => 'Satu set alat masak lengkap (panci, penggorengan, mangkok) untuk kebutuhan 2-3 orang.',
                'price_per_day' => 8000,
                'stock' => 25,
                'category' => 'Alat Masak',
                'cover_image' => 'https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Sepatu Gunung Waterproof SNI',
                'description' => 'Sepatu gunung dengan sol vibram anti slip dan bahan waterproof untuk keamanan maksimal.',
                'price_per_day' => 35000,
                'stock' => 12,
                'category' => 'Sepatu',
                'cover_image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Headlamp LED Rechargable 500LM',
                'description' => 'Senter kepala sangat terang, baterai tahan lama, cocok untuk summit attack malam hari.',
                'price_per_day' => 5000,
                'stock' => 50,
                'category' => 'Penerangan',
                'cover_image' => 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Trekking Pole Carbon Ultralight',
                'description' => 'Tongkat pendaki bahan carbon yang sangat ringan namun kuat untuk menahan beban tubuh.',
                'price_per_day' => 10000,
                'stock' => 15,
                'category' => 'Aksesoris',
                'cover_image' => 'https://images.unsplash.com/photo-1610448721566-473ce9da3825?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Flysheet 3x4m Waterproof',
                'description' => 'Pelindung tambahan dari hujan dan angin, bisa digunakan sebagai teras tenda atau dapur darurat.',
                'price_per_day' => 10000,
                'stock' => 20,
                'category' => 'Tenda',
                'cover_image' => 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=500&q=80',
            ],
            [
                'name' => 'Matras Aluminium Foil Single',
                'description' => 'Matras dengan lapisan aluminium foil untuk menahan suhu dingin dari tanah secara maksimal.',
                'price_per_day' => 5000,
                'stock' => 45,
                'category' => 'Perlengkapan Tidur',
                'cover_image' => 'https://images.unsplash.com/photo-1526626305450-33b0928e4612?auto=format&fit=crop&w=500&q=80',
            ],
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']);
            Product::create($product);
        }
    }
}
