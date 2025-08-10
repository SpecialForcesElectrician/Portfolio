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

  // Initialize legal-specific features
  initLegalFeatures()

  // Initialize floating legal info button
  initFloatingLegalInfo()
})

// Contact Functions
function openWhatsApp() {
  const phoneNumber = "+573173945568"
  const message = "Hola, tengo una consulta sobre el aviso legal de Special Forces Electrician."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+573173945568"
}

function sendEmail() {
  const subject = "Consulta Legal - Aviso Legal - Special Forces Electrician"
  const body =
    "Hola,\n\nTengo una consulta sobre el aviso legal de Special Forces Electrician.\n\nEspecíficamente sobre:\n[Describa su consulta aquí]\n\nTemas de interés:\n- Propiedad intelectual\n- Limitaciones de responsabilidad\n- Derechos de autor\n- Otro: ___________\n\nGracias por su atención."
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
    ".content-card, .company-data, .business-data, .contact-method, .legal-document",
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
  // Add click tracking for legal sections
  const legalSections = document.querySelectorAll(".legal-section")

  legalSections.forEach((section, index) => {
    section.addEventListener("click", () => {
      console.log(`Legal section ${index + 1} clicked`)
      // Here you could add analytics tracking
    })
  })

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(
    ".company-data, .business-data, .contact-method, .legal-document",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transform = "translateY(-5px)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = ""
    })
  })

  // Add click effects for liability items
  const liabilityItems = document.querySelectorAll(".liability-item")
  liabilityItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.style.transform = "translateX(10px)"
      setTimeout(() => {
        item.style.transform = "translateX(5px)"
      }, 200)
    })
  })
}

// Legal-specific Features
function initLegalFeatures() {
  // Copyright protection
  initCopyrightProtection()

  // Legal document viewer
  initLegalDocumentViewer()

  // Intellectual property tracker
  initIPTracker()

  // Legal compliance checker
  initComplianceChecker()
}

// Copyright Protection
function initCopyrightProtection() {
  // Disable right-click context menu
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    showCopyrightNotice()
  })

  // Disable text selection on legal content
  const legalContent = document.querySelector(".legal-content")
  if (legalContent) {
    legalContent.addEventListener("selectstart", (e) => {
      if (e.target.tagName === "P" || e.target.tagName === "LI") {
        showCopyrightNotice()
      }
    })
  }

  // Disable keyboard shortcuts for copying
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "a" || e.key === "s")) {
      const selection = window.getSelection().toString()
      if (selection.length > 50) {
        e.preventDefault()
        showCopyrightNotice()
      }
    }
  })
}

