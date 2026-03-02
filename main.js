document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
    }
    
    // Close mobile menu after clicking a link
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('mobileMenuToggle');
    if (window.innerWidth <= 768 && nav.classList.contains('active')) {
      nav.classList.remove('active');
      toggle.classList.remove('active');
    }
  });
});
    
// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (window.innerWidth <= 768) {
    const isClickInsideNav = mainNav.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    mainNav.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  }
});



const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};



const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
  ".category-card, .work-card, .author-card, .blog-card",
);

elementsToAnimate.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease-out";
  observer.observe(el);
});

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const step = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString("vi-VN");
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString("vi-VN") + "+";
    }
  };

  updateCounter();
}

const statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".counter");
        counters.forEach((counter) => {
          animateCounter(counter);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function setActiveNavLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);

let lastScroll = 0;
const header = document.querySelector("header");
const SCROLL_THRESHOLD = 224; // Chỉ ẩn sau khi cuộn xuống ít nhất 80px

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Cuộn xuống → ẩn header (chỉ khi đã cuộn quá ngưỡng)
  if (currentScroll > lastScroll && currentScroll > SCROLL_THRESHOLD) {
    header.classList.add("header-hidden");
  }
  // Cuộn lên → hiện header
  else if (currentScroll < lastScroll) {
    header.classList.remove("header-hidden");
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.2)";
  }

  lastScroll = currentScroll;
});

const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach((card) => {
  card.addEventListener("click", function () {
    const category = this.querySelector("h3").textContent;
    console.log("Category clicked:", category);
  });
});

const authorCards = document.querySelectorAll(".author-card");
authorCards.forEach((card) => {
  card.addEventListener("click", function () {
    const author = this.querySelector("h3").textContent;
    console.log("Author clicked:", author);
  });
});

const readMoreButtons = document.querySelectorAll(".read-more");
readMoreButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    
    console.log("Read more clicked for:", workTitle);
  });
}); 

function createMobileMenu() {
  if (window.innerWidth <= 768) {
    console.log("Mobile view detected");
  }
}

window.addEventListener("resize", createMobileMenu);
window.addEventListener("load", createMobileMenu);

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  console.log("Website loaded successfully!");
});

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      }
    });
  });

  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => imageObserver.observe(img));
}

const footerLinks = document.querySelectorAll('footer a[href="#"]');
footerLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const linkText = this.textContent;
    console.log("Footer link clicked:", linkText);
  });
});

function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  return isValid;
}

function createScrollToTopButton() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transition: all 0.3s;
        z-index: 999;
    `;

  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.transform = "scale(1.1)";
  });

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.transform = "scale(1)";
  });
}

createScrollToTopButton();

window.addEventListener("load", () => {
  const loadTime =
    window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;
  console.log(`Website loaded in ${loadTime}ms`);
});

window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error);
});

