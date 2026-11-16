/* CTTSHOP – Trang Laptop: dữ liệu sản phẩm, bộ lọc, sắp xếp, phân trang.
 *
 * Giá: VND
 * Ảnh: placeholder, sẽ thay bằng ảnh thật sau
 */
(function () {
  'use strict';

  var PAGE_SIZE = 6;

  var RAM_OPTIONS = ['8GB', '16GB', '32GB', '64GB'];
  var STORAGE_OPTIONS = ['256GB', '512GB', '1TB', '2TB'];
  var SIZE_OPTIONS = ['13-14', '15-16', '17+'];

  var PRODUCTS = [
    // ---------- Apple ----------
    {
      name: 'MacBook Air 13"', brand: 'Apple', ram: '16GB', storage: '256GB', size: '13-14',
      spec: 'M3 · 16GB RAM · 256GB SSD', tag: 'Bestseller', rating: 4.9, reviews: 128, stock: 10,
      listPrice: 29990000, salePrice: 27990000, img: 'https://ttcenter.com.vn/uploads/product/qpyjh8ry-2549-macbook-air-m5-13-inch-2026-10cpu-8gpu-16gb-512gb-new.jpg'
    },
    {
      name: 'MacBook Pro 14"', brand: 'Apple', ram: '18GB', storage: '512GB', size: '13-14',
      spec: 'M3 Pro · 18GB RAM · 512GB SSD', tag: 'Pro', rating: 4.9, reviews: 86, stock: 5,
      listPrice: 49990000, salePrice: 45990000, img: 'https://ttcenter.com.vn/uploads/product/5kqgin1j-1887-macbook-pro-14inch-m2-pro-16gb-1tb-like-new.jpg'
    },
    {
      name: 'MacBook Pro 16"', brand: 'Apple', ram: '36GB', storage: '1TB', size: '17+',
      spec: 'M3 Max · 36GB RAM · 1TB SSD', tag: 'Max', rating: 5, reviews: 42, stock: 3,
      listPrice: 79990000, salePrice: 74990000, img: 'https://ttcenter.com.vn/uploads/product/16lhm5au-505-macbook-pro-16inch-m2-pro-16gb-512gb.jpg'
    },

    // ---------- Dell ----------
    {
      name: 'Dell XPS 13', brand: 'Dell', ram: '16GB', storage: '512GB', size: '13-14',
      spec: 'Core Ultra 7 · 16GB · 512GB SSD', tag: 'Save $100', rating: 4.8, reviews: 86, stock: 8,
      listPrice: 35990000, salePrice: 32990000, img: 'https://ttcenter.com.vn/uploads/product/g6fcd9op-3421-dell-xps-13-dx13260-2026-core-5-320-8gb-512gb-13-4-2-5k-touch-new.jpg'
    },
    {
      name: 'Dell XPS 15', brand: 'Dell', ram: '32GB', storage: '1TB', size: '15-16',
      spec: 'Core Ultra 9 · 32GB · 1TB SSD', tag: 'OLED', rating: 4.8, reviews: 54, stock: 4,
      listPrice: 55990000, salePrice: 51990000, img: 'https://ttcenter.com.vn/uploads/product/brwxajm6-809-dell-xps-15-9530-core-i7-13700h-ram-16gb-ssd-512gb-intel-arc-a370m-4gb-15-6-fhd-new.jpeg'
    },

    // ---------- ASUS ----------
    {
      name: 'ASUS Zenbook 14 OLED', brand: 'ASUS', ram: '16GB', storage: '512GB', size: '13-14',
      spec: 'Core Ultra 5 · 16GB · 512GB SSD', tag: 'OLED display', rating: 4.8, reviews: 94, stock: 6,
      listPrice: 24990000, salePrice: 22990000, img: 'https://ttcenter.com.vn/uploads/product/iixmc2wj-1909-asus-zenbook-14-oled-ux3405-2025-ultra-9-285h-ram-32gb-ssd-1tb-14-3k-oled-120hz-new.jpg'
    },
    {
      name: 'ASUS ROG Zephyrus G14', brand: 'ASUS', ram: '32GB', storage: '1TB', size: '13-14',
      spec: 'Ryzen 9 · 32GB · 1TB SSD · RTX 4070', tag: 'Gaming', rating: 4.9, reviews: 67, stock: 5,
      listPrice: 42990000, salePrice: 39990000, img: 'https://ttcenter.com.vn/uploads/product/6stqjd69-1267-asus-rog-zephyrus-g14-ga402xv-ryzen-9-7940hs-16gb-512gb-rtx-4060-14-2k-ips-165hz-new.jpg'
    },

    // ---------- Lenovo ----------
    {
      name: 'Lenovo Yoga 7 14"', brand: 'Lenovo', ram: '16GB', storage: '512GB', size: '13-14',
      spec: 'Ryzen 7 · 16GB · 512GB SSD', tag: '2-in-1', rating: 4.7, reviews: 62, stock: 7,
      listPrice: 21990000, salePrice: null, img: 'https://ttcenter.com.vn/uploads/product/7ze5katp-2442-lenovo-yoga-7-2-in-1-14iml9-core-ultra-7-155h-32gb-1tb-intel-arc-14-inch-2-8k-wqxga-120hz-new.jpg'
    },
    {
      name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', ram: '32GB', storage: '1TB', size: '13-14',
      spec: 'Core Ultra 7 · 32GB · 1TB SSD', tag: 'Business', rating: 4.8, reviews: 41, stock: 6,
      listPrice: 48990000, salePrice: 44990000, img: 'https://ttcenter.com.vn/uploads/product/tcdn1i72-2519-lenovo-thinkpad-x1-carbon-gen-13-aura-edition-21ns010jvn-intel-core-ultra-7-258v-32gb-1tb-intel-arc-graphics-14-2-8k-ole.jpg'
    },

    // ---------- HP ----------
    {
      name: 'HP Spectre x360 14"', brand: 'HP', ram: '16GB', storage: '1TB', size: '13-14',
      spec: 'Core Ultra 7 · 16GB · 1TB SSD', tag: 'Premium pick', rating: 4.8, reviews: 73, stock: 5,
      listPrice: 37990000, salePrice: null, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgisDdBLcu8NdOhpCP7nXFbPNOkUjooZq1qaF9eafykw&s=10'
    },
    {
      name: 'HP Pavilion 15', brand: 'HP', ram: '16GB', storage: '512GB', size: '15-16',
      spec: 'Core 5 · 16GB · 512GB SSD', tag: 'Value', rating: 4.6, reviews: 89, stock: 10,
      listPrice: 17990000, salePrice: 15990000, img: 'https://ttcenter.com.vn/uploads/product/wo9qhlzc-3244-hp-pavilion-15-cs3014tu-core-i5-1035g1-8gb-256gb-likenew.jpg'
    },

    // ---------- Samsung ----------
    {
      name: 'Samsung Galaxy Book4 Pro', brand: 'Samsung', ram: '16GB', storage: '512GB', size: '13-14',
      spec: 'Core Ultra 7 · 16GB · 512GB SSD', tag: 'Lightweight', rating: 4.6, reviews: 48, stock: 8,
      listPrice: 27990000, salePrice: 25990000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQNz3e2Uh9Zu-NpD_yq_l2pZGYs44_8aqZbBgzoxwow&s=10'
    },
    {
      name: 'Samsung Galaxy Book4 Ultra', brand: 'Samsung', ram: '32GB', storage: '1TB', size: '15-16',
      spec: 'Core Ultra 9 · 32GB · 1TB SSD · RTX 4070', tag: 'Creator', rating: 4.8, reviews: 29, stock: 3,
      listPrice: 59990000, salePrice: 54990000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2u9fyX9V83WMDoL90k0sv9NIe7zCscvtFHc8kpITj6A&s=10'
    }
  ];

  // Chuẩn hoá dữ liệu
  PRODUCTS.forEach(function (p, i) {
    p.order = i;
    p.inStock = p.stock > 0;
    var hasSale = p.salePrice && p.listPrice - p.salePrice >= 500000;
    p.price = hasSale ? p.salePrice : p.listPrice;
    p.oldPrice = hasSale ? p.listPrice : null;
    p.saving = hasSale ? p.listPrice - p.salePrice : 0;
  });

  // Khoảng giá
  var prices = PRODUCTS.map(function (p) { return p.price; });
  var PRICE_MIN = Math.min.apply(null, prices);
  var PRICE_MAX = Math.max.apply(null, prices);

  var BRANDS = unique(PRODUCTS.map(function (p) { return p.brand; }));

  var state;
  function defaultState() {
    return {
      brand: [], ram: [], storage: [], size: [], availability: [],
      min: PRICE_MIN, max: PRICE_MAX, sort: 'featured', page: 1, q: ''
    };
  }

  // ---------- Tiện ích ----------
  function unique(arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); }
  function $(id) { return document.getElementById(id); }
  function money(n) { return n.toLocaleString('vi-VN') + '₫'; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toggle(list, v) {
    var i = list.indexOf(v);
    if (i >= 0) list.splice(i, 1); else list.push(v);
  }
  function savingLabel(n) {
    var m = n / 1000000;
    return 'Giảm ' + (m >= 1 ? (Math.round(m * 10) / 10).toString().replace('.', ',') + ' triệu' : money(n));
  }

  // ---------- Lọc & sắp xếp ----------
  function matches(p) {
    if (state.brand.length && state.brand.indexOf(p.brand) < 0) return false;
    if (state.ram.length && state.ram.indexOf(p.ram) < 0) return false;
    if (state.storage.length && state.storage.indexOf(p.storage) < 0) return false;
    if (state.size.length && state.size.indexOf(p.size) < 0) return false;
    if (state.availability.indexOf('instock') >= 0 && !p.inStock) return false;
    if (state.availability.indexOf('onsale') >= 0 && !p.saving) return false;
    if (p.price < state.min || p.price > state.max) return false;
    if (state.q && p.name.toLowerCase().indexOf(state.q) < 0 && p.brand.toLowerCase().indexOf(state.q) < 0) return false;
    return true;
  }

  function sorted(list) {
    var out = list.slice();
    var by = {
      featured: function (a, b) { return a.order - b.order; },
      'price-asc': function (a, b) { return a.price - b.price; },
      'price-desc': function (a, b) { return b.price - a.price; },
      rating: function (a, b) { return (b.rating || 0) - (a.rating || 0) || b.reviews - a.reviews; }
    };
    return out.sort(by[state.sort]);
  }

  // ---------- Hiển thị bộ lọc ----------
  function checkHtml(group, value, label, count, checked) {
    return '<label class="check"><input type="checkbox" data-group="' + group + '" value="' + esc(value) + '"' +
      (checked ? ' checked' : '') + ' /><span class="box"></span>' + esc(label) + '<em>' + count + '</em></label>';
  }

  function renderFilters() {
    $('filter-brand').innerHTML = BRANDS.map(function (b) {
      var c = PRODUCTS.filter(function (p) { return p.brand === b; }).length;
      return checkHtml('brand', b, b, c, state.brand.indexOf(b) >= 0);
    }).join('');

    $('filter-RAM').innerHTML = RAM_OPTIONS.map(function (r) {
      var c = PRODUCTS.filter(function (p) { return p.ram === r; }).length;
      return checkHtml('ram', r, r, c, state.ram.indexOf(r) >= 0);
    }).join('');

    $('filter-storage').innerHTML = STORAGE_OPTIONS.map(function (s) {
      var c = PRODUCTS.filter(function (p) { return p.storage === s; }).length;
      return checkHtml('storage', s, s, c, state.storage.indexOf(s) >= 0);
    }).join('');

    $('filter-size').innerHTML = SIZE_OPTIONS.map(function (sz) {
      var label = { '13-14': '13–14 inch', '15-16': '15–16 inch', '17+': '17 inch+' }[sz];
      var c = PRODUCTS.filter(function (p) { return p.size === sz; }).length;
      return checkHtml('size', sz, label, c, state.size.indexOf(sz) >= 0);
    }).join('');

    var AVAIL = [
      { value: 'instock', label: 'Còn hàng' },
      { value: 'onsale', label: 'Đang giảm giá' }
    ];
    $('filter-availability').innerHTML = AVAIL.map(function (a) {
      var c = PRODUCTS.filter(function (p) { return a.value === 'instock' ? p.inStock : p.saving > 0; }).length;
      return checkHtml('availability', a.value, a.label, c, state.availability.indexOf(a.value) >= 0);
    }).join('');
  }

  function renderPriceControls() {
    var rMin = $('rangeMin'), rMax = $('rangeMax');
    [rMin, rMax].forEach(function (r) {
      r.min = PRICE_MIN; r.max = PRICE_MAX; r.step = 500000;
    });
    rMin.value = state.min;
    rMax.value = state.max;
    $('priceMinInput').value = state.min.toLocaleString('vi-VN');
    $('priceMaxInput').value = state.max.toLocaleString('vi-VN');
    var span = PRICE_MAX - PRICE_MIN || 1;
    var left = ((state.min - PRICE_MIN) / span) * 100;
    var right = ((state.max - PRICE_MIN) / span) * 100;
    var fill = $('rangeFill');
    fill.style.left = left + '%';
    fill.style.width = (right - left) + '%';
  }

  // ---------- Hiển thị sản phẩm ----------
  function heartIcon() {
    return '<i data-lucide="heart" width="19" height="19" stroke-width="1.5" fill="none" stroke="currentColor"></i>';
  }

  function cardHtml(p) {
    var badge = p.saving ? savingLabel(p.saving) : p.tag;
    var rating = p.rating
      ? '<p class="card__rating"><span class="star">★</span> ' + String(p.rating).replace('.', ',') +
      ' (' + p.reviews.toLocaleString('vi-VN') + ')</p>'
      : '<p class="card__rating card__rating--empty">Chưa có đánh giá</p>';
    return '<article class="card">' +
      '<div class="card__top"><span class="badge">' + esc(badge) + '</span>' +
      '<button class="wish" type="button" aria-label="Thêm vào yêu thích">' + heartIcon() + '</button></div>' +
      '<div class="card__img"><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy" /></div>' +
      '<h3 class="card__name">' + esc(p.name) + '</h3>' +
      '<p class="card__spec">' + esc(p.spec) + '</p>' + rating +
      '<p class="card__price">' + money(p.price) + (p.oldPrice ? ' <del>' + money(p.oldPrice) + '</del>' : '') + '</p>' +
      '<button class="btn btn--primary btn--block" type="button" data-add><span class="plus">+</span> Thêm vào giỏ</button>' +
      '</article>';
  }

  function pageList(total, current) {
    var pages = [];
    for (var i = 1; i <= total; i++) {
      if (i === 1 || i === total || Math.abs(i - current) <= 1) pages.push(i);
      else if (pages[pages.length - 1] !== '…') pages.push('…');
    }
    return pages;
  }

  function renderChips() {
    var chips = ['<span class="chip chip--static">Tất cả laptop</span>'];
    var labels = { availability: function (v) { return v === 'instock' ? 'Còn hàng' : 'Đang giảm giá'; } };
    ['brand', 'ram', 'storage', 'size', 'availability'].forEach(function (g) {
      state[g].forEach(function (v) {
        var label = labels[g] ? labels[g](v) : v;
        chips.push('<span class="chip">' + esc(label) + ' <button type="button" data-chip-group="' + g +
          '" data-chip-value="' + esc(v) + '" aria-label="Bỏ lọc ' + esc(label) + '">&times;</button></span>');
      });
    });
    if (state.min !== PRICE_MIN || state.max !== PRICE_MAX) {
      chips.push('<span class="chip">' + money(state.min) + ' – ' + money(state.max) +
        ' <button type="button" data-chip-group="price" aria-label="Bỏ lọc giá">&times;</button></span>');
    }
    if (chips.length > 1) chips.push('<a href="#" class="link-muted" id="clearAll">Xóa tất cả</a>');
    $('chips').innerHTML = chips.join('');
  }

  function render() {
    var result = sorted(PRODUCTS.filter(matches));
    var total = result.length;
    var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var start = (state.page - 1) * PAGE_SIZE;
    var slice = result.slice(start, start + PAGE_SIZE);

    $('resultCount').textContent = total
      ? 'Hiển thị ' + slice.length + ' trong ' + total + ' laptop'
      : 'Không có laptop phù hợp';

    $('productGrid').innerHTML = total
      ? slice.map(cardHtml).join('')
      : '<div class="empty">Không tìm thấy sản phẩm phù hợp. Hãy thử thay đổi bộ lọc.</div>';

    $('pagination').innerHTML = total > PAGE_SIZE
      ? '<button class="page page--arrow" data-page="' + (state.page - 1) + '"' + (state.page === 1 ? ' disabled' : '') + ' aria-label="Trang trước">&lsaquo;</button>' +
      pageList(pages, state.page).map(function (n) {
        return n === '…'
          ? '<span class="page page--dots">…</span>'
          : '<button class="page' + (n === state.page ? ' active' : '') + '" data-page="' + n + '">' + n + '</button>';
      }).join('') +
      '<button class="page page--arrow" data-page="' + (state.page + 1) + '"' + (state.page === pages ? ' disabled' : '') + ' aria-label="Trang sau">&rsaquo;</button>'
      : '';

    $('pageInfo').textContent = total
      ? 'Hiển thị ' + (start + 1) + '–' + (start + slice.length) + ' trong ' + total + ' laptop'
      : '';

    renderChips();
    renderPriceControls();

    // Re-initialize Lucide icons for newly rendered cards
    if (window.lucide) { lucide.createIcons(); }
  }

  function refresh(resetPage) {
    if (resetPage !== false) state.page = 1;
    renderFilters();
    render();
  }

  // ---------- Sự kiện ----------
  function parseMoney(str) { return parseInt(String(str).replace(/\D/g, ''), 10); }

  function bind() {
    document.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('.check input')) {
        toggle(state[t.dataset.group], t.value);
        refresh();
      }
    });

    document.addEventListener('click', function (e) {
      var t = e.target;

      // Collapse/expand filter groups
      var title = t.closest('.filter-group__title');
      if (title && title.tagName === 'BUTTON') {
        title.parentNode.classList.toggle('collapsed');
        return;
      }

      // Remove chip
      var chip = t.closest('[data-chip-group]');
      if (chip) {
        var g = chip.dataset.chipGroup;
        if (g === 'price') { state.min = PRICE_MIN; state.max = PRICE_MAX; }
        else toggle(state[g], chip.dataset.chipValue);
        refresh();
        return;
      }

      // Clear all
      if (t.id === 'clearAll') {
        e.preventDefault();
        var keepSort = state.sort, keepQ = state.q;
        state = defaultState();
        state.availability = [];
        state.sort = keepSort; state.q = keepQ;
        refresh();
        return;
      }

      // Reset all
      if (t.id === 'resetAll') {
        e.preventDefault();
        state = defaultState();
        $('sortSelect').value = 'featured';
        refresh();
        return;
      }

      // Pagination
      var page = t.closest('[data-page]');
      if (page && !page.disabled) {
        state.page = parseInt(page.dataset.page, 10);
        render();
        document.querySelector('.products').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      // Wishlist
      var wish = t.closest('.wish');
      if (wish) { wish.classList.toggle('active'); return; }

      // Add to cart
      var add = t.closest('[data-add]');
      if (add) {
        var badge = $('cartCount');
        if (badge) { badge.textContent = (parseInt(badge.textContent, 10) || 0) + 1; }
        return;
      }
    });

    $('sortSelect').addEventListener('change', function (e) {
      state.sort = e.target.value;
      refresh();
    });

    // Price range sliders
    function onRange() {
      var a = parseInt($('rangeMin').value, 10), b = parseInt($('rangeMax').value, 10);
      state.min = Math.min(a, b);
      state.max = Math.max(a, b);
      state.page = 1;
      render();
    }
    $('rangeMin').addEventListener('input', onRange);
    $('rangeMax').addEventListener('input', onRange);

    // Price inputs
    function onPriceInput() {
      var a = parseMoney($('priceMinInput').value), b = parseMoney($('priceMaxInput').value);
      if (isNaN(a)) a = PRICE_MIN;
      if (isNaN(b)) b = PRICE_MAX;
      a = Math.max(PRICE_MIN, Math.min(PRICE_MAX, a));
      b = Math.max(PRICE_MIN, Math.min(PRICE_MAX, b));
      state.min = Math.min(a, b);
      state.max = Math.max(a, b);
      state.page = 1;
      render();
    }
    $('priceMinInput').addEventListener('change', onPriceInput);
    $('priceMaxInput').addEventListener('change', onPriceInput);

    refresh(false);
  }

  // ---------- Khởi tạo ----------
  state = defaultState();
  bind();
  refresh();
})();