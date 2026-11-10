/* CTTSHOP – Trang Điện thoại: dữ liệu sản phẩm, bộ lọc, sắp xếp, phân trang.
 *
 * Giá:
 *  - listPrice : giá niêm yết của hãng (VND) cho phiên bản bộ nhớ đầu tiên trong `storages`.
 *  - salePrice : giá bán tại thegioididong.com (nếu có và thấp hơn giá niêm yết đáng kể).
 * Ảnh: lấy từ trang chính thức của hãng, lưu trong Frontend/Images/.
 */
(function () {
  'use strict';

  var PAGE_SIZE = 6;
  var MIN_SAVING = 100000; // chênh lệch nhỏ hơn mức này được coi là không giảm giá

  var STORAGE_OPTIONS = ['256GB', '512GB', '1TB', '2TB'];

  var PRODUCTS = [
    // ---------- Apple ----------
    {
      name: 'iPhone 17', brand: 'Apple', os: 'iOS', tag: 'Phổ biến', storages: ['256GB', '512GB'],
      spec: '256GB · Tím oải hương · 6,3"', rating: 4.9, reviews: 67593, stock: 10,
      listPrice: 28999000, salePrice: 28490000, img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTz6thItN8Ye_Yx3m1eu01q6X8wyFKPqLMtbB4-fPB4FAxj8nUIZ1hQq8kkITpo9hxlB-IGbDOpSgUs4mXZ8qfh9iPW9AWXk8eDfLXjFv1bywN8uyL9RJ8l-hjoKOvembETE5zsCV8&usqp=CAc'
    },
    {
      name: 'iPhone 17 Pro', brand: 'Apple', os: 'iOS', tag: 'Camera Pro', storages: ['256GB', '512GB', '1TB'],
      spec: '256GB · Cam vũ trụ · 6,3"', rating: 4.9, reviews: 38653, stock: 5,
      listPrice: 34999000, salePrice: 31990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-256-gb.png'
    },
    {
      name: 'iPhone 17 Pro Max', brand: 'Apple', os: 'iOS', tag: 'Màn hình lớn', storages: ['256GB', '512GB', '1TB', '2TB'],
      spec: '256GB · Cam vũ trụ · 6,9"', rating: 4.9, reviews: 416959, stock: 3,
      listPrice: 37999000, salePrice: 34990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg'
    },
    {
      name: 'iPhone Air', brand: 'Apple', os: 'iOS', tag: 'Siêu mỏng', storages: ['256GB', '512GB', '1TB'],
      spec: '256GB · Trắng mây · 6,5"', rating: 4.9, reviews: 13891, stock: 8,
      listPrice: 34999000, salePrice: 22990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_air-3_2.jpg'
    },
    {
      name: 'iPhone 18 Pro', brand: 'Apple', os: 'iOS', tag: 'Mới', storages: ['256GB', '512GB', '1TB', '2TB'],
      spec: '256GB · Băng thanh · 6,3"', rating: 4.9, reviews: 7341, stock: 5,
      listPrice: 38999000, salePrice: 38990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-01.jpg'
    },
    {
      name: 'iPhone 18 Pro Max', brand: 'Apple', os: 'iOS', tag: 'Mới', storages: ['256GB', '512GB', '1TB', '2TB'],
      spec: '256GB · Băng thanh · 6,9"', rating: 5, reviews: 90635, stock: 2,
      listPrice: 41999000, salePrice: 41990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-18-pro-max-01.jpg'
    },
    {
      name: 'iPhone Duo', brand: 'Apple', os: 'iOS', tag: 'Màn hình gập', storages: ['256GB', '512GB', '1TB', '2TB'],
      spec: '256GB · Trắng sao · Gập', rating: null, reviews: 0, stock: 1,
      listPrice: 64999000, salePrice: 64990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-duo-01.jpg'
    },

    // ---------- Samsung ----------
    {
      name: 'Samsung Galaxy S26', brand: 'Samsung', os: 'Android', tag: 'Galaxy AI', storages: ['256GB', '512GB'],
      spec: '12GB/256GB · Tím cobalt', rating: 4.9, reviews: 4556, stock: 15,
      listPrice: 29990000, salePrice: 20500000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s26-1.jpg'
    },
    {
      name: 'Samsung Galaxy S26+', brand: 'Samsung', os: 'Android', tag: 'Galaxy AI', storages: ['256GB', '512GB'],
      spec: '12GB/256GB · Tím cobalt', rating: 5, reviews: 5140, stock: 10,
      listPrice: 33990000, salePrice: 24200000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s26-plus.jpg'
    },
    {
      name: 'Samsung Galaxy S26 Ultra', brand: 'Samsung', os: 'Android', tag: 'Camera Pro', storages: ['256GB', '512GB', '1TB'],
      spec: '12GB/256GB · Tím cobalt', rating: 4.9, reviews: 27397, stock: 8,
      listPrice: 40990000, salePrice: 30600000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s26-ultra-1.jpg'
    },

    // ---------- Xiaomi ----------
    {
      name: 'Xiaomi 17', brand: 'Xiaomi', os: 'Android', tag: 'Leica', storages: ['256GB', '512GB'],
      spec: '12GB/256GB · Xanh lá', rating: 4.9, reviews: 5320, stock: 12,
      listPrice: 26990000, salePrice: 18950000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-17-5g.jpg'
    },
    {
      name: 'Xiaomi 17 Ultra', brand: 'Xiaomi', os: 'Android', tag: 'Camera Leica', storages: ['512GB', '1TB'],
      spec: '16GB/512GB · Xanh lá', rating: 4.9, reviews: 1567, stock: 6,
      listPrice: 39990000, salePrice: 29890000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-17-ultra-den.jpg'
    },

    // ---------- OPPO ----------
    {
      name: 'OPPO Find X9', brand: 'OPPO', os: 'Android', tag: 'Hasselblad', storages: ['256GB', '512GB'],
      spec: '12GB/256GB · Xám titan', rating: null, reviews: 0, stock: 10,
      listPrice: 22990000, salePrice: null, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/9/x9-1_1.jpg'
    },
    {
      name: 'OPPO Find X9 Pro', brand: 'OPPO', os: 'Android', tag: 'Tele 200MP', storages: ['512GB'],
      spec: '16GB/512GB · Trắng lụa', rating: null, reviews: 0, stock: 5,
      listPrice: 32990000, salePrice: null, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo_find_x9_pro_16gb_512gb-1.jpg'
    },
    {
      name: 'OPPO Find X9s', brand: 'OPPO', os: 'Android', tag: 'Hasselblad', storages: ['256GB', '512GB'],
      spec: '12GB/256GB · Cam nhạt', rating: 5, reviews: 9942, stock: 8,
      listPrice: 24990000, salePrice: 24990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-find-x9s-25.jpg'
    },
    {
      name: 'OPPO Find X9 Ultra', brand: 'OPPO', os: 'Android', tag: 'Siêu phẩm camera', storages: ['512GB'],
      spec: '12GB/512GB · Nâu nhạt', rating: 5, reviews: 387, stock: 3,
      listPrice: 49990000, salePrice: 49990000, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-find-x9-ultra-cam-8.jpg'
    },

    // ---------- vivo ----------
    {
      name: 'vivo X300', brand: 'vivo', os: 'Android', tag: 'ZEISS', storages: ['256GB', '512GB'],
      spec: '12GB/256GB · Hồng phấn', rating: 4.9, reviews: 2141, stock: 10,
      listPrice: 23990000, salePrice: 23990000, img: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/i/dien-thoai-vivo-x300-12gb-256gb-cu-dep.jpg'
    },
    {
      name: 'vivo X300 Pro', brand: 'vivo', os: 'Android', tag: 'ZEISS', storages: ['512GB'],
      spec: '16GB/512GB · Nâu sa mạc', rating: 4.9, reviews: 1457, stock: 5,
      listPrice: 34990000, salePrice: 29290000, img: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/i/vivo-x300-pro-16gb-512gb-cu-dep.jpg'
    },
    {
      name: 'vivo X300 Ultra', brand: 'vivo', os: 'Android', tag: 'ZEISS', storages: ['512GB'],
      spec: '16GB/512GB · Xanh lá', rating: 5, reviews: 403, stock: 3,
      listPrice: 49990000, salePrice: 36990000, img: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/i/dien-thoai-vivo-x300-ultra-16gb-512gb-cu-dep-2.jpg'
    }
  ];

  // Chuẩn hoá dữ liệu: giá bán, giá gốc, giảm giá
  PRODUCTS.forEach(function (p, i) {
    p.order = i;
    p.inStock = p.stock > 0;
    var hasSale = p.salePrice && p.listPrice - p.salePrice >= MIN_SAVING;
    p.price = hasSale ? p.salePrice : p.listPrice;
    p.oldPrice = hasSale ? p.listPrice : null;
    p.saving = hasSale ? p.listPrice - p.salePrice : 0;
  });

  // Khoảng giá: thấp nhất và cao nhất trong cửa hàng
  var prices = PRODUCTS.map(function (p) { return p.price; });
  var PRICE_MIN = Math.min.apply(null, prices);
  var PRICE_MAX = Math.max.apply(null, prices);

  var BRANDS = unique(PRODUCTS.map(function (p) { return p.brand; }));
  var OSES = ['iOS', 'Android'];
  var AVAILABILITY = [
    { value: 'instock', label: 'Còn hàng' },
    { value: 'onsale', label: 'Đang giảm giá' }
  ];

  var state;
  function defaultState() {
    return {
      brand: [], storage: [], os: [], availability: [],
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
    if (state.os.length && state.os.indexOf(p.os) < 0) return false;
    if (state.storage.length && !state.storage.some(function (s) { return p.storages.indexOf(s) >= 0; })) return false;
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

    $('filter-storage').innerHTML = STORAGE_OPTIONS.map(function (s) {
      var c = PRODUCTS.filter(function (p) { return p.storages.indexOf(s) >= 0; }).length;
      return checkHtml('storage', s, s, c, state.storage.indexOf(s) >= 0);
    }).join('');

    $('filter-os').innerHTML = OSES.map(function (o) {
      var c = PRODUCTS.filter(function (p) { return p.os === o; }).length;
      return checkHtml('os', o, o, c, state.os.indexOf(o) >= 0);
    }).join('');

    $('filter-availability').innerHTML = AVAILABILITY.map(function (a) {
      var c = PRODUCTS.filter(function (p) { return a.value === 'instock' ? p.inStock : p.saving > 0; }).length;
      return checkHtml('availability', a.value, a.label, c, state.availability.indexOf(a.value) >= 0);
    }).join('');
  }

  function renderPriceControls() {
    var rMin = $('rangeMin'), rMax = $('rangeMax');
    [rMin, rMax].forEach(function (r) {
      r.min = PRICE_MIN; r.max = PRICE_MAX; r.step = 10000;
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
    return '<i datalucide="heart" class="lucide lucide-heart" width="24" height="24" stroke-width="1.5" fill="none" stroke="currentColor"></i>';
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
    var chips = ['<span class="chip chip--static">Tất cả điện thoại</span>'];
    var labels = { availability: function (v) { return AVAILABILITY.filter(function (a) { return a.value === v; })[0].label; } };
    ['brand', 'storage', 'os', 'availability'].forEach(function (g) {
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
      ? 'Hiển thị ' + slice.length + ' trong ' + total + ' điện thoại'
      : 'Không có điện thoại phù hợp';

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
      ? 'Hiển thị ' + (start + 1) + '–' + (start + slice.length) + ' trong ' + total + ' điện thoại'
      : '';

    renderChips();
    renderPriceControls();
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

      var title = t.closest('.filter-group__title');
      if (title && title.tagName === 'BUTTON') {
        title.parentNode.classList.toggle('collapsed');
        return;
      }

      var chip = t.closest('[data-chip-group]');
      if (chip) {
        var g = chip.dataset.chipGroup;
        if (g === 'price') { state.min = PRICE_MIN; state.max = PRICE_MAX; }
        else toggle(state[g], chip.dataset.chipValue);
        refresh();
        return;
      }

      if (t.id === 'clearAll') {
        e.preventDefault();
        var keepSort = state.sort, keepQ = state.q;
        state = defaultState();
        state.availability = [];
        state.sort = keepSort; state.q = keepQ;
        refresh();
        return;
      }

      if (t.id === 'resetAll') {
        e.preventDefault();
        state = defaultState();
        $('sortSelect').value = 'featured';
        $('searchInput').value = '';
        refresh();
        return;
      }

      var page = t.closest('[data-page]');
      if (page && !page.disabled) {
        state.page = parseInt(page.dataset.page, 10);
        render();
        document.querySelector('.products').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      var wish = t.closest('.wish');
      if (wish) { wish.classList.toggle('active'); return; }

      var add = t.closest('[data-add]');
      if (add) {
        var badge = $('cartCount');
        badge.textContent = (parseInt(badge.textContent, 10) || 0) + 1;
        return;
      }
    });

    $('sortSelect').addEventListener('change', function (e) {
      state.sort = e.target.value;
      refresh();
    });

    $('searchInput').addEventListener('input', function (e) {
      state.q = e.target.value.trim().toLowerCase();
      refresh();
    });

    // Thanh trượt giá
    function onRange() {
      var a = parseInt($('rangeMin').value, 10), b = parseInt($('rangeMax').value, 10);
      state.min = Math.min(a, b);
      state.max = Math.max(a, b);
      state.page = 1;
      render();
    }
    $('rangeMin').addEventListener('input', onRange);
    $('rangeMax').addEventListener('input', onRange);

    // Ô nhập giá
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
