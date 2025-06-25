// Fungsi untuk memuat file HTML eksternal ke dalam elemen dengan id tertentu
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (id === 'navbar') initNavbarEvents(); // jalankan toggle navbar setelah navbar dimuat
      if (id === 'register') initFormEvents(); // jalankan form setelah register dimuat
    })
    .catch(error => {
      console.error(error);
      document.getElementById(id).innerHTML = `<div class="text-red-500 text-center py-4">Gagal memuat ${file}</div>`;
    });
}

// Fungsi untuk inisialisasi toggle navbar
function initNavbarEvents() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Fungsi untuk handle form
function initFormEvents() {
  const registrationForm = document.getElementById('registration-form');
  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        university: document.getElementById('university').value,
        faculty: document.getElementById('faculty').value
      };

      alert('Pendaftaran berhasil! Kami akan menghubungi Anda melalui email.');
      registrationForm.reset();
    });
  }
}

// Muat semua bagian HTML
window.addEventListener('DOMContentLoaded', () => {
  loadHTML('navbar', 'partials/navbar.html');
  loadHTML('hero', 'partials/hero.html');
  loadHTML('about', 'partials/about.html');
  loadHTML('events', 'partials/events.html');
  loadHTML('speakers', 'partials/speakers.html');
  loadHTML('register', 'partials/register.html');
  loadHTML('footer', 'partials/footer.html');
});

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  if (cursor && follower) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }, 50);
  }
});
