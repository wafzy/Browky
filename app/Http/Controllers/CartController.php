<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        $updatedCart = [];
        $total = 0;
        
        foreach($cart as $id => $item) {
            $product = Product::with('images')->find($id);
            if ($product) {
                $primaryImage = $product->images->where('is_primary', true)->first() ?? $product->images->first();
                $item['image'] = !empty($product->cover_image) ? $product->cover_image : ($primaryImage ? $primaryImage->image_path : null);
                $item['name'] = $product->name;
                $item['price'] = $product->price_per_day;
                $updatedCart[$id] = $item;
                $total += $item['price'] * $item['quantity'];
            }
        }
        
        if (!empty($cart)) {
            session()->put('cart', $updatedCart);
        }
        
        return \Inertia\Inertia::render('Cart', [
            'cart' => (object)$updatedCart,
            'total' => $total
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::with('images')->findOrFail($request->product_id);
        $cart = session()->get('cart', []);

        $primaryImage = $product->images->where('is_primary', true)->first() ?? $product->images->first();
        $itemImage = !empty($product->cover_image) ? $product->cover_image : ($primaryImage ? $primaryImage->image_path : null);

        if(isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $request->quantity;
            $cart[$product->id]['image'] = $itemImage;
            $cart[$product->id]['name'] = $product->name;
            $cart[$product->id]['price'] = $product->price_per_day;
        } else {
            $cart[$product->id] = [
                'name' => $product->name,
                'price' => $product->price_per_day,
                'quantity' => $request->quantity,
                'image' => $itemImage
            ];
        }

        session()->put('cart', $cart);
        
        if ($request->input('redirect') === 'back') {
            return redirect()->back()->with('success', 'Produk ditambahkan ke keranjang!');
        }
        
        return redirect()->route('cart.index')->with('success', 'Produk ditambahkan ke keranjang!');
    }

    public function remove(Request $request)
    {
        if($request->id) {
            $cart = session()->get('cart');
            if(isset($cart[$request->id])) {
                unset($cart[$request->id]);
                session()->put('cart', $cart);
            }
            return redirect()->route('cart.index')->with('success', 'Produk dihapus dari keranjang!');
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = session()->get('cart');
        if(isset($cart[$request->id])) {
            $cart[$request->id]['quantity'] = $request->quantity;
            session()->put('cart', $cart);
        }

        return redirect()->route('cart.index')->with('success', 'Jumlah produk berhasil diperbarui!');
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:20',
            'start_date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'selected_items' => 'nullable|array',
        ]);

        $selectedItems = $request->input('selected_items', []);
        $cart = session()->get('cart', []);
        
        if (!empty($selectedItems)) {
            $cart = array_filter($cart, function($key) use ($selectedItems) {
                return in_array((string)$key, array_map('strval', $selectedItems));
            }, ARRAY_FILTER_USE_KEY);
        }

        if(count($cart) == 0) {
            return redirect()->back()->with('error', 'Pilih minimal satu produk untuk checkout.');
        }

        $message = "Halo admin,\n\nSaya ingin melakukan pemesanan:\n\n";
        $message .= "Nama: " . $request->name . "\n";
        $message .= "No WA: " . $request->whatsapp . "\n";
        $message .= "Tanggal Sewa: " . date('d F Y', strtotime($request->start_date)) . "\n";
        $message .= "Durasi: " . $request->duration . " hari\n\n";
        $message .= "Detail Pesanan:\n\n";

        $totalPrice = 0;
        $i = 1;
        foreach($cart as $id => $item) {
            $subtotal = $item['price'] * $item['quantity'] * $request->duration;
            $totalPrice += $subtotal;
            $message .= $i . ". " . $item['name'] . "\n";
            $message .= "Jumlah: " . $item['quantity'] . "\n";
            $message .= "Subtotal: Rp " . number_format($subtotal, 0, ',', '.') . "\n\n";
            $i++;
        }

        $message .= "Total: Rp " . number_format($totalPrice, 0, ',', '.') . "\n\n";
        $message .= "Mohon konfirmasi ketersediaan.\nTerima kasih.";

        // Clear only selected items after checkout
        $originalCart = session()->get('cart', []);
        if (!empty($selectedItems)) {
            foreach ($selectedItems as $id) {
                if (isset($originalCart[$id])) {
                    unset($originalCart[$id]);
                }
            }
            session()->put('cart', $originalCart);
        } else {
            session()->forget('cart');
        }

        $encodedMessage = urlencode($message);
        // Menggunakan nomor WhatsApp resmi Browky Outdoor
        $adminWa = '6285169933007'; 
        
        return \Inertia\Inertia::location('https://wa.me/' . $adminWa . '?text=' . $encodedMessage);
    }
}
