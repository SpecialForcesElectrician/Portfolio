// Accessibility Tools JavaScript
const bootstrap = window.bootstrap

class AccessibilityTools {
  constructor() {
    this.currentFontSize = 16
    this.isHighContrast = false
    this.isDarkMode = false
    this.isFocusMode = false
    this.isReadingGuide = false
    this.isLargeCursor = false
    this.isSoundEnabled = true
    this.isAnimationsPaused = false
    this.isTextToSpeechActive = false

    this.init()
  }

  init() {
    this.bindEvents()
    this.loadSettings()
    this.createReadingGuide()
    this.setupKeyboardNavigation()
    this.setupTextToSpeech()
    this.announcePageLoad()
  }

  bindEvents() {
    // Font size controls
    const decreaseBtn = document.getElementById("decrease-font")
    const normalBtn = document.getElementById("normal-font")
    const increaseBtn = document.getElementById("increase-font")

    if (decreaseBtn) decreaseBtn.addEventListener("click", () => this.changeFontSize(-2))
    if (normalBtn) normalBtn.addEventListener("click", () => this.resetFontSize())
    if (increaseBtn) increaseBtn.addEventListener("click", () => this.changeFontSize(2))

    // Contrast controls
    const normalContrastBtn = document.getElementById("normal-contrast")
    const highContrastBtn = document.getElementById("high-contrast")
    const darkModeBtn = document.getElementById("dark-mode")

    if (normalContrastBtn) normalContrastBtn.addEventListener("click", () => this.setNormalContrast())
    if (highContrastBtn) highContrastBtn.addEventListener("click", () => this.toggleHighContrast())
    if (darkModeBtn) darkModeBtn.addEventListener("click", () => this.toggleDarkMode())

    // Navigation controls
    const focusModeBtn = document.getElementById("focus-mode")
    const readingGuideBtn = document.getElementById("reading-guide")
    const cursorSizeBtn = document.getElementById("cursor-size")

    if (focusModeBtn) focusModeBtn.addEventListener("click", () => this.toggleFocusMode())
    if (readingGuideBtn) readingGuideBtn.addEventListener("click", () => this.toggleReadingGuide())
    if (cursorSizeBtn) cursorSizeBtn.addEventListener("click", () => this.toggleLargeCursor())

    // Audio controls
    const textToSpeechBtn = document.getElementById("text-to-speech")
    const pauseAnimationsBtn = document.getElementById("pause-animations")
    const soundEffectsBtn = document.getElementById("sound-effects")

    if (textToSpeechBtn) textToSpeechBtn.addEventListener("click", () => this.toggleTextToSpeech())
    if (pauseAnimationsBtn) pauseAnimationsBtn.addEventListener("click", () => this.toggleAnimations())
    if (soundEffectsBtn) soundEffectsBtn.addEventListener("click", () => this.toggleSoundEffects())

    // Mobile menu
    const mobileToggle = document.querySelector(".mobile-menu-toggle")
    if (mobileToggle) {
      mobileToggle.addEventListener("click", this.toggleMobileMenu)
      mobileToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          this.toggleMobileMenu()
        }
      })
    }

    // WhatsApp float button keyboard support
    const whatsappFloat = document.querySelector(".whatsapp-float")
    if (whatsappFloat) {
      whatsappFloat.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          const link = whatsappFloat.querySelector("a")
          if (link) link.click()
        }
      })
    }
  }

  changeFontSize(change) {
    this.currentFontSize = Math.max(12, Math.min(24, this.currentFontSize + change))
    document.documentElement.style.setProperty("--font-size-base", `${this.currentFontSize}px`)
    this.saveSettings()
    this.announceChange(`Tamaño de fuente cambiado a ${this.currentFontSize} píxeles`)
    this.playSound("click")
  }

  resetFontSize() {
    this.currentFontSize = 16
    document.documentElement.style.setProperty("--font-size-base", "16px")
    this.saveSettings()
    this.announceChange("Tamaño de fuente restaurado a normal")
    this.playSound("click")
  }

  setNormalContrast() {
    document.body.classList.remove("high-contrast", "dark-mode")
    this.isHighContrast = false
    this.isDarkMode = false
    this.updateButtonStates()
    this.saveSettings()
    this.announceChange("Contraste normal activado")
    this.playSound("click")
  }

  toggleHighContrast() {
    this.isHighContrast = !this.isHighContrast
    document.body.classList.toggle("high-contrast", this.isHighContrast)
    document.body.classList.remove("dark-mode")
    this.isDarkMode = false
    this.updateButtonStates()
    this.saveSettings()
    this.announceChange(this.isHighContrast ? "Alto contraste activado" : "Alto contraste desactivado")
    this.playSound("click")
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode
    document.body.classList.toggle("dark-mode", this.isDarkMode)
    document.body.classList.remove("high-contrast")
    this.isHighContrast = false
    this.updateButtonStates()
    this.saveSettings()
    this.announceChange(this.isDarkMode ? "Modo oscuro activado" : "Modo oscuro desactivado")
    this.playSound("click")
  }

  toggleFocusMode() {
    this.isFocusMode = !this.isFocusMode
    document.body.classList.toggle("focus-mode", this.isFocusMode)

    if (this.isFocusMode) {
      this.addFocusStyles()
    } else {
      this.removeFocusStyles()
    }

    this.updateButtonStates()
    this.saveSettings()
    this.announceChange(this.isFocusMode ? "Modo de enfoque activado" : "Modo de enfoque desactivado")
    this.playSound("click")
  }

  toggleReadingGuide() {
    this.isReadingGuide = !this.isReadingGuide
    const guide = document.getElementById("reading-guide-line")

    if (this.isReadingGuide) {
      if (guide) guide.style.display = "block"
      document.addEventListener("mousemove", this.updateReadingGuide)
    } else {
      if (guide) guide.style.display = "none"
      document.removeEventListener("mousemove", this.updateReadingGuide)
    }

    this.updateButtonStates()
    this.saveSettings()
    this.announceChange(this.isReadingGuide ? "Guía de lectura activada" : "Guía de lectura desactivada")
    this.playSound("click")
  }

  toggleLargeCursor() {
    this.isLargeCursor = !this.isLargeCursor
    document.body.classList.toggle("large-cursor", this.isLargeCursor)
    this.updateButtonStates()
    this.saveSettings()
    this.announceChange(this.isLargeCursor ? "Cursor grande activado" : "Cursor normal restaurado")
    this.playSound("click")
  }

  toggleTextToSpeech() {
    if ("speechSynthesis" in window) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel()
        this.isTextToSpeechActive = false
        this.announceChange("Lectura de texto detenida")
      } else {
        this.isTextToSpeechActive = true
        this.readPageContent()
      }
    } else {
      this.announceChange("Lectura de texto no disponible en este navegador")
    }
    this.playSound("click")
  }

  toggleAnimations() {
    this.isAnimationsPaused = !this.isAnimationsPaused

    if (this.isAnimationsPaused) {
      const style = document.createElement("style")
      style.id = "pause-animations"
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `
      document.head.appendChild(style)
    } else {
      const style = document.getElementById("pause-animations")
      if (style) style.remove()
    }

    this.updateButtonStates()
    this.saveSettings()
    this.announceChange(this.isAnimationsPaused ? "Animaciones pausadas" : "Animaciones activadas")
    this.playSound("click")
  }

  toggleSoundEffects() {
    this.isSoundEnabled = !this.isSoundEnabled
    this.updateButtonStates()
    this.saveSettings()
    this.announceChange(this.isSoundEnabled ? "Efectos de sonido activados" : "Efectos de sonido desactivados")
    if (this.isSoundEnabled) this.playSound("click")
  }

  createReadingGuide() {
    const guide = document.createElement("div")
    guide.id = "reading-guide-line"
    guide.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--sfe-orange);
      z-index: 9999;
      display: none;
      pointer-events: none;
      box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
    `
    document.body.appendChild(guide)
  }

  updateReadingGuide = (e) => {
    const guide = document.getElementById("reading-guide-line")
    if (guide) {
      guide.style.top = `${e.clientY}px`
    }
  }

  addFocusStyles() {
    const style = document.createElement("style")
    style.id = "focus-mode-styles"
    style.textContent = `
      *:focus {
        outline: 4px solid var(--sfe-orange) !important;
        outline-offset: 4px !important;
        background-color: rgba(255, 107, 53, 0.1) !important;
      }
    `
    document.head.appendChild(style)
  }

  removeFocusStyles() {
    const style = document.getElementById("focus-mode-styles")
    if (style) style.remove()
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // Alt + 1: Skip to main content
      if (e.altKey && e.key === "1") {
        e.preventDefault()
        const main = document.querySelector("main")
        if (main) {
          main.focus()
          main.scrollIntoView()
        }
      }

      // Alt + 2: Skip to navigation
      if (e.altKey && e.key === "2") {
        e.preventDefault()
        const nav = document.querySelector("nav")
        if (nav) {
          const firstLink = nav.querySelector("a")
          if (firstLink) firstLink.focus()
        }
      }

      // Escape: Close any open modals or reset focus
      if (e.key === "Escape") {
        if (document.activeElement) {
          document.activeElement.blur()
        }
      }
    })
  }

  setupTextToSpeech() {
    // Add click listeners to read content on demand
    document.querySelectorAll("h1, h2, h3, p, button, a").forEach((element) => {
      element.addEventListener("focus", () => {
        if (this.isTextToSpeechActive) {
          this.speakText(element.textContent || "")
        }
      })
    })
  }

  readPageContent() {
    const content = document.querySelector("main")
    if (content && "speechSynthesis" in window) {
      const text = this.extractTextContent(content)
      this.speakText(text)
      this.announceChange("Iniciando lectura de la página")
    }
  }

  extractTextContent(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false)

    let text = ""
    let node

    while ((node = walker.nextNode())) {
      const parent = node.parentElement
      if (parent && !parent.matches('script, style, [aria-hidden="true"]')) {
        text += node.textContent.trim() + " "
      }
    }

    return text.trim()
  }

  speakText(text) {
    if ("speechSynthesis" in window && text) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  announceChange(message) {
    // Create or update live region for screen readers
    let liveRegion = document.getElementById("accessibility-announcements")
    if (!liveRegion) {
      liveRegion = document.createElement("div")
      liveRegion.id = "accessibility-announcements"
      liveRegion.setAttribute("aria-live", "polite")
      liveRegion.setAttribute("aria-atomic", "true")
      liveRegion.className = "sr-only"
      document.body.appendChild(liveRegion)
    }

    liveRegion.textContent = message

    // Clear after 3 seconds
    setTimeout(() => {
      liveRegion.textContent = ""
    }, 3000)
  }

  announcePageLoad() {
    setTimeout(() => {
      this.announceChange(
        "Página de accesibilidad cargada. Use las herramientas disponibles para personalizar su experiencia.",
      )
    }, 1000)
  }

  playSound(type) {
    if (!this.isSoundEnabled) return

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      switch (type) {
        case "click":
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
          break
        case "success":
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
          break
        case "error":
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
          break
      }

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      console.log("Audio context not available")
    }
  }

  updateButtonStates() {
    // Update button active states
    const buttons = {
      "high-contrast": this.isHighContrast,
      "dark-mode": this.isDarkMode,
      "focus-mode": this.isFocusMode,
      "reading-guide": this.isReadingGuide,
      "cursor-size": this.isLargeCursor,
      "pause-animations": this.isAnimationsPaused,
      "sound-effects": this.isSoundEnabled,
    }

    Object.entries(buttons).forEach(([id, isActive]) => {
      const button = document.getElementById(id)
      if (button) {
        button.classList.toggle("active", isActive)
      }
    })
  }

  saveSettings() {
    const settings = {
      fontSize: this.currentFontSize,
      highContrast: this.isHighContrast,
      darkMode: this.isDarkMode,
      focusMode: this.isFocusMode,
      readingGuide: this.isReadingGuide,
      largeCursor: this.isLargeCursor,
      soundEnabled: this.isSoundEnabled,
      animationsPaused: this.isAnimationsPaused,
    }

    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
  }

  loadSettings() {
    const saved = localStorage.getItem("accessibility-settings")
    if (saved) {
      try {
        const settings = JSON.parse(saved)

        if (settings.fontSize) {
          this.currentFontSize = settings.fontSize
          document.documentElement.style.setProperty("--font-size-base", `${this.currentFontSize}px`)
        }

        if (settings.highContrast) {
          this.isHighContrast = true
          document.body.classList.add("high-contrast")
        }

        if (settings.darkMode) {
          this.isDarkMode = true
          document.body.classList.add("dark-mode")
        }

        if (settings.focusMode) {
          this.isFocusMode = true
          this.addFocusStyles()
        }

        if (settings.largeCursor) {
          this.isLargeCursor = true
          document.body.classList.add("large-cursor")
        }

        if (settings.animationsPaused) {
          this.isAnimationsPaused = true
          this.toggleAnimations()
        }

        this.isSoundEnabled = settings.soundEnabled !== false

        this.updateButtonStates()
      } catch (error) {
        console.log("Error loading accessibility settings")
      }
    }
  }

  toggleMobileMenu() {
    const nav = document.querySelector(".nav ul")
    const toggle = document.querySelector(".mobile-menu-toggle")

    if (nav && toggle) {
      const isOpen = nav.classList.contains("show")
      nav.classList.toggle("show", !isOpen)

      toggle.setAttribute("aria-expanded", !isOpen)
      toggle.setAttribute("aria-label", isOpen ? "Abrir menú móvil" : "Cerrar menú móvil")
    }
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize accessibility tools
  new AccessibilityTools()

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
})

