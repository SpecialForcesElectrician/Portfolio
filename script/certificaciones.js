// Certificaciones Page JavaScript
const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  // Initialize page functionality
  initializeNavigation()
  initializeCertificationCards()
  initializeContactOptions()
  initializeScrollEffects()
  initializeAccessibility()
  initializeTooltipsAndPopovers()
  initSmoothScrolling()
  initBackToTop()
  animateOnScroll()
  initContentInteractions()
  initCertificationsFeatures()

  // Add certificate download buttons functionality
  const certificationInfos = document.querySelectorAll(".certification-info")

  certificationInfos.forEach((cert, index) => {
    const downloadBtn = document.createElement("button")
    downloadBtn.className = "btn btn-sm btn-outline-warning mt-2"
    downloadBtn.innerHTML = '<i class="fas fa-download me-1"></i>Descargar'
    downloadBtn.onclick = () => downloadCertificate(`Cert_${index + 1}`)

    cert.appendChild(downloadBtn)
  })

  // Floating action button for quick contact
  const floatingButton = document.createElement("button")
  floatingButton.innerHTML = '<i class="fas fa-certificate"></i>'
  floatingButton.className = "floating-cert-btn"
  floatingButton.title = "Verificar Certificaciones"
  floatingButton.onclick = () => {
    const action = confirm("¿Qué desea hacer?\n\nOK = Verificar certificaciones\nCancelar = Solicitar documentos")
    if (action) {
      openWhatsApp()
    } else {
      sendEmail()
    }
  }

  document.body.appendChild(floatingButton)

  // Add floating button styles
  const floatingButtonStyles = `
    .floating-cert-btn {
      position: fixed;
      bottom: 90px;
      right: 30px;
      background: var(--sfe-orange);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      z-index: 998;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    }
    
    .floating-cert-btn:hover {
      background: #e55a2b;
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
    }
  `

  // Add styles to document
  const styleSheet = document.createElement("style")
  styleSheet.textContent = floatingButtonStyles
  document.head.appendChild(styleSheet)
})

// Navigation functionality
function initializeNavigation() {
  const navbar = document.querySelector(".navbar")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
    } else {
      navbar.style.backgroundColor = ""
    }
  })

  // Active nav link highlighting
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"))
      // Add active class to clicked link
      this.classList.add("active")
    })
  })
}

// Certification cards animation and interaction
function initializeCertificationCards() {
  const certificationItems = document.querySelectorAll(".certification-item")
  const licenseItems = document.querySelectorAll(".license-item")
  const insuranceCards = document.querySelectorAll(".insurance-card")
  const qualityItems = document.querySelectorAll(".quality-item")

  // Add hover effects and click handlers
  ;[...certificationItems, ...licenseItems, ...insuranceCards, ...qualityItems].forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.transition = "all 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })

    // Add click handler for more details
    item.addEventListener("click", function () {
      showCertificationDetailsModal(this)
    })
  })
}

// Show certification details modal
function showCertificationDetailsModal(element) {
  const title = element.querySelector("h4, h5")?.textContent || "Certificación"
  const description = element.querySelector("p")?.textContent || "Información detallada no disponible."

  // Create modal content
  const modalHTML = `
        <div class="modal fade" id="certificationModal" tabindex="-1" aria-labelledby="certificationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="certificationModalLabel">
                            <i class="fas fa-certificate me-2"></i>${title}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p>${description}</p>
                        <div class="mt-3">
                            <h6><i class="fas fa-info-circle me-2"></i>Información Adicional:</h6>
                            <ul>
                                <li>Certificación verificada y actualizada</li>
                                <li>Cumple con estándares internacionales</li>
                                <li>Renovación automática programada</li>
                                <li>Documentación disponible bajo solicitud</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="requestCertificationDocument()">
                            <i class="fas fa-download me-2"></i>Solicitar Documento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `

  // Remove existing modal if any
  const existingModal = document.getElementById("certificationModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML)

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("certificationModal"))
  modal.show()
}

