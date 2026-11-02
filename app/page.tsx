'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Trash2, Plus, Minus, X, Check, 
  Flame, Star, ShieldCheck, Truck, ChevronRight, ArrowLeft 
} from 'lucide-react';

// ==========================================
// --- LETAK SUPABASE CLIENT DI SINI ---
// ==========================================
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
// ==========================================

// --- DATA DEFINITIONS ---

const PRODUCTS = [
  {
    id: 'sambal-hijau',
    name: 'Sambal Hijau Kaeyke',
    subtitle: 'Fragrant Green Chili & Crispy Anchovies',
    price: 18.00,
    rating: 4.9,
    reviewsCount: 128,
    heatLevel: 2, // 1-5 scale
    heatLabel: 'Mild-Medium',
    weight: '180g',
    description: 'Slow-cooked green bird\'s eye chilies infused with aromatic lemongrass, kaffir lime leaves, and crispy grade-A Langkawi anchovies. Perfectly balanced tanginess and moderate heat.',
    ingredients: 'Green Chili, Shallots, Garlic, Anchovies, Lemongrass, Kaffir Lime Leaves, Palm Oil, Salt, Sugar.',
    bestPairedWith: 'Crispy Fried Chicken, Nasi Lemak, Fried Tofu',
    badge: 'Best For Beginners',
    imageBg: 'from-emerald-900 to-green-800',
    colorTheme: '#10B981',
    accentClass: 'bg-emerald-600',
    tag: 'Mild'
  },
  {
    id: 'sambal-nyet',
    name: 'Sambal Nyet Kaeyke',
    subtitle: 'Signature Extra Spicy Crispy Shallot Sambal',
    price: 22.00,
    rating: 5.0,
    reviewsCount: 342,
    heatLevel: 5,
    heatLabel: 'Extra Hot 🔥',
    weight: '180g',
    description: 'Our iconic best-seller! Packed with fiery red Cili Padi, fragrant caramelized garlic, and super crunchy fried shallots. Cooked for 4 hours until the oil glimmers with deep chili aroma.',
    ingredients: 'Red Bird\'s Eye Chili, Red Chili, Golden Shallots, Garlic, Cooking Oil, Himalayan Salt, Sugar.',
    bestPairedWith: 'Hot Steamed Rice, Sunnyside Egg, Fried Fish, Instant Noodles',
    badge: '🔥 Top Seller',
    imageBg: 'from-red-950 to-red-800',
    colorTheme: '#D32F2F',
    accentClass: 'bg-red-600',
    tag: 'Extra Spicy'
  },
  {
    id: 'sambal-hitam',
    name: 'Sambal Hitam Kaeyke',
    subtitle: 'Traditional Belimbing Buloh & Crispy Fish',
    price: 20.00,
    rating: 4.8,
    reviewsCount: 96,
    heatLevel: 3,
    heatLabel: 'Medium-Hot',
    weight: '180g',
    description: 'Authentic Pahang recipe featuring simmered sour starfruit (Belimbing Buloh) boiled down into deep dark caramelized savory goodness mixed with flaky fried fish.',
    ingredients: 'Belimbing Buloh (Sour Starfruit), Red Chili, Crispy Fish, Fried Garlic, Caramelized Shallots, Palm Oil.',
    bestPairedWith: 'Grilled Fish, Ulam-ulaman, Plain White Rice',
    badge: 'Heritage Recipe',
    imageBg: 'from-amber-950 to-stone-900',
    colorTheme: '#78350F',
    accentClass: 'bg-amber-700',
    tag: 'Hot'
  },
  {
    id: 'sambal-bawang',
    name: 'Sambal Bawang Kaeyke',
    subtitle: 'Savory Garlic & Shallot Umami Burst',
    price: 19.00,
    rating: 4.9,
    reviewsCount: 84,
    heatLevel: 4,
    heatLabel: 'Hot & Fragrant',
    weight: '180g',
    description: 'A punchy garlic-forward recipe with whole caramelized shallots and vibrant chili infusion. Extra savory with rich natural chili oils.',
    ingredients: 'Whole Shallots, Garlic cloves, Red Cili Padi, Vegetable Oil, Sea Salt, Natural Seasoning.',
    bestPairedWith: 'Fried Tempeh, Seafood BBQ, Sambal Fried Rice',
    badge: 'Garlic Lover',
    imageBg: 'from-orange-950 to-amber-900',
    colorTheme: '#E65100',
    accentClass: 'bg-orange-600',
    tag: 'Hot'
  },
  {
    id: 'tri-pack-bundle',
    name: 'Kaeyke Ultimate Tri-Pack',
    subtitle: 'All-in-One Trio Set (Nyet + Hijau + Hitam)',
    price: 55.00,
    originalPrice: 60.00,
    rating: 5.0,
    reviewsCount: 210,
    heatLevel: 4,
    heatLabel: 'Mixed Heat Set',
    weight: '180g x 3 Jars',
    description: 'Cannot decide? Get the complete Kaeyke experience! Includes 1x Sambal Nyet, 1x Sambal Hijau, and 1x Sambal Hitam in an artisanal gift box.',
    ingredients: 'Contains full jar set of Nyet, Hijau, and Hitam variants.',
    bestPairedWith: 'Everything! Great gift for sambal lovers.',
    badge: '🎁 Save RM 5.00',
    imageBg: 'from-neutral-900 via-red-950 to-amber-950',
    colorTheme: '#FFD700',
    accentClass: 'bg-amber-500',
    tag: 'Bundle'
  }
];

