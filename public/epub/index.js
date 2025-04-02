document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
document.removeEventListener('keydown', (e) => e.preventDefault());
document.removeEventListener('keyup', (e) => e.preventDefault());