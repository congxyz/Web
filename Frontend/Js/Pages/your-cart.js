function updateCartCount() {
  // Đếm số sản phẩm trong giỏ (ví dụ: đếm các phần tử .cart-item)
  const items = document.querySelectorAll('.cart-item');
  const count = items.length;
  // Cập nhật số vào thẻ <span id="cart-count">
  document.getElementById('cart-count').textContent = count;
}


// Ví dụ: chuyển sang bước Thanh toán
const steps = document.querySelectorAll('.stepper__step');
steps[0].classList.remove('active');
steps[0].classList.add('done');      // bước 1 hoàn thành
steps[1].classList.add('active');    // bước 2 đang thực hiện