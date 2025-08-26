const sections = document.querySelectorAll('.snap-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 48; // Trừ 48px cho thanh điều hướng -- chắc có thờii gian nên sửa lại thanh nav
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 2) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-blue-600', 'underline');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-blue-600', 'underline');
    }
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

function loadContent(url, iframeId, loadingId, downloadBtnId, element) {
  // Bỏ highlight khỏi tất cả các mục
  const items = document.querySelectorAll('.cursor-pointer');
  items.forEach(item => {
    item.classList.remove('border-blue-500', 'bg-blue-50');
  });

  // Thêm highlight cho mục đang chọn
  element.classList.add('border-blue-500', 'bg-blue-50');

  // Lấy các phần tử cần cập nhật
  const pdfFrame = document.getElementById(iframeId);
  const loading = document.getElementById(loadingId);
  const downloadBtn = document.getElementById(downloadBtnId);

  // Hiển thị hiệu ứng loading
  if (loading) loading.classList.remove('hidden');

  // Ẩn iframe hiện tại và tải tài liệu mới
  if (pdfFrame) {
    pdfFrame.style.opacity = '0';
    pdfFrame.src = url;
  }

  // Cập nhật liên kết tải xuống
  if (downloadBtn) downloadBtn.href = url;
}

// Hàm ẩn hiệu ứng loading khi tài liệu tải xong
function hideLoading(iframeId, loadingId) {
  const iframe = document.getElementById(iframeId);
  const loading = document.getElementById(loadingId);

  // Ẩn hiệu ứng loading
  if (loading) loading.classList.add('hidden');

  // Hiển thị tài liệu
  if (iframe) iframe.style.opacity = '1';
}


