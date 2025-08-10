// Global Variables
const bootstrap = window.bootstrap

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize smooth scrolling for navigation links
  initSmoothScrolling()

  // Initialize back to top button
  initBackToTop()

  // Initialize animations when DOM is loaded
  animateOnScroll()

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

  // Initialize content interactions
  initContentInteractions()

  // Initialize terms-specific features
  initTermsFeatures()
})

// Contact Functions
function openWhatsApp() {
  const phoneNumber = "+573173945568"
  const message = "Hola, tengo una consulta sobre los términos de servicio de Special Forces Electrician."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+573173945568"
}

function sendEmail() {
  const subject = "Consulta Legal - Términos de Servicio - Special Forces Electrician"
  const body =
    "Hola,\n\nTengo una consulta sobre los términos de servicio de Special Forces Electrician.\n\nEspecíficamente sobre:\n[Describa su consulta aquí]\n\nGracias por su atención."
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
  const elements = document.querySelectorAll(
    ".content-card, .service-item, .payment-method, .responsibility-section, .process-step, .contact-method",
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
  // Add click tracking for terms sections
  const termsSections = document.querySelectorAll(".terms-section")

  termsSections.forEach((section, index) => {
    section.addEventListener("click", () => {
      console.log(`Terms section ${index + 1} clicked`)
      // Here you could add analytics tracking
    })
  })

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(
    ".service-item, .payment-method, .responsibility-section, .process-step, .contact-method",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transform = "translateY(-5px)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = ""
    })
  })

  // Add click effects for condition items
  const conditionItems = document.querySelectorAll(".condition-item")
  conditionItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.style.transform = "translateX(10px)"
      setTimeout(() => {
        item.style.transform = "translateX(5px)"
      }, 200)
    })
  })
}

// Terms-specific Features
function initTermsFeatures() {
  // Contract simulation
  initContractSimulation()

  // Payment calculator
  initPaymentCalculator()

  // Service selector
  initServiceSelector()

  // Legal document generator
  initLegalDocumentGenerator()
}

// Contract Simulation
function initContractSimulation() {
  const serviceItems = document.querySelectorAll(".service-item")

  serviceItems.forEach((item) => {
    item.addEventListener("click", () => {
      showContractPreview(item)
    })
  })
}

function showContractPreview(serviceItem) {
  const serviceName = serviceItem.querySelector("h5").textContent
  const serviceDetails = Array.from(serviceItem.querySelectorAll("li")).map((li) => li.textContent)

  const contractPreview = `
    CONTRATO DE SERVICIOS ELÉCTRICOS
    
    Servicio: ${serviceName}
    Incluye: ${serviceDetails.join(", ")}
    
    Términos aplicables:
    - Anticipo: 50%
    - Garantía: 12 meses
    - Plazo: Según cotización específica
  `

  alert(contractPreview)
}

// Payment Calculator
function initPaymentCalculator() {
  // Create a simple payment calculator modal
  const paymentButtons = document.querySelectorAll(".payment-method, .payment-terms")

  paymentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showPaymentCalculator()
    })
  })
}

function showPaymentCalculator() {
  const projectValue = prompt("Ingrese el valor estimado del proyecto (COP):")

  if (projectValue && !isNaN(projectValue)) {
    const value = Number.parseFloat(projectValue)
    const anticipo = value * 0.5
    const avance = value * 0.3
    const saldo = value * 0.2

    const calculation = `
    CALCULADORA DE PAGOS
    
    Valor del Proyecto: $${value.toLocaleString("es-CO")} COP
    
    Distribución de pagos:
    • Anticipo (50%): $${anticipo.toLocaleString("es-CO")} COP
    • Avance (30%): $${avance.toLocaleString("es-CO")} COP
    • Saldo (20%): $${saldo.toLocaleString("es-CO")} COP
    
    ¿Desea solicitar una cotización formal?
    `

    if (confirm(calculation)) {
      openWhatsApp()
    }
  }
}

// Service Selector
function initServiceSelector() {
  const serviceItems = document.querySelectorAll(".service-item")
  const selectedServices = []

  serviceItems.forEach((item) => {
    item.addEventListener("dblclick", () => {
      toggleServiceSelection(item)
    })
  })
}

