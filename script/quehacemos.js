// Que Hacemos Page Specific JavaScript
class QueHacemosPage {
  constructor() {
    this.bootstrap = window.bootstrap
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initAnimations()
    this.initSpecialtyCards()
    this.initProcessSteps()
    this.initTechCards()
    this.initScrollEffects()
  }

  setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initSmoothScrolling()
      this.initMobileMenu()
      this.initNavbarScroll()
      this.initNewsletterSubscription()
    })
  }

  initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      ".specialty-card, .process-step, .tech-card, .section-title, .section-description",
    )

    animatedElements.forEach((el) => observer.observe(el))
  }

  initSpecialtyCards() {
    const specialtyCards = document.querySelectorAll(".specialty-card")

    specialtyCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.2}s`

      // Add hover sound effect (optional)
      card.addEventListener("mouseenter", () => {
        this.playHoverSound()
      })

      // Add click interaction
      card.addEventListener("click", () => {
        const specialty = card.dataset.specialty
        this.showSpecialtyDetails(specialty)
      })

      // Add parallax effect on mouse move
      card.addEventListener("mousemove", (e) => {
        this.addParallaxEffect(card, e)
      })

      card.addEventListener("mouseleave", () => {
        this.resetParallaxEffect(card)
      })
    })
  }

  initProcessSteps() {
    const processSteps = document.querySelectorAll(".process-step")

    processSteps.forEach((step, index) => {
      step.addEventListener("click", () => {
        this.highlightProcessStep(step, index + 1)
      })

      // Add progressive reveal animation
      setTimeout(() => {
        step.classList.add("reveal")
      }, index * 300)
    })
  }

  initTechCards() {
    const techCards = document.querySelectorAll(".tech-card")
    const techItems = document.querySelectorAll(".tech-item")

    techCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.animateTechItems(card)
      })
    })

    // Add click to copy functionality for tech items
    techItems.forEach((item) => {
      item.addEventListener("click", () => {
        const text = item.textContent.trim()
        this.copyToClipboard(text)
        this.showCopyNotification(item)
      })
    })
  }

  initScrollEffects() {
    let ticking = false

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects()
          ticking = false
        })
        ticking = true
      }
    })
  }

  updateScrollEffects() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero-section")
    if (heroSection) {
      heroSection.style.transform = `translateY(${rate}px)`
    }

    // Update progress indicator
    this.updateProgressIndicator()
  }

  updateProgressIndicator() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100

    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector(".scroll-progress")
    if (!progressBar) {
      progressBar = document.createElement("div")
      progressBar.className = "scroll-progress"
      progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 3px;
                background: linear-gradient(90deg, var(--sfe-orange), #e55a2b);
                z-index: 9999;
                transition: width 0.3s ease;
            `
      document.body.appendChild(progressBar)
    } else {
      progressBar.style.width = scrolled + "%"
    }
  }

  showSpecialtyDetails(specialty) {
    const details = {
      industrial: {
        title: "Sector Industrial",
        description: "Especialistas en instalaciones eléctricas industriales de alta complejidad.",
        features: ["Subestaciones", "Tableros de Control", "Automatización", "Sistemas SCADA"],
      },
      comercial: {
        title: "Sector Comercial",
        description: "Soluciones eléctricas eficientes para espacios comerciales.",
        features: ["Iluminación LED", "Sistemas de Emergencia", "Climatización", "Seguridad"],
      },
      residencial: {
        title: "Sector Residencial",
        description: "Instalaciones modernas para hogares inteligentes.",
        features: ["Domótica", "Smart Home", "Paneles Solares", "Seguridad Residencial"],
      },
      institucional: {
        title: "Sector Institucional",
        description: "Instalaciones especializadas para entidades públicas y educativas.",
        features: ["Instalaciones Especiales", "Mantenimiento de Motores", "Automatización", "Mantenimiento Preventivo"],
      },
    }

    const detail = details[specialty]
    if (detail) {
      this.showModal(detail)
    }
  }

  showModal(detail) {
    // Create modal HTML
    const modalHTML = `
            <div class="modal fade" id="specialtyModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-gray">
                        <div class="modal-header border-secondary">
                            <h5 class="modal-title text-warning">${detail.title}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="text-light">${detail.description}</p>
                            <h6 class="text-warning mt-4">Características principales:</h6>
                            <ul class="list-unstyled">
                                ${detail.features
                                  .map(
                                    (feature) =>
                                      `<li class="text-light mb-2"><i class="fas fa-check text-warning me-2"></i>${feature}</li>`,
                                  )
                                  .join("")}
                            </ul>
                        </div>
                        <div class="modal-footer border-secondary">
                            <button type="button" class="btn btn-warning" onclick="openWhatsApp()">
                                <i class="fab fa-whatsapp me-2"></i>Consultar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `

    // Remove existing modal
    const existingModal = document.getElementById("specialtyModal")
    if (existingModal) {
      existingModal.remove()
    }

    // Add new modal
    document.body.insertAdjacentHTML("beforeend", modalHTML)

    // Show modal
    const modal = new this.bootstrap.Modal(document.getElementById("specialtyModal"))
    modal.show()
  }

  highlightProcessStep(step, stepNumber) {
    // Remove previous highlights
    document.querySelectorAll(".process-step").forEach((s) => {
      s.classList.remove("highlighted")
    })

    // Add highlight to clicked step
    step.classList.add("highlighted")

    // Add CSS for highlight effect
    if (!document.querySelector("#process-highlight-style")) {
      const style = document.createElement("style")
      style.id = "process-highlight-style"
      style.textContent = `
                .process-step.highlighted {
                    transform: translateY(-15px) scale(1.05);
                    filter: drop-shadow(0 10px 20px rgba(255, 107, 53, 0.4));
                }
                .process-step.highlighted .step-number {
                    background: linear-gradient(135deg, var(--sfe-orange), #e55a2b) !important;
                    box-shadow: 0 0 30px rgba(255, 107, 53, 0.6);
                }
            `
      document.head.appendChild(style)
    }

    // Show step details
    this.showStepTooltip(step, stepNumber)
  }

  showStepTooltip(step, stepNumber) {
    const tooltips = {
      1: "Evaluación completa de necesidades y análisis técnico del proyecto",
      2: "Desarrollo de planos detallados y especificaciones técnicas",
      3: "Implementación con personal certificado y materiales premium",
      4: "Soporte continuo y mantenimiento preventivo especializado",
    }

    // Remove existing tooltip
    const existingTooltip = document.querySelector(".step-tooltip")
    if (existingTooltip) {
      existingTooltip.remove()
    }

    // Create tooltip
    const tooltip = document.createElement("div")
    tooltip.className = "step-tooltip"
    tooltip.innerHTML = tooltips[stepNumber]
    tooltip.style.cssText = `
            position: absolute;
            background: var(--sfe-orange);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 250px;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: fadeInUp 0.3s ease;
        `

    step.style.position = "relative"
    step.appendChild(tooltip)

    // Remove tooltip after 3 seconds
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.remove()
      }
    }, 3000)
  }

  animateTechItems(card) {
    const items = card.querySelectorAll(".tech-item")
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = "translateX(5px)"
        item.style.color = "var(--sfe-orange)"
      }, index * 100)
    })

    // Reset after animation
    setTimeout(() => {
      items.forEach((item) => {
        item.style.transform = ""
        item.style.color = ""
      })
    }, 2000)
  }

  addParallaxEffect(card, e) {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`
  }

  resetParallaxEffect(card) {
    card.style.transform = ""
  }

  copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text)
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
      })
  }

  showCopyNotification(item) {
    const notification = document.createElement("div")
    notification.textContent = "¡Copiado!"
    notification.style.cssText = `
            position: absolute;
            background: var(--sfe-orange);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
        `

    item.style.position = "relative"
    item.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 1500)
  }

  playHoverSound() {
    // Optional: Add subtle hover sound effect
    // This would require audio files
    console.log("Hover sound effect")
  }

  initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
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

  // CORREGIDO: Función mejorada para el menú móvil
  initMobileMenu() {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
    const dropdownItems = document.querySelectorAll(".dropdown-item")
    const navbarCollapse = document.querySelector(".navbar-collapse")
    const navbarToggler = document.querySelector(".navbar-toggler")

    // Manejar clicks en enlaces principales del navbar
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Solo cerrar si no es un dropdown toggle
        if (!link.classList.contains("dropdown-toggle")) {
          const href = link.getAttribute("href")
          
          // Verificar si es un enlace válido
          if (href && href !== "#" && !href.startsWith("javascript:")) {
            // Cerrar el menú móvil después de un pequeño delay para permitir la navegación
            setTimeout(() => {
              if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                try {
                  const bsCollapse = this.bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
                  bsCollapse.hide()
                } catch (error) {
                  navbarCollapse.classList.remove("show")
                }
              }
            }, 100)
          }
        }
      })
    })

    // Manejar clicks en elementos del dropdown
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const href = item.getAttribute("href")
        
        // Verificar si es un enlace válido
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          // Permitir la navegación y luego cerrar el menú
          setTimeout(() => {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
              try {
                const bsCollapse = this.bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
                bsCollapse.hide()
              } catch (error) {
                navbarCollapse.classList.remove("show")
              }
            }
          }, 150)
        }
      })
    })

    // Mejorar el comportamiento del toggler
    if (navbarToggler) {
      navbarToggler.addEventListener("click", () => {
        // Agregar pequeña animación al toggler
        navbarToggler.style.transform = "scale(0.95)"
        setTimeout(() => {
          navbarToggler.style.transform = ""
        }, 150)
      })
    }

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const isClickInsideNav = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target)
        
        if (!isClickInsideNav) {
          try {
            const bsCollapse = this.bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
            bsCollapse.hide()
          } catch (error) {
            navbarCollapse.classList.remove("show")
          }
        }
      }
    })
  }

  initNavbarScroll() {
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar")
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
          navbar.style.backdropFilter = "blur(10px)"
          navbar.classList.add("scrolled")
        } else {
          navbar.style.backgroundColor = ""
          navbar.style.backdropFilter = ""
          navbar.classList.remove("scrolled")
        }
      }
    })
  }

  initNewsletterSubscription() {
    const newsletterButton = document.querySelector(".newsletter .btn-warning")
    if (newsletterButton) {
      newsletterButton.addEventListener("click", () => {
        this.subscribeNewsletter()
      })
    }
  }

  subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter input[type="email"]')
    if (!emailInput) return

    const email = emailInput.value

    if (!email) {
      this.showNotification("Por favor ingrese su email", "warning")
      return
    }

    if (!this.isValidEmail(email)) {
      this.showNotification("Por favor ingrese un email válido", "error")
      return
    }

    // Simulate subscription
    this.showNotification("¡Gracias por suscribirte a nuestro newsletter!", "success")
    emailInput.value = ""
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `

    // Set background color based on type
    const colors = {
      success: "#28a745",
      error: "#dc3545",
      warning: "#ffc107",
      info: "var(--sfe-orange)",
    }
    notification.style.backgroundColor = colors[type] || colors.info

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }
}

// Contact Functions
function openWhatsApp() {
  const phoneNumber = "573173945568"
  const message = "Hola, me interesa obtener información sobre sus servicios especializados en soluciones eléctricas."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+57 317 3945568"
}

// Add slideInRight animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    /* Estilos adicionales para navbar scrolled */
    .navbar.scrolled {
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    /* Mejorar dropdown en móvil */
    @media (max-width: 991.98px) {
        .dropdown-menu {
            position: static !important;
            transform: none !important;
            border: none !important;
            box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2) !important;
            margin: 0.5rem 0 !important;
        }
        
        .dropdown-item {
            padding: 0.75rem 1.5rem !important;
        }
    }
`
document.head.appendChild(style)

// Initialize the page
const queHacemosPage = new QueHacemosPage()