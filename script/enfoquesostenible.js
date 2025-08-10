// ===== ENFOQUE SOSTENIBLE - JAVASCRIPT ESPECÍFICO =====

// Configuración específica para la página de sostenibilidad
const sustainabilityConfig = {
  animationDuration: 2000,
  counterDelay: 100,
  scrollOffset: 100,
  ecoEffects: true,
}

// Función para abrir WhatsApp (específica para proyectos sostenibles)
function openWhatsApp() {
  const phoneNumber = "573173945568"
  const message =
    "¡Hola! Me interesa conocer más sobre sus soluciones eléctricas sostenibles y proyectos de energía renovable. ¿Podrían brindarme información?"
  const encodedMessage = encodeURIComponent(message)
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappURL, "_blank")
}

// Contador animado para estadísticas de sostenibilidad
function animateCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / (sustainabilityConfig.animationDuration / sustainabilityConfig.counterDelay)
    let current = 0

    // Agregar clase de loading
    counter.classList.add("counter-loading")

    const updateCounter = () => {
      if (current < target) {
        current += increment
        if (current > target) current = target

        // Formatear números con sufijos apropiados
        if (target >= 100) {
          counter.textContent = Math.floor(current)
        } else {
          counter.textContent = Math.floor(current) + "%"
        }

        setTimeout(updateCounter, sustainabilityConfig.counterDelay)
      } else {
        // Remover clase de loading y agregar efecto final
        counter.classList.remove("counter-loading")
        counter.style.textShadow = "0 0 20px rgba(255, 193, 7, 0.5)"

        // Efecto de pulso al completar
        counter.style.transform = "scale(1.1)"
        setTimeout(() => {
          counter.style.transform = "scale(1)"
        }, 200)
      }
    }

    updateCounter()
  })
}

// Animación de aparición para elementos
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")

          // Activar contadores cuando sean visibles
          if (entry.target.classList.contains("counter")) {
            // Delay para que se vea mejor el efecto
            setTimeout(() => {
              animateCounters()
            }, 300)
          }

          // Efectos especiales para tarjetas de iniciativas
          if (entry.target.classList.contains("initiative-card")) {
            setTimeout(() => {
              entry.target.style.transform = "translateY(-5px)"
              entry.target.style.boxShadow = "0 15px 35px rgba(40, 167, 69, 0.2)"
            }, 200)
          }

          // Efectos para tarjetas de tecnología
          if (entry.target.classList.contains("tech-card")) {
            setTimeout(() => {
              entry.target.classList.add("green-glow")
            }, 400)
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: `-${sustainabilityConfig.scrollOffset}px`,
    },
  )

  // Observar elementos con animación
  document.querySelectorAll(".stat-card, .initiative-card, .tech-card, .cert-card").forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Efectos especiales de sostenibilidad
function initEcoEffects() {
  if (!sustainabilityConfig.ecoEffects) return

  // Efecto de partículas verdes en el hero
  createEcoParticles()

  // Efecto de hover mejorado para iconos de sostenibilidad
  enhanceSustainabilityIcons()

  // Animación de crecimiento para elementos de naturaleza
  animateNatureElements()
}

// Crear partículas ecológicas
function createEcoParticles() {
  const heroSection = document.querySelector(".hero-section")
  if (!heroSection) return

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(40, 167, 69, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${5 + Math.random() * 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 1;
        `
    heroSection.appendChild(particle)
  }

  // Agregar keyframes para las partículas
  const style = document.createElement("style")
  style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `
  document.head.appendChild(style)
}

// Mejorar iconos de sostenibilidad
function enhanceSustainabilityIcons() {
  const sustainabilityIcons = document.querySelectorAll(".fa-leaf, .fa-solar-panel, .fa-recycle, .fa-bolt")

  sustainabilityIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2) rotate(10deg)"
      this.style.filter = "drop-shadow(0 0 10px rgba(40, 167, 69, 0.8))"
    })

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)"
      this.style.filter = "none"
    })
  })
}

// Animar elementos de naturaleza
function animateNatureElements() {
  const natureElements = document.querySelectorAll(".fa-leaf, .fa-sun")

  natureElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.animation = `leafFloat ${3 + index * 0.5}s ease-in-out infinite`
    }, index * 200)
  })
}

// Efecto de scroll suave para navegación
function initSmoothScroll() {
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
}

