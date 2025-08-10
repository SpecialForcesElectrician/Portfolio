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
})

// Contact Functions
function openWhatsApp() {
  const phoneNumber = "+573173945568"
  const message = "Hola, tengo una consulta sobre la política de privacidad de Special Forces Electrician."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+573173945568"
}

function sendEmail() {
  const subject = "Consulta sobre Política de Privacidad - Special Forces Electrician"
  const body = "Hola,\n\nTengo una consulta sobre la política de privacidad de Special Forces Electrician.\n\nGracias."
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
  const elements = document.querySelectorAll(".content-card, .use-case, .security-feature, .contact-method")

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
  // Add click tracking for privacy sections
  const privacySections = document.querySelectorAll(".privacy-section")

  privacySections.forEach((section, index) => {
    section.addEventListener("click", () => {
      console.log(`Privacy section ${index + 1} clicked`)
      // Here you could add analytics tracking
    })
  })

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(".use-case, .security-feature, .right-item, .contact-method")

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.transform = "translateY(-5px)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = ""
    })
  })

  // Cookie acceptance simulation
  const cookieInfo = document.querySelector(".alert-info")
  if (cookieInfo) {
    cookieInfo.addEventListener("click", () => {
      showCookiePreferences()
    })
  }
}

// Cookie Preferences Modal (simulation)
function showCookiePreferences() {
  const preferences = {
    essential: true,
    performance: confirm("¿Deseas permitir cookies de rendimiento?"),
    marketing: confirm("¿Deseas permitir cookies de marketing?"),
  }

  console.log("Cookie preferences:", preferences)
  alert("Preferencias de cookies guardadas correctamente.")
}

// Print functionality
function printPrivacyPolicy() {
  window.print()
}

// Share functionality
function sharePrivacyPolicy() {
  if (navigator.share) {
    navigator.share({
      title: "Política de Privacidad - Special Forces Electrician",
      text: "Conoce cómo Special Forces Electrician protege tu información personal",
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

// Search functionality within the policy
function searchInPolicy(searchTerm) {
  const content = document.querySelector(".privacy-content")
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
    document.querySelector(".privacy-content"),
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

// Accessibility improvements
function initAccessibility() {
  // Add keyboard navigation for interactive elements
  const interactiveElements = document.querySelectorAll(".content-card, .use-case, .security-feature")

  interactiveElements.forEach((element, index) => {
    element.setAttribute("tabindex", "0")
    element.setAttribute("role", "article")
    element.setAttribute("aria-label", `Sección de privacidad ${index + 1}`)

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
  console.error("Error in privacy policy page:", e.error)
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Privacy policy page loaded in ${loadTime.toFixed(2)}ms`)
})
