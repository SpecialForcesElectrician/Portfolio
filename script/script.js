// Global Variables
let currentSlide = 0
let heroInterval
const bootstrap = window.bootstrap
let currentTestimonialIndex = 0
const testimonialAnimationPaused = false

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeroCarousel()
  initSmoothScrolling()
  animateOnScroll()

  initMobileNavbar()

  initTestimonialCarousel()

  const newsletterButton = document.querySelector(".newsletter .btn-warning")
  if (newsletterButton) {
    newsletterButton.addEventListener("click", subscribeNewsletter)
  }
})

function initMobileNavbar() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .dropdown-item")
  const navbarCollapse = document.querySelector(".navbar-collapse")
  const navbarToggler = document.querySelector(".navbar-toggler")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Si es un enlace interno (comienza con #), hacer scroll suave
      if (link.getAttribute("href") && link.getAttribute("href").startsWith("#")) {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Cerrar el navbar primero
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            try {
              const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
              bsCollapse.hide()
            } catch (error) {
              navbarCollapse.classList.remove("show")
            }
          }

          // Hacer scroll después de un pequeño delay
          setTimeout(() => {
            const offsetTop = targetElement.offsetTop - 80
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            })
          }, 300)
        }
      } else {
        // Para enlaces externos, cerrar navbar y navegar
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          try {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
            bsCollapse.hide()
          } catch (error) {
            navbarCollapse.classList.remove("show")
          }
        }
      }
    })
  })
}

// Hero Carousel Functions
function initHeroCarousel() {
  heroInterval = setInterval(nextSlide, 5000)

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

  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("btn-warning")
  indicators[currentSlide].classList.add("btn-outline-warning")

  currentSlide = (currentSlide + 1) % slides.length

  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.remove("btn-outline-warning")
  indicators[currentSlide].classList.add("btn-warning")
}

function previousSlide() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")

  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("btn-warning")
  indicators[currentSlide].classList.add("btn-outline-warning")

  currentSlide = (currentSlide - 1 + slides.length) % slides.length

  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.remove("btn-outline-warning")
  indicators[currentSlide].classList.add("btn-warning")
}

function goToSlide(slideIndex) {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".indicator")

  slides[currentSlide].classList.remove("active")
  indicators[currentSlide].classList.remove("btn-warning")
  indicators[currentSlide].classList.add("btn-outline-warning")

  currentSlide = slideIndex

  slides[currentSlide].classList.add("active")
  indicators[currentSlide].classList.remove("btn-outline-warning")
  indicators[currentSlide].classList.add("btn-warning")
}

function initTestimonialCarousel() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  const testimonials = document.querySelectorAll(".testimonial-grid-card")

  if (!wrapper || testimonials.length === 0) return

  // Duplicar testimonios para loop infinito
  testimonials.forEach((testimonial) => {
    const clone = testimonial.cloneNode(true)
    wrapper.appendChild(clone)
  })

  // Agregar event listeners para pausar/reanudar animación
  const allTestimonials = wrapper.querySelectorAll(".testimonial-grid-card")

  allTestimonials.forEach((testimonial) => {
    testimonial.addEventListener("mouseenter", () => {
      wrapper.style.animationPlayState = "paused"
    })

    testimonial.addEventListener("mouseleave", () => {
      wrapper.style.animationPlayState = "running"
    })

    testimonial.addEventListener("click", () => {
      if (wrapper.style.animationPlayState === "paused") {
        wrapper.style.animationPlayState = "running"
      } else {
        wrapper.style.animationPlayState = "paused"
      }
    })
  })
}

// Mantener funciones de navegación manual para compatibilidad
function nextTestimonial() {
  const testimonials = document.querySelectorAll(".testimonial-grid-card")
  const wrapper = document.querySelector(".testimonials-wrapper")
  if (!wrapper || testimonials.length === 0) return

  let testimonialsInView = 3
  if (window.innerWidth <= 992 && window.innerWidth > 768) {
    testimonialsInView = 2
  } else if (window.innerWidth <= 768) {
    testimonialsInView = 1
  }

  const maxIndex = Math.floor(testimonials.length / 2) - testimonialsInView

  if (currentTestimonialIndex < maxIndex) {
    currentTestimonialIndex++
    updateTestimonialCarousel()
  }
}

function prevTestimonial() {
  if (currentTestimonialIndex > 0) {
    currentTestimonialIndex--
    updateTestimonialCarousel()
  }
}

function updateTestimonialCarousel() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  const testimonials = document.querySelectorAll(".testimonial-grid-card")
  if (!wrapper || testimonials.length === 0) return

  let testimonialsInView = 3
  if (window.innerWidth <= 992 && window.innerWidth > 768) {
    testimonialsInView = 2
  } else if (window.innerWidth <= 768) {
    testimonialsInView = 1
  }

  const testimonialWidth = testimonials[0].offsetWidth + Number.parseFloat(getComputedStyle(wrapper).gap)
  const maxIndex = Math.floor(testimonials.length / 2) - testimonialsInView

  if (currentTestimonialIndex > maxIndex) {
    currentTestimonialIndex = maxIndex
  }
  if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = 0
  }

  // Pausar animación durante navegación manual
  wrapper.style.animationPlayState = "paused"
  wrapper.style.transform = `translateX(-${currentTestimonialIndex * testimonialWidth}px)`

  // Reanudar animación después de 3 segundos
  setTimeout(() => {
    wrapper.style.animationPlayState = "running"
  }, 3000)

  const prevBtn = document.querySelector(".testimonial-nav-btn.prev-btn")
  const nextBtn = document.querySelector(".testimonial-nav-btn.next-btn")

  if (prevBtn) prevBtn.disabled = currentTestimonialIndex === 0
  if (nextBtn) nextBtn.disabled = currentTestimonialIndex >= maxIndex
}

window.addEventListener("resize", updateTestimonialCarousel)

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

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message"),
    acceptTerms: formData.get("acceptTerms"),
  }

  if (!data.acceptTerms) {
    alert("Debe aceptar los términos y condiciones")
    return
  }

  const submitButton = form.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
  submitButton.disabled = true

  setTimeout(() => {
    alert("Cotización enviada correctamente. Nos pondremos en contacto contigo pronto.")
    form.reset()
    submitButton.innerHTML = originalText
    submitButton.disabled = false
  }, 2000)

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
        const offsetTop = targetElement.offsetTop - 80

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

  alert("¡Gracias por suscribirte a nuestro newsletter!")
  emailInput.value = ""
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
