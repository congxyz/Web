/* CTTSHOP – Trang chi tiết sản phẩm (dùng chung cho Điện thoại và Laptop).
 *
 * Cách mở: /Frontend/Pages/productdetail.html?id=<mã sản phẩm>
 *   Ví dụ: ?id=iphone-17-pro, ?id=samsung-galaxy-s26-ultra, ?id=macbook-air-13, ?id=dell-xps-13
 *   Mã sản phẩm được tạo từ tên (giống tên trong smartphone.js / laptop.js):
 *   viết thường, bỏ dấu ", dấu "+" -> "plus", ký tự khác chữ/số -> "-".
 *   Không có ?id thì hiển thị sản phẩm đầu tiên.
 *
 * Giá (VND):
 *  - listPrice : giá niêm yết.
 *  - salePrice : giá bán (null nếu không giảm).
 *  - src       : 'tgdd' = giá tham khảo tại thegioididong.com (11/2026),
 *                'ref'  = giá tham khảo khi TGDĐ không còn / không kinh doanh mẫu này.
 *  - Giá các phiên bản dung lượng lớn hơn của điện thoại là giá ước tính (STORAGE_STEP).
 * Ảnh: CDN của cellphones.com.vn / ttcenter.com.vn (giống trang danh sách).
 */
(function () {
  'use strict';

  var MIN_SAVING = 100000; // chênh lệch nhỏ hơn mức này được coi là không giảm giá

  // Chênh lệch giá ước tính khi nâng dung lượng (điện thoại)
  var STORAGE_STEP = {
    Apple: { '512GB': 6000000, '1TB': 6000000, '2TB': 12000000 },
    other: { '512GB': 3000000, '1TB': 5000000, '2TB': 8000000 }
  };

  var CATEGORY = {
    phone: { label: 'Điện thoại', href: '/Frontend/Pages/smartphone.html', variantLabel: 'Dung lượng' },
    laptop: { label: 'Laptop', href: '/Frontend/Pages/laptop.html', variantLabel: 'Cấu hình' }
  };

  // Ảnh từ CDN cellphones.com.vn
  function cps(path) {
    return 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/' + path;
  }

  // Bảng màu dùng lại
  var C = {
    black: ['Đen', '#1f1f22'], white: ['Trắng', '#f3f3f1'], silver: ['Bạc', '#e3e4e6'],
    spaceBlack: ['Đen không gian', '#2e2e30'], titanGrey: ['Xám titan', '#8a8d91'],
    cobalt: ['Tím cobalt', '#5b4e8c'], skyBlue: ['Xanh da trời', '#9dc3e6'],
    green: ['Xanh lá', '#4e6b53'], deepBlue: ['Xanh đậm', '#2f3b55'],
    orange: ['Cam vũ trụ', '#e36f2c'], iceBlue: ['Băng thanh', '#bfd6e3'], burgundy: ['Đỏ burgundy', '#6e1f2d']
  };

  var PRODUCTS = [
    // ================= ĐIỆN THOẠI – Apple =================
    {
      cat: 'phone', name: 'iPhone 17', brand: 'Apple', tag: 'Phổ biến',
      rating: 4.9, reviews: 67593, stock: 10, listPrice: 28999000, salePrice: 28490000, src: 'tgdd',
      sub: 'Chip A19 · Màn hình 6,3" ProMotion 120Hz',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_17_256gb-3_2.jpg'],
      colors: [['Tím oải hương', '#d8cce6'], ['Xanh lá xô thơm', '#b9c4a8'], ['Xanh sương mù', '#a9c1d9'], C.white, C.black],
      variants: ['256GB', '512GB'],
      storyTitle: 'Mượt mà hơn với ProMotion 120Hz.',
      desc: 'iPhone 17 mang màn hình ProMotion 120Hz lên phiên bản tiêu chuẩn, kết hợp chip A19 hiệu năng cao và hệ thống camera kép 48MP. Camera trước Center Stage tự động căn khung hình, thời lượng pin dùng thoải mái cả ngày.',
      keys: [['A19', 'Chip xử lý thế hệ mới'], ['48MP', 'Camera kép Fusion'], ['120Hz', 'Màn hình ProMotion']],
      specs: [['Màn hình', '6,3" OLED Super Retina XDR, 120Hz'], ['Chip', 'Apple A19'], ['RAM', '8GB'], ['Bộ nhớ trong', '256GB / 512GB'], ['Camera sau', '48MP chính + 48MP góc siêu rộng'], ['Camera trước', '18MP Center Stage'], ['Pin', 'Xem video đến 30 giờ, sạc nhanh 40W'], ['Hệ điều hành', 'iOS 26']]
    },
    {
      cat: 'phone', name: 'iPhone 17 Pro', brand: 'Apple', tag: 'Camera Pro',
      rating: 4.9, reviews: 38653, stock: 5, listPrice: 34999000, salePrice: 31990000, src: 'tgdd',
      sub: 'Chip A19 Pro · Khung nhôm nguyên khối · 6,3"',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-256-gb.png'],
      colors: [C.orange, C.deepBlue, C.silver],
      variants: ['256GB', '512GB', '1TB'],
      storyTitle: 'Thiết kế mới. Sức mạnh Pro.',
      desc: 'iPhone 17 Pro sở hữu khung nhôm nguyên khối rèn nhiệt cùng buồng hơi tản nhiệt, giúp chip A19 Pro duy trì hiệu năng đỉnh cao lâu hơn. Bộ ba camera 48MP hỗ trợ zoom quang học 8x, quay video chuyên nghiệp ngay trên điện thoại.',
      keys: [['A19 Pro', 'Tản nhiệt buồng hơi'], ['3 x 48MP', 'Zoom quang học 8x'], ['12GB', 'RAM cho Apple Intelligence']],
      specs: [['Màn hình', '6,3" OLED ProMotion 120Hz, Always-On'], ['Chip', 'Apple A19 Pro'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB / 1TB'], ['Camera sau', '48MP chính + 48MP siêu rộng + 48MP tele'], ['Camera trước', '18MP Center Stage'], ['Pin', 'Xem video đến 31 giờ'], ['Hệ điều hành', 'iOS 26']]
    },
    {
      cat: 'phone', name: 'iPhone 17 Pro Max', brand: 'Apple', tag: 'Màn hình lớn',
      rating: 4.9, reviews: 416959, stock: 3, listPrice: 37999000, salePrice: 34990000, src: 'tgdd',
      sub: 'Chip A19 Pro · Màn hình 6,9" · Pin lớn nhất',
      images: [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg',
        cps('i/p/iphone-17-pro-max_3_4.jpg')
      ],
      colors: [C.orange, C.deepBlue, C.silver],
      variants: ['256GB', '512GB', '1TB', '2TB'],
      storyTitle: 'Màn hình lớn nhất. Pin bền nhất.',
      desc: 'iPhone 17 Pro Max có màn hình 6,9" rộng rãi, viên pin lớn nhất từ trước đến nay trên iPhone và tùy chọn bộ nhớ lên đến 2TB. Chip A19 Pro cùng hệ thống camera Pro 48MP đáp ứng mọi nhu cầu sáng tạo.',
      keys: [['6,9"', 'Màn hình ProMotion'], ['2TB', 'Bộ nhớ tối đa'], ['37 giờ', 'Xem video liên tục']],
      specs: [['Màn hình', '6,9" OLED ProMotion 120Hz, Always-On'], ['Chip', 'Apple A19 Pro'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB / 1TB / 2TB'], ['Camera sau', '48MP chính + 48MP siêu rộng + 48MP tele'], ['Camera trước', '18MP Center Stage'], ['Pin', 'Xem video đến 37 giờ'], ['Hệ điều hành', 'iOS 26']]
    },
    {
      cat: 'phone', name: 'iPhone Air', brand: 'Apple', tag: 'Siêu mỏng',
      rating: 4.9, reviews: 13891, stock: 8, listPrice: 34999000, salePrice: 22990000, src: 'tgdd',
      sub: 'Mỏng 5,6mm · Chip A19 Pro · 6,5"',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_air-3_2.jpg'],
      colors: [['Trắng mây', '#f1f1ee'], ['Vàng nhạt', '#eadfc8'], ['Xanh da trời nhạt', '#c9d8e6'], C.spaceBlack],
      variants: ['256GB', '512GB', '1TB'],
      storyTitle: 'iPhone mỏng nhất từ trước đến nay.',
      desc: 'iPhone Air chỉ dày 5,6mm với khung titan bền bỉ, mặt trước Ceramic Shield 2. Dù siêu mỏng, máy vẫn mạnh mẽ với chip A19 Pro và camera Fusion 48MP.',
      keys: [['5,6mm', 'Độ mỏng ấn tượng'], ['A19 Pro', 'Hiệu năng hàng đầu'], ['48MP', 'Camera Fusion']],
      specs: [['Màn hình', '6,5" OLED ProMotion 120Hz'], ['Chip', 'Apple A19 Pro'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB / 1TB'], ['Camera sau', '48MP Fusion'], ['Camera trước', '18MP Center Stage'], ['Pin', 'Xem video đến 27 giờ'], ['Hệ điều hành', 'iOS 26']]
    },
    {
      cat: 'phone', name: 'iPhone 18 Pro', brand: 'Apple', tag: 'Mới',
      rating: 4.9, reviews: 7341, stock: 5, listPrice: 38999000, salePrice: 38990000, src: 'tgdd',
      sub: 'Chip A20 Pro 2nm · 6,3" · Dynamic Island thu gọn',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-01.jpg'],
      colors: [C.iceBlue, C.burgundy, C.silver],
      variants: ['256GB', '512GB', '1TB', '2TB'],
      storyTitle: 'Chip 2nm đầu tiên trên iPhone.',
      desc: 'iPhone 18 Pro trang bị chip A20 Pro tiến trình 2nm tiết kiệm điện, Dynamic Island thu gọn và hệ thống tản nhiệt cải tiến. Phiên bản màu Băng thanh mới mang đến vẻ ngoài thanh lịch.',
      keys: [['A20 Pro', 'Tiến trình 2nm'], ['3 x 48MP', 'Camera Pro'], ['120Hz', 'ProMotion']],
      specs: [['Màn hình', '6,3" OLED ProMotion 120Hz'], ['Chip', 'Apple A20 Pro (2nm)'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB / 1TB / 2TB'], ['Camera sau', '48MP chính + 48MP siêu rộng + 48MP tele'], ['Camera trước', '18MP Center Stage'], ['Pin', 'Dùng cả ngày, sạc nhanh MagSafe'], ['Hệ điều hành', 'iOS 27']]
    },
    {
      cat: 'phone', name: 'iPhone 18 Pro Max', brand: 'Apple', tag: 'Mới',
      rating: 5, reviews: 90635, stock: 2, listPrice: 41999000, salePrice: 41990000, src: 'tgdd',
      sub: 'Chip A20 Pro 2nm · Màn hình 6,9"',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-max-01.jpg'],
      colors: [C.iceBlue, C.burgundy, C.silver],
      variants: ['256GB', '512GB', '1TB', '2TB'],
      storyTitle: 'Lớn hơn. Mạnh hơn. Bền hơn.',
      desc: 'iPhone 18 Pro Max kết hợp màn hình 6,9" ProMotion, chip A20 Pro 2nm và viên pin dung lượng lớn. Hệ thống camera 48MP được tinh chỉnh cho khả năng tùy biến chuyên sâu.',
      keys: [['6,9"', 'Màn hình ProMotion'], ['A20 Pro', 'Tiến trình 2nm'], ['2TB', 'Bộ nhớ tối đa']],
      specs: [['Màn hình', '6,9" OLED ProMotion 120Hz'], ['Chip', 'Apple A20 Pro (2nm)'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB / 1TB / 2TB'], ['Camera sau', '48MP chính + 48MP siêu rộng + 48MP tele'], ['Camera trước', '18MP Center Stage'], ['Pin', 'Thời lượng pin dài nhất dòng iPhone'], ['Hệ điều hành', 'iOS 27']]
    },
    {
      cat: 'phone', name: 'iPhone Duo', brand: 'Apple', tag: 'Màn hình gập',
      rating: null, reviews: 0, stock: 1, listPrice: 64999000, salePrice: 64990000, src: 'tgdd',
      sub: 'iPhone màn hình gập đầu tiên · Khung titan',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-duo-01.jpg'],
      colors: [['Trắng sao', '#f4f3ef'], C.spaceBlack],
      variants: ['256GB', '512GB', '1TB', '2TB'],
      storyTitle: 'Mở ra một màn hình lớn hơn.',
      desc: 'iPhone Duo là chiếc iPhone gập dạng sách đầu tiên với màn hình trong 7,6" và màn hình ngoài 5,4". Khung titan cấp 5 bền bỉ, chip A20 Pro mạnh mẽ cho trải nghiệm đa nhiệm như máy tính bảng.',
      keys: [['7,6"', 'Màn hình trong'], ['5,4"', 'Màn hình ngoài'], ['A20 Pro', 'Chip 2nm']],
      specs: [['Màn hình', 'Trong 7,6" OLED gập · Ngoài 5,4" OLED'], ['Chip', 'Apple A20 Pro'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB / 1TB / 2TB'], ['Camera sau', '2 camera 48MP'], ['Camera trước', '18MP'], ['Chất liệu', 'Khung titan cấp 5'], ['Hệ điều hành', 'iOS 27']]
    },

    // ================= ĐIỆN THOẠI – Samsung =================
    {
      cat: 'phone', name: 'Samsung Galaxy S26', brand: 'Samsung', tag: 'Galaxy AI',
      rating: 4.9, reviews: 4556, stock: 15, listPrice: 29990000, salePrice: 20500000, src: 'tgdd',
      sub: '12GB RAM · Exynos 2600 · Galaxy AI',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s26-1.jpg'],
      colors: [C.cobalt, C.black, C.white, C.skyBlue],
      variants: ['256GB', '512GB'],
      storyTitle: 'Nhỏ gọn, thông minh với Galaxy AI.',
      desc: 'Galaxy S26 thiết kế mỏng nhẹ, chip Exynos 2600 tiến trình 2nm cùng bộ tính năng Galaxy AI thế hệ mới như Circle to Search, Photo Assist và Gemini Live.',
      keys: [['2nm', 'Exynos 2600'], ['50MP', 'Camera chính'], ['Galaxy AI', 'Trợ lý thông minh']],
      specs: [['Màn hình', '6,3" Dynamic AMOLED 2X, 120Hz'], ['Chip', 'Exynos 2600 (2nm)'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB'], ['Camera sau', '50MP chính + 12MP siêu rộng + 10MP tele 3x'], ['Camera trước', '12MP'], ['Pin', '4.300 mAh, sạc nhanh 25W'], ['Hệ điều hành', 'Android 16, One UI 8.5']]
    },
    {
      cat: 'phone', name: 'Samsung Galaxy S26+', brand: 'Samsung', tag: 'Galaxy AI',
      rating: 5, reviews: 5140, stock: 10, listPrice: 33990000, salePrice: 24200000, src: 'tgdd',
      sub: '12GB RAM · Màn hình 6,7" · Galaxy AI',
      images: [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s26-plus.jpg',
        cps('s/a/samsung-galaxy-s26-plus-10.jpg')
      ],
      colors: [C.cobalt, C.black, C.white, C.skyBlue],
      variants: ['256GB', '512GB'],
      storyTitle: 'Màn hình lớn, pin bền bỉ.',
      desc: 'Galaxy S26+ có màn hình 6,7" sắc nét, pin lớn hơn và sạc nhanh 45W. Chip Exynos 2600 kết hợp Galaxy AI giúp mọi tác vụ hằng ngày mượt mà và thông minh hơn.',
      keys: [['6,7"', 'Dynamic AMOLED 2X'], ['45W', 'Sạc siêu nhanh'], ['12GB', 'RAM']],
      specs: [['Màn hình', '6,7" Dynamic AMOLED 2X, 120Hz'], ['Chip', 'Exynos 2600 (2nm)'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB'], ['Camera sau', '50MP chính + 12MP siêu rộng + 10MP tele 3x'], ['Camera trước', '12MP'], ['Pin', '4.900 mAh, sạc nhanh 45W'], ['Hệ điều hành', 'Android 16, One UI 8.5']]
    },
    {
      cat: 'phone', name: 'Samsung Galaxy S26 Ultra', brand: 'Samsung', tag: 'Camera Pro',
      rating: 4.9, reviews: 27397, stock: 8, listPrice: 40990000, salePrice: 30600000, src: 'tgdd',
      sub: 'Snapdragon 8 Elite Gen 5 for Galaxy · Bút S Pen',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s26-ultra-1.jpg'],
      colors: [C.cobalt, C.black, C.white, C.skyBlue],
      variants: ['256GB', '512GB', '1TB'],
      storyTitle: 'Đỉnh cao nhiếp ảnh và năng suất.',
      desc: 'Galaxy S26 Ultra sở hữu camera 200MP, zoom quang học 5x, màn hình 6,9" với tính năng Privacy Display chống nhìn trộm và bút S Pen tích hợp. Snapdragon 8 Elite Gen 5 for Galaxy mang lại hiệu năng hàng đầu.',
      keys: [['200MP', 'Camera chính'], ['5x', 'Zoom quang học'], ['S Pen', 'Bút tích hợp']],
      specs: [['Màn hình', '6,9" Dynamic AMOLED 2X, 120Hz, Privacy Display'], ['Chip', 'Snapdragon 8 Elite Gen 5 for Galaxy'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB / 1TB'], ['Camera sau', '200MP + 50MP siêu rộng + 50MP tele 5x + 10MP tele 3x'], ['Camera trước', '12MP'], ['Pin', '5.000 mAh, sạc nhanh 60W'], ['Hệ điều hành', 'Android 16, One UI 8.5']]
    },

    // ================= ĐIỆN THOẠI – Xiaomi =================
    {
      cat: 'phone', name: 'Xiaomi 17', brand: 'Xiaomi', tag: 'Leica',
      rating: 4.9, reviews: 5320, stock: 12, listPrice: 26990000, salePrice: 18950000, src: 'tgdd',
      sub: '12GB RAM · Snapdragon 8 Elite Gen 5 · Leica',
      images: [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-17-5g.jpg',
        'https://cdn2.cellphones.com.vn/358x/media/catalog/product/x/i/xiaomi-17_2.jpg'
      ],
      colors: [C.green, C.black, C.white],
      variants: ['256GB', '512GB'],
      storyTitle: 'Flagship nhỏ gọn, pin khổng lồ.',
      desc: 'Xiaomi 17 gói gọn màn hình 6,3" viền siêu mỏng, chip Snapdragon 8 Elite Gen 5 và viên pin 6.330 mAh trong thân máy nhỏ gọn. Hệ thống camera Leica Summilux cho ảnh chân dung và chụp đêm ấn tượng.',
      keys: [['6.330 mAh', 'Pin silicon-carbon'], ['100W', 'Sạc nhanh có dây'], ['Leica', 'Camera 50MP']],
      specs: [['Màn hình', '6,3" LTPO AMOLED, 120Hz'], ['Chip', 'Snapdragon 8 Elite Gen 5'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB'], ['Camera sau', '50MP Leica chính + 50MP siêu rộng + 50MP tele'], ['Camera trước', '50MP'], ['Pin', '6.330 mAh, sạc 100W, sạc không dây 50W'], ['Hệ điều hành', 'Android 16, HyperOS 3']]
    },
    {
      cat: 'phone', name: 'Xiaomi 17 Ultra', brand: 'Xiaomi', tag: 'Camera Leica',
      rating: 4.9, reviews: 1567, stock: 6, listPrice: 39990000, salePrice: 29890000, src: 'tgdd',
      sub: '16GB RAM · Cảm biến 1 inch · Leica',
      images: ['https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-17-ultra-den.jpg'],
      colors: [C.green, C.black, C.white],
      variants: ['512GB', '1TB'],
      storyTitle: 'Máy ảnh chuyên nghiệp trong túi bạn.',
      desc: 'Xiaomi 17 Ultra tập trung tối đa vào nhiếp ảnh với cảm biến chính 1 inch, camera tele 200MP và ống kính Leica. Thiết kế khung phẳng, cụm camera tròn đặc trưng mang đậm dấu ấn máy ảnh cổ điển.',
      keys: [['1 inch', 'Cảm biến chính'], ['200MP', 'Camera tele'], ['16GB', 'RAM']],
      specs: [['Màn hình', '6,9" LTPO AMOLED, 120Hz'], ['Chip', 'Snapdragon 8 Elite Gen 5'], ['RAM', '16GB'], ['Bộ nhớ trong', '512GB / 1TB'], ['Camera sau', '50MP 1 inch + 200MP tele + 50MP siêu rộng'], ['Camera trước', '50MP'], ['Pin', 'Khoảng 6.000 mAh, sạc nhanh 90W'], ['Hệ điều hành', 'Android 16, HyperOS 3']]
    },

    // ================= ĐIỆN THOẠI – OPPO =================
    {
      cat: 'phone', name: 'OPPO Find X9', brand: 'OPPO', tag: 'Hasselblad',
      rating: null, reviews: 0, stock: 10, listPrice: 22990000, salePrice: null, src: 'tgdd',
      sub: '12GB RAM · Dimensity 9500 · Pin 7.025 mAh',
      images: [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/9/x9-1_1.jpg',
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-oppo-find-x9-12gb-256gb_6.jpg'
      ],
      colors: [C.titanGrey, ['Đỏ nhung', '#9e2a2b'], C.black],
      variants: ['256GB', '512GB'],
      storyTitle: 'Camera Hasselblad, pin dùng 2 ngày.',
      desc: 'OPPO Find X9 có màn hình 6,59" 1.5K, chip MediaTek Dimensity 9500 và viên pin 7.025 mAh. Bộ ba camera 50MP được tinh chỉnh màu sắc bởi Hasselblad cho ảnh chân thực, sống động.',
      keys: [['7.025 mAh', 'Pin dung lượng lớn'], ['Hasselblad', '3 camera 50MP'], ['80W', 'Sạc SuperVOOC']],
      specs: [['Màn hình', '6,59" AMOLED 1.5K, 120Hz'], ['Chip', 'MediaTek Dimensity 9500'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB'], ['Camera sau', '50MP chính + 50MP siêu rộng + 50MP tele'], ['Camera trước', '32MP'], ['Pin', '7.025 mAh, sạc 80W, không dây 50W'], ['Hệ điều hành', 'Android 16, ColorOS 16']]
    },
    {
      cat: 'phone', name: 'OPPO Find X9 Pro', brand: 'OPPO', tag: 'Tele 200MP',
      rating: null, reviews: 0, stock: 5, listPrice: 32990000, salePrice: null, src: 'tgdd',
      sub: '16GB RAM · Tele 200MP · Hasselblad',
      images: [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo_find_x9_pro_16gb_512gb-1.jpg',
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-oppo-find-x9-pro_2.jpg'
      ],
      colors: [['Trắng lụa', '#edebe6'], C.titanGrey],
      variants: ['512GB'],
      storyTitle: 'Zoom xa hơn với tele 200MP.',
      desc: 'OPPO Find X9 Pro trang bị ống kính tele tiềm vọng 200MP Hasselblad, zoom quang học 10x cho ảnh chi tiết ở khoảng cách xa. Pin dung lượng lớn và sạc nhanh giúp bạn yên tâm cả ngày dài.',
      keys: [['200MP', 'Tele tiềm vọng'], ['10x', 'Zoom quang học'], ['16GB', 'RAM']],
      specs: [['Màn hình', '6,78" AMOLED 1.5K, 120Hz'], ['Chip', 'MediaTek Dimensity 9500'], ['RAM', '16GB'], ['Bộ nhớ trong', '512GB'], ['Camera sau', '50MP chính + 50MP siêu rộng + 200MP tele'], ['Camera trước', '50MP'], ['Pin', '7.500 mAh, sạc 80W, không dây 50W'], ['Hệ điều hành', 'Android 16, ColorOS 16']]
    },
    {
      cat: 'phone', name: 'OPPO Find X9s', brand: 'OPPO', tag: 'Hasselblad',
      rating: 5, reviews: 9942, stock: 8, listPrice: 24990000, salePrice: 24990000, src: 'tgdd',
      sub: '12GB RAM · Thiết kế nhỏ gọn · Hasselblad',
      images: [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-find-x9s-25.jpg',
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-oppo-find-x9s-12gb-256gb.jpg'
      ],
      colors: [['Cam nhạt', '#f2c3a0'], C.white, C.black],
      variants: ['256GB', '512GB'],
      storyTitle: 'Nhỏ gọn nhưng không thỏa hiệp.',
      desc: 'OPPO Find X9s mang trải nghiệm flagship vào thân máy gọn nhẹ, dễ dùng một tay. Camera Hasselblad, hiệu năng mạnh mẽ và màu Cam nhạt trẻ trung là điểm nhấn nổi bật.',
      keys: [['Hasselblad', 'Màu ảnh chân thực'], ['120Hz', 'Màn hình AMOLED'], ['12GB', 'RAM']],
      specs: [['Màn hình', '6,3" AMOLED, 120Hz'], ['Chip', 'MediaTek Dimensity 9500'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB'], ['Camera sau', '50MP chính + 50MP siêu rộng + 50MP tele'], ['Camera trước', '32MP'], ['Pin', 'Pin silicon-carbon, sạc 80W'], ['Hệ điều hành', 'Android 16, ColorOS 16']]
    },
    {
      cat: 'phone', name: 'OPPO Find X9 Ultra', brand: 'OPPO', tag: 'Siêu phẩm camera',
      rating: 5, reviews: 387, stock: 3, listPrice: 49990000, salePrice: 49990000, src: 'tgdd',
      sub: '12GB RAM · Snapdragon 8 Elite Gen 5 · Hasselblad',
      images: [
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-find-x9-ultra-cam-8.jpg',
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/l/slider-oppo-find-x9-ultra.jpg'
      ],
      colors: [['Nâu nhạt', '#a88b6e'], C.black],
      variants: ['512GB'],
      storyTitle: 'Siêu phẩm nhiếp ảnh của OPPO.',
      desc: 'OPPO Find X9 Ultra là mẫu flagship cao cấp nhất với cảm biến chính cỡ lớn, hai camera tele và chip Snapdragon 8 Elite Gen 5. Mặt lưng giả da màu Nâu nhạt mang phong cách máy ảnh cổ điển.',
      keys: [['Hasselblad', 'Hệ thống 4 camera'], ['Snapdragon', '8 Elite Gen 5'], ['IP69', 'Kháng nước bụi']],
      specs: [['Màn hình', '6,82" AMOLED 2K, 120Hz'], ['Chip', 'Snapdragon 8 Elite Gen 5'], ['RAM', '12GB'], ['Bộ nhớ trong', '512GB'], ['Camera sau', '50MP 1 inch + 2 camera tele + 50MP siêu rộng'], ['Camera trước', '32MP'], ['Pin', 'Pin silicon-carbon, sạc 100W'], ['Hệ điều hành', 'Android 16, ColorOS 16']]
    },

    // ================= ĐIỆN THOẠI – vivo =================
    {
      cat: 'phone', name: 'vivo X300', brand: 'vivo', tag: 'ZEISS',
      rating: 4.9, reviews: 2141, stock: 10, listPrice: 23990000, salePrice: 23990000, src: 'tgdd',
      sub: '12GB RAM · Camera ZEISS 200MP · 6,31"',
      images: ['https://cdn2.cellphones.com.vn/x/media/catalog/product/d/i/dien-thoai-vivo-x300-12gb-256gb-cu-dep.jpg'],
      colors: [['Hồng phấn', '#f1cfd3'], ['Xanh lam', '#9fb7c9'], C.black],
      variants: ['256GB', '512GB'],
      storyTitle: 'Nhỏ gọn, chụp ảnh như máy ảnh.',
      desc: 'vivo X300 nặng khoảng 190g, dày chưa đến 8mm nhưng có camera chính ZEISS 200MP, màn hình 6,31" độ sáng đến 4.500 nit và viên pin 6.040 mAh. Chip Dimensity 9500 kết hợp chip hình ảnh V3+ cho video 4K sắc nét.',
      keys: [['200MP', 'Camera ZEISS'], ['6.040 mAh', 'Pin silicon-carbon'], ['4.500 nit', 'Độ sáng tối đa']],
      specs: [['Màn hình', '6,31" AMOLED 1.5K, 120Hz'], ['Chip', 'MediaTek Dimensity 9500 + V3+'], ['RAM', '12GB'], ['Bộ nhớ trong', '256GB / 512GB'], ['Camera sau', '200MP chính + 50MP siêu rộng + 50MP tele'], ['Camera trước', '50MP'], ['Pin', '6.040 mAh, sạc nhanh 90W'], ['Hệ điều hành', 'Android 16, OriginOS 6']]
    },
    {
      cat: 'phone', name: 'vivo X300 Pro', brand: 'vivo', tag: 'ZEISS',
      rating: 4.9, reviews: 1457, stock: 5, listPrice: 34990000, salePrice: 29290000, src: 'tgdd',
      sub: '16GB RAM · Tele ZEISS 200MP · 6,78"',
      images: ['https://cdn2.cellphones.com.vn/x/media/catalog/product/v/i/vivo-x300-pro-16gb-512gb-cu-dep.jpg'],
      colors: [['Nâu sa mạc', '#b08d6a'], C.black],
      variants: ['512GB'],
      storyTitle: 'Bậc thầy chụp xa.',
      desc: 'vivo X300 Pro sở hữu camera tele tiềm vọng ZEISS 200MP, hỗ trợ bộ phụ kiện Photographer Kit. Màn hình 6,78" sáng rực rỡ và chip Dimensity 9500 đáp ứng mọi nhu cầu.',
      keys: [['200MP', 'Tele tiềm vọng'], ['ZEISS T*', 'Lớp phủ chống lóa'], ['16GB', 'RAM']],
      specs: [['Màn hình', '6,78" AMOLED 1.5K, 120Hz'], ['Chip', 'MediaTek Dimensity 9500 + V3+'], ['RAM', '16GB'], ['Bộ nhớ trong', '512GB'], ['Camera sau', '50MP chính + 50MP siêu rộng + 200MP tele'], ['Camera trước', '50MP'], ['Pin', '6.510 mAh, sạc nhanh 90W'], ['Hệ điều hành', 'Android 16, OriginOS 6']]
    },
    {
      cat: 'phone', name: 'vivo X300 Ultra', brand: 'vivo', tag: 'ZEISS',
      rating: 5, reviews: 403, stock: 3, listPrice: 49990000, salePrice: 36990000, src: 'tgdd',
      sub: '16GB RAM · Snapdragon 8 Elite Gen 5 · ZEISS',
      images: ['https://cdn2.cellphones.com.vn/x/media/catalog/product/d/i/dien-thoai-vivo-x300-ultra-16gb-512gb-cu-dep-2.jpg'],
      colors: [C.green, C.black],
      variants: ['512GB'],
      storyTitle: 'Đỉnh cao camera của vivo.',
      desc: 'vivo X300 Ultra là mẫu cao cấp nhất dòng X300 với hệ thống camera ZEISS hoàn thiện, chip Snapdragon 8 Elite Gen 5 và khả năng quay video chuyên nghiệp.',
      keys: [['ZEISS', 'Hệ thống camera'], ['Snapdragon', '8 Elite Gen 5'], ['16GB', 'RAM']],
      specs: [['Màn hình', '6,82" AMOLED 2K, 120Hz'], ['Chip', 'Snapdragon 8 Elite Gen 5'], ['RAM', '16GB'], ['Bộ nhớ trong', '512GB'], ['Camera sau', '200MP chính + 200MP tele + 50MP siêu rộng'], ['Camera trước', '50MP'], ['Pin', 'Pin silicon-carbon, sạc nhanh 90W'], ['Hệ điều hành', 'Android 16, OriginOS 6']]
    },

    // ================= LAPTOP – Apple =================
    {
      cat: 'laptop', name: 'MacBook Air 13"', brand: 'Apple', tag: 'Bestseller',
      rating: 4.9, reviews: 128, stock: 10, listPrice: 35990000, salePrice: 33690000, src: 'tgdd',
      sub: 'Apple M5 10 CPU / 8 GPU · 16GB · 512GB SSD',
      images: ['https://ttcenter.com.vn/uploads/product/qpyjh8ry-2549-macbook-air-m5-13-inch-2026-10cpu-8gpu-16gb-512gb-new.jpg'],
      colors: [['Xanh da trời', '#c9dde8'], C.silver, ['Vàng ánh sao', '#e6dfd3'], ['Đêm xanh thẳm', '#29374a']],
      variants: ['M5 · 16GB · 512GB'],
      storyTitle: 'Siêu mỏng nhẹ. Siêu mạnh với M5.',
      desc: 'MacBook Air 13 inch với chip M5 mang lại hiệu năng mạnh mẽ cho học tập, làm việc và sáng tạo trong thân máy chỉ 1,24kg. Màn hình Liquid Retina sắc nét, thời lượng pin đến 18 giờ và vận hành hoàn toàn không quạt.',
      keys: [['10 nhân', 'CPU Apple M5'], ['18 giờ', 'Thời lượng pin'], ['1,24kg', 'Trọng lượng']],
      specs: [['Màn hình', '13,6" Liquid Retina (2560 x 1664)'], ['CPU', 'Apple M5 10 nhân'], ['GPU', '8 nhân'], ['RAM', '16GB bộ nhớ hợp nhất'], ['Ổ cứng', '512GB SSD'], ['Cổng kết nối', '2 x Thunderbolt 4, MagSafe 3, jack 3.5mm'], ['Pin', 'Đến 18 giờ, sạc 30W'], ['Trọng lượng', '1,24 kg'], ['Hệ điều hành', 'macOS']]
    },
    {
      cat: 'laptop', name: 'MacBook Pro 14"', brand: 'Apple', tag: 'Pro',
      rating: 4.9, reviews: 86, stock: 5, listPrice: 49990000, salePrice: null, src: 'tgdd',
      sub: 'Apple M4 Pro 12 CPU / 16 GPU · 24GB · 512GB SSD',
      images: ['https://ttcenter.com.vn/uploads/product/5kqgin1j-1887-macbook-pro-14inch-m2-pro-16gb-1tb-like-new.jpg'],
      colors: [C.spaceBlack, C.silver],
      variants: ['M4 Pro · 24GB · 512GB'],
      storyTitle: 'Sức mạnh chuyên nghiệp, gọn trong 14 inch.',
      desc: 'MacBook Pro 14 inch chip M4 Pro dành cho lập trình viên, nhà sáng tạo nội dung và người làm đồ họa. Màn hình Liquid Retina XDR 120Hz, cổng Thunderbolt 5 và thời lượng pin cả ngày làm việc.',
      keys: [['M4 Pro', '12 CPU / 16 GPU'], ['XDR', 'Màn hình 120Hz'], ['22 giờ', 'Thời lượng pin']],
      specs: [['Màn hình', '14,2" Liquid Retina XDR, 120Hz'], ['CPU', 'Apple M4 Pro 12 nhân'], ['GPU', '16 nhân'], ['RAM', '24GB bộ nhớ hợp nhất'], ['Ổ cứng', '512GB SSD'], ['Cổng kết nối', '3 x Thunderbolt 5, HDMI, khe SDXC, MagSafe 3'], ['Pin', 'Đến 22 giờ'], ['Trọng lượng', '1,6 kg'], ['Hệ điều hành', 'macOS']]
    },
    {
      cat: 'laptop', name: 'MacBook Pro 16"', brand: 'Apple', tag: 'Max',
      rating: 5, reviews: 42, stock: 3, listPrice: 89990000, salePrice: null, src: 'tgdd',
      sub: 'Apple M4 Max 14 CPU / 32 GPU · 36GB · 1TB SSD',
      images: ['https://ttcenter.com.vn/uploads/product/16lhm5au-505-macbook-pro-16inch-m2-pro-16gb-512gb.jpg'],
      colors: [C.spaceBlack, C.silver],
      variants: ['M4 Max · 36GB · 1TB'],
      storyTitle: 'Hiệu năng đỉnh cao cho dân chuyên nghiệp.',
      desc: 'MacBook Pro 16 inch chip M4 Max xử lý mượt mà dựng phim 8K, render 3D và huấn luyện mô hình AI. Màn hình 16,2" Liquid Retina XDR rộng rãi cùng hệ thống 6 loa chất lượng cao.',
      keys: [['M4 Max', '14 CPU / 32 GPU'], ['36GB', 'Bộ nhớ hợp nhất'], ['16,2"', 'Liquid Retina XDR']],
      specs: [['Màn hình', '16,2" Liquid Retina XDR, 120Hz'], ['CPU', 'Apple M4 Max 14 nhân'], ['GPU', '32 nhân'], ['RAM', '36GB bộ nhớ hợp nhất'], ['Ổ cứng', '1TB SSD'], ['Cổng kết nối', '3 x Thunderbolt 5, HDMI, khe SDXC, MagSafe 3'], ['Pin', 'Đến 21 giờ'], ['Trọng lượng', '2,14 kg'], ['Hệ điều hành', 'macOS']]
    },

    // ================= LAPTOP – Dell =================
    {
      cat: 'laptop', name: 'Dell XPS 13', brand: 'Dell', tag: 'Cao cấp',
      rating: 4.8, reviews: 86, stock: 8, listPrice: 46290000, salePrice: null, src: 'tgdd',
      sub: 'Intel Core 5 320 · 16GB · 512GB SSD · 2.5K cảm ứng',
      images: ['https://ttcenter.com.vn/uploads/product/g6fcd9op-3421-dell-xps-13-dx13260-2026-core-5-320-8gb-512gb-13-4-2-5k-touch-new.jpg'],
      colors: [['Graphite', '#3a3b3f'], C.silver],
      variants: ['Core 5 · 16GB · 512GB'],
      storyTitle: 'Biểu tượng laptop doanh nhân.',
      desc: 'Dell XPS 13 phiên bản 2026 có thiết kế nhôm nguyên khối tinh tế, bàn phím tràn viền và màn hình 13,4" 2.5K cảm ứng. Máy mỏng nhẹ, phù hợp cho người thường xuyên di chuyển.',
      keys: [['2.5K', 'Màn hình cảm ứng'], ['13,4"', 'Thiết kế nhỏ gọn'], ['Wi-Fi 7', 'Kết nối nhanh']],
      specs: [['Màn hình', '13,4" 2.5K cảm ứng'], ['CPU', 'Intel Core 5 320'], ['GPU', 'Intel Graphics'], ['RAM', '16GB LPDDR5X'], ['Ổ cứng', '512GB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4 (USB-C)'], ['Không dây', 'Wi-Fi 7, Bluetooth 5.4'], ['Hệ điều hành', 'Windows 11 Home']]
    },
    {
      cat: 'laptop', name: 'Dell XPS 15', brand: 'Dell', tag: 'Đồ họa',
      rating: 4.8, reviews: 54, stock: 4, listPrice: 55990000, salePrice: 51990000, src: 'ref',
      sub: 'Intel Core i7-13700H · 16GB · 512GB SSD · RTX 4050',
      images: ['https://ttcenter.com.vn/uploads/product/brwxajm6-809-dell-xps-15-9530-core-i7-13700h-ram-16gb-ssd-512gb-intel-arc-a370m-4gb-15-6-fhd-new.jpeg'],
      colors: [['Platinum Silver', '#d9dadc']],
      variants: ['i7 · 16GB · 512GB'],
      storyTitle: 'Màn hình lớn cho người sáng tạo.',
      desc: 'Dell XPS 15 9530 kết hợp Core i7-13700H và card đồ họa rời, phù hợp chỉnh sửa ảnh, dựng video. Khung nhôm CNC, bàn phím êm và touchpad cỡ lớn mang lại trải nghiệm cao cấp.',
      keys: [['14 nhân', 'Core i7-13700H'], ['RTX 4050', 'Card đồ họa rời'], ['15,6"', 'Màn hình InfinityEdge']],
      specs: [['Màn hình', '15,6" FHD+ InfinityEdge'], ['CPU', 'Intel Core i7-13700H'], ['GPU', 'NVIDIA GeForce RTX 4050 6GB'], ['RAM', '16GB DDR5'], ['Ổ cứng', '512GB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4, USB-C, khe SD'], ['Trọng lượng', '1,86 kg'], ['Hệ điều hành', 'Windows 11 Home']]
    },

    // ================= LAPTOP – ASUS =================
    {
      cat: 'laptop', name: 'ASUS Zenbook 14 OLED', brand: 'ASUS', tag: 'Màn hình OLED',
      rating: 4.8, reviews: 94, stock: 6, listPrice: 26690000, salePrice: null, src: 'tgdd',
      sub: 'Intel Core Ultra 5 125H · 16GB · 512GB SSD · 3K OLED',
      images: ['https://ttcenter.com.vn/uploads/product/iixmc2wj-1909-asus-zenbook-14-oled-ux3405-2025-ultra-9-285h-ram-32gb-ssd-1tb-14-3k-oled-120hz-new.jpg'],
      colors: [['Ponder Blue', '#2d3a55'], ['Foggy Silver', '#c9cbcf']],
      variants: ['Ultra 5 · 16GB · 512GB'],
      storyTitle: 'Màn hình OLED rực rỡ, nhẹ chỉ 1,2kg.',
      desc: 'ASUS Zenbook 14 OLED trang bị màn hình 3K OLED 120Hz chuẩn màu DCI-P3, chip Intel Core Ultra 5 tích hợp NPU cho tác vụ AI và pin 75Wh dùng thoải mái cả ngày.',
      keys: [['3K OLED', '120Hz, 100% DCI-P3'], ['75Wh', 'Pin dung lượng lớn'], ['1,2kg', 'Siêu nhẹ']],
      specs: [['Màn hình', '14" 3K OLED, 120Hz'], ['CPU', 'Intel Core Ultra 5 125H'], ['GPU', 'Intel Arc Graphics'], ['RAM', '16GB LPDDR5X'], ['Ổ cứng', '512GB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4, USB-A, HDMI'], ['Pin', '75Wh'], ['Trọng lượng', '1,2 kg'], ['Hệ điều hành', 'Windows 11 Home']]
    },
    {
      cat: 'laptop', name: 'ASUS ROG Zephyrus G14', brand: 'ASUS', tag: 'Gaming',
      rating: 4.9, reviews: 67, stock: 5, listPrice: 58990000, salePrice: 58290000, src: 'tgdd',
      sub: 'Ryzen AI 9 HX 370 · 32GB · 1TB SSD · RTX 5060',
      images: ['https://ttcenter.com.vn/uploads/product/6stqjd69-1267-asus-rog-zephyrus-g14-ga402xv-ryzen-9-7940hs-16gb-512gb-rtx-4060-14-2k-ips-165hz-new.jpg'],
      colors: [['Eclipse Gray', '#3b3d42'], ['Platinum White', '#e6e6e6']],
      variants: ['Ryzen AI 9 · 32GB · 1TB'],
      storyTitle: 'Gaming mạnh mẽ trong thân máy 14 inch.',
      desc: 'ROG Zephyrus G14 GA403WM kết hợp AMD Ryzen AI 9 HX 370 và NVIDIA RTX 5060 trong khung nhôm CNC mỏng nhẹ. Màn hình ROG Nebula OLED 3K 120Hz cho hình ảnh sắc nét khi chơi game và làm đồ họa.',
      keys: [['RTX 5060', 'Card đồ họa 8GB'], ['12 nhân', 'Ryzen AI 9 HX 370'], ['3K OLED', 'ROG Nebula 120Hz']],
      specs: [['Màn hình', '14" 3K OLED, 120Hz'], ['CPU', 'AMD Ryzen AI 9 HX 370'], ['GPU', 'NVIDIA GeForce RTX 5060 8GB'], ['RAM', '32GB LPDDR5X'], ['Ổ cứng', '1TB SSD NVMe'], ['Cổng kết nối', 'USB4, USB-C, 2 x USB-A, HDMI 2.1'], ['Trọng lượng', '1,5 kg'], ['Hệ điều hành', 'Windows 11 Home']]
    },

    // ================= LAPTOP – Lenovo =================
    {
      cat: 'laptop', name: 'Lenovo Yoga 7 14"', brand: 'Lenovo', tag: '2-in-1',
      rating: 4.7, reviews: 62, stock: 7, listPrice: 27990000, salePrice: null, src: 'ref',
      sub: 'Intel Core Ultra 7 155H · 16GB · 512GB SSD · OLED cảm ứng',
      images: ['https://ttcenter.com.vn/uploads/product/7ze5katp-2442-lenovo-yoga-7-2-in-1-14iml9-core-ultra-7-155h-32gb-1tb-intel-arc-14-inch-2-8k-wqxga-120hz-new.jpg'],
      colors: [['Storm Grey', '#5c5f66']],
      variants: ['Ultra 7 · 16GB · 512GB'],
      storyTitle: 'Xoay gập 360°, linh hoạt mọi lúc.',
      desc: 'Lenovo Yoga 7 2-in-1 14IML9 có bản lề xoay 360°, màn hình OLED cảm ứng 2.8K 120Hz kèm bút. Chip Intel Core Ultra 7 155H đáp ứng tốt công việc văn phòng, học tập và giải trí.',
      keys: [['360°', 'Xoay gập 2-in-1'], ['2.8K OLED', 'Cảm ứng 120Hz'], ['Bút', 'Đi kèm trong hộp']],
      specs: [['Màn hình', '14" 2.8K OLED cảm ứng, 120Hz'], ['CPU', 'Intel Core Ultra 7 155H'], ['GPU', 'Intel Arc Graphics'], ['RAM', '16GB LPDDR5X'], ['Ổ cứng', '512GB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4, USB-A, HDMI'], ['Phụ kiện', 'Bút cảm ứng'], ['Hệ điều hành', 'Windows 11 Home']]
    },
    {
      cat: 'laptop', name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', tag: 'Doanh nhân',
      rating: 4.8, reviews: 41, stock: 6, listPrice: 79390000, salePrice: 77990000, src: 'tgdd',
      sub: 'Gen 13 · Intel Core Ultra 7 258V · 32GB · 1TB SSD',
      images: ['https://ttcenter.com.vn/uploads/product/tcdn1i72-2519-lenovo-thinkpad-x1-carbon-gen-13-aura-edition-21ns010jvn-intel-core-ultra-7-258v-32gb-1tb-intel-arc-graphics-14-2-8k-ole.jpg'],
      colors: [['Đen carbon', '#1f2023']],
      variants: ['Ultra 7 · 32GB · 1TB'],
      storyTitle: 'Siêu nhẹ, siêu bền cho doanh nhân.',
      desc: 'ThinkPad X1 Carbon Gen 13 Aura Edition là laptop Copilot+ PC với chip Intel Core Ultra 7 258V, màn hình 2.8K OLED và trọng lượng chưa đến 1kg. Độ bền chuẩn quân đội, bảo mật cấp doanh nghiệp.',
      keys: [['< 1kg', 'Khung sợi carbon'], ['Copilot+', 'PC tích hợp AI'], ['2.8K OLED', 'Màn hình 14"']],
      specs: [['Màn hình', '14" 2.8K OLED'], ['CPU', 'Intel Core Ultra 7 258V'], ['GPU', 'Intel Arc Graphics 140V'], ['RAM', '32GB LPDDR5X'], ['Ổ cứng', '1TB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4, 2 x USB-A, HDMI'], ['Bảo mật', 'Vân tay, camera IR, chip vPro'], ['Hệ điều hành', 'Windows 11 Pro']]
    },

    // ================= LAPTOP – HP =================
    {
      cat: 'laptop', name: 'HP Spectre x360 14"', brand: 'HP', tag: 'Premium',
      rating: 4.8, reviews: 73, stock: 5, listPrice: 56990000, salePrice: 51990000, src: 'ref',
      sub: 'Intel Core Ultra 7 155H · 32GB · 1TB SSD · 2.8K OLED',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgisDdBLcu8NdOhpCP7nXFbPNOkUjooZq1qaF9eafykw&s=10'],
      colors: [['Nightfall Black', '#24252a'], ['Slate Blue', '#4b5d78']],
      variants: ['Ultra 7 · 32GB · 1TB'],
      storyTitle: 'Laptop xoay gập sang trọng bậc nhất.',
      desc: 'HP Spectre x360 14 (14-eu0050TU) có thiết kế vát kim cương tinh xảo, màn hình 2.8K OLED 120Hz cảm ứng kèm bút và chip Intel Core Ultra 7 155H. Lựa chọn hoàn hảo cho người dùng đề cao thẩm mỹ.',
      keys: [['2.8K OLED', '120Hz cảm ứng'], ['32GB', 'RAM'], ['360°', 'Xoay gập kèm bút']],
      specs: [['Màn hình', '14" 2.8K OLED cảm ứng, 120Hz'], ['CPU', 'Intel Core Ultra 7 155H'], ['GPU', 'Intel Arc Graphics'], ['RAM', '32GB LPDDR5x'], ['Ổ cứng', '1TB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4, USB-A'], ['Phụ kiện', 'Bút HP Rechargeable MPP2.0'], ['Hệ điều hành', 'Windows 11 Home']]
    },
    {
      cat: 'laptop', name: 'HP Pavilion 15', brand: 'HP', tag: 'Giá tốt',
      rating: 4.6, reviews: 89, stock: 10, listPrice: 17990000, salePrice: 15990000, src: 'ref',
      sub: 'Intel Core i5 · 16GB · 512GB SSD · 15,6" FHD',
      images: ['https://ttcenter.com.vn/uploads/product/wo9qhlzc-3244-hp-pavilion-15-cs3014tu-core-i5-1035g1-8gb-256gb-likenew.jpg'],
      colors: [['Bạc tự nhiên', '#d5d6d8']],
      variants: ['Core i5 · 16GB · 512GB'],
      storyTitle: 'Học tập, làm việc hằng ngày thật dễ dàng.',
      desc: 'HP Pavilion 15 có màn hình 15,6" Full HD rộng rãi, bàn phím đầy đủ phím số và cấu hình Core i5 đủ mạnh cho học tập, văn phòng. Mức giá dễ tiếp cận cho học sinh, sinh viên.',
      keys: [['15,6"', 'Full HD IPS'], ['16GB', 'RAM đa nhiệm'], ['Numpad', 'Bàn phím số']],
      specs: [['Màn hình', '15,6" Full HD IPS'], ['CPU', 'Intel Core i5'], ['GPU', 'Intel Iris Xe Graphics'], ['RAM', '16GB DDR4'], ['Ổ cứng', '512GB SSD NVMe'], ['Cổng kết nối', 'USB-C, 2 x USB-A, HDMI, khe SD'], ['Trọng lượng', '1,75 kg'], ['Hệ điều hành', 'Windows 11 Home']]
    },

    // ================= LAPTOP – Samsung =================
    {
      cat: 'laptop', name: 'Samsung Galaxy Book4 Pro', brand: 'Samsung', tag: 'Mỏng nhẹ',
      rating: 4.6, reviews: 48, stock: 8, listPrice: 27990000, salePrice: 25990000, src: 'ref',
      sub: 'Intel Core Ultra 7 155H · 16GB · 512GB SSD · 3K AMOLED',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQNz3e2Uh9Zu-NpD_yq_l2pZGYs44_8aqZbBgzoxwow&s=10'],
      colors: [['Moonstone Gray', '#5b5e63'], C.silver],
      variants: ['Ultra 7 · 16GB · 512GB'],
      storyTitle: 'Kết nối liền mạch hệ sinh thái Galaxy.',
      desc: 'Galaxy Book4 Pro có màn hình Dynamic AMOLED 2X 3K cảm ứng, thân máy mỏng nhẹ và khả năng kết nối liền mạch với điện thoại, máy tính bảng Galaxy.',
      keys: [['3K AMOLED', 'Dynamic AMOLED 2X'], ['1,23kg', 'Mỏng nhẹ'], ['Galaxy', 'Hệ sinh thái liền mạch']],
      specs: [['Màn hình', '14" 3K Dynamic AMOLED 2X, 120Hz'], ['CPU', 'Intel Core Ultra 7 155H'], ['GPU', 'Intel Arc Graphics'], ['RAM', '16GB LPDDR5X'], ['Ổ cứng', '512GB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4, USB-A, HDMI'], ['Trọng lượng', '1,23 kg'], ['Hệ điều hành', 'Windows 11 Home']]
    },
    {
      cat: 'laptop', name: 'Samsung Galaxy Book4 Ultra', brand: 'Samsung', tag: 'Creator',
      rating: 4.8, reviews: 29, stock: 3, listPrice: 59990000, salePrice: 54990000, src: 'ref',
      sub: 'Intel Core Ultra 9 185H · 32GB · 1TB SSD · RTX 4070',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2u9fyX9V83WMDoL90k0sv9NIe7zCscvtFHc8kpITj6A&s=10'],
      colors: [['Moonstone Gray', '#5b5e63']],
      variants: ['Ultra 9 · 32GB · 1TB'],
      storyTitle: 'Cỗ máy sáng tạo nội dung.',
      desc: 'Galaxy Book4 Ultra kết hợp Intel Core Ultra 9 và NVIDIA RTX 4070 với màn hình 16" 3K AMOLED cảm ứng, đáp ứng dựng video, thiết kế 3D và chơi game.',
      keys: [['RTX 4070', 'Card đồ họa 8GB'], ['Ultra 9', 'Intel Core Ultra 9 185H'], ['16"', '3K AMOLED cảm ứng']],
      specs: [['Màn hình', '16" 3K Dynamic AMOLED 2X, 120Hz'], ['CPU', 'Intel Core Ultra 9 185H'], ['GPU', 'NVIDIA GeForce RTX 4070 8GB'], ['RAM', '32GB LPDDR5X'], ['Ổ cứng', '1TB SSD NVMe'], ['Cổng kết nối', '2 x Thunderbolt 4, USB-A, HDMI, khe microSD'], ['Trọng lượng', '1,86 kg'], ['Hệ điều hành', 'Windows 11 Home']]
    }
  ];

  // ---------- Tiện ích ----------
  function $(id) { return document.getElementById(id); }
  function money(n) { return n.toLocaleString('vi-VN') + '₫'; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function slug(s) {
    return String(s).toLowerCase()
      .replace(/"/g, '')
      .replace(/\+/g, ' plus')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  function stars(r) {
    var n = Math.round(r || 0);
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }
  function savingLabel(n) {
    var m = n / 1000000;
    return 'Giảm ' + (m >= 1 ? (Math.round(m * 10) / 10).toString().replace('.', ',') + ' triệu' : money(n));
  }
  function shortMoney(n) {
    var m = n / 1000000;
    return (Math.round(m * 10) / 10).toString().replace('.', ',') + ' triệu';
  }
  function detailUrl(p) { return '/Frontend/Pages/productdetail.html?id=' + p.id; }

  // ---------- Chuẩn hoá dữ liệu ----------
  PRODUCTS.forEach(function (p, i) {
    p.id = slug(p.name);
    p.order = i;
    var hasSale = p.salePrice && p.listPrice - p.salePrice >= MIN_SAVING;
    p.price = hasSale ? p.salePrice : p.listPrice;
    p.oldPrice = hasSale ? p.listPrice : null;
    p.saving = hasSale ? p.listPrice - p.salePrice : 0;
  });

  function findProduct(id) {
    if (!id) return PRODUCTS[0];
    id = slug(id);
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  // Chênh lệch giá theo phiên bản dung lượng (chỉ điện thoại, giá ước tính)
  function variantDelta(p, idx) {
    if (p.cat !== 'phone') return 0;
    var steps = STORAGE_STEP[p.brand === 'Apple' ? 'Apple' : 'other'];
    var d = 0;
    for (var k = 1; k <= idx; k++) d += steps[p.variants[k]] || 0;
    return d;
  }

  // ---------- Trạng thái ----------
  var state = { p: null, color: 0, variant: 0, qty: 1, img: 0 };
  var toastTimer;

  function toast(msg) {
    var t = $('pdToast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  function refreshIcons() { if (window.lucide) lucide.createIcons(); }

  // ---------- Hiển thị ----------
  function renderBreadcrumb() {
    var p = state.p, cat = CATEGORY[p.cat];
    $('pdBreadcrumb').innerHTML =
      '<a href="../index.html">Trang chủ</a> / ' +
      '<a href="' + cat.href + '">' + cat.label + '</a> / ' +
      esc(p.brand) + ' / <span>' + esc(p.name) + '</span>';
  }

  function setMainImage(i) {
    var p = state.p;
    if (i < 0 || i >= p.images.length) return;
    state.img = i;
    var img = $('pdMainImg');
    img.src = p.images[i];
    img.alt = p.name;
    $('pdThumbs').querySelectorAll('.pd-thumb').forEach(function (b) {
      b.classList.toggle('active', +b.dataset.index === i);
    });
  }

  function updateThumbVisibility() {
    $('pdThumbs').hidden = $('pdThumbs').children.length < 2;
  }

  function renderGallery() {
    var p = state.p;
    $('pdBadge').textContent = p.saving ? savingLabel(p.saving) : p.tag;

    $('pdThumbs').innerHTML = p.images.map(function (src, i) {
      return '<button type="button" class="pd-thumb" data-index="' + i + '" aria-label="Xem ảnh ' + (i + 1) + '">' +
        '<img src="' + esc(src) + '" alt="" loading="lazy" /></button>';
    }).join('');

    // Ẩn ảnh lỗi khỏi danh sách thumbnail
    $('pdThumbs').querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        var b = img.closest('.pd-thumb');
        if (b) b.remove();
        updateThumbVisibility();
      });
    });

    // Ảnh chính lỗi -> chuyển sang ảnh tiếp theo
    $('pdMainImg').onerror = function () { setMainImage(state.img + 1); };

    setMainImage(0);
    updateThumbVisibility();
  }

  function renderInfo() {
    var p = state.p;
    $('pdBrand').textContent = p.brand;
    $('pdTitle').textContent = p.name;
    $('pdSub').textContent = p.sub;

    $('pdRating').innerHTML = p.rating
      ? '<span class="stars">' + stars(p.rating) + '</span>' +
      '<span>' + String(p.rating).replace('.', ',') + '/5</span>' +
      '<a href="#" data-goto="reviews">' + p.reviews.toLocaleString('vi-VN') + ' đánh giá</a>'
      : '<span class="stars">' + stars(0) + '</span><span>Chưa có đánh giá</span>';

    $('pdVariantLabel').textContent = CATEGORY[p.cat].variantLabel;
    $('pdWarranty').textContent = 'Tại trung tâm bảo hành ủy quyền của ' + p.brand;
    $('pdWish').classList.remove('active');
  }

  function currentPrice() {
    var p = state.p, d = variantDelta(p, state.variant);
    return { price: p.price + d, old: p.oldPrice ? p.oldPrice + d : null };
  }

  function renderPrice() {
    var p = state.p, cp = currentPrice();
    $('pdPrice').textContent = money(cp.price);
    $('pdOldPrice').textContent = cp.old ? money(cp.old) : '';

    var saving = cp.old ? cp.old - cp.price : 0;
    $('pdSaving').textContent = saving
      ? savingLabel(saving) + ' (-' + Math.round(saving / cp.old * 100) + '%)'
      : '';

    // Ưu đãi (tính theo giá hiện tại)
    var monthly = Math.ceil(cp.price / 12 / 1000) * 1000;
    var promos = [
      'Trả góp <b>0%</b> qua thẻ tín dụng, chỉ từ <b>' + money(monthly) + '/tháng</b> (12 tháng)',
      'Thu cũ đổi mới – trợ giá thêm khi lên đời ' + (p.cat === 'phone' ? 'điện thoại' : 'laptop'),
      p.cat === 'phone'
        ? 'Giảm thêm 10% khi mua kèm ốp lưng, cường lực, sạc nhanh chính hãng'
        : 'Tặng balo / túi chống sốc và chuột không dây'
    ];
    if (saving) promos.unshift('Đang giảm <b>' + shortMoney(saving) + '</b> so với giá niêm yết');
    $('pdPromo').innerHTML = promos.map(function (s) { return '<li>' + s + '</li>'; }).join('');
  }

  function renderColors() {
    var p = state.p;
    $('pdColors').innerHTML = p.colors.map(function (c, i) {
      return '<button type="button" class="pd-swatch' + (i === state.color ? ' active' : '') + '" data-color="' + i +
        '" title="' + esc(c[0]) + '" aria-label="Màu ' + esc(c[0]) + '"><span style="background:' + c[1] + '"></span></button>';
    }).join('');
    $('pdColorName').textContent = p.colors[state.color][0];
  }

  function renderVariants() {
    var p = state.p;
    $('pdVariants').innerHTML = p.variants.map(function (v, i) {
      var price = p.price + variantDelta(p, i);
      return '<button type="button" class="pd-chip' + (i === state.variant ? ' active' : '') + '" data-variant="' + i + '">' +
        '<strong>' + esc(v) + '</strong><small>' + money(price) + '</small></button>';
    }).join('');
  }

  function renderStock() {
    var p = state.p, el = $('pdStock');
    el.className = 'pd-stock';
    if (p.stock <= 0) {
      el.classList.add('out');
      el.textContent = 'Tạm hết hàng';
    } else if (p.stock <= 3) {
      el.classList.add('low');
      el.textContent = 'Chỉ còn ' + p.stock + ' sản phẩm';
    } else {
      el.textContent = 'Còn hàng – sẵn sàng giao ngay';
    }
    var out = p.stock <= 0;
    $('pdAdd').disabled = out;
    $('pdBuy').disabled = out;
    renderQty();
  }

  function renderQty() {
    var max = Math.max(1, state.p.stock);
    if (state.qty > max) state.qty = max;
    $('pdQty').textContent = state.qty;
    $('pdQtyMinus').disabled = state.qty <= 1;
    $('pdQtyPlus').disabled = state.qty >= max;
  }

  function renderSpecs() {
    var p = state.p;
    $('pdStoryTitle').textContent = p.storyTitle;
    $('pdDesc').textContent = p.desc;
    $('pdKeys').innerHTML = p.keys.map(function (k) {
      return '<div class="pd-key"><h4>' + esc(k[0]) + '</h4><p>' + esc(k[1]) + '</p></div>';
    }).join('');
    $('pdSpecs').innerHTML = '<dl>' + p.specs.map(function (s) {
      return '<div class="pd-spec-row"><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>';
    }).join('') + '</dl>';
  }

  function renderReview() {
    var p = state.p;
    $('pdReview').innerHTML = p.rating
      ? '<div class="pd-review__score"><strong>' + String(p.rating).replace('.', ',') + '</strong>' +
      '<div class="stars">' + stars(p.rating) + '</div>' +
      '<span>' + p.reviews.toLocaleString('vi-VN') + ' lượt đánh giá</span></div>' +
      '<div class="pd-review__text"><h4>Khách hàng nói gì về ' + esc(p.name) + '?</h4>' +
      '<p>Điểm đánh giá trung bình được tổng hợp từ khách hàng đã mua sản phẩm.</p>' +
      '<button type="button" class="btn btn--white btn--sm" data-write-review>Viết đánh giá</button></div>'
      : '<div class="pd-review__score"><strong>–</strong><div class="stars">' + stars(0) + '</div>' +
      '<span>Chưa có đánh giá</span></div>' +
      '<div class="pd-review__text"><h4>Hãy là người đầu tiên đánh giá ' + esc(p.name) + '</h4>' +
      '<p>Chia sẻ trải nghiệm của bạn để giúp những khách hàng khác lựa chọn dễ dàng hơn.</p>' +
      '<button type="button" class="btn btn--white btn--sm" data-write-review>Viết đánh giá</button></div>';
  }

  function cardHtml(p) {
    var badge = p.saving ? savingLabel(p.saving) : p.tag;
    var rating = p.rating
      ? '<p class="card__rating"><span class="star">★</span> ' + String(p.rating).replace('.', ',') +
      ' (' + p.reviews.toLocaleString('vi-VN') + ')</p>'
      : '<p class="card__rating">Chưa có đánh giá</p>';
    return '<article class="card">' +
      '<div class="card__top"><span class="badge">' + esc(badge) + '</span></div>' +
      '<a class="card__img" href="' + detailUrl(p) + '"><img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" loading="lazy" /></a>' +
      '<a class="card__name" href="' + detailUrl(p) + '">' + esc(p.name) + '</a>' +
      '<p class="card__spec">' + esc(p.sub) + '</p>' + rating +
      '<p class="card__price">' + money(p.price) + (p.oldPrice ? '<del>' + money(p.oldPrice) + '</del>' : '') + '</p>' +
      '<a class="btn btn--primary btn--sm btn--block" href="' + detailUrl(p) + '">Xem chi tiết</a>' +
      '</article>';
  }

  function renderRelated() {
    var p = state.p;
    var list = PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; })
      .sort(function (a, b) {
        var sa = a.brand === p.brand ? 0 : 1, sb = b.brand === p.brand ? 0 : 1;
        return sa - sb || Math.abs(a.price - p.price) - Math.abs(b.price - p.price);
      })
      .slice(0, 4);
    $('pdRelated').innerHTML = list.map(cardHtml).join('');
  }

  function setActiveNav() {
    var href = CATEGORY[state.p.cat].href;
    document.querySelectorAll('.navigation a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === href);
    });
  }

  function switchTab(name) {
    document.querySelectorAll('.pd-tabs button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.tab === name);
    });
    document.querySelectorAll('.pd-panel').forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== name;
    });
  }

  function renderAll() {
    var p = state.p;
    document.title = p.name + ' | CTTSHOP';
    renderBreadcrumb();
    renderGallery();
    renderInfo();
    renderColors();
    renderVariants();
    renderPrice();
    renderStock();
    renderSpecs();
    renderReview();
    renderRelated();
    setActiveNav();
    switchTab('specs');
    refreshIcons();
  }

  // ---------- Giỏ hàng ----------
  function addToCart() {
    var badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = (parseInt(badge.textContent, 10) || 0) + state.qty;
  }

  function selectionText() {
    var p = state.p;
    return p.name + ' ' + p.variants[state.variant] + ' – ' + p.colors[state.color][0];
  }

  // ---------- Sự kiện ----------
  function bind() {
    var wrap = $('pdMainWrap');
    wrap.addEventListener('mousemove', function (e) {
      var r = wrap.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top) / r.height) * 100;
      $('pdMainImg').style.transformOrigin = x + '% ' + y + '%';
      wrap.classList.add('zoomed');
    });
    wrap.addEventListener('mouseleave', function () { wrap.classList.remove('zoomed'); });

    $('pdContent').addEventListener('click', function (e) {
      var t = e.target;

      var thumb = t.closest('.pd-thumb');
      if (thumb) { setMainImage(+thumb.dataset.index); return; }

      var sw = t.closest('[data-color]');
      if (sw) {
        state.color = +sw.dataset.color;
        renderColors();
        return;
      }

      var chip = t.closest('[data-variant]');
      if (chip) {
        state.variant = +chip.dataset.variant;
        renderVariants();
        renderPrice();
        return;
      }

      var tab = t.closest('[data-tab]');
      if (tab) { switchTab(tab.dataset.tab); return; }

      var go = t.closest('[data-goto]');
      if (go) {
        e.preventDefault();
        switchTab(go.dataset.goto);
        document.querySelector('.pd-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (t.closest('[data-write-review]')) {
        toast('Tính năng viết đánh giá sẽ sớm ra mắt.');
        return;
      }
    });

    $('pdQtyMinus').addEventListener('click', function () { state.qty = Math.max(1, state.qty - 1); renderQty(); });
    $('pdQtyPlus').addEventListener('click', function () { state.qty += 1; renderQty(); });

    $('pdAdd').addEventListener('click', function () {
      addToCart();
      toast('Đã thêm ' + state.qty + ' × ' + selectionText() + ' vào giỏ hàng');
    });

    $('pdBuy').addEventListener('click', function () {
      addToCart();
      toast('Đã thêm ' + selectionText() + ' vào giỏ. Chức năng thanh toán đang được hoàn thiện.');
    });

    $('pdWish').addEventListener('click', function () {
      var on = this.classList.toggle('active');
      toast(on ? 'Đã thêm vào danh sách yêu thích' : 'Đã bỏ khỏi danh sách yêu thích');
    });

    $('pdShare').addEventListener('click', function () {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          toast('Đã sao chép liên kết sản phẩm');
        }, function () { toast(url); });
      } else {
        toast(url);
      }
    });

    // Tìm kiếm nhanh trên thanh Header (#searchInput) & nút nổi AI Assistant
    var searchInput = $('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var q = searchInput.value.trim().toLowerCase();
          if (!q) return;
          var found = PRODUCTS.filter(function (item) {
            return item.name.toLowerCase().indexOf(q) >= 0 || item.brand.toLowerCase().indexOf(q) >= 0;
          })[0];
          if (found) {
            window.location.href = detailUrl(found);
          } else {
            toast('Không tìm thấy sản phẩm phù hợp với "' + searchInput.value.trim() + '"');
          }
        }
      });
    }

    if (!window.moveAIAssistant) {
      window.moveAIAssistant = function () {
        window.location.href = '/Frontend/Pages/Assistant.html';
      };
    }
  }

  // ---------- Khởi tạo ----------
  function init() {
    var id = new URLSearchParams(window.location.search).get('id');
    var p = findProduct(id);

    if (!p) {
      $('pdNotFound').hidden = false;
      $('pdContent').hidden = true;
      $('pdBreadcrumb').innerHTML = '<a href="../index.html">Trang chủ</a> / <span>Không tìm thấy sản phẩm</span>';
      document.title = 'Không tìm thấy sản phẩm | CTTSHOP';
      refreshIcons();
      return;
    }

    state.p = p;
    $('pdNotFound').hidden = true;
    $('pdContent').hidden = false;
    bind();
    renderAll();
  }

  init();
})();