// Request certification document
function requestCertificationDocument() {
  // Show loading state
  const button = event.target
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Procesando...'
  button.disabled = true

  // Simulate API call
  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-check me-2"></i>Solicitud Enviada'

    // Show success message
    showNotification(
      "Solicitud enviada correctamente. Recibirá el documento por email en las próximas 24 horas.",
      "success",
    )

    // Reset button after delay
    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false

      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("certificationModal"))
      modal.hide()
    }, 2000)
  }, 1500)
}

// Contact options functionality
function initializeContactOptions() {
  const contactOptions = document.querySelectorAll(".contact-option")

  contactOptions.forEach((option) => {
    const button = option.querySelector(".btn")

    button.addEventListener("click", function (e) {
      const action = this.textContent.trim()

      if (action === "Cotizar Proyecto") {
        e.preventDefault()
        showQuoteForm()
      }

      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })
}

// Show quote form modal
function showQuoteForm() {
  const quoteModalHTML = `
        <div class="modal fade" id="quoteModal" tabindex="-1" aria-labelledby="quoteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="quoteModalLabel">
                            <i class="fas fa-calculator me-2"></i>Solicitar Cotización
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="quoteForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="quoteName" class="form-label">Nombre Completo *</label>
                                    <input type="text" class="form-control" id="quoteName" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="quoteEmail" class="form-label">Email *</label>
                                    <input type="email" class="form-control" id="quoteEmail" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="quotePhone" class="form-label">Teléfono</label>
                                    <input type="tel" class="form-control" id="quotePhone">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="quoteService" class="form-label">Tipo de Servicio *</label>
                                    <select class="form-select" id="quoteService" required>
                                        <option value="">Seleccionar servicio</option>
                                        <option value="instalacion">Instalación Eléctrica</option>
                                        <option value="mantenimiento">Mantenimiento</option>
                                        <option value="emergencia">Servicio de Emergencia</option>
                                        <option value="automatizacion">Automatización</option>
                                        <option value="solar">Energía Solar</option>
                                        <option value="industrial">Eléctrica Industrial</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="quoteDescription" class="form-label">Descripción del Proyecto *</label>
                                <textarea class="form-control" id="quoteDescription" rows="4" required 
                                    placeholder="Describa detalladamente su proyecto eléctrico..."></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="quoteUrgency" class="form-label">Urgencia</label>
                                <select class="form-select" id="quoteUrgency">
                                    <option value="normal">Normal (1-3 días)</option>
                                    <option value="urgente">Urgente (24 horas)</option>
                                    <option value="emergencia">Emergencia (Inmediato)</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="submitQuoteForm()">
                            <i class="fas fa-paper-plane me-2"></i>Enviar Solicitud
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `

  // Remove existing modal if any
  const existingModal = document.getElementById("quoteModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", quoteModalHTML)

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("quoteModal"))
  modal.show()
}

// Submit quote form
function submitQuoteForm() {
  const form = document.getElementById("quoteForm")
  const button = event.target

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }

  // Show loading state
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
  button.disabled = true

  // Collect form data
  const formData = {
    name: document.getElementById("quoteName").value,
    email: document.getElementById("quoteEmail").value,
    phone: document.getElementById("quotePhone").value,
    service: document.getElementById("quoteService").value,
    description: document.getElementById("quoteDescription").value,
    urgency: document.getElementById("quoteUrgency").value,
    timestamp: new Date().toISOString(),
  }

  // Simulate API call
  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-check me-2"></i>Enviado'

    // Show success message
    showNotification(
      "Solicitud de cotización enviada correctamente. Nos pondremos en contacto en las próximas 2 horas.",
      "success",
    )

    // Reset and close
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById("quoteModal"))
      modal.hide()
      form.reset()
      button.innerHTML = originalText
      button.disabled = false
    }, 2000)
  }, 1500)
}

