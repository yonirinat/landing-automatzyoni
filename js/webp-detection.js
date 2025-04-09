function checkWebpSupport() {
  const webpSupport = document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp');
  if (webpSupport) {
    document.documentElement.classList.add('webp');
  } else {
    document.documentElement.classList.add('no-webp');
    document.querySelectorAll('img[src$=".webp"]').forEach(img => {
      img.src = img.src.replace('.webp', '.jpg');
    });
  }
}
checkWebpSupport();
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('js-enabled');
  setTimeout(() => {
    document.querySelectorAll('img').forEach(img => {
      img.classList.add('loaded');
    });
  }, 1000);
});