function showCopyrightNotice() {
  const notice = `
    © 2025 Special Forces Electrician S.A.S.
    
    Este contenido está protegido por derechos de autor.
    La reproducción no autorizada está prohibida.
    
    Para uso comercial, contacte:
    specialforceselectriciansas@gmail.com
  `

  // Create a temporary notification
  const notification = document.createElement("div")
  notification.className = "copyright-notification"
  notification.innerHTML = `
    <div class="alert alert-warning position-fixed" style="top: 100px; right: 20px; z-index: 9999; max-width: 300px;">
      <i class="fas fa-copyright me-2"></i>
      <strong>Contenido Protegido</strong><br>
      <small>Este material está protegido por derechos de autor.</small>
    </div>
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    document.body.removeChild(notification)
  }, 3000)
}

// Legal Document Viewer
function initLegalDocumentViewer() {
  const legalDocuments = document.querySelectorAll(".legal-document")

  legalDocuments.forEach((doc) => {
    doc.addEventListener("click", () => {
      const docTitle = doc.querySelector("h6").textContent
      const docLink = doc.querySelector("a").href

      showLegalDocumentPreview(docTitle, docLink)
    })
  })
}

function showLegalDocumentPreview(title, link) {
  const preview = `
    Documento Legal: ${title}
    
    Este documento forma parte del marco legal integral de Special Forces Electrician S.A.S.
    
    ¿Desea abrir el documento completo?
  `

  if (confirm(preview)) {
    window.open(link, "_blank")
  }
}

// Intellectual Property Tracker
function initIPTracker() {
  // Track when users view IP-related sections
  const ipSections = document.querySelectorAll(".copyright-section, .trademark-notice")

  const ipObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackIPViewing(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  ipSections.forEach((section) => {
    ipObserver.observe(section)
  })
}

function trackIPViewing(section) {
  const sectionType = section.className.includes("copyright") ? "copyright" : "trademark"
  console.log(`IP section viewed: ${sectionType}`)

  // In a real implementation, this would send data to analytics
  const trackingData = {
    section: sectionType,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  }

  console.log("IP tracking data:", trackingData)
}

// Legal Compliance Checker
function initComplianceChecker() {
  // Check if all required legal elements are present
  const requiredElements = [".company-data", ".copyright-section", ".liability-item", ".contact-legal"]

  const missingElements = requiredElements.filter((selector) => !document.querySelector(selector))

  if (missingElements.length > 0) {
    console.warn("Missing legal elements:", missingElements)
  } else {
    console.log("All required legal elements are present")
  }

  // Validate legal content completeness
  validateLegalContent()
}

function validateLegalContent() {
  const validationChecks = {
    companyInfo: !!document.querySelector(".company-data"),
    copyrightInfo: !!document.querySelector(".copyright-section"),
    liabilityLimitations: !!document.querySelector(".liability-item"),
    contactInfo: !!document.querySelector(".contact-legal"),
    applicableLaw: !!document.querySelector(".applicable-law"),
  }

  const validationResults = Object.entries(validationChecks).map(([check, passed]) => ({
    check,
    passed,
    status: passed ? "✅" : "❌",
  }))

  console.log("Legal content validation:", validationResults)

  // Show validation results to admin users (in development)
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    showValidationResults(validationResults)
  }
}

function showValidationResults(results) {
  const validationDiv = document.createElement("div")
  validationDiv.className = "validation-results position-fixed"
  validationDiv.style.cssText = `
    bottom: 150px;
    left: 20px;
    background: var(--sfe-dark-gray);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--sfe-orange);
    z-index: 9999;
    font-size: 0.8rem;
    max-width: 250px;
  `

  const resultsList = results
    .map((result) => `${result.status} ${result.check}: ${result.passed ? "OK" : "Missing"}`)
    .join("<br>")

  validationDiv.innerHTML = `
    <strong>Legal Validation:</strong><br>
    ${resultsList}
    <br><br>
    <button onclick="this.parentElement.remove()" class="btn btn-warning btn-sm">Close</button>
  `

  document.body.appendChild(validationDiv)
}

// Floating Legal Info Button
function initFloatingLegalInfo() {
  const floatingButton = document.createElement("button")
  floatingButton.innerHTML = '<i class="fas fa-info-circle"></i>'
  floatingButton.className = "floating-legal-info"
  floatingButton.title = "Información Legal Rápida"
  floatingButton.onclick = showQuickLegalInfo

  document.body.appendChild(floatingButton)

  // Show button after scrolling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      floatingButton.classList.add("show")
    } else {
      floatingButton.classList.remove("show")
    }
  })
}

function showQuickLegalInfo() {
  const quickInfo = `
    INFORMACIÓN LEGAL RÁPIDA
    
    📋 Empresa: Special Forces Electrician S.A.S.
    🏛️ Jurisdicción: Colombia
    📧 Contacto Legal: specialforceselectriciansas@gmail.com
    📞 Teléfono: +57 317 3945568
    
    ⚖️ Derechos de Autor: Todos los contenidos están protegidos
    🚫 Limitaciones: Uso personal y no comercial únicamente
    📝 Modificaciones: Nos reservamos el derecho de actualizar
    
    ¿Necesita más información legal específica?
  `

  if (confirm(quickInfo)) {
    sendEmail()
  }
}

// Print functionality
function printLegalNotice() {
  window.print()
}

// Share functionality
function shareLegalNotice() {
  if (navigator.share) {
    navigator.share({
      title: "Aviso Legal - Special Forces Electrician",
      text: "Información legal y derechos de autor de Special Forces Electrician",
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

// Search functionality within the legal notice
function searchInLegalNotice(searchTerm) {
  const content = document.querySelector(".legal-content")
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
  const walker = document.createTreeWalker(document.querySelector(".legal-content"), NodeFilter.SHOW_TEXT, null, false)

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

// Legal compliance monitoring
function initComplianceMonitoring() {
  // Monitor user interactions with legal content
  const legalSections = document.querySelectorAll(".legal-section")

  legalSections.forEach((section, index) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logLegalSectionView(index, section.querySelector("h2").textContent)
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(section)
  })
}

function logLegalSectionView(index, title) {
  const viewData = {
    section: index,
    title: title,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  }

  console.log("Legal section viewed:", viewData)
  // In production, this would be sent to analytics service
}

// Initialize compliance monitoring
document.addEventListener("DOMContentLoaded", initComplianceMonitoring)

// Accessibility improvements
function initAccessibility() {
  // Add keyboard navigation for interactive elements
  const interactiveElements = document.querySelectorAll(".content-card, .legal-document, .contact-method")

  interactiveElements.forEach((element, index) => {
    element.setAttribute("tabindex", "0")
    element.setAttribute("role", "article")
    element.setAttribute("aria-label", `Sección legal ${index + 1}`)

    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        element.click()
      }
    })
  })
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", initAccessibility)

// Error handling
window.addEventListener("error", (e) => {
  console.error("Error in legal notice page:", e.error)
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Legal notice page loaded in ${loadTime.toFixed(2)}ms`)
})

