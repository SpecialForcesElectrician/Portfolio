// Global Variables
let currentSlide = 0
let heroInterval
const bootstrap = window.bootstrap
let currentTestimonialIndex = 0
const testimonialAnimationPaused = false

// Variables para swipe
let touchStartX = 0
let touchEndX = 0
let touchStartY = 0
let touchEndY = 0
let isScrolling = false

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

  if (!testimonialsContainer) return

  // Event listeners para touch
  testimonialsContainer.addEventListener("touchstart", handleTouchStart, { passive: false })
  testimonialsContainer.addEventListener("touchmove", handleTouchMove, { passive: false })
  testimonialsContainer.addEventListener("touchend", handleTouchEnd, { passive: false })

  // Event listeners para mouse (para testing en desktop)
  testimonialsContainer.addEventListener("mousedown", handleMouseStart)
  testimonialsContainer.addEventListener("mousemove", handleMouseMove)
  testimonialsContainer.addEventListener("mouseup", handleMouseEnd)
  testimonialsContainer.addEventListener("mouseleave", handleMouseEnd)

  // Prevenir selección de texto durante swipe
  testimonialsContainer.style.userSelect = "none"
  testimonialsContainer.style.webkitUserSelect = "none"
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  isScrolling = false

  // Pausar animación automática
  const wrapper = document.querySelector(".testimonials-wrapper")
  if (wrapper) {
    wrapper.style.animationPlayState = "paused"
  }
}

function handleTouchMove(e) {
  if (!touchStartX || !touchStartY) return

  const touchCurrentX = e.touches[0].clientX
  const touchCurrentY = e.touches[0].clientY

  const diffX = Math.abs(touchCurrentX - touchStartX)
  const diffY = Math.abs(touchCurrentY - touchStartY)

  // Determinar si es scroll vertical u horizontal
  if (!isScrolling) {
    isScrolling = diffY > diffX
  }

  // Si es swipe horizontal, prevenir scroll vertical y horizontal de la página
  if (!isScrolling && diffX > 10) {
    e.preventDefault()
    e.stopPropagation()
    // Prevenir que el evento se propague al documento
    document.body.style.touchAction = "none"
  }
}

function handleTouchEnd(e) {
  if (!touchStartX || isScrolling) {
    resetTouchVariables()
    document.body.style.touchAction = ""
    return
  }

  touchEndX = e.changedTouches[0].clientX
  touchEndY = e.changedTouches[0].clientY

  handleSwipe()
  resetTouchVariables()
  document.body.style.touchAction = ""
}

// Funciones para mouse (desktop testing)
function handleMouseStart(e) {
  touchStartX = e.clientX
  touchStartY = e.clientY
  isScrolling = false

  const wrapper = document.querySelector(".testimonials-wrapper")
  if (wrapper) {
    wrapper.style.animationPlayState = "paused"
  }
}

function handleMouseMove(e) {
  if (!touchStartX) return

  const diffX = Math.abs(e.clientX - touchStartX)
  const diffY = Math.abs(e.clientY - touchStartY)

  if (!isScrolling) {
    isScrolling = diffY > diffX
  }
}

function handleMouseEnd(e) {
  if (!touchStartX || isScrolling) {
    resetTouchVariables()
    return
  }

  touchEndX = e.clientX
  touchEndY = e.clientY

  handleSwipe()
  resetTouchVariables()
}

function handleSwipe() {
  const swipeThreshold = 50 // Mínima distancia para considerar swipe
  const swipeDistance = touchEndX - touchStartX

  if (Math.abs(swipeDistance) < swipeThreshold) {
    // Reanudar animación si no hay swipe válido
    setTimeout(() => {
      const wrapper = document.querySelector(".testimonials-wrapper")
      if (wrapper) {
        wrapper.style.animationPlayState = "running"
      }
    }, 1000)
    return
  }

  if (swipeDistance > 0) {
    // Swipe hacia la derecha - ir al testimonio anterior
    swipeToPrevTestimonial()
  } else {
    // Swipe hacia la izquierda - ir al siguiente testimonio
    swipeToNextTestimonial()
  }
}

function swipeToNextTestimonial() {
  const testimonials = document.querySelectorAll(".testimonial-card")
  const wrapper = document.querySelector(".testimonials-wrapper")

  if (!wrapper || testimonials.length === 0) return

  const testimonialsInView = getTestimonialsInView()
  const totalTestimonials = Math.floor(testimonials.length / 2) // Dividir por 2 porque están duplicados
  const maxIndex = Math.max(0, totalTestimonials - testimonialsInView)

  if (currentTestimonialIndex < maxIndex) {
    currentTestimonialIndex++
    updateTestimonialCarouselWithSwipe()
    showSwipeIndicator("next")
  } else {
    // Si está en el último, volver al primero
    currentTestimonialIndex = 0
    updateTestimonialCarouselWithSwipe()
    showSwipeIndicator("next")
  }
}

function swipeToPrevTestimonial() {
  const testimonials = document.querySelectorAll(".testimonial-card")
  const wrapper = document.querySelector(".testimonials-wrapper")

  if (!wrapper || testimonials.length === 0) return

  const testimonialsInView = getTestimonialsInView()
  const totalTestimonials = Math.floor(testimonials.length / 2)
  const maxIndex = Math.max(0, totalTestimonials - testimonialsInView)

  if (currentTestimonialIndex > 0) {
    currentTestimonialIndex--
    updateTestimonialCarouselWithSwipe()
    showSwipeIndicator("prev")
  } else {
    // Si está en el primero, ir al último
    currentTestimonialIndex = maxIndex
    updateTestimonialCarouselWithSwipe()
    showSwipeIndicator("prev")
  }
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

  // Aplicar transformación suave
  wrapper.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  wrapper.style.transform = `translateX(-${currentTestimonialIndex * testimonialWidth}px)`
  wrapper.style.animationPlayState = "paused"

  // Reanudar animación después de 3 segundos
  setTimeout(() => {
    wrapper.style.transition = ""
    wrapper.style.animationPlayState = "running"
  }, 3000)
}