// Scroll effects
function initializeScrollEffects() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroSection.style.transform = `translateY(${rate}px)`
    })
  }

  // Fade in animation for content sections
  const contentSections = document.querySelectorAll(".content-section")
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  )

  contentSections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "all 0.8s ease"
    sectionObserver.observe(section)
  })
}

// Accessibility features
function initializeAccessibility() {
  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Alt + 1: Go to main content
    if (e.altKey && e.key === "1") {
      e.preventDefault()
      document.querySelector(".main-content").focus()
    }

    // Alt + 2: Go to navigation
    if (e.altKey && e.key === "2") {
      e.preventDefault()
      document.querySelector(".navbar").focus()
    }

    // Escape: Close modals
    if (e.key === "Escape") {
      const openModals = document.querySelectorAll(".modal.show")
      openModals.forEach((modal) => {
        const bsModal = bootstrap.Modal.getInstance(modal)
        if (bsModal) bsModal.hide()
      })
    }
  })

  // Focus management for modals
  document.addEventListener("shown.bs.modal", (e) => {
    const modal = e.target
    const firstFocusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (firstFocusable) {
      firstFocusable.focus()
    }
  })

  // High contrast mode detection
  if (window.matchMedia("(prefers-contrast: high)").matches) {
    document.body.classList.add("high-contrast")
  }

  // Reduced motion detection
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("reduced-motion")
  }

  // Accessibility improvements
  const interactiveElements = document.querySelectorAll(".content-card, .certification-info, .insurance-section")

  interactiveElements.forEach((element, index) => {
    element.setAttribute("tabindex", "0")
    element.setAttribute("role", "article")
    element.setAttribute("aria-label", `Sección de certificaciones ${index + 1}`)

    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        element.click()
      }
    })
  })
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} notification-toast`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
        animation: slideInRight 0.3s ease;
    `

  notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-toast {
        animation: slideInRight 0.3s ease;
    }
    
    .high-contrast {
        filter: contrast(150%);
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`
document.head.appendChild(style)

// Initialize tooltips and popovers
function initializeTooltipsAndPopovers() {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Initialize Bootstrap popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
}

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "linear-gradient(135deg, rgba(44, 62, 80, 0.95) 0%, rgba(52, 73, 94, 0.95) 100%)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "linear-gradient(135deg, var(--secondary-color) 0%, #34495e 100%)"
    navbar.style.backdropFilter = "none"
  }
}, 10)

// Replace the scroll event listener with the optimized version
window.addEventListener("scroll", optimizedScrollHandler)

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  showNotification("Ha ocurrido un error. Por favor, recargue la página.", "error")
})

// Service Worker registration for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}

// Contact Functions
function openWhatsApp() {
  const phoneNumber = "+573173945568"
  const message = "Hola, me interesa conocer más sobre las certificaciones de Special Forces Electrician."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+573173945568"
}

function sendEmail() {
  const subject = "Consulta Certificaciones - Special Forces Electrician"
  const body =
    "Hola,\n\nMe interesa obtener información sobre las certificaciones de Special Forces Electrician.\n\nEspecíficamente sobre:\n[Describa su consulta aquí]\n\nGracias por su atención."
  window.location.href = `mailto:specialforceselectriciansas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show")
    } else {
      backToTopButton.classList.remove("show")
    }
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".content-card, .certification-info, .license-item, .insurance-section, .quality-certification, .verification-method, .contact-method",
  )

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

// Content Interactions
function initContentInteractions() {
  // Add click tracking for certification sections
  const certificationsSections = document.querySelectorAll(".certifications-section")

  certificationsSections.forEach((section, index) => {
    section.addEventListener("click", () => {
      console.log(`Certifications section ${index + 1} clicked`)
      // Here you could add analytics tracking
    })
  })

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(
    ".certification-info, .license-item, .insurance-section, .quality-certification, .verification-method, .contact-method",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transform = "translateY(-5px)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = ""
    })
  })

  // Add click effects for license items
  const licenseItems = document.querySelectorAll(".license-item")
  licenseItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.style.transform = "translateX(10px)"
      setTimeout(() => {
        item.style.transform = "translateX(5px)"
      }, 200)
    })
  })
}

