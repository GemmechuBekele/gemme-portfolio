/**
 * Template Name: Craftivo
 * Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
 * Updated: Oct 04 2025 with Bootstrap v5.3.8
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  // let scrollTop = document.querySelector('.scroll-top');

  // function toggleScrollTop() {
  //   if (scrollTop) {
  //     window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  //   }
  // }
  // scrollTop.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // });

  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        },
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false,
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim(),
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

//

/* ==================================================
   TESTIMONIAL SWIPER
================================================== */

const testimonialSwiper = new Swiper(".testimonials-swiper", {
  // Infinite loop
  loop: true,

  // Sliding animation speed
  speed: 600,

  // Space between cards
  spaceBetween: 20,

  // Automatically move to the next testimonial
  autoplay: {
    delay: 5000,

    // Continue autoplay after user manually swipes
    disableOnInteraction: false,
  },

  // Pagination dots
  pagination: {
    el: ".testimonials-swiper .swiper-pagination",

    clickable: true,
  },

  // Responsive number of cards
  breakpoints: {
    /* ------------------------------------------
           Mobile
           320px and above
        ------------------------------------------ */

    320: {
      slidesPerView: 1,

      spaceBetween: 20,
    },

    /* ------------------------------------------
           Tablet
           768px and above
        ------------------------------------------ */

    768: {
      slidesPerView: 2,

      spaceBetween: 20,
    },

    /* ------------------------------------------
           Desktop
           1200px and above
        ------------------------------------------ */

    1200: {
      slidesPerView: 3,

      spaceBetween: 20,
    },
  },
});

/* ==================================================
   BACK TO TOP BUTTON
================================================== */

// Get the Back to Top button
const backToTop = document.getElementById("scroll-top");

// Check scrolling
window.addEventListener("scroll", function () {
  // If user scrolls more than 300px
  if (window.scrollY > 300) {
    // Show button
    backToTop.classList.add("show");
  } else {
    // Hide button
    backToTop.classList.remove("show");
  }
});

/* ==================================================
   BACK TO TOP BUTTON CLICK
================================================== */

backToTop.addEventListener("click", function () {
  // Scroll smoothly to the top
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/* ==================================================
   START A PROJECT BUTTON
================================================== */

// Get Start a Project button
const startProjectButton = document.querySelector(".start-project-btn");

if (startProjectButton) {
  startProjectButton.addEventListener("click", function (event) {
    // Prevent default #contact behavior
    event.preventDefault();

    // Find Contact section
    const contactSection = document.querySelector("#contact");

    // If Contact section exists
    if (contactSection) {
      // Scroll smoothly to Contact
      contactSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}

//
//
/* ==================================================
   THEME & ACCENT COLOR SWITCHER
================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const html = document.documentElement;

  const themeToggle = document.getElementById("theme-toggle");

  const accentButtons = document.querySelectorAll(".accent-color-btn");

  /* -----------------------------------------------
     Default values
  ------------------------------------------------ */

  const defaultTheme = "dark";
  const defaultAccent = "#ff4d4f";

  /* -----------------------------------------------
     Apply accent color
  ------------------------------------------------ */

  function setAccentColor(color) {
    html.style.setProperty("--accent-color", color);

    html.style.setProperty("--nav-hover-color", color);

    html.style.setProperty("--nav-dropdown-hover-color", color);

    accentButtons.forEach(function (button) {
      const buttonColor = button.getAttribute("data-accent");

      if (buttonColor && buttonColor.toLowerCase() === color.toLowerCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    localStorage.setItem("portfolio-accent-color", color);
  }

  /* -----------------------------------------------
     Apply theme
  ------------------------------------------------ */

  function setTheme(theme) {
    if (theme === "light") {
      html.classList.add("light-mode");

      localStorage.setItem("portfolio-theme", "light");
    } else {
      html.classList.remove("light-mode");

      localStorage.setItem("portfolio-theme", "dark");
    }
  }

  /* -----------------------------------------------
     Load saved settings
  ------------------------------------------------ */

  const savedTheme = localStorage.getItem("portfolio-theme") || defaultTheme;

  const savedAccent =
    localStorage.getItem("portfolio-accent-color") || defaultAccent;

  setTheme(savedTheme);

  setAccentColor(savedAccent);

  /* -----------------------------------------------
     Dark / Light button
  ------------------------------------------------ */

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isLight = html.classList.contains("light-mode");

      if (isLight) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
  }

  /* -----------------------------------------------
     Accent color buttons
  ------------------------------------------------ */

  accentButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedColor = this.getAttribute("data-accent");

      if (selectedColor) {
        setAccentColor(selectedColor);
      }
    });
  });
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const loading = contactForm.querySelector(".loading");
  const errorMessage = contactForm.querySelector(".error-message");
  const sentMessage = contactForm.querySelector(".sent-message");

  loading.style.display = "block";
  errorMessage.style.display = "none";
  sentMessage.style.display = "none";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      sentMessage.textContent = "Your message has been sent. Thank you!";
      sentMessage.style.display = "block";

      contactForm.reset();
    } else {
      errorMessage.textContent =
        result.message || "Unable to send your message.";
      errorMessage.style.display = "block";
    }
  } catch (error) {
    console.error("Contact form error:", error);

    errorMessage.textContent =
      "Unable to connect to the server. Please try again later.";
    errorMessage.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
});