function showSwipeIndicator(direction) {
  // Crear indicador visual temporal
  const indicator = document.createElement("div")
  indicator.className = `swipe-indicator swipe-${direction}`
  indicator.innerHTML =
    direction === "next" ? '<i class="fas fa-chevron-left"></i>' : '<i class="fas fa-chevron-right"></i>'

  const container = document.querySelector(".testimonials-carousel-container")
  container.appendChild(indicator)

  // Animar y remover
  setTimeout(() => {
    indicator.classList.add("show")
  }, 10)

  setTimeout(() => {
    indicator.classList.remove("show")
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator)
      }
    }, 300)
  }, 800)
}

function resetTouchVariables() {
  touchStartX = 0
  touchEndX = 0
  touchStartY = 0
  touchEndY = 0
  isScrolling = false
  document.body.style.touchAction = ""
}

// Testimonial Functions - Mejoradas
function initTestimonialCarousel() {
  const wrapper = document.querySelector(".testimonials-wrapper")
  const testimonials = document.querySelectorAll(".testimonial-card")

  if (!wrapper || testimonials.length === 0) return

  // Duplicar testimonios para loop infinito
  testimonials.forEach((testimonial) => {
    const clone = testimonial.cloneNode(true)
    wrapper.appendChild(clone)
  })

  // Agregar event listeners mejorados
  const allTestimonials = wrapper.querySelectorAll(".testimonial-card")

  allTestimonials.forEach((testimonial, index) => {
    // Pausar animación al hover
    testimonial.addEventListener("mouseenter", () => {
      wrapper.style.animationPlayState = "paused"
      testimonial.classList.add("testimonial-focused")
    })

    testimonial.addEventListener("mouseleave", () => {
      wrapper.style.animationPlayState = "running"
      testimonial.classList.remove("testimonial-focused")
    })

    // Click para expandir información
    testimonial.addEventListener("click", () => {
      expandTestimonial(testimonial, index)
    })

    // Animación de entrada escalonada
    testimonial.style.animationDelay = `${index * 0.1}s`
    testimonial.classList.add("fade-in-up")
  })

  // Actualizar indicador de progreso
  updateProgressIndicator()
}

function expandTestimonial(testimonial, index) {
  const clientName = testimonial.querySelector(".client-name").textContent
  const testimonialText = testimonial.querySelector(".testimonial-text").textContent

  // Crear modal con información expandida
  const modalHTML = `
    <div class="modal fade testimonial-modal" id="testimonialModal${index}" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content bg-dark-gray">
          <div class="modal-header border-secondary">
            <h5 class="modal-title text-warning">
              <i class="fas fa-quote-left me-2"></i>Testimonio de ${clientName}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="testimonial-expanded">
              <div class="testimonial-stars mb-3">
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
                <i class="fas fa-star text-warning"></i>
              </div>
              <blockquote class="blockquote">
                <p class="text-light fs-5">"${testimonialText}"</p>
                <footer class="blockquote-footer mt-3">
                  <cite title="Source Title" class="text-warning">${clientName}</cite>
                  <small class="text-muted ms-2">Cliente verificado de Google Business</small>
                </footer>
              </blockquote>
              <div class="mt-4">
                <h6 class="text-warning">¿Por qué elegir Special Forces Electrician?</h6>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <ul class="list-unstyled">
                      <li class="text-light mb-2"><i class="fas fa-check text-warning me-2"></i>Más de 5 años de experiencia</li>
                      <li class="text-light mb-2"><i class="fas fa-check text-warning me-2"></i>Certificaciones RETIE</li>
                      <li class="text-light mb-2"><i class="fas fa-check text-warning me-2"></i>Garantía extendida</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <ul class="list-unstyled">
                      <li class="text-light mb-2"><i class="fas fa-check text-warning me-2"></i>Soporte 24/7</li>
                      <li class="text-light mb-2"><i class="fas fa-check text-warning me-2"></i>Tecnología de vanguardia</li>
                      <li class="text-light mb-2"><i class="fas fa-check text-warning me-2"></i>Precios competitivos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-secondary">
            <button type="button" class="btn btn-warning" onclick="openWhatsApp()">
              <i class="fab fa-whatsapp me-2"></i>Obtener Cotización
            </button>
            <button type="button" class="btn btn-outline-warning" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  `

  // Agregar modal al DOM
  document.body.insertAdjacentHTML("beforeend", modalHTML)

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById(`testimonialModal${index}`))
  modal.show()

  // Limpiar modal después de cerrar
  document.getElementById(`testimonialModal${index}`).addEventListener("hidden.bs.modal", function () {
    this.remove()
  })
}

function initTestimonialStats() {
  // Animar números de estadísticas
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateStats = () => {
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.dataset.target)
      const increment = target / 50
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        stat.textContent = Math.floor(current)
      }, 50)
    })
  }

  // Observar cuando las estadísticas entren en vista
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsSection = document.querySelector(".testimonials-stats")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }
}

function updateProgressIndicator() {
  const progressFill = document.querySelector(".progress-fill")
  if (progressFill) {
    // Sincronizar con la animación del carrusel
    progressFill.style.animationDuration = "40s"
  }
}

// Mantener funciones de navegación manual para compatibilidad
function nextTestimonial() {
  const testimonials = document.querySelectorAll(".testimonial-card")
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
  const testimonials = document.querySelectorAll(".testimonial-card")
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