// Contact Functions
function openWhatsApp() {
  const phoneNumber = "+573173945568"
  const message =
    "Hola, me interesa conocer más sobre las características de accesibilidad de Special Forces Electrician."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

function makeCall() {
  window.location.href = "tel:+573173945568"
}

function sendEmail() {
  const subject = "Consulta de Accesibilidad - Special Forces Electrician"
  const body =
    "Hola,\n\nTengo una consulta sobre las características de accesibilidad de Special Forces Electrician.\n\nEspecíficamente sobre:\n[Describa su consulta aquí]\n\nGracias por su atención."
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
    ".content-card, .tool-item, .feature-item, .compliance-item, .contact-method, .time-commitment",
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

// Error handling
window.addEventListener("error", (e) => {
  console.error("Error in accessibility page:", e.error)
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Accessibility page loaded in ${loadTime.toFixed(2)}ms`)
})

// Accessibility acceptance tracking
function trackAccessibilityUsage() {
  const usageData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    page: "accessibility",
    version: "2025-01-03",
  }

  console.log("Accessibility usage tracked:", usageData)
  // In a real implementation, this would be sent to your analytics service
}

// Initialize accessibility usage tracking when user interacts with tools
let hasTrackedUsage = false
document.addEventListener("click", (e) => {
  if (!hasTrackedUsage && e.target.closest(".tool-controls")) {
    trackAccessibilityUsage()
    hasTrackedUsage = true
  }
})