// Certifications-specific Features
function initCertificationsFeatures() {
  // Certification verification
  initCertificationVerification()

  // Document request system
  initDocumentRequest()

  // Insurance calculator
  initInsuranceCalculator()
}

// Certification Verification
function initCertificationVerification() {
  const verificationMethods = document.querySelectorAll(".verification-method")

  verificationMethods.forEach((method) => {
    method.addEventListener("click", () => {
      showVerificationOptions(method)
    })
  })
}

function showVerificationOptions(methodElement) {
  const methodName = methodElement.querySelector("h5").textContent
  const methodDescription = methodElement.querySelector("p").textContent

  const verificationInfo = `
    VERIFICACIÓN DE CERTIFICACIONES
    
    Método: ${methodName}
    Descripción: ${methodDescription}
    
    Para verificar nuestras certificaciones:
    1. Contacte directamente con nosotros
    2. Proporcione el número de certificación
    3. Recibirá confirmación en tiempo real
    
    ¿Desea proceder con la verificación?
  `

  if (confirm(verificationInfo)) {
    if (methodName.includes("Telefónica")) {
      makeCall()
    } else if (methodName.includes("Email")) {
      sendEmail()
    } else {
      openWhatsApp()
    }
  }
}

// Document Request System
function initDocumentRequest() {
  const requestButtons = document.querySelectorAll(".btn-outline-warning")

  requestButtons.forEach((button) => {
    if (button.textContent.includes("Solicitar")) {
      button.addEventListener("click", () => {
        showDocumentRequestForm()
      })
    }
  })
}

function showDocumentRequestForm() {
  const documentType = prompt(
    "Seleccione el tipo de documento que desea solicitar:\n1. Certificaciones Profesionales\n2. Licencias y Permisos\n3. Seguros y Garantías\n4. Certificaciones de Calidad\n5. Todos los documentos\n\nIngrese el número:",
  )

  const documentTypes = {
    1: "Certificaciones Profesionales",
    2: "Licencias y Permisos",
    3: "Seguros y Garantías",
    4: "Certificaciones de Calidad",
    5: "Todos los documentos",
  }

  if (documentTypes[documentType]) {
    const clientEmail = prompt("Ingrese su email para envío de documentos:")

    if (clientEmail && validateEmail(clientEmail)) {
      processDocumentRequest(documentTypes[documentType], clientEmail)
    } else {
      alert("Email inválido. Por favor, intente nuevamente.")
    }
  } else {
    alert("Opción no válida")
  }
}

