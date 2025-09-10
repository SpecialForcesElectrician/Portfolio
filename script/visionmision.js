// Vision y Mision Page Specific JavaScript
class VisionMisionPage {
  constructor() {
    this.bootstrap = window.bootstrap
    this.currentActiveValue = null
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initAnimations()
    this.initMissionVisionCards()
    this.initValueCards()
    this.initObjectiveCards()
    this.initScrollEffects()
    this.initInteractiveElements()
  }

  setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initSmoothScrolling()
      this.initMobileMenu()
      this.initNavbarScroll()
      this.initNewsletterSubscription()
      this.initProgressTracker()
    })
  }

  initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          // Special handling for different sections
          if (entry.target.classList.contains("mission-card")) {
            this.animateMissionPoints(entry.target)
          }
          if (entry.target.classList.contains("vision-card")) {
            this.animateVisionPoints(entry.target)
          }
          if (entry.target.classList.contains("value-card")) {
            this.animateValueCard(entry.target)
          }
        }
      })
    }, observerOptions)

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      ".mission-card, .vision-card, .value-card, .objective-card, .values-title, .objectives-title",
    )

    animatedElements.forEach((el) => observer.observe(el))
  }

  initMissionVisionCards() {
    const missionCard = document.querySelector(".mission-card")
    const visionCard = document.querySelector(".vision-card")

    if (missionCard) {
      missionCard.addEventListener("click", () => {
        this.showMissionDetails()
      })

      // Add floating animation
      this.addFloatingAnimation(missionCard, 2000)
    }

    if (visionCard) {
      visionCard.addEventListener("click", () => {
        this.showVisionDetails()
      })

      // Add floating animation with different timing
      this.addFloatingAnimation(visionCard, 2500)
    }
  }

  initValueCards() {
    const valueCards = document.querySelectorAll(".value-card")

    valueCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.2}s`

      // Add click interaction
      card.addEventListener("click", () => {
        const value = card.dataset.value
        this.highlightValue(card, value)
      })

      // Add hover sound effect
      card.addEventListener("mouseenter", () => {
        this.playValueHoverEffect(card)
      })

      // Add parallax effect
      card.addEventListener("mousemove", (e) => {
        this.addCardParallax(card, e)
      })

      card.addEventListener("mouseleave", () => {
        this.resetCardParallax(card)
      })
    })
  }

  initObjectiveCards() {
    const objectiveCards = document.querySelectorAll(".objective-card")
    const objectiveItems = document.querySelectorAll(".objective-item")

    objectiveCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.animateObjectiveItems(card)
      })
    })

    // Add click to expand functionality
    objectiveItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.expandObjectiveItem(item)
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

  initInteractiveElements() {
    // Add interactive timeline
    this.createInteractiveTimeline()

    // Add value comparison tool
    this.createValueComparison()

    // Add mission/vision toggle
    this.createMissionVisionToggle()
  }

  animateMissionPoints(card) {
    const points = card.querySelectorAll(".mission-point")
    points.forEach((point, index) => {
      setTimeout(() => {
        point.style.opacity = "1"
        point.style.transform = "translateX(0)"
      }, index * 200)
    })
  }

  animateVisionPoints(card) {
    const points = card.querySelectorAll(".vision-point")
    points.forEach((point, index) => {
      setTimeout(() => {
        point.style.opacity = "1"
        point.style.transform = "translateX(0)"
      }, index * 200)
    })
  }

  animateValueCard(card) {
    const icon = card.querySelector(".value-icon")
    if (icon) {
      setTimeout(() => {
        icon.style.transform = "scale(1.1) rotateY(360deg)"
        setTimeout(() => {
          icon.style.transform = ""
        }, 600)
      }, 300)
    }
  }

  addFloatingAnimation(element, duration) {
    let start = null

    function animate(timestamp) {
      if (!start) start = timestamp
      const progress = timestamp - start

      const y = Math.sin((progress / duration) * Math.PI * 2) * 5
      element.style.transform = `translateY(${y}px)`

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  showMissionDetails() {
    const modalHTML = `
            <div class="modal fade" id="missionModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-gray">
                        <div class="modal-header border-secondary">
                            <h5 class="modal-title text-warning">
                                <i class="fas fa-bullseye me-2"></i>Nuestra Misión Detallada
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-4 text-center mb-4">
                                    <div class="mission-detail-icon bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                                        <i class="fas fa-target fa-2x"></i>
                                    </div>
                                    <h6 class="text-warning">Objetivo Principal</h6>
                                    <p class="text-light small">Diseñamos e implementamos soluciones eléctricas que optimizan su inversión, protejan su seguridad y mejoren el rendimiento de sus instalaciones.</p>
                                </div>
                                <div class="col-md-4 text-center mb-4">
                                    <div class="mission-detail-icon bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                                        <i class="fas fa-cogs fa-2x"></i>
                                    </div>
                                    <h6 class="text-warning">Metodología</h6>
                                    <p class="text-light small">Misión Eléctrica segura.</p>
                                </div>
                                <div class="col-md-4 text-center mb-4">
                                    <div class="mission-detail-icon bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                                        <i class="fas fa-users fa-2x"></i>
                                    </div>
                                    <h6 class="text-warning">Alcance</h6>
                                    <p class="text-light small">Sector empresarial, residencial e institucional.</p>
                                </div>
                            </div>
                            <hr class="border-secondary">
                            <h6 class="text-warning">Compromisos Específicos:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <ul class="list-unstyled">
                                        <li class="text-light mb-2"><i class="fas fa-shield-alt text-warning me-2"></i>Seguridad en cada instalación</li>
                                        <li class="text-light mb-2"><i class="fas fa-clock text-warning me-2"></i>Cumplimiento de tiempos</li>
                                        <li class="text-light mb-2"><i class="fas fa-award text-warning me-2"></i>Calidad certificada</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul class="list-unstyled">
                                        <li class="text-light mb-2"><i class="fas fa-leaf text-warning me-2"></i>Sostenibilidad ambiental</li>
                                        <li class="text-light mb-2"><i class="fas fa-handshake text-warning me-2"></i>Relaciones duraderas</li>
                                        <li class="text-light mb-2"><i class="fas fa-chart-line text-warning me-2"></i>Mejora continua</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-secondary">
                            <button type="button" class="btn btn-warning" onclick="openWhatsApp()">
                                <i class="fab fa-whatsapp me-2"></i>Conocer más
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `

    this.showModal(modalHTML, "missionModal")
  }

  showVisionDetails() {
    const modalHTML = `
            <div class="modal fade" id="visionModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-gray">
                        <div class="modal-header border-secondary">
                            <h5 class="modal-title text-warning">
                                <i class="fas fa-eye me-2"></i>Nuestra Visión del Futuro
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-4">
                                <div class="vision-timeline">
                                    <div class="timeline-item">
                                        <div class="timeline-year text-warning fw-bold">2025</div>
                                        <div class="timeline-content text-light">Liderazgo nacional consolidado</div>
                                    </div>
                                    <div class="timeline-item">
                                        <div class="timeline-year text-warning fw-bold">2027</div>
                                        <div class="timeline-content text-light">Expansión a mercados internacionales</div>
                                    </div>
                                    <div class="timeline-item">
                                        <div class="timeline-year text-warning fw-bold">2030</div>
                                        <div class="timeline-content text-light">Referente en sostenibilidad</div>
                                    </div>
                                </div>
                            </div>
                            <hr class="border-secondary">
                            <h6 class="text-warning">Pilares de Nuestra Visión:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="vision-pillar mb-3">
                                        <i class="fas fa-trophy text-warning me-2"></i>
                                        <strong class="text-light">Liderazgo:</strong>
                                        <p class="text-light small mb-0">Ser la primera opción en soluciones eléctricas</p>
                                    </div>
                                    <div class="vision-pillar mb-3">
                                        <i class="fas fa-lightbulb text-warning me-2"></i>
                                        <strong class="text-light">Innovación:</strong>
                                        <p class="text-light small mb-0">Tecnologías de vanguardia constante</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="vision-pillar mb-3">
                                        <i class="fas fa-globe text-warning me-2"></i>
                                        <strong class="text-light">Expansión:</strong>
                                        <p class="text-light small mb-0">Presencia internacional estratégica</p>
                                    </div>
                                    <div class="vision-pillar mb-3">
                                        <i class="fas fa-leaf text-warning me-2"></i>
                                        <strong class="text-light">Sostenibilidad:</strong>
                                        <p class="text-light small mb-0">Compromiso ambiental genuino</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-secondary">
                            <button type="button" class="btn btn-warning" onclick="openWhatsApp()">
                                <i class="fas fa-rocket me-2"></i>Únete a nuestra visión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `

    this.showModal(modalHTML, "visionModal")
  }

  highlightValue(card, value) {
    // Remove previous highlights
    document.querySelectorAll(".value-card").forEach((c) => {
      c.classList.remove("value-highlighted")
    })

    // Add highlight to clicked card
    card.classList.add("value-highlighted")
    this.currentActiveValue = value

    // Show value details
    this.showValueDetails(value)

    // Add CSS for highlight effect if not exists
    if (!document.querySelector("#value-highlight-style")) {
      const style = document.createElement("style")
      style.id = "value-highlight-style"
      style.textContent = `
                .value-card.value-highlighted {
                    transform: translateY(-20px) scale(1.08);
                    box-shadow: 0 25px 50px rgba(255, 107, 53, 0.5);
                    border: 3px solid var(--sfe-orange);
                    z-index: 10;
                    position: relative;
                }
                .value-card.value-highlighted .value-icon {
                    animation: valueGlow 2s ease-in-out infinite;
                }
                @keyframes valueGlow {
                    0%, 100% { box-shadow: 0 10px 30px rgba(255, 107, 53, 0.6); }
                    50% { box-shadow: 0 15px 40px rgba(255, 107, 53, 0.9); }
                }
            `
      document.head.appendChild(style)
    }
  }

  showValueDetails(value) {
    const valueDetails = {
      seguridad: {
        title: "Seguridad",
        icon: "fas fa-shield-alt",
        description: "La seguridad es el fundamento de todo lo que hacemos.",
        details: [
          "Protocolos de seguridad certificados",
          "Equipos de protección personal obligatorios",
          "Capacitación continua en seguridad",
          "Auditorías de seguridad regulares",
          "Cumplimiento de normativas internacionales",
        ],
      },
      calidad: {
        title: "Calidad",
        icon: "fas fa-medal",
        description: "Excelencia en cada proyecto que realizamos.",
        details: [
          "Materiales de primera calidad",
          "Procesos certificados ISO",
          "Control de calidad riguroso",
          "Garantía extendida en todos los trabajos",
        ],
      },
      innovacion: {
        title: "Innovación",
        icon: "fas fa-lightbulb",
        description: "Adoptamos las últimas tecnologías del mercado.",
        details: [
          "Investigación y desarrollo constante",
          "Tecnologías de vanguardia",
          "Soluciones personalizadas",
          "Actualización tecnológica continua",
        ],
      },
      confianza: {
        title: "Confianza",
        icon: "fas fa-handshake",
        description: "Construimos relaciones sólidas y duraderas.",
        details: [
          "Transparencia en todos los procesos",
          "Comunicación clara y honesta",
          "Cumplimiento de compromisos",
          "Soporte post-venta garantizado",
        ],
      },
      sostenibilidad: {
        title: "Sostenibilidad",
        icon: "fas fa-leaf",
        description: "Compromiso genuino con el medio ambiente.",
        details: [
          "Energías renovables prioritarias",
          "Prácticas eco-amigables",
          "Reducción de huella de carbono",
          "Reciclaje y reutilización de materiales",
        ],
      },
      equipo: {
        title: "Trabajo en Equipo",
        icon: "fas fa-users",
        description: "La colaboración es clave para nuestro éxito.",
        details: [
          "Comunicación efectiva",
          "Objetivos compartidos",
          "Apoyo mutuo constante",
          "Desarrollo conjunto de habilidades",
        ],
      },
    }

    const detail = valueDetails[value]
    if (detail) {
      this.showValueTooltip(detail)
    }
  }

  showValueTooltip(detail) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector(".value-tooltip")
    if (existingTooltip) {
      existingTooltip.remove()
    }

    // Create tooltip
    const tooltip = document.createElement("div")
    tooltip.className = "value-tooltip"
    tooltip.innerHTML = `
            <div class="tooltip-header">
                <i class="${detail.icon} text-warning me-2"></i>
                <strong>${detail.title}</strong>
            </div>
            <p class="tooltip-description">${detail.description}</p>
            <ul class="tooltip-details">
                ${detail.details.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        `
    tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            background: linear-gradient(135deg, var(--sfe-gray), var(--sfe-dark-gray));
            color: white;
            padding: 20px;
            border-radius: 12px;
            font-size: 14px;
            max-width: 300px;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 2px solid var(--sfe-orange);
            animation: slideInRight 0.4s ease;
        `

    document.body.appendChild(tooltip)

    // Remove tooltip after 5 seconds
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.style.animation = "slideOutRight 0.4s ease"
        setTimeout(() => tooltip.remove(), 400)
      }
    }, 5000)
  }

  animateObjectiveItems(card) {
    const items = card.querySelectorAll(".objective-item")
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = "translateX(10px)"
        item.style.color = "var(--sfe-orange)"
        item.style.fontWeight = "bold"
      }, index * 150)
    })

    // Reset after animation
    setTimeout(() => {
      items.forEach((item) => {
        item.style.transform = ""
        item.style.color = ""
        item.style.fontWeight = ""
      })
    }, 3000)
  }

  expandObjectiveItem(item) {
    const expandedContent = {
      "Expandir nuestra presencia en el mercado nacional":
        "Apertura de nuevas sucursales en ciudades principales y establecimiento de alianzas estratégicas regionales.",
      "Aumentar nuestra capacidad de proyectos simultáneos":
        "Ampliación del equipo técnico y adquisición de equipos especializados para manejar múltiples proyectos.",
      "Diversificar nuestros servicios especializados":
        "Incorporación de nuevas tecnologías como IoT, domótica avanzada y sistemas de energía inteligente.",
      "Fortalecer alianzas estratégicas":
        "Partnerships con fabricantes internacionales y colaboraciones con universidades para I+D.",
      "Capacitación continua de nuestro equipo":
        "Programas de formación técnica, certificaciones internacionales y actualización en nuevas tecnologías.",
      "Certificaciones internacionales":
        "Obtención de certificaciones ISO adicionales y acreditaciones de organismos internacionales.",
      "Programas de desarrollo profesional":
        "Planes de carrera estructurados, mentorías y oportunidades de crecimiento interno.",
      "Cultura de innovación y mejora continua":
        "Implementación de metodologías ágiles y espacios de innovación para el desarrollo de nuevas ideas.",
    }

    const content = expandedContent[item.textContent.trim()]
    if (content) {
      this.showExpandedObjective(item, content)
    }
  }

  showExpandedObjective(item, content) {
    // Create expanded content element
    const expanded = document.createElement("div")
    expanded.className = "expanded-objective"
    expanded.innerHTML = `
            <div class="expanded-content">
                <p class="text-light small">${content}</p>
                <button class="btn btn-sm btn-outline-warning mt-2" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times me-1"></i>Cerrar
                </button>
            </div>
        `
    expanded.style.cssText = `
            background: rgba(255, 107, 53, 0.1);
            border: 1px solid var(--sfe-orange);
            border-radius: 8px;
            padding: 15px;
            margin-top: 10px;
            animation: expandDown 0.3s ease;
        `

    // Remove existing expanded content
    const existing = item.parentNode.querySelector(".expanded-objective")
    if (existing) {
      existing.remove()
      return
    }

    item.parentNode.appendChild(expanded)
  }

  addCardParallax(card, e) {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`
  }

  resetCardParallax(card) {
    card.style.transform = ""
  }

  playValueHoverEffect(card) {
    const icon = card.querySelector(".value-icon")
    if (icon) {
      icon.style.animation = "bounce 0.6s ease"
      setTimeout(() => {
        icon.style.animation = ""
      }, 600)
    }
  }

  updateScrollEffects() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.3

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

    let progressBar = document.querySelector(".scroll-progress")
    if (!progressBar) {
      progressBar = document.createElement("div")
      progressBar.className = "scroll-progress"
      progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 4px;
                background: linear-gradient(90deg, var(--sfe-orange), #e55a2b);
                z-index: 9999;
                transition: width 0.3s ease;
            `
      document.body.appendChild(progressBar)
    } else {
      progressBar.style.width = scrolled + "%"
    }
  }

  createInteractiveTimeline() {
    // This would create an interactive timeline for company milestones
    console.log("Interactive timeline initialized")
  }

  createValueComparison() {
    // This would create a tool to compare company values
    console.log("Value comparison tool initialized")
  }

  createMissionVisionToggle() {
    // Add toggle button between mission and vision
    const toggleButton = document.createElement("button")
    toggleButton.className = "btn btn-warning position-fixed"
    toggleButton.style.cssText = `
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            border-radius: 50%;
            width: 60px;
            height: 60px;
        `
    toggleButton.innerHTML = '<i class="fas fa-exchange-alt"></i>'
    toggleButton.title = "Alternar Misión/Visión"

    toggleButton.addEventListener("click", () => {
      this.toggleMissionVision()
    })

    document.body.appendChild(toggleButton)
  }

  toggleMissionVision() {
    const missionCard = document.querySelector(".mission-card")
    const visionCard = document.querySelector(".vision-card")

    if (missionCard && visionCard) {
      // Swap positions with animation
      const temp = missionCard.style.order
      missionCard.style.order = visionCard.style.order
      visionCard.style.order = temp

      // Add swap animation
      missionCard.style.animation = "swapLeft 0.6s ease"
      visionCard.style.animation = "swapRight 0.6s ease"

      setTimeout(() => {
        missionCard.style.animation = ""
        visionCard.style.animation = ""
      }, 600)
    }
  }

  initProgressTracker() {
    // Track user progress through the page sections
    const sections = ["mision-vision", "valores", "objetivos"]
    const currentSection = 0

    const tracker = document.createElement("div")
    tracker.className = "progress-tracker"
    tracker.style.cssText = `
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
        `

    sections.forEach((section, index) => {
      const dot = document.createElement("div")
      dot.className = "tracker-dot"
      dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${index === 0 ? "var(--sfe-orange)" : "rgba(255, 107, 53, 0.3)"};
                margin: 10px 0;
                cursor: pointer;
                transition: all 0.3s ease;
            `

      dot.addEventListener("click", () => {
        document.getElementById(section).scrollIntoView({ behavior: "smooth" })
      })

      tracker.appendChild(dot)
    })

    document.body.appendChild(tracker)
  }

  showModal(modalHTML, modalId) {
    // Remove existing modal
    const existingModal = document.getElementById(modalId)
    if (existingModal) {
      existingModal.remove()
    }

    // Add new modal
    document.body.insertAdjacentHTML("beforeend", modalHTML)

    // Show modal
    const modal = new this.bootstrap.Modal(document.getElementById(modalId))
    modal.show()
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
  const message = "Hola, me interesa conocer más sobre la visión y misión de Special Forces Electrician."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+573173945568"
}

// Add additional animations
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
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
    
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes swapLeft {
        0% { transform: translateX(0); }
        50% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
    }
    
    @keyframes swapRight {
        0% { transform: translateX(0); }
        50% { transform: translateX(100%); }
        100% { transform: translateX(0); }
    }
    
    @keyframes expandDown {
        from {
            opacity: 0;
            max-height: 0;
            transform: scaleY(0);
        }
        to {
            opacity: 1;
            max-height: 200px;
            transform: scaleY(1);
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
document.head.appendChild(additionalStyles)

// Initialize the page
const visionMisionPage = new VisionMisionPage()