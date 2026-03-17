const allImages = document.querySelectorAll('img');
let loadedCount = 0;

allImages.forEach(img => {
  const checkIfLoaded = () => {
    loadedCount++;
    if (loadedCount === allImages.length) {
      document.dispatchEvent(new Event('imagesReady'));
    }
  };

  if (img.complete) {
    loadedCount++;
  } else {
    img.addEventListener('load', checkIfLoaded);
    img.addEventListener('error', checkIfLoaded);
  }
});

// Check immediately if all were already loaded
if (loadedCount === allImages.length) {
  document.dispatchEvent(new Event('imagesReady'));
}