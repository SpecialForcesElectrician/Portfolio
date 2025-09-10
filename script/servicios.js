// ===== VARIABLES GLOBALES =====
const phoneNumber = "+573173945568"; // Número de WhatsApp
const emailAddress = "specialforceselectriciansas@gmail.com";
const companyPhone = "+573173945568";

// ===== FUNCIONES DE CONTACTO =====

/**
 * Abre WhatsApp con mensaje personalizado según el servicio
 * @param {string} service - Tipo de servicio solicitado
 */
function openWhatsApp(service = '') {
    let message = "Hola, me interesa obtener información sobre ";
    
    const serviceMessages = {
        'instalaciones': "servicios de instalaciones eléctricas industriales, comerciales y residenciales.",
        'redes': "servicios de redes de datos, cableado estructurado y fibra óptica.",
        'seguridad': "sistemas de seguridad electrónica, CCTV y domótica.",
        'solar': "sistemas de energía solar y renovable.",
        'mantenimiento': "servicios de mantenimiento eléctrico preventivo y correctivo.",
        'materiales': "venta de materiales y herramientas eléctricas certificadas."
    };
    
    message += serviceMessages[service] || "sus servicios eléctricos especializados.";
    message += "\n\nMe gustaría recibir una cotización personalizada.";
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/**
 * Realiza una llamada telefónica
 */
function makeCall() {
    window.location.href = `tel:${companyPhone}`;
}

/**
 * Desplaza suavemente a la sección de servicios
 */
function scrollToServices() {
    const servicesSection = document.getElementById('servicios-detallados');
    if (servicesSection) {
        const offsetTop = servicesSection.offsetTop - 80; // Compensar navbar fijo
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Muestra información adicional sobre un servicio específico
 * @param {string} service - Tipo de servicio
 */
function showMoreInfo(service) {
    const serviceInfo = {
        'instalaciones': {
            title: 'Instalaciones Eléctricas Profesionales',
            content: `
                <strong>Servicios Completos:</strong><br>
                • Diseño eléctrico con software especializado<br>
                • Instalaciones certificadas RETIE<br>
                • Sistemas de puesta a tierra<br>
                • Iluminación LED inteligente<br>
                • Tableros de distribución<br>
                • Automatización industrial<br><br>
                
                <strong>Garantías:</strong><br>
                • 5 años en instalaciones<br>
                • 25 años en paneles LED<br>
                • Mantenimiento gratuito primer año<br>
                • Soporte técnico 24/7<br><br>
                
                <strong>Certificaciones:</strong><br>
                • RETIE (Reglamento Técnico de Instalaciones Eléctricas)<br>
                • ISO 9001:2015<br>
                • NFPA 70E<br>
                • IEEE Standards
            `
        },
        'redes': {
            title: 'Redes de Datos y Comunicaciones',
            content: `
                <strong>Tecnologías Implementadas:</strong><br>
                • Cableado estructurado Cat 6A/7<br>
                • Fibra óptica monomodo/multimodo<br>
                • Redes inalámbricas empresariales<br>
                • Datacenters modulares<br>
                • Sistemas de climatización IT<br>
                • Monitoreo de infraestructura<br><br>
                
                <strong>Velocidades Soportadas:</strong><br>
                • Hasta 10 Gbps en cobre<br>
                • Hasta 100 Gbps en fibra óptica<br>
                • Latencia ultra baja<br>
                • Redundancia automática<br><br>
                
                <strong>Certificaciones:</strong><br>
                • TIA/EIA-568<br>
                • ISO/IEC 11801<br>
                • Fluke Networks Certified<br>
                • Panduit Certified Installer
            `
        },
        'seguridad': {
            title: 'Seguridad Electrónica Inteligente',
            content: `
                <strong>Sistemas Integrados:</strong><br>
                • CCTV 4K con IA<br>
                • Control de acceso biométrico<br>
                • Detección de incendios<br>
                • Sistemas de alarma<br>
                • Domótica residencial/comercial<br>
                • Monitoreo remoto 24/7<br><br>
                
                <strong>Características Avanzadas:</strong><br>
                • Reconocimiento facial<br>
                • Análisis de comportamiento<br>
                • Alertas en tiempo real<br>
                • Integración con smartphones<br>
                • Grabación en la nube<br><br>
                
                <strong>Beneficios:</strong><br>
                • Reducción 90% incidentes<br>
                • Respuesta inmediata<br>
                • Evidencia digital<br>
                • Control total remoto
            `
        },
        'solar': {
            title: 'Energía Solar Fotovoltaica',
            content: `
                <strong>Componentes Premium:</strong><br>
                • Paneles monocristalinos Tier 1<br>
                • Inversores con optimizadores<br>
                • Baterías de litio (opcional)<br>
                • Estructuras de aluminio<br>
                • Monitoreo inteligente<br>
                • Protecciones eléctricas<br><br>
                
                <strong>Tipos de Sistemas:</strong><br>
                • On-Grid (conectado a red)<br>
                • Off-Grid (autónomo)<br>
                • Híbrido (con respaldo)<br>
                • Bombeo solar<br><br>
                
                <strong>Beneficios Económicos:</strong><br>
                • Ahorro hasta 95% factura<br>
                • ROI en 3-5 años<br>
                • Venta de excedentes<br>
                • Incentivos tributarios<br>
                • Valorización inmueble 15%
            `
        },
        'mantenimiento': {
            title: 'Mantenimiento Especializado',
            content: `
                <strong>Servicios Preventivos:</strong><br>
                • Termografía infrarroja<br>
                • Mediciones eléctricas<br>
                • Análisis de calidad energética<br>
                • Limpieza de equipos<br>
                • Calibración de instrumentos<br>
                • Actualización de software<br><br>
                
                <strong>Servicios Correctivos:</strong><br>
                • Diagnóstico de fallas<br>
                • Reparación de equipos<br>
                • Reemplazo de componentes<br>
                • Emergencias 24/7<br><br>
                
                <strong>Planes Disponibles:</strong><br>
                • Básico: 2 visitas/año<br>
                • Estándar: 4 visitas/año<br>
                • Premium: 6 visitas/año + emergencias<br>
                • Empresarial: Personalizado
            `
        },
        'materiales': {
            title: 'Materiales y Herramientas Certificadas',
            content: `
                <strong>Marcas Representadas:</strong><br>
                • Schneider Electric<br>
                • ABB<br>
                • Siemens<br>
                • Legrand<br>
                • Panduit<br>
                • Fluke<br><br>
                
                <strong>Productos Disponibles:</strong><br>
                • Cables y conductores<br>
                • Tableros y gabinetes<br>
                • Interruptores y contactores<br>
                • Herramientas especializadas<br>
                • Equipos de medición<br>
                • EPP certificados<br><br>
                
                <strong>Servicios Adicionales:</strong><br>
                • Entrega inmediata Bogotá<br>
                • Asesoría técnica<br>
                • Capacitación en productos<br>
                • Soporte post-venta
            `
        }
    };

    const info = serviceInfo[service];
    if (info) {
        // Crear modal personalizado
        showCustomModal(info.title, info.content);
    } else {
        alert('Información no disponible. Contáctenos para más detalles.');
    }
}

/**
 * Muestra un modal personalizado con información detallada
 * @param {string} title - Título del modal
 * @param {string} content - Contenido HTML del modal
 */
function showCustomModal(title, content) {
    // Crear elementos del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: var(--sfe-gray);
        border-radius: 15px;
        padding: 2rem;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        margin: 1rem;
        border: 2px solid var(--sfe-orange);
        box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3);
        animation: modalSlideIn 0.3s ease-out;
    `;

    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="color: var(--sfe-orange); margin: 0; font-size: 1.5rem;">${title}</h3>
            <button onclick="closeModal()" style="
                background: none;
                border: none;
                color: #fff;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.3s ease;
            " onmouseover="this.style.backgroundColor='var(--sfe-orange)'" onmouseout="this.style.backgroundColor='transparent'">
                ×
            </button>
        </div>
        <div style="color: #fff; line-height: 1.6; font-size: 0.95rem;">
            ${content}
        </div>
        <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button onclick="openWhatsApp('${getCurrentService()}')" class="btn btn-warning">
                <i class="fab fa-whatsapp me-2"></i>Cotizar Ahora
            </button>
            <button onclick="closeModal()" class="btn btn-outline-warning">
                Cerrar
            </button>
        </div>
    `;

    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Cerrar modal al hacer clic en el overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Cierra el modal personalizado
 */
function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.animation = 'modalSlideOut 0.3s ease-in forwards';
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    }
    document.removeEventListener('keydown', handleEscapeKey);
}

/**
 * Maneja la tecla Escape para cerrar el modal
 * @param {KeyboardEvent} e - Evento de teclado
 */
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

/**
 * Obtiene el servicio actual basado en el contexto
 * @returns {string} - Tipo de servicio
 */
function getCurrentService() {
    // Lógica para determinar el servicio actual
    return '';
}

// ===== FUNCIONES DE NAVEGACIÓN =====

/**
 * Inicializa el desplazamiento suave para enlaces internos
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Maneja el efecto de scroll en la navbar
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = '';
        }
    });
}

/**
 * Cierra el menú móvil al hacer clic en un enlace
 */
function initMobileMenuClose() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// ===== FUNCIONES DE ANIMACIÓN =====

/**
 * Inicializa las animaciones al hacer scroll
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .benefit-item, .process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Agregar delay escalonado para efecto más suave
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up', 'loaded');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Inicializa animaciones de hover mejoradas
 */
function initHoverAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Detecta si el dispositivo es móvil
 * @returns {boolean} - True si es móvil
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

/**
 * Valida si un email es válido
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Formatea un número de teléfono
 * @param {string} phone - Número de teléfono
 * @returns {string} - Número formateado
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

/**
 * Muestra una notificación toast - SOLO EN DESKTOP
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info)
 */
function showToast(message, type = 'info') {
    // CORREGIDO: No mostrar toast en dispositivos móviles
    if (isMobileDevice()) {
        console.log('Toast bloqueado en móvil:', message);
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--sfe-primary)' : type === 'error' ? '#dc3545' : 'var(--sfe-gray)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        border: 2px solid var(--sfe-primary);
    `;
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== INICIALIZACIÓN =====

/**
 * Inicializa todas las funcionalidades cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funciones principales
    initSmoothScrolling();
    handleNavbarScroll();
    initMobileMenuClose();
    initScrollAnimations();
    initHoverAnimations();
    
    // Agregar estilos adicionales para animaciones
    const additionalStyles = document.createElement('style');
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
        
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // CORREGIDO: Mostrar mensaje de bienvenida SOLO en desktop/tablet
    setTimeout(() => {
        if (!isMobileDevice()) {
            showToast('¡Bienvenido a Special Forces Electrician! Explore nuestros servicios especializados.', 'success');
        }
    }, 1000);
    
    console.log('Special Forces Electrician - Servicios inicializados correctamente');
});

// ===== MANEJO DE ERRORES =====

/**
 * Maneja errores globales de JavaScript
 */
window.addEventListener('error', function(e) {
    console.error('Error en Special Forces Electrician:', e.error);
    showToast('Ha ocurrido un error. Por favor, recargue la página.', 'error');
});

/**
 * Maneja promesas rechazadas
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada:', e.reason);
    showToast('Error de conexión. Verifique su internet.', 'error');
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.SpecialForcesServices = {
    openWhatsApp,
    makeCall,
    scrollToServices,
    showMoreInfo,
    showToast
};