const REVIEWS_DATA = [
  {
    id: 1,
    author: 'Siti Sarah M.',
    rating: 5,
    date: '2 days ago',
    verified: true,
    title: 'Boleh makan sampai bertambah 3 pinggan nasi!',
    comment: 'Sambal Nyet strictly top tier. Rangup giler bawang dia, pedas tapi ada rasa manis sikit. Delivery pun laju ke Shah Alam!',
    product: 'Sambal Nyet Kaeyke'
  },
  {
    id: 2,
    author: 'Jason Tan',
    rating: 5,
    date: '1 week ago',
    verified: true,
    title: 'Crucial for my meal prep!',
    comment: 'The Sambal Hijau is so fresh and not oily like standard store brands. I put it on grilled chicken breast every single day.',
    product: 'Sambal Hijau Kaeyke'
  },
  {
    id: 3,
    author: 'Farida H.',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    title: 'Sambal Hitam authentic Pahang taste',
    comment: 'Belimbing taste is spot on, masam pedas berempah. Auto teringat kampung! Will buy the Tri-pack next time.',
    product: 'Sambal Hitam Kaeyke'
  },
  {
    id: 4,
    author: 'Ahmad Daniel',
    rating: 4,
    date: '3 weeks ago',
    verified: true,
    title: 'Pedas tapi sedap gila',
    comment: 'Sambal Bawang has huge garlic aroma. Recommended for fried rice topping!',
    product: 'Sambal Bawang Kaeyke'
  }
];

const PAIRING_GUIDES = [
  {
    id: 'nyet-egg',
    title: 'Sambal Nyet + Crispy Telur Mata & Hot Rice',
    description: 'The iconic student & quick dinner classic. Steaming hot fragrant Jasmine rice, runny egg yolk, and 2 spoonfuls of fiery Sambal Nyet.',
    imageIcon: '🍳',
    recommendedJar: 'Sambal Nyet Kaeyke',
    prepTime: '5 Mins'
  },
  {
    id: 'hijau-chicken',
    title: 'Sambal Hijau + Ayam Goreng Berempah',
    description: 'Juicy spiced fried chicken smothered in vibrant, zesty green sambal with kaffir lime aromas.',
    imageIcon: '🍗',
    recommendedJar: 'Sambal Hijau Kaeyke',
    prepTime: '20 Mins'
  },
  {
    id: 'hitam-fish',
    title: 'Sambal Hitam + Ikan Bakar Petai',
    description: 'Smoky grilled tilapia or stingray served with tart belimbing buloh sambal hitam and fresh ulam-ulaman.',
    imageIcon: '🐟',
    recommendedJar: 'Sambal Hitam Kaeyke',
    prepTime: '25 Mins'
  }
];

// ==========================================
// --- STEP 2: TAMBAH INTERFACE DI SINI ---
// ==========================================
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  imageBg?: string;
  [key: string]: any;
}

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  rating?: number;
  reviewsCount?: number;
  heatLevel?: number;
  heatLabel?: string;
  weight?: string;
  description?: string;
  ingredients?: string;
  bestPairedWith?: string;
  badge?: string;
  imageBg?: string;
  [key: string]: any;
}