// Legal notice acceptance tracking
function trackLegalNoticeAcceptance() {
  const acceptanceData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    page: "legal-notice",
    version: "2025-01-03",
    sections_viewed: [],
  }

  console.log("Legal notice acceptance tracked:", acceptanceData)
  // In a real implementation, this would be sent to your analytics service
}

// Initialize legal notice acceptance tracking when user scrolls to bottom
let hasTrackedLegalAcceptance = false
window.addEventListener("scroll", () => {
  if (!hasTrackedLegalAcceptance && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    trackLegalNoticeAcceptance()
    hasTrackedLegalAcceptance = true
  }
})

// Legal document download functionality
function downloadLegalDocument(documentType) {
  const documents = {
    "aviso-legal": {
      name: "Aviso_Legal_Special_Forces_Electrician.pdf",
      content: "Aviso Legal completo de Special Forces Electrician S.A.S.",
    },
    "derechos-autor": {
      name: "Derechos_Autor_Special_Forces_Electrician.pdf",
      content: "Información sobre derechos de autor y propiedad intelectual",
    },
    "limitaciones-responsabilidad": {
      name: "Limitaciones_Responsabilidad_Special_Forces_Electrician.pdf",
      content: "Limitaciones de responsabilidad y términos de uso",
    },
  }

  const doc = documents[documentType]
  if (doc) {
    // In a real implementation, this would generate and download a PDF
    alert(`Descargando: ${doc.name}\n\nContenido: ${doc.content}`)
    console.log(`Legal document download requested: ${documentType}`)
  }
}

// Add floating button styles
const floatingButtonStyles = `
  .floating-legal-info {
    position: fixed;
    bottom: 90px;
    left: 30px;
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
    opacity: 0;
    visibility: hidden;
  }
  
  .floating-legal-info.show {
    opacity: 1;
    visibility: visible;
  }
  
  .floating-legal-info:hover {
    background: #e55a2b;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }
  
  .copyright-notification {
    animation: slideInRight 0.3s ease-out;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

// Add styles to document
const styleSheet = document.createElement("style")
styleSheet.textContent = floatingButtonStyles
document.head.appendChild(styleSheet)