function toggleServiceSelection(serviceItem) {
  const serviceName = serviceItem.querySelector("h5").textContent

  if (serviceItem.classList.contains("selected")) {
    serviceItem.classList.remove("selected")
    serviceItem.style.border = "1px solid rgba(255, 107, 53, 0.2)"
  } else {
    serviceItem.classList.add("selected")
    serviceItem.style.border = "2px solid var(--sfe-orange)"
    serviceItem.style.boxShadow = "0 0 20px rgba(255, 107, 53, 0.3)"
  }
}

// Legal Document Generator
function initLegalDocumentGenerator() {
  // Add a floating action button for document generation
  const floatingButton = document.createElement("button")
  floatingButton.innerHTML = '<i class="fas fa-file-contract"></i>'
  floatingButton.className = "floating-legal-btn"
  floatingButton.title = "Generar Documento Legal"
  floatingButton.onclick = generateLegalDocument

  document.body.appendChild(floatingButton)
}

function generateLegalDocument() {
  const documentType = prompt(
    "Seleccione tipo de documento:\n1. Contrato de Servicios\n2. Cotización Formal\n3. Acuerdo de Confidencialidad\n\nIngrese el número:",
  )

  switch (documentType) {
    case "1":
      generateServiceContract()
      break
    case "2":
      generateFormalQuote()
      break
    case "3":
      generateNDA()
      break
    default:
      alert("Opción no válida")
  }
}

function generateServiceContract() {
  const clientName = prompt("Nombre del cliente:")
  const projectDescription = prompt("Descripción del proyecto:")

  if (clientName && projectDescription) {
    const contract = `
    CONTRATO DE PRESTACIÓN DE SERVICIOS ELÉCTRICOS
    
    Entre: Special Forces Electrician S.A.S.
    Y: ${clientName}
    
    Objeto: ${projectDescription}
    
    Este documento se rige por los términos de servicio publicados en nuestro sitio web.
    
    Para continuar con la formalización, contacte nuestro equipo legal.
    `

    alert(contract)
    sendEmail()
  }
}

function generateFormalQuote() {
  alert(
    "Para generar una cotización formal, será redirigido a WhatsApp donde nuestro equipo le solicitará los detalles específicos del proyecto.",
  )
  openWhatsApp()
}

function generateNDA() {
  alert("El acuerdo de confidencialidad será enviado por email. Contactando equipo legal...")
  sendEmail()
}

// Print functionality
function printTerms() {
  window.print()
}

// Share functionality
function shareTerms() {
  if (navigator.share) {
    navigator.share({
      title: "Términos de Servicio - Special Forces Electrician",
      text: "Conoce los términos y condiciones de Special Forces Electrician",
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

// Search functionality within the terms
function searchInTerms(searchTerm) {
  const content = document.querySelector(".terms-content")
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
  const walker = document.createTreeWalker(document.querySelector(".terms-content"), NodeFilter.SHOW_TEXT, null, false)

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

// Accessibility improvements
function initAccessibility() {
  // Add keyboard navigation for interactive elements
  const interactiveElements = document.querySelectorAll(".content-card, .service-item, .payment-method")

  interactiveElements.forEach((element, index) => {
    element.setAttribute("tabindex", "0")
    element.setAttribute("role", "article")
    element.setAttribute("aria-label", `Sección de términos ${index + 1}`)

    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        element.click()
      }
    })
  })
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", initAccessibility)

// Add floating legal button styles
const floatingButtonStyles = `
  .floating-legal-btn {
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
  
  .floating-legal-btn:hover {
    background: #e55a2b;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }
`

// Add styles to document
const styleSheet = document.createElement("style")
styleSheet.textContent = floatingButtonStyles
document.head.appendChild(styleSheet)

// Error handling
window.addEventListener("error", (e) => {
  console.error("Error in terms of service page:", e.error)
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Terms of service page loaded in ${loadTime.toFixed(2)}ms`)
})

// Terms acceptance tracking
function trackTermsAcceptance() {
  const acceptanceData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    page: "terms-of-service",
    version: "2025-01-03",
  }

  console.log("Terms acceptance tracked:", acceptanceData)
  // In a real implementation, this would be sent to your analytics service
}

// Initialize terms acceptance tracking when user scrolls to bottom
let hasTrackedAcceptance = false
window.addEventListener("scroll", () => {
  if (!hasTrackedAcceptance && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    trackTermsAcceptance()
    hasTrackedAcceptance = true
  }
})
