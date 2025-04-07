// window.addEventListener('DOMContentLoaded', () => {
//     const picture = document.querySelector('.slider-track picture');
//     const logos = picture.children;

//     // Clone each logo and append to the same <picture>
//     for (let i = 0; i < logos.length; i++) {
//         const clone = logos[i].cloneNode(true);
//         picture.appendChild(clone);
//     }
// });

const carousel = document.getElementById("testimonial-carousel");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentIndex);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % indicators.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
  updateCarousel();
});

// Drag support
let startX = 0;
let isDragging = false;

carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
});

carousel.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  const endX = e.pageX;
  const diff = startX - endX;
  if (diff > 50) nextBtn.click();
  else if (diff < -50) prevBtn.click();
  isDragging = false;
});

carousel.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (diff > 50) nextBtn.click();
  else if (diff < -50) prevBtn.click();
});
