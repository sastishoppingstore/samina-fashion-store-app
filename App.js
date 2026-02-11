import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Linking,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const WHATSAPP_NUMBER = "923467356250";
const STORE_URL = "https://saminafashion.store";

const PRODUCTS_DATA = [
  { id: 1, name: "Woman 3piece khaddar", price: 2800, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/rn-image_picker_lib_temp_1716ed5c-4e58-4f4d-bb8d-047f26f4a357.webp", url: "https://saminafashion.store/products/woman-3-psc" },
  { id: 2, name: "Premium Black 3-Piece Unstitched Khaddar Suit", price: 2800, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/1445319b-67cd-480a-87b7-ea9e76e617aa_5414fa5a-856b-4b09-be5b-dd8901c76a6b.webp", url: "https://saminafashion.store/products/untitled-nov20_22-33" },
  { id: 3, name: "Red Chikankari Embroidered Cotton Lawn Suit", price: 2950, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/7a04ba09-bd31-411c-affa-2df93fdc6d49.jpg", url: "https://saminafashion.store/products/red-chikankari-embroidered-cotton-lawn-suit-3-piece-unstitched-fancy-dress-with-chiffon-dupatta" },
  { id: 4, name: "Pink Malai Soft Sports Bra", price: 650, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/7079d3bd-973a-4541-bf2f-d6e0ae4c8431_b5af308f-5eb3-4c61-9cbb-e01d030cfc23.webp", url: "https://saminafashion.store/products/pink-malai-soft-sports-bra-comfortable-push-up-wireless-bra-with-logo-straps-sizes-28-33" },
  { id: 5, name: "Off-White Men's Unstitched Wash & Wear Suit", price: 1450, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/2be81f28-9ed9-4ee2-8396-56400d92884f.jpg", url: "https://saminafashion.store/products/off-white-men-s-unstitched-wash-wear-suit-premium-plain-shalwar-kameez-fabric-4-yards" },
  { id: 6, name: "Men's Unstitched Wash & Wear Summer Suit", price: 1450, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/eb37ec31-9d52-4381-877f-1624f3a9c5b3.jpg", url: "https://saminafashion.store/products/men-s-unstitched-wash-wear-summer-suit-plain-fabric-with-buttons-brand-tag-4-meters" },
  { id: 7, name: "Women's Front Closure Push-Up Bra", price: 500, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/d7b46f0f-91ca-42f4-a04e-60cf53206951.jpg", url: "https://saminafashion.store/products/women-s-front-closure-push-up-bra-breathable-mesh-padded-bra-with-wide-straps-slate-blue" },
  { id: 8, name: "Olive Green Doria Printed Lawn Suit", price: 3250, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/1ccecf72-f303-4caa-ba6f-d1b966cc7d0a.jpg", url: "https://saminafashion.store/products/olive-green-doria-printed-lawn-suit-3-piece-unstitched-with-black-cutwork-fancy-dupatta" },
  { id: 9, name: "Skin Color Floral Padded Bra", price: 890, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/9e98d527-6050-4a10-94f2-fef316a0db2c.jpg", url: "https://saminafashion.store/products/skin-color-floral-padded-bra-everyday-comfort-lingerie-with-adjustable-straps" },
  { id: 10, name: "GulAhmed Men's Unstitched Aqua Suit", price: 1910, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/1fd2e00c-e6f8-4314-b8cf-16beb18096d9.jpg", url: "https://saminafashion.store/products/gulahmed-men-s-unstitched-wash-wear-suit-aqua-color-summer-collection-with-buttons-label" },
  { id: 11, name: "GulAhmed Dubai Blue Summer Suit", price: 1910, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/1c264450-428d-4739-8ea4-d6caaa1c78b6.jpg", url: "https://saminafashion.store/products/gulahmed-men-s-unstitched-wash-wear-suit-dubai-blue-summer-collection-with-buttons-brand-tag" },
  { id: 12, name: "GulAhmed Plum Maroon Wash & Wear", price: 1900, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/cebec690-76b6-4054-bcd3-883d8c582316.jpg", url: "https://saminafashion.store/products/gulahmed-gul-chamak-men-s-unstitched-suit-premium-wash-wear-plum-maroon-color" },
  { id: 13, name: "Munarq by Nisha 3-Piece Suit", price: 3500, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/175f23fb-6ca6-4e4c-b17a-e06461a68729.jpg", url: "https://saminafashion.store/products/munarq-by-nisha-designer-3-piece-suit-rust-red-doria-printed-lawn-with-black-cutwork-dupatta-vol-11" },
  { id: 14, name: "Premium Plain Velvet Shawl", price: 1500, category: "Accessories", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/fb7decf4-5164-4338-8ffb-293d1a0c2ac2.jpg", url: "https://saminafashion.store/products/womens-premium-plain-velvet-shawl-2-5-gazz-full-size-winter-wrap-stole" },
  { id: 15, name: "3-Pack Cotton Non-Padded Bra", price: 900, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/436ceb97-e55e-42c0-84e9-52520321c49f.jpg", url: "https://saminafashion.store/products/3-pack-cotton-non-padded-bra-full-coverage-wirefree-comfort-all-sizes-30-48" },
  { id: 16, name: "Soft Padded Half Cup Lace Bra", price: 850, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/743ed646-8588-49a3-b51b-77855d32f674.jpg", url: "https://saminafashion.store/products/soft-padded-half-cup-lace-bra-for-women-sizes-30-34-a-b-cup" },
  { id: 17, name: "Navy Blue Georgette Abaya", price: 3000, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/0c7d1b0a-7b4d-4a13-b21a-a93ede7d96e5.jpg", url: "https://saminafashion.store/products/navy-blue-georgette-abaya-with-stroller-full-length-modest-dress" },
  { id: 18, name: "1-Piece Halima Plain Abaya", price: 3000, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/0cd58f5e-f988-4906-9123-aea9604a069e_1.jpg", url: "https://saminafashion.store/products/1-piece-halima-plain-abaya-exquisite-free-size-modest-dress-for-women" },
  { id: 19, name: "Black Cross-Strap Slippers", price: 950, category: "Footwear", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/c768eb1b-fa1c-4074-ba0b-4623bc7f67c7.webp", url: "https://saminafashion.store/products/stylish-black-cross-strap-slippers-comfortable-womens-footwear" },
  { id: 20, name: "Golden Kolhapuri Chappal", price: 950, category: "Footwear", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/518ee3c9-72c2-4586-87aa-4973a3ac00f8.jpg", url: "https://saminafashion.store/products/stylish-golden-kolhapuri-chappal-womens-pu-leather-flat-sandals" },
  { id: 21, name: "Boys Bugs Bunny Fleece Tracksuit", price: 1600, category: "Kids", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/48f7a05a-5b2f-44a5-b1f6-c6a2a7fea5ce.jpg", url: "https://saminafashion.store/products/boys-bugs-bunny-winter-fleece-tracksuit-warm-2-piece-set-black" },
  { id: 22, name: "Boys Grey Jersey 2-Piece Suit", price: 1200, category: "Kids", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/e646c871-a7d4-49cc-b546-f106bf892aed.jpg", url: "https://saminafashion.store/products/boys-grey-jersey-2-piece-suit-trendy-shirt-trouser-set-5-9-years" },
  { id: 23, name: "Brown Malai Jersey Full Cup Bra", price: 670, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1503200018PTDEGS-media-2.webp", url: "https://saminafashion.store/products/brown-malai-jersey-full-cup-bra-with-net-design" },
  { id: 24, name: "White Katan Silk Embroidered Gown", price: 1800, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ24800000171AUZRCN-media-2.jpg", url: "https://saminafashion.store/products/white-katan-silk-embroidered-gown-3-piece-suit" },
  { id: 25, name: "Maroon Shamoz Silk 3-Piece Suit", price: 2200, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ77400000067NRNACN-media-3.jpg", url: "https://saminafashion.store/products/maroon-shamoz-silk-3-piece-suit-with-farshi-shalwar-potli" },
  { id: 26, name: "Sapphire Men's Wool Shawl", price: 1450, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ7800002205NRHE-media-2.jpg", url: "https://saminafashion.store/products/sapphire-mens-wool-shawl-elegant-brown-winter-wrap-with-geometric-border" },
  { id: 27, name: "J. Junaid Jamshed Mustard Shawl", price: 1700, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ7800002214NRHE-media-2.jpg", url: "https://saminafashion.store/products/j-junaid-jamshed-mens-mustard-shawl-premium-winter-fabric-with-border" },
  { id: 28, name: "Premium Mustard Velvet Shawl", price: 1450, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ57300000168LSEEGISE-media-2.jpg", url: "https://saminafashion.store/products/premium-mustard-velvet-shawl-for-men-3-yards-luxury-winter-chador-with-tassel-border" },
  { id: 29, name: "Premium Mustard Wool Chador", price: 1500, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ7800002225NRHE-media-2.jpg", url: "https://saminafashion.store/products/premium-mustard-wool-chador-with-border" },
  { id: 30, name: "Navy Blue Katan Silk Maxi", price: 2100, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ73800045ZAAS-media-3.jpg", url: "https://saminafashion.store/products/navy-blue-katan-silk-maxi-suit-3-piece-steam-printed-festive-wear-with-70-flair" },
  { id: 31, name: "Dar-ul-Qumash Men's Cotton Suit", price: 2200, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/4a2f8506-0dcf-4295-be91-283d279d6002.jpg", url: "https://saminafashion.store/products/dar-ul-qumash-mens-unstitched-soft-cotton-suit-front-full-embroidery-cream-beige" },
  { id: 32, name: "Off-White Chikankari Lawn Suit", price: 5500, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/04577379-68c5-4fcb-b7a0-66ebf44cf3ec.jpg", url: "https://saminafashion.store/products/off-white-chikankari-embroidered-lawn-suit-3-piece-unstitched-with-organza-dupatta" },
  { id: 33, name: "Black Silk Stitched 2-Piece", price: 2000, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/4680a057-7881-4f6b-8596-c1fba08ec5f0.webp", url: "https://saminafashion.store/products/black-silk-embroidered-2-piece-suit-stitched-ready-to-wear-party-dress" },
  { id: 34, name: "Elegant Mustard Wool 3-Piece", price: 2450, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/a65970d4-c6c7-41f3-b19b-de8f066fd6b1.webp", url: "https://saminafashion.store/products/elegant-mustard-wool-3-piece-stitched-suit-embroidered-with-linen-dupatta" },
  { id: 35, name: "Premium Beige Jersey Bra", price: 422, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ57300000168LSEEGISE-media-1_b8d78003-b676-48e7-aa48-52a8b8478c7a.jpg", url: "https://saminafashion.store/products/j-junaid-jamshed-mens-premium-shawl-mustard-yellow-winter-wrap-4-guz" },
  { id: 36, name: "Premium Pink Cotton Bra", price: 690, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1905200014RDNEFS-media-1.webp", url: "https://saminafashion.store/products/elegant-red-cotton-lace-bra-lightweight-padded-design-with-rhinestone-details" },
  { id: 37, name: "Premium Red Spandex Bra", price: 750, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1819200127AN-media-1.webp", url: "https://saminafashion.store/products/premium-red-spandex-padded-bra-smooth-plain-design-b-cup-sizes-36-42" },
  { id: 38, name: "Classic Black Spandex Bra", price: 750, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1819200125AN-media-1.webp", url: "https://saminafashion.store/products/classic-black-spandex-padded-bra-smooth-plain-design-b-cup-sizes-36-42" },
  { id: 39, name: "Elegant Off-White Spandex Bra", price: 650, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1819200071AN-media-1_af8a67bd-2293-4f28-a191-dad1ec67f80b.webp", url: "https://saminafashion.store/products/elegant-off-white-spandex-padded-bra-wire-free-comfort-b-cup-sizes-36-42" },
  { id: 40, name: "Orange Floral Printed Bra", price: 670, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1819200023AN-media-1.webp", url: "https://saminafashion.store/products/beautiful-orange-floral-printed-padded-bra-wire-free-cotton-comfort-sizes-36-42" },
  { id: 41, name: "Boys 'Future' Printed Tracksuit", price: 1850, category: "Kids", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ51500000009KSAA-media-1.jpg", url: "https://saminafashion.store/products/boys-future-printed-tracksuit-2-piece-hoodie-trouser-set-black-brown" },
  { id: 42, name: "Boys Embroidered Winter Suit", price: 950, category: "Kids", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1819200275AN-media-1.webp", url: "https://saminafashion.store/products/boys-embroidered-winter-suit-2-piece-fleece-lined-set-yellow-white" },
  { id: 43, name: "Men's Karandi Textured Suit", price: 2240, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1652200149NNCN-media-1.webp", url: "https://saminafashion.store/products/mens-unstitched-karandi-textured-suit" },
  { id: 44, name: "Boys Winter Tracksuit (4 Pcs)", price: 1550, category: "Kids", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/MZ1119202063BYBR-media-8_8258c452-cd0b-4d5d-b51b-cf5fe9778311.webp", url: "https://saminafashion.store/products/boys-winter-tracksuit-2-sets-4-pcs-warm-fleece-printed-samina-fashion" },
  { id: 45, name: "Chic Split Knitted Dress", price: 2800, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/0b5b1595-2b8b-4a35-8358-07975a3cd3fe.jpg", url: "https://saminafashion.store/products/chic-split-knitted-dress-with-buttons-design-winter-v-neck-fleece-maxi-dresses-evening-party-club-fashion-womens-clothing" },
  { id: 46, name: "Women's Maroon Velvet Pumps", price: 1500, category: "Footwear", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/eb9a8633-ca00-4e7e-a8d4-f6c404aeba13.webp", url: "https://saminafashion.store/products/womens-maroon-velvet-pumps-bow-shoes-buy-online-uae-saudi-qatar-bahrain-samina-fashion" },
  { id: 47, name: "Preppy Style Two-piece Dress", price: 9000, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/4edff045-39ac-4eae-8ec1-ae79a9bc4b38.jpg", url: "https://saminafashion.store/products/sweet-and-cool-preppy-style-two-piece-shirt-long-sleeved-dress" },
  { id: 48, name: "Premium Shaper Bra Lingerie", price: 2500, category: "Lingerie", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/8cc1c21f-989f-4140-9d0d-1fff27fc1118.jpg", url: "https://saminafashion.store/products/plus-size-s-3xl-premium-shaperbra-women-shaper-bra-sexy-bright-lingerie-female-underwear" },
  { id: 49, name: "Breathable Yoga Short-Sleeve Top", price: 6500, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/69dcd645-3fea-4a76-9df2-6c479171f7e6.jpg", url: "https://saminafashion.store/products/womens-breathable-bare-look-yoga-short-sleeve-top" },
  { id: 50, name: "Judy Blue Mid Rise Denim Shorts", price: 14114, category: "Women", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/cf32a477-1db6-4d3b-8950-6edea46b4105-Max-Origin.webp", url: "https://saminafashion.store/products/judy-blue-mid-rise-denim-shorts" },
  { id: 51, name: "Men's Khaddar Plain Suit", price: 2000, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/955aa0da-086b-412d-9f54-bbe54ccef06c.webp", url: "https://saminafashion.store/products/mens-unstitched-khaddar-plain-suit-zeen-winter-collection-7-meter" },
  { id: 52, name: "Men's Velvet Plain Shawl", price: 1800, category: "Men", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/41217.webp", url: "https://saminafashion.store/products/mens-acrylic-embroidered-shawl-3-gazz-winter-collection" },
  { id: 53, name: "1 Pc Cashmere Plain Stole", price: 1200, category: "Accessories", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/3c1f7263-2cc2-468b-b8bd-7d41837c62c3.jpg", url: "https://saminafashion.store/products/womens-swiss-lawn-embroidered-shawl-2-5-gazz-premium-collection" },
  { id: 54, name: "Baby Winter Shoe Disney", price: 1500, category: "Kids", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/f3975ed7-8825-4398-861b-bc2f97db035d.jpg", url: "https://saminafashion.store/products/baby-winter-shoe" },
  { id: 55, name: "Golden Glitter Sandals Kids", price: 1500, category: "Kids", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/41272.jpg", url: "https://saminafashion.store/products/shoes-for-kids-golden-glitter-sandals" },
  { id: 56, name: "Women's Casual Black Flats", price: 2500, category: "Footwear", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/41277.jpg", url: "https://saminafashion.store/products/stylish-womens-synthetic-leather-casual-flats-premium-black-flats-sizes-6-11-samina-fashion" },
  { id: 57, name: "Women's Mustard Plain Khussa", price: 1499, category: "Footwear", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/41282.jpg", url: "https://saminafashion.store/products/womens-pu-fabric-plain-khussa-mustard-samina-fashion" },
  { id: 58, name: "Women's Maroon Rexine Heels", price: 1950, category: "Footwear", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/41290.jpg", url: "https://saminafashion.store/products/womens-rexine-heels-maroon-rhinestone-samina-fashion" },
  { id: 59, name: "Trendy Pink Bow Heel", price: 1999, category: "Footwear", image: "https://cdn.shopify.com/s/files/1/0689/2588/2454/files/41295.jpg", url: "https://saminafashion.store/products/trendy-heel-for-women-pink-bow-design-samina-fashion" }
];

export default function App() {
  const [filtered, setFiltered] = useState(PRODUCTS_DATA);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const cats = ['All', ...new Set(PRODUCTS_DATA.map(p => p.category))];
    setCategories(cats);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    let data = PRODUCTS_DATA;
    if (selectedCat !== 'All') data = data.filter(p => p.category === selectedCat);
    if (query) data = data.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    setFiltered(data);
  }, [query, selectedCat]);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const addToCart = (item) => {
    animatePress();
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    Alert.alert('✅ Added!', `${item.name} cart mein add ho gaya`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : i;
      }
      return i;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const openShopify = (url) => {
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Shopify link nahi khul saka'));
  };

  const openWhatsApp = () => {
    const message = `Assalam-o-Alaikum! Main Samina Fashion se rabta karna chahta hoon.`;
    Linking.openURL(`whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`)
      .catch(() => Alert.alert('Error', 'WhatsApp install nahi hai'));
  };

  const checkout = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Pehle kuch products add karein!');
      return;
    }
    const items = cart.map(i => `${i.name} (x${i.qty}) - PKR ${i.price * i.qty}`).join('\n');
    const total = `Total: PKR ${cartTotal}`;
    const message = `*New Order from Samina Fashion App*\n\n${items}\n\n*${total}*\n\nPlease confirm my order.`;
    
    Alert.alert(
      'Order Confirm',
      `${items}\n\n${total}\n\nKya aap confirm karna chahte hain?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'WhatsApp Order', 
          onPress: () => Linking.openURL(`whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`)
            .catch(() => Alert.alert('Error', 'WhatsApp install nahi hai'))
        }
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImg} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.cartPrice}>PKR {item.price * item.qty}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
            <Ionicons name="remove" size={16} color="#E91E63" />
          </TouchableOpacity>
          <Text style={styles.qtyTxt}>{item.qty}</Text>
          <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
            <Ionicons name="add" size={16} color="#E91E63" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
        <Ionicons name="trash" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E91E63" />
        <Text style={styles.loadTxt}>Samina Fashion Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#C2185B" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headTitle}>Samina Fashion</Text>
        <View style={styles.headerBtns}>
          <TouchableOpacity style={styles.headerBtn} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={26} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn} onPress={() => setCartVisible(true)}>
            <Ionicons name="cart" size={26} color="white" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTxt}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.input} 
          placeholder="Search 59 products..." 
          value={query} 
          onChangeText={setQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.catWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(c => (
            <TouchableOpacity 
              key={c} 
              onPress={() => setSelectedCat(c)} 
              style={[styles.catBtn, selectedCat === c && styles.catBtnAct]}
            >
              <Text style={[styles.catTxt, selectedCat === c && styles.catTxtAct]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList 
        data={filtered} 
        numColumns={2} 
        keyExtractor={item => item.id.toString()} 
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.imgContainer}>
              <Image source={{uri: item.image}} style={styles.img} resizeMode="cover" />
              <View style={styles.priceTag}>
                <Text style={styles.priceTagTxt}>PKR {item.price.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              <View style={styles.row}>
                <TouchableOpacity 
                  style={styles.orderBtn} 
                  onPress={() => openShopify(item.url)}
                >
                  <Text style={styles.btnTxt}>Order Now</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.addBtn} 
                  onPress={() => addToCart(item)}
                >
                  <Ionicons name="cart" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )} 
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={cartVisible}
        onRequestClose={() => setCartVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🛒 Shopping Cart</Text>
              <TouchableOpacity onPress={() => setCartVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            
            {cart.length === 0 ? (
              <View style={styles.emptyCart}>
                <Ionicons name="cart-outline" size={80} color="#ddd" />
                <Text style={styles.emptyTxt}>Cart empty hai!</Text>
              </View>
            ) : (
              <>
                <FlatList
                  data={cart}
                  renderItem={renderCartItem}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.cartList}
                />
                <View style={styles.cartFooter}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>PKR {cartTotal.toLocaleString()}</Text>
                  </View>
                  <TouchableOpacity style={styles.checkoutBtn} onPress={checkout}>
                    <Text style={styles.checkoutTxt}>Order on WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadTxt: { marginTop: 15, color: '#E91E63', fontWeight: 'bold', fontSize: 16 },
  
  header: { 
    backgroundColor: '#E91E63', 
    paddingVertical: 15, 
    paddingTop: 50, 
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headTitle: { color: 'white', fontSize: 26, fontWeight: 'bold' },
  headerBtns: { flexDirection: 'row', alignItems: 'center' },
  headerBtn: { marginRight: 15, backgroundColor: 'white', borderRadius: 20, padding: 5 },
  cartBtn: { position: 'relative', padding: 5 },
  badge: { 
    position: 'absolute', 
    top: -5, 
    right: -5, 
    backgroundColor: '#FFD700', 
    borderRadius: 12, 
    width: 24, 
    height: 24, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E91E63'
  },
  badgeTxt: { color: '#333', fontSize: 12, fontWeight: 'bold' },
  
  searchBox: { 
    padding: 15, 
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: { position: 'absolute', left: 30, zIndex: 1 },
  input: { 
    backgroundColor: 'white', 
    borderRadius: 25, 
    paddingHorizontal: 45, 
    height: 45,
    flex: 1,
    fontSize: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  catWrap: { 
    paddingVertical: 12, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
    elevation: 2,
  },
  catBtn: { 
    paddingHorizontal: 20, 
    paddingVertical: 8, 
    marginHorizontal: 6, 
    borderRadius: 20, 
    backgroundColor: '#f5f5f5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  catBtnAct: { backgroundColor: '#E91E63', transform: [{ scale: 1.05 }] },
  catTxt: { color: '#666', fontWeight: 'bold', fontSize: 13 },
  catTxtAct: { color: 'white' },
  
  list: { padding: 8, paddingBottom: 20 },
  card: { 
    flex: 1, 
    backgroundColor: 'white', 
    margin: 6, 
    borderRadius: 15, 
    elevation: 5,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'hidden',
    maxWidth: (width - 40) / 2,
  },
  imgContainer: { position: 'relative' },
  img: { width: '100%', height: 160, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  priceTag: { 
    position: 'absolute', 
    bottom: 10, 
    right: 10, 
    backgroundColor: 'rgba(233, 30, 99, 0.9)', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 15,
  },
  priceTagTxt: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  
  info: { padding: 12 },
  name: { fontSize: 13, fontWeight: 'bold', height: 40, color: '#333', lineHeight: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' },
  orderBtn: { 
    flex: 1, 
    backgroundColor: '#E91E63', 
    paddingVertical: 10, 
    borderRadius: 25, 
    alignItems: 'center',
    marginRight: 8,
    elevation: 3,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  btnTxt: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  addBtn: { 
    backgroundColor: '#4CAF50', 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    maxHeight: '80%',
    paddingTop: 20,
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  
  emptyCart: { alignItems: 'center', paddingVertical: 50 },
  emptyTxt: { fontSize: 18, color: '#999', marginTop: 15 },
  
  cartList: { padding: 20 },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f9f9f9', 
    borderRadius: 15, 
    padding: 12, 
    marginBottom: 12,
    elevation: 2,
  },
  cartImg: { width: 70, height: 70, borderRadius: 10 },
  cartInfo: { flex: 1, marginLeft: 12 },
  cartName: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
  cartPrice: { fontSize: 16, fontWeight: 'bold', color: '#E91E63', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { 
    backgroundColor: 'white', 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  qtyTxt: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, color: '#333' },
  removeBtn: { padding: 8 },
  
  cartFooter: { 
    padding: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 18, color: '#666' },
  totalAmount: { fontSize: 24, fontWeight: 'bold', color: '#E91E63' },
  checkoutBtn: { 
    backgroundColor: '#25D366', 
    paddingVertical: 16, 
    borderRadius: 30, 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  checkoutTxt: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
