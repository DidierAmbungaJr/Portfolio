document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        document.documentElement.classList.add('has-motion');
    }

    // ==========================================
    // 1. NAVIGATION PRINCIPALE, SCROLLSPY & MOBILE
    // ==========================================
    const header = document.querySelector('.main-header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header elevation au scroll
    function updateHeaderOnScroll() {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();

    // Menu Mobile
    if (mobileToggle && navMenu) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');

        function closeMobileNav() {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }

        function openMobileNav() {
            navMenu.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            mobileToggle.setAttribute('aria-label', 'Fermer le menu');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-xmark';
        }

        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            if (isActive) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // Fermer le menu mobile lors d'un clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });

        // Fermer avec Escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileNav();
                mobileToggle.focus();
            }
        });
    }

    // ScrollSpy : illumination du lien actif selon la section visible
    const sections = document.querySelectorAll('section[id]');
    
    function updateScrollSpy() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy();

    // ==========================================
    // 2. ONGLETS DE FILTRAGE DES PROJETS (WAI-ARIA TABS)
    // ==========================================
    const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    const projectsEmptyState = document.getElementById('projects-empty');

    function applyFilter(filterValue, activeBtn) {
        // Mise à jour ARIA et visuelle des onglets
        filterButtons.forEach(btn => {
            const isCurrent = btn === activeBtn;
            btn.classList.toggle('active', isCurrent);
            btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
            btn.setAttribute('tabindex', isCurrent ? '0' : '-1');
        });

        if (activeBtn) activeBtn.focus();

        let visibleCount = 0;

        if (prefersReducedMotion) {
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                const matches = filterValue === 'all' || categories.includes(filterValue);
                card.style.display = matches ? 'flex' : 'none';
                if (matches) visibleCount++;
            });

            if (projectsEmptyState) {
                projectsEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
            }
            return;
        }

        // Animation fluide de transition entre onglets
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            const matches = filterValue === 'all' || categories.includes(filterValue);

            if (!matches) {
                card.classList.add('filtering-out');
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.remove('filtering-out');
                }, 180);
            } else {
                visibleCount++;
                card.classList.add('filtering-out');
                card.style.display = 'flex';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        card.classList.remove('filtering-out');
                    });
                });
            }
        });

        // Gestion de l'état vide
        if (projectsEmptyState) {
            setTimeout(() => {
                projectsEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
            }, 180);
        }
    }

    // Clic sur les onglets
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            const filterValue = btn.getAttribute('data-filter');
            applyFilter(filterValue, btn);
        });
    });

    // Navigation clavier fléchée (WAI-ARIA Tabs keyboard pattern)
    filterButtons.forEach((btn, index) => {
        btn.addEventListener('keydown', (e) => {
            let targetIndex = null;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                targetIndex = (index + 1) % filterButtons.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                targetIndex = (index - 1 + filterButtons.length) % filterButtons.length;
            } else if (e.key === 'Home') {
                targetIndex = 0;
            } else if (e.key === 'End') {
                targetIndex = filterButtons.length - 1;
            }

            if (targetIndex !== null) {
                e.preventDefault();
                const targetBtn = filterButtons[targetIndex];
                const filterValue = targetBtn.getAttribute('data-filter');
                applyFilter(filterValue, targetBtn);
            }
        });
    });

    // ==========================================
    // 3. GESTION DES MODALES PROJETS AVEC ANIMATION
    // ==========================================
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-details');
    const closeModal = document.querySelector('.close-modal');

    const projectsData = {
        '1': {
            title: "DevMate | AI Engineering App",
            tags: ["Gemini API", "LangChain", "Streamlit", "Python"],
            desc: "Un compagnon de développement logiciel exploitant des modèles de langage pour accélérer la conception et le débogage.",
            details: `
                <h4>Description du Projet</h4>
                <p>DevMate utilise l'IA générative pour assister les développeurs dans l'analyse de code, la génération contextuelle de modules et la résolution d'erreurs.</p>
                <ul>
                    <li><strong>Intelligence Artificielle</strong> : Intégration de l'API Gemini pour le raisonnement contextuel et l'assistance technique ciblée.</li>
                    <li><strong>Orchestration (LangChain)</strong> : Structuration des invites, gestion de la mémoire contextuelle et routage dynamique.</li>
                    <li><strong>Interface Utilisateur</strong> : Dashboard interactif sous Streamlit offrant une prise en main immédiate et réactive.</li>
                </ul>
            `
        },
        '2': {
            title: "Système d’Alerte Inondation (Projet IoT - En cours)",
            tags: ["Arduino", "Raspberry Pi", "Capteurs", "IoT", "Matériel"],
            desc: "Système télémétrique intelligent pour la surveillance hydrologique et la prévention des crues en milieu urbain.",
            details: `
                <h4>Description & Conception</h4>
                <p>Projet collaboratif (groupe de 7 étudiants de Polytechnique UNIKIN) visant à concevoir un réseau autonome de détection précoce des montées d'eau.</p>
                <ul>
                    <li><strong>Acquisition & Capteurs</strong> : Noeuds autonomes de détection (capteurs de niveau ultrasons et débitmètres) pilotés par microcontrôleur.</li>
                    <li><strong>Passerelle & Traitement</strong> : Collecte locale sur Raspberry Pi, filtrage de signal et transmission d'alertes en temps réel.</li>
                    <li><strong>Approche d'ingénierie</strong> : Modélisation des contraintes d'alimentation autonome sur batterie et robustesse mécanique des boîtiers face aux intempéries.</li>
                </ul>
            `
        },
        '3': {
            title: "Gestion de Bibliothèque Web App (En cours)",
            tags: ["Django", "Python", "PostgreSQL", "HTML/CSS", "Backend"],
            desc: "Plateforme web de gestion des ressources documentaires et du catalogue pour la Faculté Polytechnique.",
            details: `
                <h4>Description & Fonctionnalités</h4>
                <p>Application web interne optimisant la gestion courante, le suivi des emprunts et l'inventaire documentaire universitaire.</p>
                <ul>
                    <li><strong>Gestion des abonnements</strong> : Fiches étudiants, réservations de documents et gestion des retards d'emprunt.</li>
                    <li><strong>Base de données relationnelle</strong> : Schéma PostgreSQL modélisant les transactions, auteurs, indexations et droits d'accès.</li>
                    <li><strong>Backend Django</strong> : Architecture robuste et sécurisée reposant sur l'ORM Django et son interface d'administration.</li>
                </ul>
            `
        },
        '4': {
            title: "Dispositif de Conservation Agricole (Gemena)",
            tags: ["Prototypage", "CAO", "Fritzing", "ENABEL", "Ingénierie"],
            desc: "Projet de service learning IngenieuxSud mené en collaboration avec ENABEL-Gemena en République Démocratique du Congo.",
            details: `
                <h4>Objectifs & Prototypage</h4>
                <p>Conception et réalisation d'un dispositif passif et ventilé de conservation des récoltes pour de petites exploitations familiales.</p>
                <ul>
                    <li><strong>Collaboration inter-universitaire</strong> : Équipe multidisciplinaire de 8 étudiants (Université de Kinshasa et UCLouvain Belgique).</li>
                    <li><strong>Modélisation & CAO</strong> : Conception 3D des flux d'air, dimensionnement thermique pour la régulation hygrométrique et circuits sur Fritzing.</li>
                    <li><strong>Impact Terrain</strong> : Solution sobre énergétiquement, conçue avec des matériaux accessibles localement pour réduire les pertes post-récolte.</li>
                </ul>
            `
        },
        '5': {
            title: "Robot Humanoïde Bipède",
            tags: ["Impression 3D", "SolidWorks", "Servo Motors", "Arduino", "Robotique"],
            desc: "Conception mécatronique et fabrication additive d'une plateforme humanoïde bipède articulée.",
            details: `
                <h4>Conception & Fabrication</h4>
                <p>Étude et réalisation d'une structure bipède autonome intégrant cinématique mécanique et asservissement multi-axes.</p>
                <ul>
                    <li><strong>Modélisation 3D (SolidWorks)</strong> : Conception mécanique des liaisons articulées (hanches, genoux, chevilles) avec ajustement des tolérances.</li>
                    <li><strong>Fabrication additive FDM</strong> : Impression des composants structurels en optimisant le remplissage pour la légèreté et la résistance.</li>
                    <li><strong>Contrôle & Cinématique</strong> : Programmation sur microcontrôleur Arduino pour synchroniser les servomoteurs dans des séquences de déplacement stables.</li>
                </ul>
            `
        }
    };

    let activeTriggerBtn = null;

    function openModal(id, triggerBtn) {
        const data = projectsData[id];
        if (!data || !modal || !modalContent) return;

        activeTriggerBtn = triggerBtn;
        modalContent.innerHTML = `
            <div class="modal-proj-detail">
                <h2>${data.title}</h2>
                <div class="modal-proj-tech">
                    ${data.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="modal-proj-body">
                    <p><strong>Présentation :</strong> ${data.desc}</p>
                    ${data.details}
                </div>
            </div>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        if (!prefersReducedMotion) {
            requestAnimationFrame(() => {
                modal.classList.add('modal-open');
            });
        } else {
            modal.classList.add('modal-open');
        }

        if (closeModal) closeModal.focus();
    }

    function closeModalWithAnimation() {
        if (!modal || modal.style.display === 'none') return;

        if (prefersReducedMotion) {
            modal.classList.remove('modal-open');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (activeTriggerBtn) activeTriggerBtn.focus();
            return;
        }

        modal.classList.remove('modal-open');
        modal.classList.add('modal-closing');

        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('modal-closing');
            document.body.style.overflow = 'auto';
            if (activeTriggerBtn) activeTriggerBtn.focus();
        }, 180);
    }

    document.querySelectorAll('.btn-project-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-project-id');
            openModal(id, btn);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeModalWithAnimation);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalWithAnimation();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModalWithAnimation();
        }
    });

    // ==========================================
    // 4. FORMULAIRE DE CONTACT (WHATSAPP REDIRECT)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        const WHATSAPP_NUMBER = '243810712454';

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitText = submitBtn ? submitBtn.querySelector('span') : null;
            const submitIcon = submitBtn ? submitBtn.querySelector('i') : null;

            if (submitText) submitText.textContent = "Préparation du message...";
            if (submitIcon) submitIcon.className = "fa-solid fa-spinner fa-spin";
            if (submitBtn) submitBtn.style.pointerEvents = "none";

            const name = contactForm.querySelector('#name') ? contactForm.querySelector('#name').value.trim() : '';
            const message = contactForm.querySelector('#message') ? contactForm.querySelector('#message').value.trim() : '';
            const body = `Bonjour Didier,%0A%0AMon nom est ${encodeURIComponent(name)}.%0A%0AMessage : %0A${encodeURIComponent(message)}`;
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${body}`;

            try {
                window.open(waUrl, '_blank');
                formFeedback.textContent = "✓ Redirection vers WhatsApp pour l'envoi de votre message.";
                formFeedback.className = "form-feedback success show";
                contactForm.reset();
            } catch (err) {
                formFeedback.textContent = "Impossible d'ouvrir WhatsApp directement. Veuillez utiliser l'adresse email ou le numéro direct.";
                formFeedback.className = 'form-feedback error show';
            } finally {
                if (submitText) submitText.textContent = "Envoyer le Message";
                if (submitIcon) submitIcon.className = "fa-solid fa-paper-plane";
                if (submitBtn) submitBtn.style.pointerEvents = "auto";
            }
        });
    }

    // ==========================================
    // 5. ANIMATIONS COHÉRENTES (INTERSECTION OBSERVER)
    // ==========================================
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        };

        const staggerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stagger-group').forEach(group => {
            staggerObserver.observe(group);
        });
    } else {
        document.querySelectorAll('.stagger-group').forEach(group => {
            group.classList.add('is-visible');
        });
    }
});
