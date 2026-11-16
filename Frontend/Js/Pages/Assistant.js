(function () {
  'use strict';

  if (window.lucide) lucide.createIcons();

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const thread = $('#thread');
  const chatForm = $('#chatForm');
  const chatInput = $('#chatInput');
  const cartCount = $('#cartCount');
  const toastEl = $('#toast');

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ---------- Cart ---------- */
  let cart = parseInt(cartCount.textContent, 10) || 0;
  function addToCart(name) {
    cart += 1;
    cartCount.textContent = cart;
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 200);
    toast(name + ' added to cart');
  }
  $$('.add-cart').forEach(btn =>
    btn.addEventListener('click', () => addToCart(btn.dataset.name))
  );
  $$('.view-product').forEach(btn =>
    btn.addEventListener('click', () => toast('Opening ' + btn.dataset.name + '…'))
  );

  /* ---------- Wishlist ---------- */
  $('#wishBtn').addEventListener('click', e => {
    const b = e.currentTarget;
    b.classList.toggle('liked');
    toast(b.classList.contains('liked') ? 'Saved to wishlist' : 'Removed from wishlist');
  });

  /* ---------- ⌘K / Ctrl+K focuses search ---------- */
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      $('#siteSearch').focus();
    }
  });

  /* ---------- Chat ---------- */
  const AI_ICON =
    '<i class="ico" data-lucide="sparkles" style="width:16px;height:16px"></i>';

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function addUserMsg(text) {
    const el = document.createElement('div');
    el.className = 'msg msg-user';
    el.innerHTML =
      '<div class="bubble"><div class="label">YOU</div><p>' + escapeHtml(text) + '</p></div>';
    thread.appendChild(el);
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function addAiMsg(html, delay = 900) {
    const el = document.createElement('div');
    el.className = 'msg msg-ai';
    el.innerHTML =
      '<div class="avatar">' + AI_ICON + '</div>' +
      '<div class="bubble"><div class="label grey">TECHZONE AI</div>' +
      '<p><span class="typing"><i></i><i></i><i></i></span></p></div>';
    thread.appendChild(el);
    if (window.lucide) lucide.createIcons();
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      $('p', el).innerHTML = html;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, delay);
  }

  const replies = [
    [/camera/i,
      'The iPhone 16 Pro has a 48MP main camera, an ultra-wide and a 5× telephoto. The Galaxy S25 is strong too, but its zoom is less versatile. For travel and everyday photos, the iPhone is the more consistent pick.'],
    [/256|storage/i,
      'With cloud storage, 256GB is comfortable for apps, Figma files and a working Lightroom catalog. If you often keep large RAW libraries locally, consider 512GB or an external SSD (~$80–$110).'],
    [/light|weight/i,
      'The MacBook Air 13" at 1.24 kg is the lightest on your shortlist. The Zenbook 14 is only slightly heavier at 1.28 kg, so the difference is small in daily carry.'],
    [/budget|cheap|save|price/i,
      'To save money, the Zenbook 14 OLED ($999) leaves $200 under your laptop budget. Galaxy S25 ($799) would save another $200 on the phone, but you would lose Apple continuity.'],
    [/battery/i,
      'The MacBook Air M4 is known for very long battery life in everyday use. The Zenbook is good too, but OLED at high brightness can drain faster. Both should last a full workday.']
  ];

  function reply(text) {
    const hit = replies.find(r => r[0].test(text));
    return hit
      ? hit[1]
      : 'Good question. Based on your budget, Apple setup and daily carry, I would still start with the MacBook Air 13" and iPhone 16 Pro. Tell me what to refine and I will adjust the shortlist.';
  }

  function send(text) {
    text = text.trim();
    if (!text) return;
    addUserMsg(text);
    addAiMsg(escapeHtml(reply(text)));
  }

  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    send(chatInput.value);
    chatInput.value = '';
  });

  $$('.followups .option').forEach(b =>
    b.addEventListener('click', () => send(b.dataset.q))
  );

  /* Topic chips toggle */
  $$('.topics .option').forEach(b =>
    b.addEventListener('click', () => {
      b.classList.toggle('option-active');
      b.classList.toggle('option-plain');
    })
  );

  /* Floating assistant */
  $('#fab').addEventListener('click', () => {
    chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => chatInput.focus(), 400);
  });

  /* ---------- Sidebar conversations ---------- */
  const convos = $$('.convo');
  convos.forEach(c =>
    c.addEventListener('click', () => {
      if (c.classList.contains('active')) return;
      convos.forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      toast('Switched conversation (demo)');
    })
  );

  $('#newChat').addEventListener('click', () => {
    const extra = $$('.msg', thread).slice(4); // keep the 4 seed messages
    extra.forEach(m => m.remove());
    chatInput.focus();
    toast('Started a new conversation (demo)');
  });
})();
