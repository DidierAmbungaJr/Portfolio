document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (mobileToggle && navMenu) {
        mobileToggle.setAttribute('aria-expanded', 'false');

        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            mobileToggle.setAttribute('aria-expanded', String(isActive));
            icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // ==========================================
    // 2. CANVAS INTERACTIF (RÉSEAU DE CIRCUITS)
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const maxParticles = 60;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        if (prefersReducedMotion) {
            drawStaticParticles();
        }
    }

    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 245, 0.24)';
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function drawStaticParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.draw());
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 130, 255, ${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateCanvas);
    }

    if (prefersReducedMotion) {
        drawStaticParticles();
    } else {
        animateCanvas();
    }

    // ==========================================
    // 3. EFFET D'ÉCRITURE DYNAMIQUE (TYPING EFFECT)
    // ==========================================
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        typedTextElement.setAttribute('aria-live', 'polite');
    }
    const words = [
        "Développeur Full Stack",
        "Élève Ingénieur électronicien",
        "Passionné d'AIoT & de Making"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeEffect() {
        if (!typedTextElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typedTextElement) {
        if (prefersReducedMotion) {
            typedTextElement.textContent = words[0];
        } else {
            typeEffect();
        }
    }

    // ==========================================
    // 4. TERMINAL CONSOLE INTERACTIF
    // ==========================================
    const terminalInput = document.getElementById('terminal-input');
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalOutput = document.querySelector('.terminal-output');
    const shortcutButtons = document.querySelectorAll('.shortcut-btn');

    const commands = {
        help: () => `Commandes disponibles :<br>
  - <span class="term-cyan">whoami</span>   : Présentation générale de Didier<br>
  - <span class="term-cyan">skills</span>   : Liste détaillée des compétences<br>
  - <span class="term-cyan">projects</span> : Liste des projets réalisés<br>
  - <span class="term-cyan">circuit</span>  : État du simulateur matériel<br>
  - <span class="term-cyan">contact</span>  : Coordonnées de contact<br>
  - <span class="term-cyan">clear</span>    : Efface l'écran de la console`,

        whoami: () => `Nom: <span class="term-green">Didier Ambunga</span><br>
Statut: Étudiant en L3 Sciences de l'Ingénieur (Génie Électrique & Informatique), Université de Kinshasa.<br>
Spécialités: Systèmes Embarqués, IoT, et Développement Web (React & Django).<br>
Philosophie: Concevoir des solutions physiques et logicielles innovantes pour répondre à des défis sociétaux majeurs.`,

        skills: () => `<span class="term-amber">--- PROGRAMMATION & IA ---</span><br>
Python (Django, Streamlit), JavaScript (React), HTML/CSS, Tailwind CSS, LangChain, Matlab.<br><br>
<span class="term-amber">--- MATÉRIEL & EMBARQUÉ ---</span><br>
Arduino, Raspberry Pi, CAO de circuits (Fritzing), Systèmes de conservation et capteurs physiques.<br><br>
<span class="term-amber">--- LOGICIELS & OUTILS ---</span><br>
LaTeX (Maîtrise avancée), VS Code, Jupyter, Trello (Gestion de projet), Git/GitHub, Linux (Ubuntu 24.04).`,

        projects: () => `Projets clés (Saisir ou cliquer pour plus d'infos):<br>
1. <span class="term-cyan">DevMate AI App</span> : Compagnon IA sous Streamlit + Gemini API.<br>
2. <span class="term-cyan">Alerte Inondation</span> : Système d'alerte IoT en temps réel (Arduino/Raspberry Pi).<br>
3. <span class="term-cyan">Gestion Bibliothèque</span> : Web App backend sous Django pour la faculté.<br>
4. <span class="term-cyan">Conservation Agricole</span> : Projet humanitaire et technique ENABEL-Gemena.<br>
5. <span class="term-cyan">Robot Humanoïde</span> : Bipède imprimé en 3D (SolidWorks + Servos + Arduino).`,

        circuit: () => {
            const isClosed = document.querySelector('.circuit-card').classList.contains('circuit-active');
            return isClosed
                ? `État du PCB: <span class="term-green">ALIMENTÉ (SWITCH_01: FERMÉ)</span><br>LED active. Alimentation 5V VCC OK. Signaux stables.`
                : `État du PCB: <span class="term-gray">HORS TENSION (SWITCH_01: OUVERT)</span><br>Veuillez fermer le commutateur SWITCH_01 sur le simulateur à gauche pour démarrer.`;
        },

        contact: () => `Pour me contacter :<br>
- Email: <span class="term-cyan">ambungadidier21@gmail.com</span><br>
- Téléphone: <span class="term-cyan">+243 810 712 454</span><br>
- GitHub / LinkedIn: Liens disponibles dans la section contact et pied de page.<br>
Vous pouvez également utiliser le formulaire de contact en bas de page !`
    };

    function writeToTerminal(input, outputText) {
        if (!terminalOutput) return;

        const userLine = document.createElement('div');
        userLine.className = 'terminal-input-line';
        userLine.innerHTML = `<span class="term-prompt">didier@gei:~$</span> <span class="term-gray">${input}</span>`;
        terminalOutput.appendChild(userLine);

        if (outputText) {
            const resultLine = document.createElement('div');
            resultLine.className = 'terminal-response';
            resultLine.innerHTML = `<p>${outputText}</p>`;
            terminalOutput.appendChild(resultLine);
        }

        if (terminalScreen) {
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                if (value === '') return;

                if (value === 'clear') {
                    if (terminalOutput) terminalOutput.innerHTML = '';
                    return;
                }

                if (commands[value]) {
                    writeToTerminal(value, commands[value]());
                } else {
                    writeToTerminal(value, `Commande non reconnue: <span class="term-amber">${value}</span>. Taper <span class="term-green">help</span>.`);
                }
            }
        });

        // Focus terminal input when clicking terminal screen
        if (terminalScreen) {
            terminalScreen.addEventListener('click', () => {
                terminalInput.focus();
            });
        }
    }

    // Shortcuts
    shortcutButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd === 'clear') {
                if (terminalOutput) terminalOutput.innerHTML = '';
            } else if (commands[cmd]) {
                writeToTerminal(cmd, commands[cmd]());
            }
        });
    });

    // ==========================================
    // 5. SIMULATEUR DE CIRCUIT IMPRIMÉ (PCB)
    // ==========================================
    const pcbSwitch = document.getElementById('pcb-switch');
    const switchLever = document.getElementById('switch-lever');
    const circuitCard = document.querySelector('.circuit-card');
    const circuitStatusText = document.getElementById('circuit-status');

    let circuitOn = false;

    if (pcbSwitch && switchLever) {
        pcbSwitch.addEventListener('click', toggleCircuit);
    }

    function toggleCircuit() {
        circuitOn = !circuitOn;

        if (circuitOn) {
            // Anim switch closed
            switchLever.style.transform = 'rotate(25deg)'; // Closed representation
            circuitCard.classList.add('circuit-active');
            if (circuitStatusText) {
                circuitStatusText.innerHTML = `ALIMENTATION : <span class="status-on">SOUS TENSION (5V) | SUCCÈS</span>`;
            }

            // Send terminal trigger notification
            writeToTerminal('system_check', `<span class="term-green">[SYS_MSG] Alimentation détectée sur SWITCH_01 !</span><br>
Courant circulant dans le circuit de recrutement. Signal LED actif. Didier Ambunga est hautement qualifié pour votre équipe !`);
        } else {
            // Anim switch open
            switchLever.style.transform = 'rotate(0deg)'; // Open representation
            circuitCard.classList.remove('circuit-active');
            if (circuitStatusText) {
                circuitStatusText.innerHTML = `ALIMENTATION : <span class="status-off">HORS TENSION</span>`;
            }
        }
    }

    // ==========================================
    // 6. FILTRAGE DES PROJETS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 7. GESTION DES MODALES PROJETS
    // ==========================================
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-details');
    const closeModal = document.querySelector('.close-modal');

    const projectsData = {
        '1': {
            title: "DevMate | AI Engineering App",
            tags: ["Gemini API", "LangChain", "Streamlit", "Python"],
            desc: "Un compagnon de développement web intelligent pour assister les développeurs.",
            details: `
                <h4>Description du Projet</h4>
                <p>DevMate utilise la puissance de l'IA générative pour aider les développeurs à concevoir, débugger et optimiser leur code plus rapidement.</p>
                <ul>
                    <li><strong>Intelligence Artificielle</strong>: Intégration de l'API Gemini pour la génération de code contextuelle et l'explication des bugs.</li>
                    <li><strong>Orchestration (LangChain)</strong>: Utilisation de LangChain pour structurer les prompts, gérer la mémoire de conversation et les chaînes de décision de l'agent.</li>
                    <li><strong>Interface Utilisateur</strong>: Création d'une UI fluide et interactive à l'aide de Streamlit pour un prototypage rapide et efficace en Python.</li>
                </ul>
            `
        },
        '2': {
            title: "Système d’Alerte Inondation (Projet IoT - En cours)",
            tags: ["Arduino", "Raspberry Pi", "Capteurs", "IoT", "Matériel"],
            desc: "Système intelligent de détection et d'alerte en temps réel pour la prévention des crues.",
            details: `
                <h4>Description & Conception</h4>
                <p>Ce projet collaboratif (groupe de 7 étudiants) vise à concevoir une solution complète de prévention des inondations dans les zones à risques.</p>
                <ul>
                    <li><strong>Hardware & Acquisition</strong>: Conception de stations de mesure autonomes équipées de capteurs de niveau d'eau et de débit, contrôlées par Arduino.</li>
                    <li><strong>Passerelle & Traitement</strong>: Utilisation d'un Raspberry Pi comme passerelle locale pour collecter les métriques, effectuer un premier filtrage de signal et envoyer des alertes instantanées.</li>
                    <li><strong>Collaboration multidisciplinaire</strong>: Répartition du travail sur les volets Hardware (conception de circuits, alimentation autonome), Software (transmission de données, algorithme d'alerte) et Design (boîtier de protection).</li>
                </ul>
            `
        },
        '3': {
            title: "Gestion de Bibliothèque Web App (En cours)",
            tags: ["Django", "Python", "PostgreSQL", "HTML/CSS", "Backend"],
            desc: "Application de gestion de bibliothèque universitaire complète pour ma faculté.",
            details: `
                <h4>Description & Fonctionnalités</h4>
                <p>Développement d'une application web interne facilitant la gestion quotidienne de la bibliothèque de la faculté Polytechnique.</p>
                <ul>
                    <li><strong>Gestion des abonnements</strong>: Système de profils d'étudiants avec historiques d'emprunts et relances automatiques par email.</li>
                    <li><strong>Base de données (PostgreSQL)</strong>: Conception d'un schéma de base de données relationnelle optimisé pour stocker les livres, auteurs, catégories et transactions de prêt.</li>
                    <li><strong>Backend Django</strong>: Utilisation du puissant ORM de Django pour sécuriser les requêtes et simplifier la logique métier.</li>
                </ul>
            `
        },
        '4': {
            title: "Dispositif de Conservation Agricole (Gemena)",
            tags: ["Prototypage", "CAO", "Fritzing", "ENABEL", "Ingénierie"],
            desc: "Projet de service learning IngenieuxSud avec ENABEL-Gemena en République Démocratique du Congo.",
            details: `
                <h4>Objectifs & Prototypage</h4>
                <p>Conception et réalisation d'un dispositif de conservation des produits agricoles adapté aux petites exploitations agricoles familiales.</p>
                <ul>
                    <li><strong>Conception collaborative</strong>: Travail d'équipe regroupant 8 étudiants de l'UNIKIN (Université de Kinshasa) et de l'UCLouvain (Belgique).</li>
                    <li><strong>Technique & CAO</strong>: Modélisation tridimensionnelle du dispositif et de ses conduits de ventilation, dimensionnement thermique pour la régulation d'humidité naturelle, et modélisation de circuits de contrôle sur Fritzing.</li>
                    <li><strong>Impact Communautaire</strong>: Solution à faible coût énergétique conçue pour réduire les pertes post-récolte dans les zones rurales déconnectées du réseau électrique.</li>
                </ul>
            `
        },
        '5': {
            title: "Robot Humanoïde Bipède",
            tags: ["Impression 3D", "SolidWorks", "Servo Motors", "Arduino", "Robotique"],
            desc: "Conception et fabrication d'un robot humanoïde bipède avec un châssis entièrement imprimé en 3D.",
            details: `
                <h4>Conception & Fabrication</h4>
                <p>Projet de robotique avancée visant à reproduire la bipédie humaine à travers un système mécatronique complet.</p>
                <ul>
                    <li><strong>Modélisation 3D (SolidWorks)</strong>: Conception des pièces articulées du squelette mécanique (hanches, genoux, chevilles) avec contraintes de mouvement et marges de tolérance pour l'assemblage.</li>
                    <li><strong>Fabrication (Impression 3D FDM)</strong>: Impression du châssis complet avec des matériaux adaptés à la résistance mécanique des articulations et des supports de servo-moteurs.</li>
                    <li><strong>Contrôle multi-servo</strong>: Programmation d'une séquence de mouvements coordonnés avec des servo-moteurs pour reproduire un cycle de marche bipède stable.</li>
                </ul>
            `
        }
    };

    document.querySelectorAll('.btn-project-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-project-id');
            const data = projectsData[id];

            if (data && modal && modalContent) {
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
                document.body.style.overflow = 'hidden'; // Stop scrolling
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ==========================================
    // 8. CONTACT FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitText = submitBtn ? submitBtn.querySelector('span') : null;
            const submitIcon = submitBtn ? submitBtn.querySelector('i') : null;

            if (submitText) {
                submitText.textContent = "Transmission en cours...";
            }
            if (submitIcon) {
                submitIcon.className = "fa-solid fa-spinner fa-spin";
            }
            if (submitBtn) {
                submitBtn.style.pointerEvents = "none";
            }

            setTimeout(() => {
                formFeedback.textContent = "✓ Message envoyé avec succès ! Didier vous répondra rapidement.";
                formFeedback.className = "form-feedback success";

                contactForm.reset();

                if (submitText) {
                    submitText.textContent = "Envoyer le Message";
                }
                if (submitIcon) {
                    submitIcon.className = "fa-solid fa-paper-plane";
                }
                if (submitBtn) {
                    submitBtn.style.pointerEvents = "auto";
                }

                writeToTerminal('incoming_message', `<span class="term-green">[FORM] Nouveau message reçu !</span><br>
Merci pour votre intérêt. Une réponse automatique a été configurée.`);
            }, 1500);
        });
    }

    // ==========================================
    // 9. ANIMATIONS ON SCROLL (REVEAL)
    // ==========================================
    const reveals = document.querySelectorAll('section');
    reveals.forEach(r => r.classList.add('reveal'));

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach(rev => {
            const elementTop = rev.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                rev.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
