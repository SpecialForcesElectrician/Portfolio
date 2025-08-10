// Global Variables
let currentSlide = 0
let heroInterval
const bootstrap = window.bootstrap // Declare the bootstrap variable

let currentTestimonialIndex = 0 // Para el carrusel de testimonios

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize hero carousel
  initHeroCarousel()

  // Initialize smooth scrolling for navigation links
  initSmoothScrolling()

  // Initialize animations when DOM is loaded
  animateOnScroll()

  // Add newsletter subscription to button
  const newsletterButton = document.querySelector(".newsletter .btn-warning")
  if (newsletterButton) {
    newsletterButton.addEventListener("click", subscribeNewsletter)
  }

  // Mobile menu close on link click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        try {
          const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
          bsCollapse.hide()
        } catch (error) {
          navbarCollapse.classList.remove("show")
        }
      }
    })
  })

  // Inicializar el carrusel de testimonios
  updateTestimonialCarousel()
})

// Hero Carousel Functions
function initHeroCarousel() {
  // Start automatic slideshow
  heroInterval = setInterval(nextSlide, 5000)

  // Pause on hover
  const heroSection = document.querySelector(".hero-section")
  heroSection.addEventListener("mouseenter", () => {
    clearInterval(heroInterval)
  })

  heroSection.addEventListener("mouseleave", () => {
    heroInterval = setInterval(nextSlide, 5000)
  })
}

function nextSlide() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")

  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("btn-warning")
  indicators[currentSlide].classList.add("btn-outline-warning")

  // Move to next slide
  currentSlide = (currentSlide + 1) % slides.length

  // Add active class to new slide and indicator
  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.remove("btn-outline-warning")
  indicators[currentSlide].classList.add("btn-warning")
}

function previousSlide() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")

  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("btn-warning")
  indicators[currentSlide].classList.add("btn-outline-warning")

  // Move to previous slide
  currentSlide = (currentSlide - 1 + slides.length) % slides.length

  // Add active class to new slide and indicator
  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.remove("btn-outline-warning")
  indicators[currentSlide].classList.add("btn-warning")
}

function goToSlide(slideIndex) {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")

  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("btn-warning")
  indicators[currentSlide].classList.add("btn-outline-warning")

  // Set new current slide
  currentSlide = slideIndex

  // Add active class to new slide and indicator
  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.remove("btn-outline-warning")
  indicators[currentSlide].classList.add("btn-warning")
}

// Testimonial Carousel Functions
function updateTestimonialCarousel() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  const testimonials = document.querySelectorAll(".testimonial-grid-card")
  if (!wrapper || testimonials.length === 0) return

  // Calculate how many testimonials fit in view based on current screen size
  let testimonialsInView = 3; // Default for desktop
  if (window.innerWidth <= 992 && window.innerWidth > 768) {
    testimonialsInView = 2; // For tablets
  } else if (window.innerWidth <= 768) {
    testimonialsInView = 1; // For mobile
  }

  const testimonialWidth = testimonials[0].offsetWidth + parseFloat(getComputedStyle(wrapper).gap);
  const maxIndex = testimonials.length - testimonialsInView;

  // Ensure currentTestimonialIndex doesn't exceed maxIndex
  if (currentTestimonialIndex > maxIndex) {
    currentTestimonialIndex = maxIndex;
  }
  if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = 0;
  }

  wrapper.style.transform = `translateX(-${currentTestimonialIndex * testimonialWidth}px)`;

  // Enable/disable buttons
  document.querySelector('.testimonial-nav-btn.prev-btn').disabled = currentTestimonialIndex === 0;
  document.querySelector('.testimonial-nav-btn.next-btn').disabled = currentTestimonialIndex >= maxIndex;
}

function nextTestimonial() {
  const testimonials = document.querySelectorAll(".testimonial-grid-card")
  const wrapper = document.querySelector(".testimonials-wrapper")
  if (!wrapper || testimonials.length === 0) return;

  let testimonialsInView = 3;
  if (window.innerWidth <= 992 && window.innerWidth > 768) {
    testimonialsInView = 2;
  } else if (window.innerWidth <= 768) {
    testimonialsInView = 1;
  }

  const maxIndex = testimonials.length - testimonialsInView;

  if (currentTestimonialIndex < maxIndex) {
    currentTestimonialIndex++;
    updateTestimonialCarousel();
  }
}

function prevTestimonial() {
  if (currentTestimonialIndex > 0) {
    currentTestimonialIndex--;
    updateTestimonialCarousel();
  }
}

// Recalcular el carrusel de testimonios al redimensionar la ventana
window.addEventListener('resize', updateTestimonialCarousel);


// Contact Functions
function openWhatsApp() {
  const phoneNumber = "+573173945568"
  const message = "Hola, me interesa obtener una cotización para un proyecto eléctrico."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+573173945568"
}

function sendEmail() {
  window.location.href = "mailto:specialforceselectriciansas@gmail.com?subject=Consulta sobre servicios eléctricos"
}

function scrollToContact() {
  document.getElementById("contacto").scrollIntoView({ behavior: "smooth" })
}

// Form Functions
function submitForm(event) {
  event.preventDefault()

  const form = event.target
  const formData = new FormData(form)

  // Get form data
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message"),
    acceptTerms: formData.get("acceptTerms"),
  }

  // Validate form
  if (!data.acceptTerms) {
    alert("Debe aceptar los términos y condiciones")
    return
  }

  // Simulate form submission
  const submitButton = form.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Cotización enviada correctamente. Nos pondremos en contacto contigo pronto.")
    form.reset()
    submitButton.innerHTML = originalText
    submitButton.disabled = false
  }, 2000)

  // In a real implementation, you would send this data to your server
  console.log("Form data:", data)
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
  } else {
    navbar.style.backgroundColor = ""
  }
})

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".service-card, .project-card, .certification-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Newsletter subscription
function subscribeNewsletter() {
  const emailInput = document.querySelector('.newsletter input[type="email"]')
  const email = emailInput.value

  if (!email) {
    alert("Por favor ingrese su email")
    return
  }

  if (!isValidEmail(email)) {
    alert("Por favor ingrese un email válido")
    return
  }

  // Simulate subscription
  alert("¡Gracias por suscribirte a nuestro newsletter!")
  emailInput.value = ""
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}