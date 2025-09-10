// Global Variables
let currentSlide = 0
let heroInterval
const bootstrap = window.bootstrap
let currentTestimonialIndex = 0
const testimonialAnimationPaused = false

let touchStartX = 0
let touchEndX = 0
let touchStartY = 0
let touchEndY = 0
let isScrolling = false
let isDragging = false
let startTime = 0
let animationPausedByUser = false

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initHeroCarousel()
  initSmoothScrolling()
  animateOnScroll()
  initMobileNavbar()
  initTestimonialCarousel()
  initTestimonialStats()
  initTestimonialSwipe()

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

// ===================================
// FUNCIONES DE SWIPE PARA TESTIMONIOS
// ===================================

function initTestimonialSwipe() {
  const testimonialsContainer = document.querySelector(".testimonials-carousel-container")
  const wrapper = document.querySelector(".testimonials-wrapper")

  if (!testimonialsContainer || !wrapper) return

  // Event listeners para touch (móvil)
  testimonialsContainer.addEventListener("touchstart", handleTouchStart, { passive: false })
  testimonialsContainer.addEventListener("touchmove", handleTouchMove, { passive: false })
  testimonialsContainer.addEventListener("touchend", handleTouchEnd, { passive: false })

  // Event listeners para mouse (desktop)
  testimonialsContainer.addEventListener("mousedown", handleMouseStart, { passive: false })
  testimonialsContainer.addEventListener("mousemove", handleMouseMove, { passive: false })
  testimonialsContainer.addEventListener("mouseup", handleMouseEnd, { passive: false })
  testimonialsContainer.addEventListener("mouseleave", handleMouseEnd, { passive: false })

  // Prevenir selección de texto
  testimonialsContainer.style.userSelect = "none"
  testimonialsContainer.style.webkitUserSelect = "none"
}

function handleTouchStart(e) {
  const touch = e.touches[0]
  touchStartX = touch.clientX
  touchStartY = touch.clientY
  startTime = Date.now()
  isScrolling = false
  isDragging = false

  pauseAnimation()
}

function handleTouchMove(e) {
  if (!touchStartX || !touchStartY) return

  const touch = e.touches[0]
  const currentX = touch.clientX
  const currentY = touch.clientY

  const diffX = Math.abs(currentX - touchStartX)
  const diffY = Math.abs(currentY - touchStartY)

  // Determinar dirección del swipe
  if (!isScrolling && !isDragging) {
    if (diffX > diffY && diffX > 10) {
      isDragging = true
      isScrolling = false
      e.preventDefault()
      document.body.classList.add("no-select")
    } else if (diffY > diffX && diffY > 10) {
      isScrolling = true
      isDragging = false
    }
  }

  // Si es swipe horizontal, prevenir scroll
  if (isDragging) {
    e.preventDefault()
    e.stopPropagation()
  }
}

function handleTouchEnd(e) {
  if (!touchStartX || isScrolling) {
    resetTouchVariables()
    return
  }

  const touch = e.changedTouches[0]
  touchEndX = touch.clientX
  touchEndY = touch.clientY

  const swipeTime = Date.now() - startTime
  const swipeDistance = touchEndX - touchStartX
  const swipeSpeed = Math.abs(swipeDistance) / swipeTime

  // Detectar swipe válido (distancia mínima o velocidad suficiente)
  if (Math.abs(swipeDistance) > 50 || swipeSpeed > 0.5) {
    handleSwipe(swipeDistance)
  } else {
    // Si no es un swipe válido, reanudar animación después de un momento
    setTimeout(resumeAnimation, 1000)
  }

  resetTouchVariables()
}

function handleMouseStart(e) {
  touchStartX = e.clientX
  touchStartY = e.clientY
  startTime = Date.now()
  isScrolling = false
  isDragging = false

  pauseAnimation()
  e.preventDefault()
}

function handleMouseMove(e) {
  if (!touchStartX) return

  const diffX = Math.abs(e.clientX - touchStartX)
  const diffY = Math.abs(e.clientY - touchStartY)

  if (!isDragging && diffX > 10 && diffX > diffY) {
    isDragging = true
    document.body.classList.add("no-select")
  }

  if (isDragging) {
    e.preventDefault()
  }
}

function handleMouseEnd(e) {
  if (!touchStartX) {
    resetTouchVariables()
    return
  }

  touchEndX = e.clientX
  touchEndY = e.clientY

  const swipeTime = Date.now() - startTime
  const swipeDistance = touchEndX - touchStartX
  const swipeSpeed = Math.abs(swipeDistance) / swipeTime

  if (isDragging && (Math.abs(swipeDistance) > 50 || swipeSpeed > 0.5)) {
    handleSwipe(swipeDistance)
  } else {
    setTimeout(resumeAnimation, 1000)
  }

  resetTouchVariables()
}

function handleSwipe(swipeDistance) {
  const swipeThreshold = 30

  if (Math.abs(swipeDistance) < swipeThreshold) {
    setTimeout(resumeAnimation, 1000)
    return
  }

  if (swipeDistance > 0) {
    // Swipe hacia la derecha - testimonio anterior
    swipeToPrevTestimonial()
  } else {
    // Swipe hacia la izquierda - siguiente testimonio
    swipeToNextTestimonial()
  }
}

