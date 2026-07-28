<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CampingPackage;
use Illuminate\Support\Str;

class CampingPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Paket Sunrise Prau (2H1M)',
                'price' => 1250000,
                'description' => 'Nikmati golden sunrise terbaik di Asia Tenggara. Paket sudah termasuk porter, alat lengkap, dan makan.',
                'facilities' => 'Tenda Dome, Matras, Sleeping Bag, Makan 3x, Porter, Tiket Masuk, Air Mineral.',
                'tags' => 'Gunung Prau',
                'status' => 'Available',
            ],
            [
                'name' => 'Paket Eksklusif Merbabu via Selo',
                'price' => 2450000,
                'description' => 'Pendakian nyaman dengan fasilitas premium. Kami urus semua kebutuhan Anda dari basecamp hingga puncak.',
                'facilities' => 'Tenda Premium, Kasur Angin, Kursi & Meja Camping, Makan Mewah, Dokumentasi, Porter Pribadi.',
                'tags' => 'Gunung Merbabu',
                'status' => 'Available',
            ],
            [
                'name' => 'Sumbing Adventure (Full Service)',
                'price' => 1850000,
                'description' => 'Jelajahi kemegahan Gunung Sumbing tanpa beban. Cocok untuk pendaki pemula maupun berpengalaman.',
                'facilities' => 'Alat Camping Lengkap, Porter Logistik, Makan selama Pendakian, P3K Standar.',
                'tags' => 'Gunung Sumbing',
                'status' => 'Available',
            ],
            [
                'name' => 'Family Camp Dieng (Non-Pendakian)',
                'price' => 950000,
                'description' => 'Camping keluarga santai di area camping ground Dieng yang sejuk dan asri.',
                'facilities' => 'Tenda Keluarga, Api Unggun, Alat BBQ, Sarapan, Toilet Dekat Area.',
                'tags' => 'Dieng Plateu',
                'status' => 'Available',
            ],
            [
                'name' => 'Sindoro Milky Way Expedition',
                'price' => 1650000,
                'description' => 'Berburu foto galaksi di puncak Sindoro. Paket khusus untuk pecinta fotografi dan alam.',
                'facilities' => 'Tenda, Porter, Makan, Guide Khusus Spot Foto, Kopi & Teh Hangat.',
                'tags' => 'Gunung Sindoro',
                'status' => 'Available',
            ],
            [
                'name' => 'Paket Hemat Lawu via Cetho',
                'price' => 1350000,
                'description' => 'Jalur terpanjang dan tercantik di Lawu kini lebih mudah dengan bantuan porter kami.',
                'facilities' => 'Tenda, Matras, Logistik Dasar, Porter Kelompok, Simaksi.',
                'tags' => 'Gunung Lawu',
                'status' => 'Available',
            ],
            [
                'name' => 'Andong Peak Weekend Getaway',
                'price' => 750000,
                'description' => 'Pendakian singkat namun berkesan. Cocok untuk mengisi waktu akhir pekan Anda.',
                'facilities' => 'Tenda, Alat Masak, Makan 2x, Guide/Porter lokal.',
                'tags' => 'Gunung Andong',
                'status' => 'Available',
            ],
            [
                'name' => 'Ungaran Night Trekking',
                'price' => 650000,
                'description' => 'Melihat kerlap-kerlip lampu kota Semarang dari ketinggian Gunung Ungaran.',
                'facilities' => 'Tenda, Matras, Sleeping Bag, Kopi/Teh, Porter Alat.',
                'tags' => 'Gunung Ungaran',
                'status' => 'Available',
            ],
        ];

        foreach ($packages as $package) {
            $package['slug'] = Str::slug($package['name']);
            CampingPackage::create($package);
        }
    }
}
