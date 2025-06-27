// masalahnya itu navbar untuk mode dekstop nga muncul:

// Fungsi untuk memuat file HTML eksternal ke dalam elemen dengan id tertentu
function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      if (id === 'cursor') initCursor();
      if (id === 'navbar') initNavbarEvents();
      if (id === 'register') initFormEvents();
    })
    .catch(error => {
      console.error(error);
      document.getElementById(id).innerHTML = `<div class="text-red-500 text-center py-4">Gagal memuat ${file}</div>`;
    });
}

function handleNavbarDisplay() {
  const desktopMenu = document.getElementById('desktop-menu');
  const mobileMenuWrapper = document.getElementById('mobile-menu');
  const windowWidth = window.innerWidth;

  if (desktopMenu) {
    if (windowWidth >= 768) {
      desktopMenu.style.display = 'flex';
      mobileMenuWrapper.classList.add('hidden');
    } else {
      desktopMenu.style.display = 'none';
    }
  }
}

// Panggil saat load dan saat resize
window.addEventListener('resize', handleNavbarDisplay);
window.addEventListener('load', handleNavbarDisplay);


// Fungsi untuk inisialisasi toggle navbar
function initNavbarEvents() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      // Optional: Ganti icon menu saat toggle (contoh ganti ke X)
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Tambahan: Tutup menu ketika salah satu link diklik
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');

        // Kembalikan ikon menu ke semula
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
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
  loadHTML('cursor', 'partials/cursor.html');
  loadHTML('navbar', 'partials/navbar.html');
  loadHTML('hero', 'partials/hero.html');
  loadHTML('about', 'partials/about.html');
  loadHTML('events', 'partials/events.html');
  loadHTML('speakers', 'partials/speakers.html');
  loadHTML('register', 'partials/register.html');
  loadHTML('footer', 'partials/footer.html');
});

// Custom Cursor Logic
// Fungsi untuk inisialisasi custom cursor
function initCursor() {
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
}