function processDocumentRequest(documentType, email) {
  // Simulate document request processing
  alert(
    `Solicitud procesada correctamente.\n\nTipo: ${documentType}\nEmail: ${email}\n\nRecibirá los documentos en las próximas 24 horas.`,
  )

  // Here you would typically send the request to your backend
  console.log("Document request:", { documentType, email, timestamp: new Date().toISOString() })
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Insurance Calculator
function initInsuranceCalculator() {
  const insuranceSections = document.querySelectorAll(".insurance-section")

  insuranceSections.forEach((section) => {
    section.addEventListener("click", () => {
      showInsuranceCalculator(section)
    })
  })
}

function showInsuranceCalculator(insuranceElement) {
  const insuranceType = insuranceElement.querySelector("h5").textContent
  const coverageAmount = insuranceElement.querySelector(".insurance-amount").textContent

  const projectValue = prompt(
    `Calculadora de Cobertura - ${insuranceType}\n\nCobertura disponible: ${coverageAmount}\n\nIngrese el valor estimado de su proyecto (COP):`,
  )

  if (projectValue && !isNaN(projectValue)) {
    const value = Number.parseFloat(projectValue)
    const coverage = insuranceType.includes("Responsabilidad")
      ? 2000000
      : insuranceType.includes("Accidentes")
        ? 1000000
        : 0

    let calculationResult = ""

    if (coverage > 0) {
      const coveragePercentage = Math.min((value / coverage) * 100, 100)
      calculationResult = `
      CÁLCULO DE COBERTURA
      
      Proyecto: $${value.toLocaleString("es-CO")} COP
      Seguro: ${insuranceType}
      Cobertura: $${coverage.toLocaleString("es-CO")} COP
      
      Porcentaje cubierto: ${coveragePercentage.toFixed(1)}%
      ${coveragePercentage === 100 ? "✓ TOTALMENTE CUBIERTO" : "⚠ COBERTURA PARCIAL"}
      
      ¿Desea más información sobre nuestros seguros?
      `
    } else {
      calculationResult = `
      INFORMACIÓN DE GARANTÍA
      
      Proyecto: $${value.toLocaleString("es-CO")} COP
      Garantía: 5 años en trabajos
      
      Nuestra garantía cubre:
      ✓ Mano de obra
      ✓ Materiales instalados
      ✓ Funcionamiento del sistema
      
      ¿Desea más información sobre nuestras garantías?
      `
    }

    if (confirm(calculationResult)) {
      openWhatsApp()
    }
  }
}

// Print functionality
function printCertifications() {
  window.print()
}

// Share functionality
function shareCertifications() {
  if (navigator.share) {
    navigator.share({
      title: "Certificaciones - Special Forces Electrician",
      text: "Conoce las certificaciones profesionales de Special Forces Electrician",
      url: window.location.href,
    })
  } else {
    // Fallback for browsers that don't support Web Share API
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      alert("Enlace copiado al portapapeles")
    })
  }
}

// Search functionality within the certifications
function searchInCertifications(searchTerm) {
  const content = document.querySelector(".certifications-content")
  const text = content.textContent.toLowerCase()
  const term = searchTerm.toLowerCase()

  if (text.includes(term)) {
    // Highlight search results
    highlightSearchTerm(term)
    return true
  }
  return false
}

function highlightSearchTerm(term) {
  const walker = document.createTreeWalker(
    document.querySelector(".certifications-content"),
    NodeFilter.SHOW_TEXT,
    null,
    false,
  )

  const textNodes = []
  let node

  while ((node = walker.nextNode())) {
    textNodes.push(node)
  }

  textNodes.forEach((textNode) => {
    const parent = textNode.parentNode
    const text = textNode.textContent
    const regex = new RegExp(`(${term})`, "gi")

    if (regex.test(text)) {
      const highlightedText = text.replace(regex, '<mark class="bg-warning text-dark">$1</mark>')
      const wrapper = document.createElement("span")
      wrapper.innerHTML = highlightedText
      parent.replaceChild(wrapper, textNode)
    }
  })
}

// Certification tracking
function trackCertificationView() {
  const viewData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    page: "certifications",
    version: "2025-01-03",
  }

  console.log("Certification page view tracked:", viewData)
  // In a real implementation, this would be sent to your analytics service
}

let hasTrackedView = false
window.addEventListener("scroll", () => {
  if (!hasTrackedView && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    trackCertificationView()
    hasTrackedView = true
  }
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Certifications page loaded in ${loadTime.toFixed(2)}ms`)
})

// Certificate download simulation
function downloadCertificate(certType) {
  // Simulate certificate download
  const link = document.createElement("a")
  link.href = "#"
  link.download = `Special_Forces_Electrician_${certType}_Certificate.pdf`

  // Show download notification
  alert(`Descargando certificado: ${certType}\n\nEn un entorno real, esto descargaría el documento PDF oficial.`)

  console.log(`Certificate download initiated: ${certType}`)
}