// Efecto de typing para textos importantes
function initTypingEffect() {
  const typingElements = document.querySelectorAll(".display-3, .display-5")

  typingElements.forEach((element) => {
    const text = element.textContent
    element.textContent = ""
    element.style.borderRight = "2px solid #ffc107"

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      } else {
        element.style.borderRight = "none"
      }
    }

    // Iniciar el efecto cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500)
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(element)
  })
}

// Calculadora de impacto ambiental (función específica)
function calculateEnvironmentalImpact() {
  const stats = {
    solarPower: 500, // kW
    co2Reduction: 40, // %
    energySaving: 60, // %
    recycledMaterial: 95, // %
  }

  // Mostrar impacto calculado
  console.log("Impacto Ambiental Calculado:", stats)

  // Actualizar contadores con datos reales
  document.querySelectorAll(".counter").forEach((counter) => {
    const target = counter.getAttribute("data-target")
    counter.setAttribute("data-calculated", "true")
  })
}

// Función para mostrar tips de sostenibilidad
function showSustainabilityTips() {
  const tips = [
    "💡 Cambia a iluminación LED para ahorrar hasta 80% de energía",
    "🌞 Los paneles solares pueden reducir tu factura eléctrica hasta 90%",
    "🔋 Las baterías de almacenamiento maximizan el uso de energía renovable",
    "♻️ Reciclar materiales eléctricos reduce el impacto ambiental",
    "🌱 La automatización inteligente optimiza el consumo energético",
  ]

  let currentTip = 0

  const showTip = () => {
    // Crear elemento de tip si no existe
    let tipElement = document.getElementById("sustainability-tip")
    if (!tipElement) {
      tipElement = document.createElement("div")
      tipElement.id = "sustainability-tip"
      tipElement.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1000;
                max-width: 300px;
                transform: translateX(100%);
                transition: transform 0.5s ease;
                cursor: pointer;
            `
      document.body.appendChild(tipElement)

      // Cerrar tip al hacer click
      tipElement.addEventListener("click", () => {
        tipElement.style.transform = "translateX(100%)"
      })
    }

    tipElement.textContent = tips[currentTip]
    tipElement.style.transform = "translateX(0)"

    // Ocultar después de 5 segundos
    setTimeout(() => {
      tipElement.style.transform = "translateX(100%)"
    }, 5000)

    currentTip = (currentTip + 1) % tips.length
  }

  // Mostrar primer tip después de 3 segundos
  setTimeout(showTip, 3000)

  // Mostrar tips cada 30 segundos
  setInterval(showTip, 30000)
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("🌱 Página de Enfoque Sostenible cargada")

  // Inicializar todas las funciones
  observeElements()
  initEcoEffects()
  initSmoothScroll()
  initTypingEffect()
  calculateEnvironmentalImpact()
  showSustainabilityTips()

  // Efectos especiales después de la carga
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 1000)
})

// Función para el newsletter con enfoque sostenible
document.addEventListener("DOMContentLoaded", () => {
  const newsletterBtn = document.querySelector(".newsletter button")
  const newsletterInput = document.querySelector(".newsletter input")

  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener("click", function () {
      const email = newsletterInput.value.trim()
      if (email && email.includes("@")) {
        // Simular suscripción exitosa
        this.innerHTML = '<i class="fas fa-check"></i>'
        this.style.background = "#28a745"
        newsletterInput.value = ""
        newsletterInput.placeholder = "¡Suscrito a noticias verdes!"

        // Mostrar mensaje de confirmación
        const confirmMsg = document.createElement("div")
        confirmMsg.textContent = "🌱 ¡Te mantendremos informado sobre sostenibilidad!"
        confirmMsg.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #28a745;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    z-index: 1001;
                    animation: slideIn 0.5s ease;
                `
        document.body.appendChild(confirmMsg)

        setTimeout(() => {
          confirmMsg.remove()
          this.innerHTML = '<i class="fas fa-paper-plane"></i>'
          this.style.background = ""
          newsletterInput.placeholder = "Tu email"
        }, 3000)
      } else {
        // Error de validación
        newsletterInput.style.borderColor = "#dc3545"
        setTimeout(() => {
          newsletterInput.style.borderColor = ""
        }, 2000)
      }
    })
  }
})

// Agregar estilos de animación adicionales
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    .loaded .stat-card {
        animation: bounceIn 0.6s ease forwards;
    }
    
    .loaded .initiative-card {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .loaded .tech-card {
        animation: slideInRight 0.8s ease forwards;
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`
document.head.appendChild(additionalStyles)