function swipeToNextTestimonial() {
  const testimonials = document.querySelectorAll(".testimonial-card")
  const wrapper = document.querySelector(".testimonials-wrapper")

  if (!wrapper || testimonials.length === 0) return

  const originalTestimonials = Math.floor(testimonials.length / 2)
  const testimonialsInView = getTestimonialsInView()

  currentTestimonialIndex++

  // Bucle infinito: si llegamos al final, volver al inicio
  if (currentTestimonialIndex >= originalTestimonials - testimonialsInView + 1) {
    currentTestimonialIndex = 0
  }

  updateTestimonialCarouselWithSwipe()
  showSwipeIndicator("next")
}

function swipeToPrevTestimonial() {
  const testimonials = document.querySelectorAll(".testimonial-card")
  const wrapper = document.querySelector(".testimonials-wrapper")

  if (!wrapper || testimonials.length === 0) return

  const originalTestimonials = Math.floor(testimonials.length / 2)
  const testimonialsInView = getTestimonialsInView()

  currentTestimonialIndex--

  // Bucle infinito: si llegamos al inicio, ir al final
  if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = originalTestimonials - testimonialsInView
  }

  updateTestimonialCarouselWithSwipe()
  showSwipeIndicator("prev")
}

function getTestimonialsInView() {
  if (window.innerWidth <= 576) {
    return 1
  } else if (window.innerWidth <= 768) {
    return 1
  } else if (window.innerWidth <= 992) {
    return 2
  } else {
    return 3
  }
}

function updateTestimonialCarouselWithSwipe() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  const testimonials = document.querySelectorAll(".testimonial-card")

  if (!wrapper || testimonials.length === 0) return

  const testimonialWidth = testimonials[0].offsetWidth + Number.parseFloat(getComputedStyle(wrapper).gap)
  const translateX = -currentTestimonialIndex * testimonialWidth

  // Aplicar transformación suave
  wrapper.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  wrapper.style.transform = `translateX(${translateX}px)`
  wrapper.classList.add("paused")

  // Reanudar animación después de 4 segundos
  setTimeout(() => {
    resumeAnimation()
  }, 4000)
}

function pauseAnimation() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  if (wrapper) {
    wrapper.style.animationPlayState = "paused"
    wrapper.classList.add("paused")
    animationPausedByUser = true
  }
}

function resumeAnimation() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  if (wrapper && !isDragging) {
    wrapper.style.transition = ""
    wrapper.style.animationPlayState = "running"
    wrapper.classList.remove("paused")
    animationPausedByUser = false
  }
}

function showSwipeIndicator(direction) {
  const indicator = document.createElement("div")
  indicator.className = `swipe-indicator swipe-${direction}`

  const iconClass = direction === "next" ? "fas fa-chevron-left" : "fas fa-chevron-right"
  indicator.innerHTML = `<i class="${iconClass}"></i>`

  const container = document.querySelector(".testimonials-carousel-container")
  container.appendChild(indicator)

  // Animar entrada
  requestAnimationFrame(() => {
    indicator.classList.add("show")
  })

  // Animar salida y remover
  setTimeout(() => {
    indicator.classList.remove("show")
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator)
      }
    }, 400)
  }, 1200)
}

function resetTouchVariables() {
  touchStartX = 0
  touchEndX = 0
  touchStartY = 0
  touchEndY = 0
  isScrolling = false
  isDragging = false
  startTime = 0
  document.body.classList.remove("no-select")
}

function initTestimonialCarousel() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  const testimonials = document.querySelectorAll(".testimonial-card")

  if (!wrapper || testimonials.length === 0) return

  // Duplicar testimonios para bucle infinito perfecto
  const originalTestimonials = Array.from(testimonials)
  originalTestimonials.forEach((testimonial) => {
    const clone = testimonial.cloneNode(true)
    wrapper.appendChild(clone)
  })

  // Event listeners mejorados
  const allTestimonials = wrapper.querySelectorAll(".testimonial-card")

  allTestimonials.forEach((testimonial, index) => {
    // Pausar animación al hover
    testimonial.addEventListener("mouseenter", () => {
      if (!animationPausedByUser) {
        pauseAnimation()
      }
      testimonial.classList.add("testimonial-focused")
    })

    testimonial.addEventListener("mouseleave", () => {
      if (!animationPausedByUser && !isDragging) {
        setTimeout(resumeAnimation, 500)
      }
      testimonial.classList.remove("testimonial-focused")
    })

    // Click para expandir
    testimonial.addEventListener("click", (e) => {
      if (!isDragging) {
        expandTestimonial(testimonial, index)
      }
    })

    // Animación de entrada escalonada
    testimonial.style.animationDelay = `${index * 0.1}s`
    testimonial.classList.add("fade-in-up")
  })

  updateProgressIndicator()
}

function updateProgressIndicator() {
  const progressFill = document.querySelector(".progress-fill")
  if (progressFill) {
    progressFill.style.animationDuration = "80s" // Cambiado de 40s a 80s
  }
}

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

window.addEventListener("resize", () => {
  if (!isDragging && !animationPausedByUser) {
    updateTestimonialCarousel()
  }
})

document.addEventListener("selectstart", (e) => {
  if (isDragging) {
    e.preventDefault()
  }
})

document.addEventListener("dragstart", (e) => {
  if (isDragging) {
    e.preventDefault()
  }
})

// Declare functions that were previously undeclared
function initTestimonialStats() {
  // Implementation for initTestimonialStats
}

function expandTestimonial(testimonial, index) {
  // Implementation for expandTestimonial
}

function updateTestimonialCarousel() {
  // Implementation for updateTestimonialCarousel
}
