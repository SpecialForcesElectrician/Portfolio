/**
 * ===================================
 * PÁGINA DE PROYECTOS - SPECIAL FORCES ELECTRICIAN
 * JavaScript que incluye funcionalidad del header original + proyectos
 * BARRA DE FILTROS AHORA COMPLETAMENTE FIJA
 * ===================================
 */

// Variables globales del sitio original
const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔌 Página de proyectos Special Forces Electrician cargada!")

  // Inicializar funcionalidades
  initProjectsPage()
  initNavigation()
  initProjectFilters()
  initProjectSearch()
  initLoadMore()
  initProjectCounter()
  initBackToTop()
  initModals()
  updateProjectsCounter()

  // Funcionalidades del header original
  initSmoothScrolling()
  initNavbarScroll()

  /**
   * ===================================
   * INICIALIZACIÓN DE LA PÁGINA DE PROYECTOS
   * ===================================
   */
  function initProjectsPage() {
    // Animar estadísticas al cargar
    animateStats()
    
    // Configurar lazy loading para imágenes
    setupLazyLoading()
    
    console.log("✅ Página de proyectos inicializada")
  }

  /**
   * ===================================
   * NAVEGACIÓN MÓVIL (DEL ORIGINAL)
   * ===================================
   */
  function initNavigation() {
    // Mobile menu close on link click (del original)
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
  }

  /**
   * ===================================
   * SCROLL NAVBAR (DEL ORIGINAL)
   * ===================================
   */
  function initNavbarScroll() {
    // Navbar scroll effect (del original)
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar")
      const filtersSection = document.getElementById('filtersSection')
      
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
      } else {
        navbar.style.backgroundColor = ""
      }

      // Efecto visual para la barra de filtros fija
      if (filtersSection && window.scrollY > 100) {
        filtersSection.classList.add('scrolled')
      } else if (filtersSection) {
        filtersSection.classList.remove('scrolled')
      }
    })
  }

  /**
   * ===================================
   * SMOOTH SCROLLING (DEL ORIGINAL) - AJUSTADO PARA BARRA FIJA
   * ===================================
   */
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href").substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Ajustado para compensar navbar + filtros fijos
          const offsetTop = targetElement.offsetTop - 166 // navbar (76px) + filtros (90px)

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }

  /**
   * ===================================
   * SISTEMA DE FILTROS
   * ===================================
   */
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    const portfolioCards = document.querySelectorAll(".portfolio-card")

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filterValue = this.getAttribute("data-filter")

        // Actualizar botones activos
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        // Limpiar búsqueda cuando se cambia filtro
        const searchInput = document.getElementById("projectSearch")
        if (searchInput) {
          searchInput.value = ""
        }

        // Filtrar tarjetas con animación
        filterProjects(portfolioCards, filterValue)

        // Actualizar contador
        updateProjectsCounter()

        console.log(`Filtro aplicado: ${filterValue}`)
      })
    })
  }

  /**
   * ===================================
   * FUNCIÓN DE FILTRADO CON ANIMACIONES
   * ===================================
   */
  function filterProjects(cards, filterValue) {
    let visibleCount = 0

    cards.forEach((card, index) => {
      const cardCategory = card.getAttribute("data-category")
      const shouldShow = filterValue === "all" || cardCategory === filterValue

      if (shouldShow) {
        // Mostrar tarjeta con delay escalonado
        setTimeout(() => {
          card.style.display = "block"
          card.classList.remove("fade-out", "hidden")
          card.classList.add("fade-in")
        }, index * 50)
        visibleCount++
      } else {
        // Ocultar tarjeta
        card.classList.remove("fade-in")
        card.classList.add("fade-out")
        setTimeout(() => {
          card.style.display = "none"
          card.classList.add("hidden")
        }, 300)
      }
    })

    // Mostrar/ocultar mensaje de sin resultados
    toggleNoResults(visibleCount === 0)
  }

  /**
   * ===================================
   * SISTEMA DE BÚSQUEDA
   * ===================================
   */
  function initProjectSearch() {
    const searchInput = document.getElementById("projectSearch")
    const portfolioCards = document.querySelectorAll(".portfolio-card")
    let searchTimeout

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase().trim()

        // Debounce para mejorar rendimiento
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
          searchProjects(portfolioCards, searchTerm)
          updateProjectsCounter()
        }, 300)
      })
    }
  }

  /**
   * ===================================
   * FUNCIÓN DE BÚSQUEDA
   * ===================================
   */
  function searchProjects(cards, searchTerm) {
    let visibleCount = 0
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all'

    cards.forEach((card, index) => {
      const title = card.querySelector(".project-title").textContent.toLowerCase()
      const category = card.querySelector(".project-category").textContent.toLowerCase()
      const description = card.querySelector(".project-description").textContent.toLowerCase()
      const searchTerms = card.getAttribute("data-search-terms") || ""
      const tags = Array.from(card.querySelectorAll(".tag")).map(tag => tag.textContent.toLowerCase()).join(" ")
      const cardCategory = card.getAttribute("data-category")

      // Combinar todo el contenido buscable
      const searchContent = `${title} ${category} ${description} ${searchTerms} ${tags}`
      
      // Verificar si coincide con la búsqueda Y el filtro activo
      const matchesSearch = searchTerm === "" || searchContent.includes(searchTerm)
      const matchesFilter = activeFilter === "all" || cardCategory === activeFilter
      const shouldShow = matchesSearch && matchesFilter

      if (shouldShow) {
        setTimeout(() => {
          card.style.display = "block"
          card.classList.remove("fade-out", "hidden")
          card.classList.add("fade-in")
        }, index * 30)
        visibleCount++
      } else {
        card.classList.remove("fade-in")
        card.classList.add("fade-out")
        setTimeout(() => {
          card.style.display = "none"
          card.classList.add("hidden")
        }, 200)
      }
    })

    toggleNoResults(visibleCount === 0)
    console.log(`Búsqueda: "${searchTerm}" - ${visibleCount} resultados encontrados`)
  }

  /**
   * ===================================
   * FUNCIONALIDAD CARGAR MÁS
   * ===================================
   */
  function initLoadMore() {
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        // Simular carga de más proyectos
        this.classList.add("loading")
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...'
        
        setTimeout(() => {
          // Aquí podrías cargar más proyectos desde una API
          loadMoreProjects()
          
          this.classList.remove("loading")
          this.innerHTML = '<i class="fas fa-plus-circle"></i> Cargar Más Proyectos'
        }, 1500)
      })
    }
  }

  /**
   * ===================================
   * CARGAR MÁS PROYECTOS (SIMULADO)
   * ===================================
   */
  function loadMoreProjects() {
    // Esta función simula la carga de más proyectos
    const projectsGrid = document.getElementById("projectsGrid")
    const newProjectsHTML = generateMoreProjects()
    
    // Agregar nuevos proyectos al grid
    projectsGrid.insertAdjacentHTML('beforeend', newProjectsHTML)
    
    // Actualizar contador
    updateProjectsCounter()
    
    console.log("Más proyectos cargados")
  }

  /**
   * ===================================
   * GENERAR MÁS PROYECTOS (EJEMPLO)
   * ===================================
   */
  function generateMoreProjects() {
    const moreProjects = [
      {
        category: "comercial",
        title: "Centro Médico La Sabana",
        description: "Sistema eléctrico especializado para centro médico",
        image: "/placeholder.svg?height=300&width=400&text=Centro+Médico+La+Sabana",
        tags: ["Médico", "UPS", "Emergencia"],
        searchTerms: "centro medico sabana hospital clinica ups emergencia"
      },
      {
        category: "energia-renovable",
        title: "Techo Solar Empresarial",
        description: "Sistema fotovoltaico para edificio corporativo",
        image: "/placeholder.svg?height=300&width=400&text=Techo+Solar+Empresarial",
        tags: ["Solar", "Corporativo", "Ahorro"],
        searchTerms: "techo solar empresarial corporativo fotovoltaico ahorro"
      },
      {
        category: "automatizacion",
        title: "Línea de Producción Automatizada",
        description: "Automatización completa de línea manufacturera",
        image: "/placeholder.svg?height=300&width=400&text=Línea+Automatizada",
        tags: ["PLC", "HMI", "Producción"],
        searchTerms: "linea produccion automatizada plc hmi manufactura"
      }
    ]

    return moreProjects.map(project => `
      <div class="portfolio-card" 
           data-category="${project.category}"
           data-search-terms="${project.searchTerms}"
           data-gallery-title="${project.title}"
           data-gallery-images="${project.image}|${project.title}|${project.description}"
           data-project-info="<h3>Descripción del Proyecto</h3><p>${project.description}</p>">
        
        <div class="card-image">
          <img src="${project.image}" alt="${project.title}" class="project-image">
          <div class="card-overlay">
            <div class="card-buttons">
              <button class="btn-zoom" onclick="openImageGallery(this)">
                <i class="fas fa-search-plus"></i>
              </button>
              <button class="btn-info" onclick="openProjectInfo(this)">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-content">
          <span class="project-category">${project.category.toUpperCase()}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('')
  }

  /**
   * ===================================
   * CONTADOR DE PROYECTOS
   * ===================================
   */
  function initProjectCounter() {
    // Crear elemento contador si no existe
    const projectsSection = document.querySelector('.all-projects-section .container')
    if (projectsSection && !document.querySelector('.projects-counter')) {
      const counterHTML = '<div class="projects-counter" id="projectsCounter">Mostrando <strong>0</strong> de <strong>0</strong> proyectos</div>'
      projectsSection.insertAdjacentHTML('afterbegin', counterHTML)
    }
  }

  /**
   * ===================================
   * ACTUALIZAR CONTADOR DE PROYECTOS
   * ===================================
   */
  function updateProjectsCounter() {
    const counter = document.getElementById("projectsCounter")
    const totalProjects = document.querySelectorAll(".portfolio-card").length
    const visibleProjects = document.querySelectorAll(".portfolio-card:not(.hidden)").length
    const totalProjectsSpan = document.getElementById("totalProjects")

    if (counter) {
      counter.innerHTML = `Mostrando <strong>${visibleProjects}</strong> de <strong>${totalProjects}</strong> proyectos`
    }

    if (totalProjectsSpan) {
      totalProjectsSpan.textContent = totalProjects
    }
  }

  /**
   * ===================================
   * MOSTRAR/OCULTAR MENSAJE SIN RESULTADOS
   * ===================================
   */
  function toggleNoResults(show) {
    const noResults = document.getElementById("noResults")
    const projectsGrid = document.getElementById("projectsGrid")
    const loadMoreBtn = document.getElementById("loadMoreBtn")

    if (noResults) {
      noResults.style.display = show ? "block" : "none"
    }
    
    if (projectsGrid) {
      projectsGrid.style.display = show ? "none" : "grid"
    }
    
    if (loadMoreBtn) {
      loadMoreBtn.style.display = show ? "none" : "inline-flex"
    }
  }

  /**
   * ===================================
   * ANIMAR ESTADÍSTICAS
   * ===================================
   */
  function animateStats() {
    const statNumbers = document.querySelectorAll('.projects-stats .stat-number')
    
    statNumbers.forEach(stat => {
      const text = stat.textContent
      const hasPlus = text.includes('+')
      const target = parseInt(text.replace('+', ''))
      let current = 0
      const increment = target / 50
      
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        stat.textContent = Math.floor(current) + (hasPlus ? '+' : '')
      }, 30)
    })
  }

  /**
   * ===================================
   * LAZY LOADING PARA IMÁGENES
   * ===================================
   */
  function setupLazyLoading() {
    const images = document.querySelectorAll('.project-image')
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.classList.add('loaded')
          observer.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))
  }

  /**
   * ===================================
   * BOTÓN BACK TO TOP
   * ===================================
   */
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop')
    
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('show')
        } else {
          backToTopBtn.classList.remove('show')
        }
      })

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      })
    }
  }

  /**
   * ===================================
   * INICIALIZAR MODALES
   * ===================================
   */
  function initModals() {
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
      const imageModal = document.getElementById('imageGalleryModal')
      const infoModal = document.getElementById('projectInfoModal')
      
      if (e.target === imageModal) {
        closeImageGallery()
      }
      if (e.target === infoModal) {
        closeProjectInfo()
      }
    })

    // Cerrar modales con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeImageGallery()
        closeProjectInfo()
      }
    })
  }

  console.log("✅ Funcionalidad de proyectos completamente inicializada")
})

/**
 * ===================================
 * FUNCIONES GLOBALES PARA MODALES
 * ===================================
 */

// Variables globales para galería
let currentImageIndex = 0
let galleryImages = []

// Abrir galería de imágenes
function openImageGallery(button) {
  const card = button.closest('.portfolio-card')
  const galleryData = card.getAttribute('data-gallery-images')
  const galleryTitle = card.getAttribute('data-gallery-title')
  
  if (galleryData) {
    galleryImages = galleryData.split(',').map(item => {
      const parts = item.split('|')
      return {
        src: parts[0],
        title: parts[1] || '',
        description: parts[2] || ''
      }
    })
    
    currentImageIndex = 0
    
    const modal = document.getElementById('imageGalleryModal')
    const titleElement = document.getElementById('galleryTitle')
    const mainImage = document.getElementById('galleryMainImage')
    const thumbnailsContainer = document.getElementById('galleryThumbnails')
    const currentIndexElement = document.getElementById('currentImageIndex')
    const totalImagesElement = document.getElementById('totalImages')
    
    // Configurar título
    titleElement.textContent = galleryTitle
    
    // Configurar imagen principal
    updateGalleryImage()
    
    // Crear thumbnails
    createThumbnails(thumbnailsContainer)
    
    // Configurar contador
    currentIndexElement.textContent = currentImageIndex + 1
    totalImagesElement.textContent = galleryImages.length
    
    modal.style.display = 'block'
  }
}

// Actualizar imagen de galería
function updateGalleryImage() {
  const mainImage = document.getElementById('galleryMainImage')
  const descriptionElement = document.getElementById('galleryDescription')
  const currentIndexElement = document.getElementById('currentImageIndex')
  
  const currentImage = galleryImages[currentImageIndex]
  
  mainImage.src = currentImage.src
  mainImage.alt = currentImage.title
  descriptionElement.textContent = currentImage.description
  currentIndexElement.textContent = currentImageIndex + 1
}

// Crear thumbnails
function createThumbnails(container) {
  container.innerHTML = ''
  
  galleryImages.forEach((image, index) => {
    const thumbnail = document.createElement('img')
    thumbnail.src = image.src
    thumbnail.alt = image.title
    thumbnail.style.width = '80px'
    thumbnail.style.height = '60px'
    thumbnail.style.objectFit = 'cover'
    thumbnail.style.cursor = 'pointer'
    thumbnail.style.borderRadius = '5px'
    thumbnail.style.border = index === currentImageIndex ? '2px solid #ff6b35' : '2px solid transparent'
    
    thumbnail.addEventListener('click', () => {
      currentImageIndex = index
      updateGalleryImage()
      createThumbnails(container) // Actualizar thumbnails
    })
    
    container.appendChild(thumbnail)
  })
}

// Navegación de galería
function previousImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
  updateGalleryImage()
  createThumbnails(document.getElementById('galleryThumbnails'))
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length
  updateGalleryImage()
  createThumbnails(document.getElementById('galleryThumbnails'))
}

// Cerrar galería
function closeImageGallery() {
  document.getElementById('imageGalleryModal').style.display = 'none'
}

// Abrir información del proyecto
function openProjectInfo(button) {
  const card = button.closest('.portfolio-card')
  const projectInfo = card.getAttribute('data-project-info')
  const projectTitle = card.querySelector('.project-title').textContent
  
  const modal = document.getElementById('projectInfoModal')
  const titleElement = document.getElementById('infoTitle')
  const contentElement = document.getElementById('infoContent')
  
  titleElement.textContent = projectTitle
  contentElement.innerHTML = projectInfo
  
  modal.style.display = 'block'
}

// Cerrar información del proyecto
function closeProjectInfo() {
  document.getElementById('projectInfoModal').style.display = 'none'
}

/**
 * ===================================
 * FUNCIONES DE CONTACTO (DEL ORIGINAL)
 * ===================================
 */
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

/**
 * ===================================
 * FUNCIONES DE UTILIDAD
 * ===================================
 */

// Función para obtener proyectos filtrados
function getFilteredProjects() {
  const visibleCards = document.querySelectorAll(".portfolio-card:not(.hidden)")
  return Array.from(visibleCards).map(card => ({
    title: card.querySelector(".project-title").textContent,
    category: card.getAttribute("data-category"),
    description: card.querySelector(".project-description").textContent
  }))
}

// Función para resetear filtros y búsqueda
function resetFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const searchInput = document.getElementById("projectSearch")
  const portfolioCards = document.querySelectorAll(".portfolio-card")

  // Resetear botones
  filterButtons.forEach(btn => btn.classList.remove("active"))
  document.querySelector('.filter-btn[data-filter="all"]').classList.add("active")

  // Limpiar búsqueda
  if (searchInput) {
    searchInput.value = ""
  }

  // Mostrar todas las tarjetas
  portfolioCards.forEach(card => {
    card.style.display = "block"
    card.classList.remove("fade-out", "hidden")
    card.classList.add("fade-in")
  })

  // Ocultar mensaje sin resultados
  const noResults = document.getElementById("noResults")
  if (noResults) {
    noResults.style.display = "none"
  }
  
  // Actualizar contador
  const counter = document.getElementById("projectsCounter")
  const totalProjects = document.querySelectorAll(".portfolio-card").length
  if (counter) {
    counter.innerHTML = `Mostrando <strong>${totalProjects}</strong> de <strong>${totalProjects}</strong> proyectos`
  }
}

// Función para validar email (del original)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Exponer funciones globalmente si es necesario
window.resetProjectFilters = resetFilters
window.getFilteredProjects = getFilteredProjects
window.openImageGallery = openImageGallery
window.openProjectInfo = openProjectInfo
window.closeImageGallery = closeImageGallery
window.closeProjectInfo = closeProjectInfo
window.previousImage = previousImage
window.nextImage = nextImage
window.openWhatsApp = openWhatsApp
window.makeCall = makeCall
window.sendEmail = sendEmail
window.scrollToContact = scrollToContact

console.log("✅ Página de proyectos Special Forces Electrician completamente funcional")