// --- MAIN APP COMPONENT ---

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // STEP 3: KEMAS KINI TYPES DI DALAM STATE
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  
  // Cart & E-commerce State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [discountMsg, setDiscountMsg] = useState<string>('');
  
  // Notification Toast State
  const [toast, setToast] = useState(null);

  // Reviews State
  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '', product: 'Sambal Nyet Kaeyke' });
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ heat: '', savory: '', pairing: '' });
  const [quizResult, setQuizResult] = useState(null);

  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Selangor',
    postcode: '',
    paymentMethod: 'fpx',
    orderId: ''
  });

  // Toast Timer Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart Calculation Helpers
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const FREE_SHIPPING_THRESHOLD = 50.00;
  const shippingCost = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 7.00;
  const discountAmount = (cartSubtotal * discountApplied);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  // Cart Operations
  const addToCart = (product, quantity = 1, size = '180g') => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity, selectedSize: size }];
      }
    });
    showToast(`Added ${product.name} to your cart! 🔥`);
  };

  const updateQuantity = (id, size, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const applyPromoCode = (e) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'KAEYKE10') {
      setDiscountApplied(0.10);
      setDiscountMsg('10% Discount applied!');
      showToast('Promo Code KAEYKE10 Applied! (10% OFF)');
    } else if (discountCode.trim().toUpperCase() === 'SAMBALFREE') {
      setDiscountApplied(0.15);
      setDiscountMsg('15% VIP Discount applied!');
      showToast('VIP Voucher Applied! (15% OFF)');
    } else {
      setDiscountMsg('Invalid code. Try "KAEYKE10"');
    }
  };

  // Quiz Handling
  const handleQuizOption = (category, value) => {
    const updated = { ...quizAnswers, [category]: value };
    setQuizAnswers(updated);
    
    if (quizStep < 2) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate Recommendation
      let matched = PRODUCTS[1]; // Default Nyet
      if (updated.heat === 'mild') {
        matched = PRODUCTS[0]; // Hijau
      } else if (updated.heat === 'extra-hot') {
        matched = PRODUCTS[1]; // Nyet
      } else if (updated.savory === 'sour-tangy') {
        matched = PRODUCTS[2]; // Hitam
      } else if (updated.savory === 'garlic-heavy') {
        matched = PRODUCTS[3]; // Bawang
      }
      setQuizResult(matched);
      setQuizStep(3);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({ heat: '', savory: '', pairing: '' });
    setQuizResult(null);
  };

  // Checkout Handlers (Diselaraskan dengan Supabase & ToyyibPay)
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    // LANGKAH 1: Sahkan maklumat penghantaran
    if (checkoutStep === 1) {
      if (!orderInfo.name || !orderInfo.address || !orderInfo.phone) {
        alert('Sila lengkapkan semua butiran penghantaran.');
        return;
      }
      setCheckoutStep(2); // Pergi ke pilihan pembayaran
    } 
    // LANGKAH 2: Proses Simpan ke Supabase & Buka Bil ToyyibPay
    else if (checkoutStep === 2) {
      setLoading(true);

      try {
        const fullAddress = `${orderInfo.address}, ${orderInfo.city}, ${orderInfo.state} ${orderInfo.postcode}`;
        const productSummary = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

        // 1. Simpan pesanan ke pangkalan data Supabase (jadual 'orders')
        const { error: dbError } = await supabase.from('orders').insert([
          {
            customer_name: orderInfo.name,
            customer_phone: orderInfo.phone,
            customer_address: fullAddress,
            product_name: productSummary,
            quantity: Number(totalQuantity),
            total_price: finalTotal,
          },
        ]);

        if (dbError) {
          throw new Error('Ralat simpan ke database: ' + dbError.message);
        }

        // 2. Jika pilih ToyyibPay / FPX
        if (orderInfo.paymentMethod === 'fpx' || orderInfo.paymentMethod === 'card' || orderInfo.paymentMethod === 'tng') {
          const response = await fetch('/api/create-bill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: orderInfo.name,
              phone: orderInfo.phone,
              address: fullAddress,
              productName: productSummary,
              quantity: totalQuantity,
              totalPrice: finalTotal,
            }),
          });

          const result = await response.json();

          if (result.success && result.paymentUrl) {
            // Bawa pelanggan terus ke ToyyibPay (FPX)
            window.location.href = result.paymentUrl;
            return;
          } else {
            alert('Pesanan direkod, tetapi gagal membuka ToyyibPay: ' + (result.error || ''));
            setLoading(false);
            return;
          }
        }

        // 3. Jika pilih kaedah lain (cth: COD)
        const generateId = 'KYK-' + Math.floor(100000 + Math.random() * 900000);
        setOrderInfo(prev => ({ ...prev, orderId: generateId }));
        setCheckoutStep(3);
        setCart([]);
        setLoading(false);

      } catch (err) {
        alert('Ralat: ' + err.message);
        console.error(err);
        setLoading(false);
      }
    }
  };

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.tag === selectedCategory);
  }, [selectedCategory]);

  // Review Submission
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;
    const reviewObj = {
      id: Date.now(),
      author: newReview.author,
      rating: parseInt(newReview.rating),
      date: 'Just now',
      verified: true,
      title: 'Awesome Sambal Taste!',
      comment: newReview.comment,
      product: newReview.product
    };
    setReviewsList([reviewObj, ...reviewsList]);
    setShowReviewModal(false);
    setNewReview({ author: '', rating: 5, comment: '', product: 'Sambal Nyet Kaeyke' });
    showToast('Thank you! Your review has been published.');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans flex flex-col selection:bg-[#E65100] selection:text-white">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className="fixed top-20 right-5 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-500/40 flex items-center space-x-3 animate-bounce">
          <Flame className="w-5 h-5 text-red-500 fill-red-500" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* --- TOP BANNER --- */}
      <div className="bg-gradient-to-r from-red-700 via-orange-600 to-red-700 text-white text-xs md:text-sm py-2 px-4 text-center font-semibold tracking-wider flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>FREE SHIPPING MALAYSIA WIDE ON ORDERS OVER RM 50 | USE CODE <strong className="underline decoration-yellow-300">KAEYKE10</strong> FOR 10% OFF</span>
        <Sparkles className="w-4 h-4 animate-spin" />
      </div>

      {/* --- HEADER / NAVIGATION --- */}
      <header className="sticky top-0 z-40 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-neutral-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-red-600 to-amber-500 p-2.5 rounded-2xl shadow-lg group-hover:scale-105 transition duration-300">
              <Flame className="w-6 h-6 text-white fill-yellow-300 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent uppercase">
                Kaeyke
              </span>
              <span className="block text-[10px] text-amber-400 font-bold uppercase tracking-widest -mt-1">
                Authentic Sambal
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
            {[
              { id: 'home', label: 'Home' },
              { id: 'shop', label: 'Shop All' },
              { id: 'quiz', label: 'Spice Quiz 🌶️' },
              { id: 'story', label: 'Our Craft' },
              { id: 'pairings', label: 'Recipes' },
              { id: 'reviews', label: 'Reviews' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  if (link.id === 'shop') {
                    const el = document.getElementById('shop-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`transition-colors duration-200 hover:text-orange-400 ${
                  activeTab === link.id ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : 'text-stone-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Cart Icon & Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-neutral-800 hover:bg-neutral-700 p-3 rounded-full transition text-white border border-neutral-700"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => {
                setActiveTab('shop');
                setTimeout(() => {
                  document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-red-600/30 transition transform hover:-translate-y-0.5"
            >
              <span>Order Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="md:hidden flex justify-around py-2.5 border-t border-neutral-800 bg-[#121212] text-xs font-semibold overflow-x-auto">
          {[
            { id: 'home', label: 'Home' },
            { id: 'shop', label: 'Shop' },
            { id: 'quiz', label: 'Quiz 🌶️' },
            { id: 'story', label: 'Craft' },
            { id: 'reviews', label: 'Reviews' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`px-3 py-1 rounded-full ${
                activeTab === link.id ? 'bg-amber-500 text-black font-bold' : 'text-stone-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      {activeTab === 'home' && (
        <section className="relative bg-[#1A1A1A] text-white overflow-hidden py-16 md:py-24 border-b border-neutral-800">
          {/* Background Gradient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full filter blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full filter blur-3xl -z-0"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase">
                <Flame className="w-4 h-4 fill-red-500" />
                100% Homemade Malaysian Recipe
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Authentic, Fiery, <br />
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Unforgettable Sambal
                </span>
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Handcrafted using fresh Cili Padi, crispy golden shallots, and slow-cooked for over 4 hours. Elevate every meal with the bold, savory umami of Kaeyke Sambal.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('shop');
                    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-red-600/40 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>Shop Best-Sellers</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 text-amber-400 border border-amber-500/30 font-bold text-base px-8 py-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span>Take Spice Quiz</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-neutral-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-amber-400">4 Hours</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Slow Cooked</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-amber-400">100%</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Fresh Chilies</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-amber-400">0%</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Preservatives</p>
                </div>
              </div>
            </div>

            {/* Right Showcase Banner */}
            <div className="relative flex justify-center">
              {/* Product Hero Container */}
              <div className="relative w-full max-w-md bg-gradient-to-b from-stone-900 via-neutral-900 to-[#121212] p-8 rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden group">
                
                {/* Floating Highlights Badges */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>Signature Nyet</span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-amber-500 text-black text-xs font-black px-3 py-1 rounded-full shadow-md">
                  RM 22.00
                </div>

                {/* Hero Jar Visual Representation */}
                <div className="my-8 flex justify-center items-center py-6">
                  <div className="relative w-56 h-72 bg-gradient-to-b from-red-950 to-red-900 rounded-3xl border-4 border-amber-500/40 shadow-2xl flex flex-col items-center justify-between p-4 transform group-hover:scale-105 transition duration-500">
                    
                    {/* Metal Lid */}
                    <div className="w-44 h-8 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-lg shadow-md border-b-2 border-yellow-300 flex items-center justify-center">
                      <span className="text-[10px] text-amber-100 font-bold tracking-widest uppercase">Sealed Fresh</span>
                    </div>

                    {/* Glass Jar Body & Label */}
                    <div className="w-full bg-[#1A1A1A] border-2 border-amber-500/50 rounded-xl p-3 text-center my-auto shadow-inner">
                      <div className="flex justify-center mb-1">
                        <Flame className="w-6 h-6 text-red-500 fill-red-500" />
                      </div>
                      <h3 className="text-xl font-black text-amber-400 tracking-wider uppercase">KAEYKE</h3>
                      <p className="text-[10px] text-red-400 font-bold tracking-widest uppercase">Sambal Nyet Extra Spicy</p>
                      <div className="mt-2 flex justify-center gap-1 text-red-500">
                        {'🌶️'.repeat(5)}
                      </div>
                      <p className="text-[9px] text-stone-400 mt-1 font-mono">Net Wt. 180g</p>
                    </div>

                    <div className="text-[10px] text-stone-300 bg-red-950/90 px-3 py-1 rounded-full border border-red-500/30">
                      ✨ Crisp Shallot Crunch
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button 
                    onClick={() => addToCart(PRODUCTS[1])}
                    className="w-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black py-3 rounded-xl shadow-lg hover:brightness-110 transition"
                  >
                    Quick Add Sambal Nyet — RM 22.00
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* --- FEATURED REASONS / VALUE PROPS --- */}
      <section className="bg-white py-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Flame className="w-6 h-6 text-red-600" />, title: 'Fresh Cili Padi', desc: 'Sourced daily from local Malaysian farms.' },
            { icon: <ChefHat className="w-6 h-6 text-amber-600" />, title: '4-Hour Slow Simmer', desc: 'Deep flavor extraction with aromatic oils.' },
            { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, title: 'Zero Preservatives', desc: 'Natural hot-fill pasteurization sealing freshness.' },
            { icon: <Truck className="w-6 h-6 text-orange-600" />, title: 'Fast Delivery', desc: 'Carefully wrapped in bubble mailers.' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-stone-50 border border-stone-100">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-stone-200">{item.icon}</div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
                <p className="text-xs text-stone-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRODUCT CATALOG (E-COMMERCE) --- */}
      <section id="shop-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest">
              <Flame className="w-4 h-4 fill-red-600" />
              Malaysian Kitchen Essential
            </div>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
              Explore Our Sambal Collection
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {['All', 'Mild', 'Hot', 'Extra Spicy', 'Bundle'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-amber-400 shadow-md'
                    : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header Visual */}
              <div className={`h-52 bg-gradient-to-br ${product.imageBg} p-6 relative flex flex-col justify-between text-white overflow-hidden`}>
                
                {/* Heat Indicator Tag */}
                <div className="flex justify-between items-center z-10">
                  <span className="bg-black/40 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                    {product.badge}
                  </span>
                  <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Stylized Product Jar Mockup */}
                <div className="relative z-10 my-auto flex items-center justify-center">
                  <div className="w-28 h-36 bg-[#1A1A1A] rounded-2xl border-2 border-amber-400/40 p-3 shadow-2xl flex flex-col justify-between items-center transform group-hover:scale-110 transition duration-300">
                    <div className="w-full h-3 bg-amber-600 rounded-t-sm"></div>
                    <div className="text-center">
                      <p className="text-xs font-black text-amber-400 uppercase tracking-widest">KAEYKE</p>
                      <p className="text-[9px] text-stone-300 font-semibold line-clamp-1">{product.name}</p>
                      <div className="text-[10px] mt-1">
                        {'🌶️'.repeat(product.heatLevel)}
                      </div>
                    </div>
                    <div className="w-full text-center text-[8px] text-amber-300 font-mono border-t border-neutral-700 pt-1">
                      {product.weight}
                    </div>
                  </div>
                </div>

                {/* Heat Spice Meter Bar */}
                <div className="relative z-10 flex items-center justify-between text-xs font-semibold pt-2 border-t border-white/10">
                  <span className="text-stone-300">Heat Level:</span>
                  <span className="text-amber-300 font-bold">{product.heatLabel}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-red-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mt-0.5">{product.subtitle}</p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-stone-900">
                      RM {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-stone-400 line-through">
                        RM {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="p-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 transition"
                      title="Quick View Details"
                    >
                      <Search className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* --- SPICE LEVEL INTERACTIVE QUIZ SECTION --- */}
      {activeTab === 'quiz' && (
        <section className="bg-[#1A1A1A] text-white py-16 px-4">
          <div className="max-w-3xl mx-auto bg-stone-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Matchmaker</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white">
                Find Your Perfect Kaeyke Match
              </h2>
              <p className="text-stone-400 text-sm max-w-md mx-auto">
                Answer 3 quick questions to discover your ideal sambal flavor profile!
              </p>
            </div>

            {/* Quiz Step 0: Heat Preference */}
            {quizStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-amber-400 text-center">
                  Question 1: How much chili heat can you handle?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Mild & Fragrant', heat: 'mild', desc: 'I like aroma and mild warmth 🌶️' },
                    { label: 'Hot & Fiery', heat: 'hot', desc: 'Standard Malaysian spicy lover 🌶️🌶️🌶️' },
                    { label: 'Extra Hot & Sweat!', heat: 'extra-hot', desc: 'Maximum Cili Padi intensity 🔥🌶️🔥' },
                  ].map((opt) => (
                    <button
                      key={opt.heat}
                      onClick={() => handleQuizOption('heat', opt.heat)}
                      className="p-5 bg-stone-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-500 rounded-2xl text-left transition space-y-2 group"
                    >
                      <div className="font-bold text-white group-hover:text-amber-400">{opt.label}</div>
                      <div className="text-xs text-stone-400">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 1: Flavor Profile */}
            {quizStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-amber-400 text-center">
                  Question 2: What flavor note do you crave most?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Crispy Fried Shallot', savory: 'shallot', desc: 'Crunchy onion umami texture' },
                    { label: 'Sour & Tangy Starfruit', savory: 'sour-tangy', desc: 'Traditional Belimbing Buloh sour note' },
                    { label: 'Garlic Punch', savory: 'garlic-heavy', desc: 'Fragrant garlic oil aroma' },
                  ].map((opt) => (
                    <button
                      key={opt.savory}
                      onClick={() => handleQuizOption('savory', opt.savory)}
                      className="p-5 bg-stone-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-500 rounded-2xl text-left transition space-y-2 group"
                    >
                      <div className="font-bold text-white group-hover:text-amber-400">{opt.label}</div>
                      <div className="text-xs text-stone-400">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 2: Preferred Food Pairing */}
            {quizStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-amber-400 text-center">
                  Question 3: What are you eating with your sambal?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Hot Rice & Sunnyside Egg 🍳', pairing: 'rice' },
                    { label: 'Fried Chicken or Tofu 🍗', pairing: 'chicken' },
                    { label: 'Grilled Fish & Seafood 🐟', pairing: 'seafood' },
                  ].map((opt) => (
                    <button
                      key={opt.pairing}
                      onClick={() => handleQuizOption('pairing', opt.pairing)}
                      className="p-5 bg-stone-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-500 rounded-2xl text-left transition group"
                    >
                      <div className="font-bold text-white group-hover:text-amber-400">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 3: Result */}
            {quizStep === 3 && quizResult && (
              <div className="text-center space-y-6 animate-fade-in">
                <div className="inline-block p-4 bg-red-950/80 rounded-2xl border border-red-500/40">
                  <Flame className="w-12 h-12 text-red-500 fill-red-500 mx-auto animate-bounce" />
                </div>
                
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-stone-400 font-bold">Your Soulmate Sambal Is:</h3>
                  <h4 className="text-3xl font-black text-amber-400 mt-1">{quizResult.name}</h4>
                  <p className="text-sm text-stone-300 mt-2 max-w-lg mx-auto">{quizResult.description}</p>
                </div>

                <div className="bg-stone-800 p-4 rounded-xl border border-neutral-700 max-w-md mx-auto flex items-center justify-between text-left">
                  <div>
                    <span className="text-xs text-stone-400 block">Price per 180g Jar</span>
                    <span className="text-xl font-bold text-white">RM {quizResult.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(quizResult);
                      setActiveTab('home');
                    }}
                    className="bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg hover:brightness-110"
                  >
                    Add Recommended to Cart
                  </button>
                </div>

                <button
                  onClick={resetQuiz}
                  className="text-xs text-stone-400 hover:text-white underline flex items-center justify-center gap-1 mx-auto pt-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- OUR STORY / CRAFTSMANSHIP --- */}
      {(activeTab === 'home' || activeTab === 'story') && (
        <section className="py-16 bg-stone-900 text-white border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">The Kaeyke Legacy</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Slow-Cooked Heritage, Handcrafted with Passion
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Founded in Puchong, Selangor, Kaeyke Sambal was born from a family legacy of cooking traditional Malaysian sambal over open flames. We reject artificial preservatives and cheap fillers, staying true to slow cooking techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Fresh Farm Sourcing',
                  desc: 'Hand-picked red and green bird\'s eye chilies sourced daily directly from Selangor & Pahang farmers for maximum natural heat.'
                },
                {
                  step: '02',
                  title: '4-Hour Slow Simmering',
                  desc: 'Cooked in heavy copper pots for 4 hours until the chili oils clarify naturally, locking in deep rich umami flavor without preservatives.'
                },
                {
                  step: '03',
                  title: 'Hot Pasteurization Sealing',
                  desc: 'Sealed immediately into sterilized glass jars while hot to ensure extended shelf life naturally and preserve crunchy shallot texture.'
                }
              ].map((process, i) => (
                <div key={i} className="bg-neutral-800/80 border border-neutral-700 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-500/50 transition">
                  <div className="text-5xl font-black text-neutral-700 group-hover:text-amber-500/30 transition mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">{process.title}</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- RECIPE PAIRING GUIDE --- */}
      {(activeTab === 'home' || activeTab === 'pairings') && (
        <section className="py-16 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-stone-900 tracking-tight">
                Perfect Recipe Pairings
              </h2>
              <p className="text-stone-600 text-sm mt-2">
                Need inspiration? Here is how our foodies enjoy Kaeyke Sambal at home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PAIRING_GUIDES.map((recipe) => (
                <div key={recipe.id} className="bg-stone-50 border border-stone-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
                  <div className="text-4xl mb-4">{recipe.imageIcon}</div>
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                    Prep Time: {recipe.prepTime}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{recipe.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{recipe.description}</p>
                  
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-semibold">
                    <span className="text-stone-500">Pairs Best With:</span>
                    <span className="text-red-700 font-bold">{recipe.recommendedJar}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- CUSTOMER REVIEWS & TESTIMONIALS --- */}
      {(activeTab === 'home' || activeTab === 'reviews') && (
        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  {'★'.repeat(5)} <span className="text-stone-700 ml-1">4.9 / 5.0 (800+ Verified Buyers)</span>
                </div>
                <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
                  Loved by Malaysian Foodies
                </h2>
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="mt-4 md:mt-0 bg-[#1A1A1A] hover:bg-stone-800 text-amber-400 text-xs font-bold px-5 py-3 rounded-xl transition shadow-md flex items-center gap-2 self-start"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Reviews Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                      <span className="text-[10px] text-stone-400">{rev.date}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm mb-1">{rev.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed italic">"{rev.comment}"</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-stone-900 flex items-center gap-1">
                        {rev.author}
                        {rev.verified && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </p>
                      <p className="text-[10px] text-stone-400">{rev.product}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* --- QUICK VIEW PRODUCT MODAL --- */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fade-in relative border border-stone-200">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 p-2 rounded-full text-stone-700 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className={`p-8 bg-gradient-to-br ${quickViewProduct.imageBg} text-white flex flex-col justify-center items-center`}>
                <div className="w-36 h-48 bg-[#1A1A1A] rounded-2xl border-2 border-amber-400 p-4 shadow-2xl flex flex-col justify-between text-center">
                  <Flame className="w-8 h-8 text-red-500 fill-red-500 mx-auto" />
                  <div>
                    <p className="text-xs font-black text-amber-400 uppercase">KAEYKE</p>
                    <p className="text-[10px] text-stone-300 font-bold">{quickViewProduct.name}</p>
                  </div>
                  <div className="text-xs text-amber-300">
                    {'🌶️'.repeat(quickViewProduct.heatLevel)}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{quickViewProduct.badge}</span>
                  <h3 className="text-2xl font-black text-stone-900 mt-1">{quickViewProduct.name}</h3>
                  <p className="text-xs text-stone-500 font-semibold">{quickViewProduct.subtitle}</p>
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">{quickViewProduct.description}</p>
                  
                  <div className="mt-4 space-y-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <p><strong>Ingredients:</strong> {quickViewProduct.ingredients}</p>
                    <p><strong>Pairs With:</strong> {quickViewProduct.bestPairedWith}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-2xl font-black text-stone-900">RM {quickViewProduct.price.toFixed(2)}</span>
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg hover:brightness-110"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- WRITE REVIEW MODAL --- */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-stone-900 mb-1">Share Your Food Experience</h3>
            <p className="text-xs text-stone-500 mb-4">How much did you enjoy your Kaeyke Sambal?</p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Nurul Huda"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Select Sambal Jar</label>
                <select
                  value={newReview.product}
                  onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Star Rating (1-5)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                  <option value="4">⭐⭐⭐⭐ (4/5 Very Good)</option>
                  <option value="3">⭐⭐⭐ (3/5 Average)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Review</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Tell us about the spiciness, texture, and dishes you paired it with..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A1A1A] hover:bg-stone-800 text-amber-400 font-bold py-3 rounded-xl text-xs transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- CART DRAWER SYSTEM --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsCartOpen(false)} 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              
              {/* Drawer Header */}
              <div className="p-6 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                  <h3 className="font-black text-lg text-white">Your Cart ({cartCount})</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-amber-50 p-4 border-b border-amber-200">
                <div className="flex justify-between text-xs font-bold text-amber-900 mb-1">
                  <span>
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD 
                      ? '🎉 Unlocked FREE Malaysia Shipping!' 
                      : `Add RM ${(FREE_SHIPPING_THRESHOLD - cartSubtotal).toFixed(2)} more for Free Shipping!`}
                  </span>
                </div>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Flame className="w-12 h-12 text-stone-300 mx-auto" />
                    <p className="text-stone-500 font-semibold text-sm">Your cart is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-[#1A1A1A] text-amber-400 text-xs font-bold px-5 py-2.5 rounded-xl"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-4 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.imageBg} rounded-xl flex items-center justify-center text-white`}>
                        <Flame className="w-6 h-6 text-red-500 fill-red-500" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-stone-900">{item.name}</h4>
                        <p className="text-[10px] text-stone-500">RM {item.price.toFixed(2)} / {item.selectedSize}</p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            className="p-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="p-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-xs text-stone-900 block">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code & Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-stone-200 space-y-4">
                  {/* Voucher Box */}
                  <form onSubmit={applyPromoCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. KAEYKE10)"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 text-xs p-2.5 rounded-xl border border-stone-300 uppercase focus:outline-none"
                    />
                    <button 
                      type="submit"
                      className="bg-stone-800 text-white font-bold text-xs px-4 rounded-xl"
                    >
                      Apply
                    </button>
                  </form>
                  {discountMsg && (
                    <p className={`text-[11px] font-bold ${discountApplied > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {discountMsg}
                    </p>
                  )}

                  {/* Summary Rows */}
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold">RM {cartSubtotal.toFixed(2)}</span>
                    </div>
                    {discountApplied > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span>- RM {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span>{shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : `RM ${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm text-stone-900 font-black pt-2 border-t border-stone-200">
                      <span>Total</span>
                      <span className="text-red-600 text-base">RM {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutStep(1);
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:brightness-110 transition text-center"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- CHECKOUT MODAL SYSTEM --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8">
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step Indicator */}
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-400 mb-6">
              <span className={checkoutStep >= 1 ? 'text-red-600' : ''}>1. Shipping</span>
              <span>&gt;</span>
              <span className={checkoutStep >= 2 ? 'text-red-600' : ''}>2. Payment</span>
              <span>&gt;</span>
              <span className={checkoutStep === 3 ? 'text-emerald-600' : ''}>3. Confirmation</span>
            </div>

            {/* STEP 1: Shipping Details Form */}
            {checkoutStep === 1 && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-xl font-black text-stone-900">Shipping Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aiman Hakim"
                      value={orderInfo.name}
                      onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="012-3456789"
                      value={orderInfo.phone}
                      onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="aiman@gmail.com"
                    value={orderInfo.email}
                    onChange={(e) => setOrderInfo({ ...orderInfo, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Street Address</label>
                  <input 
                    type="text" 
                    required
                    placeholder="No. 12, Jalan Puchong Utama..."
                    value={orderInfo.address}
                    onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">City</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Puchong"
                      value={orderInfo.city}
                      onChange={(e) => setOrderInfo({ ...orderInfo, city: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">State</label>
                    <select
                      value={orderInfo.state}
                      onChange={(e) => setOrderInfo({ ...orderInfo, state: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="Selangor">Selangor</option>
                      <option value="Kuala Lumpur">Kuala Lumpur</option>
                      <option value="Johor">Johor</option>
                      <option value="Penang">Penang</option>
                      <option value="Pahang">Pahang</option>
                      <option value="Sabah">Sabah</option>
                      <option value="Sarawak">Sarawak</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Postcode</label>
                    <input 
                      type="text" 
                      required
                      placeholder="47100"
                      value={orderInfo.postcode}
                      onChange={(e) => setOrderInfo({ ...orderInfo, postcode: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] hover:bg-stone-800 text-amber-400 font-bold py-3.5 rounded-xl text-xs transition mt-4"
                >
                  Continue to Payment (RM {finalTotal.toFixed(2)})
                </button>
              </form>
            )}

            {/* STEP 2: Payment Gateway Options */}
            {checkoutStep === 2 && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-xl font-black text-stone-900">Select Payment Method</h3>
                
                <div className="space-y-3">
                  {[
                    { id: 'fpx', label: 'FPX Online Banking (Maybank2u, CIMB, RHB)', desc: 'Direct bank transfer' },
                    { id: 'tng', label: 'Touch \'n Go eWallet / DuitNow QR', desc: 'Instant QR payment' },
                    { id: 'card', label: 'Credit / Debit Card (Visa, Mastercard)', desc: 'Secured via Stripe Gateway' },
                    { id: 'cod', label: 'Cash On Delivery (Klang Valley Only)', desc: 'Pay when rider arrives' },
                  ].map((pay) => (
                    <label 
                      key={pay.id}
                      className={`flex items-start p-4 rounded-2xl border cursor-pointer transition ${
                        orderInfo.paymentMethod === pay.id ? 'border-amber-500 bg-amber-50/50' : 'border-stone-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment"
                        value={pay.id}
                        checked={orderInfo.paymentMethod === pay.id}
                        onChange={(e) => setOrderInfo({ ...orderInfo, paymentMethod: e.target.value })}
                        className="mt-1 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="ml-3">
                        <span className="block text-xs font-bold text-stone-900">{pay.label}</span>
                        <span className="block text-[10px] text-stone-500">{pay.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-stone-50 p-4 rounded-xl text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between"><span>Total Order Amount:</span> <strong className="text-stone-900">RM {finalTotal.toFixed(2)}</strong></div>
                  <div className="flex justify-between"><span>Ship to:</span> <span>{orderInfo.name}, {orderInfo.city}</span></div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(1)}
                    className="w-1/3 bg-stone-200 text-stone-800 font-bold py-3.5 rounded-xl text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg hover:brightness-110 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Sedang Menghubungkan ke ToyyibPay...</span>
                    ) : (
                      <span>🔒 Teruskan ke Pembayaran FPX</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Order Confirmation Screen */}
            {checkoutStep === 3 && (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-black text-stone-900">Order Received! Terima Kasih 🎉</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  We are now slow-simmering and packing your order. A confirmation receipt has been sent to <strong>{orderInfo.email}</strong>.
                </p>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-left space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Order Tracking ID:</span>
                    <strong className="text-amber-600 font-mono">{orderInfo.orderId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Customer Name:</span>
                    <span className="font-bold text-stone-800">{orderInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment Status:</span>
                    <span className="text-emerald-600 font-bold uppercase">PAID / SUCCESS</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="bg-[#1A1A1A] text-amber-400 font-bold px-8 py-3 rounded-xl text-xs"
                >
                  Return to Home
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-[#121212] text-white border-t border-neutral-800 pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-2 rounded-xl">
                <Flame className="w-5 h-5 text-white fill-yellow-300" />
              </div>
              <span className="text-xl font-black text-amber-400 tracking-wider">KAEYKE</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Authentic Malaysian Sambal slow-cooked to perfection. Pure chilies, natural aroma, zero artificial fillers.
            </p>
            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Crafted in Puchong, Selangor, Malaysia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => setActiveTab('shop')} className="hover:text-white">Shop Sambal Range</button></li>
              <li><button onClick={() => setActiveTab('quiz')} className="hover:text-white">Take Spice Quiz</button></li>
              <li><button onClick={() => setActiveTab('story')} className="hover:text-white">Our 4-Hour Cooking Craft</button></li>
              <li><button onClick={() => setActiveTab('pairings')} className="hover:text-white">Recipe Ideas</button></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">Quality Guarantee</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Muslim-Friendly Homemade Kitchen</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>100% Fresh Malaysian Cili Padi</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>Bubble Wrapped Glass Bottle Safety</span>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">Get 10% Off Voucher</h4>
            <p className="text-xs text-stone-400">Subscribe for secret sambal drops & recipes!</p>
            <form onSubmit={(e) => { e.preventDefault(); showToast('Subscribed! Promo code: KAEYKE10'); }} className="flex">
              <input 
                type="email" 
                required
                placeholder="Enter email"
                className="bg-neutral-800 text-xs p-2.5 rounded-l-xl text-white focus:outline-none w-full border border-neutral-700"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-red-600 to-amber-600 px-4 rounded-r-xl text-xs font-bold"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500">
          <p>© 2026 Kaeyke Sambal Malaysia. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refunding & Shipping</span>
          </div>
        </div>
      </footer>

    </div>
  );
}