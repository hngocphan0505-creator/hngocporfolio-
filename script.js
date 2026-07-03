document.addEventListener('DOMContentLoaded', () => {

  // Kiểm tra cơ sở dữ liệu đã nạp thành công chưa
  if (!window.PORTFOLIO_DATA) {
    console.error("Lỗi: Không tìm thấy portfolio-data.js! Vui lòng kiểm tra lại thứ tự nạp thẻ script.");
    return;
  }

  /* ==========================================================================
     TỰ ĐỘNG TẠO GIAO DIỆN (DYNAMIC RENDERING)
     ========================================================================== */
  
  // 1. Tạo thẻ Kinh nghiệm làm việc (Experiences)
  const experienceGrid = document.querySelector('.experience-grid');
  if (experienceGrid && window.PORTFOLIO_DATA.experiences) {
    experienceGrid.innerHTML = window.PORTFOLIO_DATA.experiences.map(exp => {
      const isCustomBrutalist = exp.id === 'dehaus-creative' || exp.id === 'margroup-similac' || exp.id === 'margroup-sting';
      
      const tagsMarkup = exp.tags.map(t => {
        return `<span>${t}</span>`;
      }).join('');

      let proofImagesMarkup = '';
      if (isCustomBrutalist) {
        // SỬA: ảnh preview ngoài card
        const img = exp.proofImages[0];
        proofImagesMarkup = `
          <div class="marketing-assistant-preview-img-wrapper" style="width: 100%; height: 180px; border: var(--border-thick); overflow: hidden; margin: 0.75rem 0; box-sizing: border-box; background-color: #fff;">
            <img src="${img}" alt="Experience Preview" style="width: 100%; height: 100%; object-fit: contain; background-color: #fff;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'180\\' viewBox=\\'0 0 300 180\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
          </div>
        `;
      } else {
        proofImagesMarkup = `
          <div class="card-proof-row">
            ${exp.proofImages.slice(0, 2).map(img => `
              <img src="${img}" alt="Experience Proof Placeholder" class="small-proof-img" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'70\\' viewBox=\\'0 0 120 70\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'110\\' height=\\'60\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'1.5\\' stroke-dasharray=\\'3,3\\'%3E%3C/rect%3E%3Cg transform=\\'translate(60, 40)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'9\\' font-weight=\\'bold\\'%3EẢnh minh chứng%3C/text%3E%3C/g%3E%3C/svg%3E';">
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="experience-card ${isCustomBrutalist ? 'marketing-assistant-card' : ''}" data-experience="${exp.id}" ${isCustomBrutalist ? 'style="display: flex; flex-direction: column;"' : ''}>
          <div class="exp-badge">${exp.date}</div>
          <div class="exp-header">
            <span class="exp-company">${exp.company}</span>
            <h3>${exp.role}</h3>
            ${exp.project ? `<span class="exp-subtitle">${exp.project}</span>` : ''}
          </div>
          
          ${isCustomBrutalist ? proofImagesMarkup : ''}
          ${!isCustomBrutalist ? proofImagesMarkup : ''}

          ${!isCustomBrutalist ? `
            <div class="exp-tags">
              ${tagsMarkup}
            </div>
          ` : ''}

          ${isCustomBrutalist ? `
            <button class="btn-project-proof" style="width: 100%; font-family: var(--font-heading); font-size: 0.95rem; font-weight: 800; background-color: var(--color-black); color: var(--color-white); border: none; padding: 0.75rem; cursor: pointer; box-shadow: 4px 4px 0px var(--color-purple); transition: var(--transition-fast); text-transform: uppercase; margin-top: auto;">VIEW DETAILS →</button>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // 2. Tạo thẻ Dự án nổi bật (Projects)
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid && window.PORTFOLIO_DATA.projects) {
    projectsGrid.innerHTML = window.PORTFOLIO_DATA.projects.map(proj => {
      const isProj3 = proj.id === 'lifebuoy-herbal-guard';
      const isCustomProj = proj.id === 'readynest' || proj.id === 'mystic-sip' || proj.id === 'lifebuoy-herbal-guard';
      
      const skillsMarkup = proj.skills.map(s => `<span ${isProj3 ? 'style="display: inline-flex !important; width: fit-content !important; max-width: 100% !important; padding: 4px 8px !important; font-size: 0.7rem !important; line-height: 1 !important; white-space: nowrap !important; margin: 0 !important;"' : ''}>${s}</span>`).join('');
      
      let proofImagesMarkup = '';
      if (isCustomProj) {
        // Per-project image display strategy:
        // ReadyNest + PNJ: wide banner images → object-fit: cover fills frame edge-to-edge, no white strips
        // Lifebuoy: product lineup → object-fit: contain with brand red bg to show full image
        let imgFit, imgBg, imgPos;
        if (proj.id === 'lifebuoy-herbal-guard') {
          imgFit = 'contain'; imgBg = '#b91c1c'; imgPos = 'center';
        } else if (proj.id === 'readynest') {
          imgFit = 'cover';   imgBg = '#f0f5e8'; imgPos = 'center top';
        } else {
          // mystic-sip: dark banner, keep center so STYLE logo stays visible
          imgFit = 'cover';   imgBg = '#1a0a0a'; imgPos = 'center';
        }
        proofImagesMarkup = `
          <img src="${proj.proofImages[0]}" alt="Project Campaign Placeholder" class="small-proof-img" style="width: 100% !important; max-width: 100% !important; flex: 1 !important; height: 150px !important; object-fit: ${imgFit} !important; object-position: ${imgPos} !important; background-color: ${imgBg} !important;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'70\\' viewBox=\\'0 0 120 70\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'110\\' height=\\'60\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'1.5\\' stroke-dasharray=\\'3,3\\'%3E%3C/rect%3E%3Cg transform=\\'translate(60, 40)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'9\\' font-weight=\\'bold\\'%3EẢnh minh chứng%3C/text%3E%3C/g%3E%3C/svg%3E';">
        `;
      } else {
        proofImagesMarkup = proj.proofImages.slice(0, 2).map(img => `
          <img src="${img}" alt="Project Campaign Placeholder" class="small-proof-img" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'70\\' viewBox=\\'0 0 120 70\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'110\\' height=\\'60\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'1.5\\' stroke-dasharray=\\'3,3\\'%3E%3C/rect%3E%3Cg transform=\\'translate(60, 40)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'9\\' font-weight=\\'bold\\'%3EẢnh minh chứng%3C/text%3E%3C/g%3E%3C/svg%3E';">
        `).join('');
      }

      const buttonText = isCustomProj ? 'VIEW CASE <i class="fa-solid fa-arrow-right"></i>' : 'LINK <i class="fa-solid fa-arrow-right"></i>';

      return `
        <div class="project-card" data-project="${proj.id}">
          <div class="project-num-badge">${proj.number}</div>
          <div class="project-card-body">
            <div class="project-title-row" style="margin-bottom: 0.4rem;">
              <h3 style="color: var(--color-black); font-weight: 800; font-size: 1.25rem; line-height: 1.2; margin: 0;">${proj.title.replace(/\n/g, '<br>')}</h3>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem;">
              <p style="color: var(--color-purple); font-weight: 700; font-size: 0.95rem; margin: 0;">${proj.role}</p>
              <p style="color: var(--color-black); font-weight: 700; font-size: 0.85rem; margin: 0;">${proj.course}</p>
              <div style="margin-top: 0.2rem;"><span style="font-size: 0.7rem; font-weight: 700; background-color: var(--color-bg-light); border: var(--border-thin); padding: 0.2rem 0.6rem; border-radius: 100px; display: inline-block; color: var(--color-black);">${proj.time}</span></div>
            </div>

            <div class="card-proof-row" ${isCustomProj ? 'style="display: flex !important; width: 100% !important;"' : ''}>
              ${proofImagesMarkup}
            </div>

            <div class="project-tags" ${isProj3 ? 'style="display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 6px !important; align-items: center !important;"' : ''}>
              ${skillsMarkup}
            </div>

            <button class="btn-project-proof">${buttonText}</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // 3. Tạo thẻ Thành tích & Giải thưởng (Achievements / Awards)
  const awardsGrid = document.querySelector('.awards-grid');
  if (awardsGrid && window.PORTFOLIO_DATA.awards) {
    awardsGrid.innerHTML = window.PORTFOLIO_DATA.awards.map((award, index) => {
      // Xoay lệch trái/phải xen kẽ cho đúng phong cách Brutalist
      const rotateClass = index % 2 === 0 ? 'card-rotate-left' : 'card-rotate-right';
      return `
        <div class="award-item-card ${rotateClass}" data-award="${award.id}">
          <div class="award-year-tag">${award.year}</div>
          <div class="award-icon-circle"><i class="fa-solid fa-trophy"></i></div>
          <h3>${award.title}</h3>
          <h4>${award.competition}</h4>
          
          <div class="award-img-wrapper">
            <img src="${award.thumbnail}" alt="Award Thumbnail Placeholder" class="award-thumbnail">
          </div>
          
          <div class="divider-dashed"></div>
          <p>${award.shortDesc}</p>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     CUSTOM MOUSE CURSOR FOR DESKTOP
     ========================================================================== */
  const customCursor = document.querySelector('.custom-cursor');
  
  if (customCursor) {
    document.addEventListener('mousemove', (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });

    // Thêm hiệu ứng phóng to khi hover chuột vào các phần tử tương tác (bao gồm cả các thẻ vừa tạo động)
    const interactives = document.querySelectorAll('a, button, .project-card, .award-item-card, .experience-card, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(45deg)';
        customCursor.style.backgroundColor = 'var(--color-purple)';
      });
      el.addEventListener('mouseleave', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
        customCursor.style.backgroundColor = 'var(--color-lime)';
      });
    });
  }

  /* ==========================================================================
     MOBILE DRAWER MENU
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileClose = document.querySelector('.mobile-close');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ==========================================================================
     TYPING EFFECT FOR HERO TITLE (consumer-centric marketer / Strategic Thinker)
     ========================================================================== */
  const typingText = document.getElementById('typing-text');
  const roles = ["consumer-centric marketer", "Strategic Thinker"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  /* ==========================================================================
     SCROLL REVEAL (FADE-IN ANIMATION) WITH INTERSECTION OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ==========================================================================
     STICKY HEADER & NAV ACTIVE SCROLL SPY
     ========================================================================== */
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.padding = '0.9rem 2rem';
      header.style.boxShadow = '0 8px 0px rgba(0,0,0,0.15)';
    } else {
      header.style.padding = '1.25rem 2rem';
      header.style.boxShadow = 'none';
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      
      if (window.scrollY >= (sectionTop - 160)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     DYNAMIC MODALS FOR PROJECTS, ACHIEVEMENTS & EXPERIENCE
     ========================================================================== */
  const projectCards = document.querySelectorAll('.project-card');
  const awardCards = document.querySelectorAll('.award-item-card');
  const experienceCards = document.querySelectorAll('.experience-card');
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalContent = projectModal.querySelector('.modal-content');

  // Helper to open project modal
  function openProjectModal(projectId) {
    const data = window.PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!data) return;

    const modalClass = document.querySelector('#project-modal .modal-card');
    if (modalClass) {
      if (projectId === 'readynest' || projectId === 'mystic-sip' || projectId === 'lifebuoy-herbal-guard') {
        modalClass.classList.add('marketing-assistant-modal');
      } else {
        modalClass.classList.remove('marketing-assistant-modal');
      }
    }

    if (projectId === 'readynest') {
      const imgFb = data.proofImages[1];
      const imgWeb = data.proofImages[2];
      const imgKpi1 = data.proofImages[3];
      const imgKpi2 = data.proofImages[4];
      const imgKpi3 = data.proofImages[5];

      modalContent.innerHTML = `
        <div class="marketing-assistant-two-col">
          <!-- Left Column: Strategy & Implementation -->
          <div class="marketing-assistant-left-col">
            <span class="project-num-badge" style="position: relative !important; top: 0 !important; left: 0 !important; display: inline-block !important; margin-bottom: 1rem !important;">PROJECT DETAILS</span>
            <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading); font-size: 1.5rem; line-height: 1.2; font-weight: 900;">${data.title}</h3>
            <p style="font-weight: 800; color: var(--color-purple); font-size: 1.05rem; margin-bottom: 0.25rem;">Role: ${data.role}</p>
            <p style="font-weight: 700; color: var(--color-black); font-size: 0.9rem; margin-bottom: 0.25rem;">Category: ${data.course}</p>
            <p style="font-size: 0.8rem; font-weight: 700; color: #6b7280; margin-bottom: 1.25rem;">Timeline: ${data.time}</p>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">PROJECT OVERVIEW</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 1.25rem;">
                ReadyNest is a digital marketing academic project designed as a personalized parenting support platform for Gen Y parents with children aged 4–6 preparing for primary school.<br><br>The platform integrates educational content, parenting insights, and AI-powered assistance to help parents make informed early education decisions in a structured and accessible way.
              </p>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">MY ROLE</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 1.25rem;">
                Led the digital marketing execution of ReadyNest as Project Lead, overseeing both strategy and implementation across multiple channels.<br><br>Responsible for coordinating cross-functional team members and ensuring consistency between platform development, content direction, and marketing outputs.
              </p>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">DELIVERY</h4>
              <ul style="list-style: none; margin: 0 0 1.25rem 0; padding: 0;">
                <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.85rem; flex-shrink: 0;"></i>
                  <span style="font-size: 0.9rem; color: #374151; line-height: 1.45;">Built and launched an integrated digital marketing ecosystem including website, SEO blog content, email marketing, Facebook & Instagram pages, and an AI chatbot named Nesty.</span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.85rem; flex-shrink: 0;"></i>
                  <span style="font-size: 0.9rem; color: #374151; line-height: 1.45;">Developed content strategy based on insights from 100+ parents, translating research into educational content, SEO topics, and social media messaging.</span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.85rem; flex-shrink: 0;"></i>
                  <span style="font-size: 0.9rem; color: #374151; line-height: 1.45;">Coordinated execution across team members to ensure alignment between UX website structure and marketing funnel objectives.</span>
                </li>
                <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.85rem; flex-shrink: 0;"></i>
                  <span style="font-size: 0.9rem; color: #374151; line-height: 1.45;">Delivered campaign performance results including 1,326 website visits, 822 blog views, and 105 qualified leads, achieving 130%+ KPI completion.</span>
                </li>
              </ul>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">SKILL SET</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Project & Team Management</span>
                <span class="experience-tool-tag">Digital Marketing Execution</span>
                <span class="experience-tool-tag">Content Strategy & Insighting</span>
                <span class="experience-tool-tag">AI & Marketing Tools</span>
                <span class="experience-tool-tag">Marketing Funnel Planning</span>
                <span class="experience-tool-tag">UX/UI Audit</span>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">TOOLS USED</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Google Antigravity</span>
                <span class="experience-tool-tag">Stitch</span>
                <span class="experience-tool-tag">Google Search</span>
                <span class="experience-tool-tag">Google Search Console</span>
                <span class="experience-tool-tag">Meta Business Suite</span>
                <span class="experience-tool-tag">Google Analytics</span>
                <span class="experience-tool-tag">Google Sheets</span>
                <span class="experience-tool-tag">Canva</span>
                <span class="experience-tool-tag">AI Chatbot</span>
                <span class="experience-tool-tag">Vibe Coding</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Touchpoints, KPIs & Learnings -->
          <div class="marketing-assistant-right-col">
            <div>
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.75rem;">LIVE TOUCHPOINTS</h4>
              
              <!-- Live Touchpoints Proof Cards -->
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <!-- Card 1: Website -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 180px; overflow: hidden; border-bottom: var(--border-thick);">
                    <!-- SỬA: ReadyNest website image -->
                    <img src="${imgWeb}" alt="ReadyNest Website Screenshot" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'180\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <!-- SỬA: ReadyNest website link -->
                  <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; border: none; border-radius: 0; font-weight: 800; padding: 0.6rem; font-size: 0.85rem; font-family: var(--font-heading); display: block; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); box-shadow: none;">WEBSITE LINK <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>

                <!-- Card 2: Facebook Page -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 180px; overflow: hidden; border-bottom: var(--border-thick);">
                    <!-- SỬA: ReadyNest Facebook image -->
                    <img src="${imgFb}" alt="ReadyNest Facebook Page Screenshot" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'180\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <!-- SỬA: ReadyNest Facebook link -->
                  <a href="${data.facebookLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; border: none; border-radius: 0; font-weight: 800; padding: 0.6rem; font-size: 0.85rem; font-family: var(--font-heading); display: block; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); box-shadow: none;">FACEBOOK LINK <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
              </div>

              <!-- Performance / KPI Tracking -->
              <div style="border-top: 2px dashed var(--color-black); padding-top: 1.25rem; margin-top: 1.5rem;">
                <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.75rem;">PERFORMANCE / KPI TRACKING</h4>
                
                <!-- KPI Dashboards — 2 images only, centered, no crop -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1rem;">
                  <!-- Website Analytics Dashboard -->
                  <div style="border: var(--border-thick); box-shadow: 2px 2px 0px #000; overflow: hidden; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; padding: 0.25rem;">
                    <img src="${imgKpi1}" alt="Website Analytics Dashboard" style="width: 100%; height: auto; max-height: 120px; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'75\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <!-- KPI Tracking Spreadsheet -->
                  <div style="border: var(--border-thick); box-shadow: 2px 2px 0px #000; overflow: hidden; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; padding: 0.25rem;">
                    <img src="${imgKpi2}" alt="KPI Tracking Spreadsheet" style="width: 100%; height: auto; max-height: 120px; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'75\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                </div>

                <!-- KPI Metric boxes -->
                <div class="experience-impact-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.5rem; margin-bottom: 1.5rem;">
                  <div class="experience-metric-card pill-green" style="padding: 0.6rem;">
                    <div class="metric-number" style="font-size: 1.15rem;">1,326</div>
                    <div class="metric-label" style="font-size: 0.65rem;">Website Visits</div>
                  </div>
                  <div class="experience-metric-card pill-purple" style="padding: 0.6rem;">
                    <div class="metric-number" style="font-size: 1.15rem; color: #ffffff;">822</div>
                    <div class="metric-label" style="font-size: 0.65rem; color: #e5e7eb;">Blog Views</div>
                  </div>
                  <div class="experience-metric-card pill-white" style="padding: 0.6rem;">
                    <div class="metric-number" style="font-size: 1.15rem;">105</div>
                    <div class="metric-label" style="font-size: 0.65rem;">Qualified Leads</div>
                  </div>
                  <div class="experience-metric-card pill-green" style="padding: 0.6rem;">
                    <div class="metric-number" style="font-size: 1.15rem;">130%+</div>
                    <div class="metric-label" style="font-size: 0.65rem;">KPI Achievement</div>
                  </div>
                </div>
              </div>

              <!-- Key Learnings Section -->
              <div style="border-top: 2px dashed var(--color-black); padding-top: 1.25rem; margin-top: 1.5rem; margin-bottom: 1rem; text-align: left;">
                <h4 style="font-family: var(--font-heading); font-weight: 900; font-size: 1.25rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.25rem; letter-spacing: 0.5px;">KEY LEARNINGS</h4>
                <p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-top: 0; margin-bottom: 1rem; font-style: italic;">What this project taught me</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <!-- Takeaway Card 1 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Integrated Ecosystem</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">This project taught me how digital marketing works as an integrated ecosystem rather than separate tactics.</div>
                  </div>

                  <!-- Takeaway Card 2 (Purple) -->
                  <div style="border: var(--border-thick); background-color: #c084fc; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Consumer-Led Content</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">I learned how to connect parent insights, SEO content, social media, email marketing, chatbot support, and UX structure into one coherent customer journey.</div>
                  </div>

                  <!-- Takeaway Card 3 (White) -->
                  <div style="border: var(--border-thick); background-color: #ffffff; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">AI-Assisted Execution</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">As Project Lead, I strengthened my ability to coordinate people, manage execution, and use AI-assisted tools to accelerate development while keeping the strategy consumer-focused.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full width buttons placed below the columns -->
        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; width: 100%; box-sizing: border-box; padding: 0;">
          <!-- SỬA: link dự án -->
          <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); border: none; padding: 0.75rem; font-weight: 800; text-transform: uppercase; box-shadow: 4px 4px 0px var(--color-purple); font-family: var(--font-heading); cursor: pointer;">
            VIEW PROJECT <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>

          <button class="btn-form-submit" style="background-color: #e5e7eb; color: var(--color-black); border: var(--border-thick); width: 100%; box-shadow: var(--shadow-hard-sm); font-weight: 800; padding: 0.75rem; text-transform: uppercase; cursor: pointer; font-family: var(--font-heading); margin: 0; box-sizing: border-box;" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    } else if (projectId === 'mystic-sip') {
      const imgViral = data.proofImages[1];
      const imgSegment = data.proofImages[2];
      const imgBigIdea = data.proofImages[3];
      const imgKeyMessage = data.proofImages[4];

      modalContent.innerHTML = `
        <div class="marketing-assistant-two-col">
          <!-- Left Column: Strategy & Planning -->
          <div class="marketing-assistant-left-col">
            <span class="project-num-badge" style="position: relative !important; top: 0 !important; left: 0 !important; display: inline-block !important; margin-bottom: 1rem !important;">PROJECT DETAILS</span>
            <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading); font-size: 1.5rem; line-height: 1.2; font-weight: 900;">${data.title.replace(/\n/g, '<br>')}</h3>
            <p style="font-weight: 800; color: var(--color-purple); font-size: 1.05rem; margin-bottom: 0.25rem;">Role: ${data.role}</p>
            <p style="font-weight: 700; color: var(--color-black); font-size: 0.9rem; margin-bottom: 0.25rem;">Category: ${data.course}</p>
            <p style="font-size: 0.8rem; font-weight: 700; color: #6b7280; margin-bottom: 1.25rem;">Timeline: ${data.time}</p>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">PROJECT OVERVIEW</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 1.25rem;">
                Mystic Sip is an Integrated Marketing Communication (IMC) campaign concept developed for Style by PNJ as part of an academic IMC project at UEH.<br><br>Built from consumer insight research, the campaign introduces the Big Idea "Mystic Sip – Say từng nhịp, giữ một nửa bí ẩn", positioning jewelry as a symbol of subtle emotional expression during Valentine's Day.<br><br>The project combines strategic planning, customer journey design, and retail activation into one integrated campaign.
              </p>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">MY ROLE</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 0.75rem;">
                As a Project Member, I focused on transforming consumer insights into strategic planning, ensuring consistency from campaign concept to retail execution.
              </p>
              
              <!-- 2x2 Brutalist cards for Role -->
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.25rem;">
                <!-- Card 1 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Consumer Insight</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">Research & Behavioral Analysis</div>
                </div>
                <!-- Card 2 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Campaign Concept</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">Big Idea Development</div>
                </div>
                <!-- Card 3 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Customer Journey</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">Touchpoint Planning</div>
                </div>
                <!-- Card 4 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Retail Activation</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">POSM Experience</div>
                </div>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">SKILL SET</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Consumer Insight</span>
                <span class="experience-tool-tag">IMC Planning</span>
                <span class="experience-tool-tag">Customer Journey</span>
                <span class="experience-tool-tag">Retail Activation</span>
                <span class="experience-tool-tag">Campaign Concept</span>
                <span class="experience-tool-tag">Brand Strategy</span>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">TOOLS USED</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Perplexity AI</span>
                <span class="experience-tool-tag">Claude</span>
                <span class="experience-tool-tag">Gemini</span>
                <span class="experience-tool-tag">Photoshop</span>
                <span class="experience-tool-tag">Canva</span>
                <span class="experience-tool-tag">CapCut</span>
                <span class="experience-tool-tag">Premiere Pro</span>
                <span class="experience-tool-tag">Google Docs</span>
                <span class="experience-tool-tag">Google Sheets</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Deliverables -->
          <div class="marketing-assistant-right-col">
            <div>
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.75rem;">CAMPAIGN DELIVERABLES</h4>
              
              <!-- 2x2 proof grid -->
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                <!-- Card 1: Viral Clip -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 110px; overflow: hidden; border-bottom: var(--border-thick);">
                    <!-- Replace Key Visual -->
                    <img src="${imgViral}" alt="Viral Clip Screenshot" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'110\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; border: none; border-radius: 0; font-weight: 800; padding: 0.4rem; font-size: 0.75rem; font-family: var(--font-heading); display: block; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); box-shadow: none; text-transform: uppercase;">VIRAL CLIP <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>

                <!-- Card 2: Segmentation -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 110px; overflow: hidden; border-bottom: var(--border-thick);">
                    <!-- Replace Customer Journey -->
                    <img src="${imgSegment}" alt="Segmentation Screenshot" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'110\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <span class="btn-form-submit" style="margin: 0; text-align: center; border: none; border-radius: 0; font-weight: 800; padding: 0.4rem; font-size: 0.75rem; font-family: var(--font-heading); display: block; width: 100%; box-sizing: border-box; background-color: #e5e7eb; color: var(--color-black); box-shadow: none; text-transform: uppercase;">SEGMENTATION</span>
                </div>

                <!-- Card 3: Big Idea -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 110px; overflow: hidden; border-bottom: var(--border-thick);">
                    <!-- Replace POSM -->
                    <img src="${imgBigIdea}" alt="Big Idea Screenshot" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'110\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <span class="btn-form-submit" style="margin: 0; text-align: center; border: none; border-radius: 0; font-weight: 800; padding: 0.4rem; font-size: 0.75rem; font-family: var(--font-heading); display: block; width: 100%; box-sizing: border-box; background-color: #e5e7eb; color: var(--color-black); box-shadow: none; text-transform: uppercase;">BIG IDEA</span>
                </div>

                <!-- Card 4: Key Message -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: 110px; overflow: hidden; border-bottom: var(--border-thick);">
                    <!-- Replace Source of Growth -->
                    <img src="${imgKeyMessage}" alt="Key Message Screenshot" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'110\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <span class="btn-form-submit" style="margin: 0; text-align: center; border: none; border-radius: 0; font-weight: 800; padding: 0.4rem; font-size: 0.75rem; font-family: var(--font-heading); display: block; width: 100%; box-sizing: border-box; background-color: #e5e7eb; color: var(--color-black); box-shadow: none; text-transform: uppercase;">KEY MESSAGE</span>
                </div>
              </div>

              <!-- Key Learnings Section -->
              <div style="border-top: 2px dashed var(--color-black); padding-top: 1.25rem; margin-top: 1.5rem; margin-bottom: 1rem; text-align: left;">
                <h4 style="font-family: var(--font-heading); font-weight: 900; font-size: 1.25rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.25rem; letter-spacing: 0.5px;">KEY LEARNINGS</h4>
                <p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-top: 0; margin-bottom: 1rem; font-style: italic;">What this project taught me</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <!-- Takeaway Card 1 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">EMOTIONAL INSIGHT</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Learned how luxury and lifestyle brands transform subtle emotional tensions into meaningful communication platforms.</div>
                  </div>

                  <!-- Takeaway Card 2 (Purple) -->
                  <div style="border: var(--border-thick); background-color: #c084fc; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">IMC THINKING</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Understood how strategy, creative direction, retail experience, and media planning must work together as one integrated campaign.</div>
                  </div>

                  <!-- Takeaway Card 3 (White) -->
                  <div style="border: var(--border-thick); background-color: #ffffff; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">BRAND EXPERIENCE</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Designed retail experiences where physical touchpoints reinforce emotional storytelling rather than simply displaying products.</div>
                  </div>

                  <!-- Takeaway Card 4 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">STRATEGIC PLANNING</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Strengthened the ability to connect consumer psychology, customer journey, and business objectives into a cohesive campaign system.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full width buttons placed below the columns -->
          <button class="btn-form-submit" style="background-color: #e5e7eb; color: var(--color-black); border: var(--border-thick); width: 100%; box-shadow: var(--shadow-hard-sm); font-weight: 800; padding: 0.75rem; text-transform: uppercase; cursor: pointer; font-family: var(--font-heading); margin: 0; box-sizing: border-box;" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    } else if (projectId === 'lifebuoy-herbal-guard') {
      const imgCbbe = data.proofImages[1];
      const imgConcept = data.proofImages[2];
      const imgTvc = data.proofImages[3];

      modalContent.innerHTML = `
        <div class="marketing-assistant-two-col">
          <!-- Left Column: Strategy & Planning -->
          <div class="marketing-assistant-left-col">
            <span class="project-num-badge" style="position: relative !important; top: 0 !important; left: 0 !important; display: inline-block !important; margin-bottom: 1rem !important;">PROJECT DETAILS</span>
            <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading); font-size: 1.5rem; line-height: 1.2; font-weight: 900;">${data.title.replace(/\n/g, '<br>')}</h3>
            <p style="font-weight: 800; color: var(--color-purple); font-size: 1.05rem; margin-bottom: 0.25rem;">Role: ${data.role}</p>
            <p style="font-weight: 700; color: var(--color-black); font-size: 0.9rem; margin-bottom: 0.25rem;">Category: ${data.course}</p>
            <p style="font-size: 0.8rem; font-weight: 700; color: #6b7280; margin-bottom: 1.25rem;">Timeline: ${data.time}</p>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">PROJECT OVERVIEW</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 1.25rem;">
                Lifebuoy Product Innovation is a Brand Management academic project at UEH focused on developing a horizontal line extension using the CBBE framework.<br><br>Through market research and consumer analysis, the project identified opportunities within Vietnam's growing demand for natural and gentle body wash products, leading to the concept "Lifebuoy Herbal Guard: Aloe & Betel Leaf."<br><br>The project combines brand equity analysis, consumer insight, and product innovation into one strategic proposal.
              </p>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">MY ROLE</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 0.75rem;">
                As a Project Member, I translated market research and consumer insights into a product innovation concept while ensuring alignment with Lifebuoy's existing brand equity and positioning.
              </p>
              
              <!-- 2x2 Brutalist cards for Role -->
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.25rem;">
                <!-- Card 1 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Brand Equity</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">CBBE Analysis</div>
                </div>
                <!-- Card 2 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Consumer Insight</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">Market Research</div>
                </div>
                <!-- Card 3 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Product Innovation</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">Line Extension</div>
                </div>
                <!-- Card 4 -->
                <div style="border: var(--border-thick); background-color: var(--color-bg-light); box-shadow: 2px 2px 0px #000; padding: 0.75rem; box-sizing: border-box;">
                  <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.15rem;">Brand Strategy</div>
                  <div style="font-size: 0.75rem; color: #4b5563; font-weight: 600;">Portfolio Alignment</div>
                </div>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">SKILL SET</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Brand Equity</span>
                <span class="experience-tool-tag">Product Innovation</span>
                <span class="experience-tool-tag">Consumer Insight</span>
                <span class="experience-tool-tag">Market Analysis</span>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">TOOLS & RESEARCH</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Perplexity AI</span>
                <span class="experience-tool-tag">Claude</span>
                <span class="experience-tool-tag">Gemini</span>
                <span class="experience-tool-tag">Google Sheets</span>
                <span class="experience-tool-tag">Google Docs</span>
                <span class="experience-tool-tag">Canva</span>
                <span class="experience-tool-tag">Photoshop</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Deliverables -->
          <div class="marketing-assistant-right-col">
            <div>
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.75rem;">PROJECT DELIVERABLES</h4>
              
              <!-- Stacked deliverables list -->
              <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem;">
                <!-- Card 1: CBBE Model -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: auto; overflow: hidden; border-bottom: var(--border-thick);">
                    <img src="${imgCbbe}" alt="CBBE Model" style="width: 100%; height: auto; display: block; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <div style="padding: 0.5rem; font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; background-color: #e5e7eb; color: var(--color-black); text-align: center;">CBBE MODEL</div>
                  <div style="padding: 0.3rem 0.5rem 0.5rem; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-align: center; border-top: 1px dashed #9ca3af;">Brand Equity Analysis</div>
                </div>

                <!-- Card 2: Product Concept -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: auto; overflow: hidden; border-bottom: var(--border-thick);">
                    <img src="${imgConcept}" alt="Product Concept" style="width: 100%; height: auto; display: block; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <div style="padding: 0.5rem; font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; background-color: #e5e7eb; color: var(--color-black); text-align: center;">PRODUCT CONCEPT</div>
                  <div style="padding: 0.3rem 0.5rem 0.5rem; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-align: center; border-top: 1px dashed #9ca3af;">Lifebuoy Herbal Guard</div>
                </div>

                <!-- Card 3: TVC Script -->
                <div style="border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #ffffff; display: flex; flex-direction: column;">
                  <div style="width: 100%; height: auto; overflow: hidden; border-bottom: var(--border-thick);">
                    <img src="${imgTvc}" alt="TVC Script" style="width: 100%; height: auto; display: block; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                  </div>
                  <div style="padding: 0.5rem; font-family: var(--font-heading); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; background-color: #e5e7eb; color: var(--color-black); text-align: center;">TVC SCRIPT</div>
                  <div style="padding: 0.3rem 0.5rem 0.5rem; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-align: center; border-top: 1px dashed #9ca3af;">Campaign Storyboard</div>
                </div>
              </div>

              <!-- Key Learnings Section -->
              <div style="border-top: 2px dashed var(--color-black); padding-top: 1.25rem; margin-top: 1.5rem; margin-bottom: 1rem; text-align: left;">
                <h4 style="font-family: var(--font-heading); font-weight: 900; font-size: 1.25rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.25rem; letter-spacing: 0.5px;">KEY LEARNINGS</h4>
                <p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-top: 0; margin-bottom: 1rem; font-style: italic;">What this project taught me</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <!-- Takeaway Card 1 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">BRAND THINKING</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Learned how the CBBE framework guides product innovation by ensuring every new product strengthens—not dilutes—existing brand equity.</div>
                  </div>

                  <!-- Takeaway Card 2 (Purple) -->
                  <div style="border: var(--border-thick); background-color: #c084fc; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">CONSUMER INSIGHT</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Understood how changing consumer preferences for natural ingredients, skin comfort, and antibacterial protection create opportunities for meaningful innovation.</div>
                  </div>

                  <!-- Takeaway Card 3 (White) -->
                  <div style="border: var(--border-thick); background-color: #ffffff; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">MARKET ANALYSIS</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Developed the ability to evaluate market trends, competitor positioning, and category gaps before proposing product opportunities.</div>
                  </div>

                  <!-- Takeaway Card 4 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">PRODUCT INNOVATION</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Practiced translating consumer needs into feasible product concepts that align with brand positioning, portfolio strategy, and long-term growth.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full width buttons placed below the columns -->
        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; width: 100%; box-sizing: border-box; padding: 0;">
          <!-- SỬA: link dự án -->
          <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); border: none; padding: 0.75rem; font-weight: 800; text-transform: uppercase; box-shadow: 4px 4px 0px var(--color-purple); font-family: var(--font-heading); cursor: pointer;">
            VIEW PROJECT <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>

          <button class="btn-form-submit" style="background-color: #e5e7eb; color: var(--color-black); border: var(--border-thick); width: 100%; box-shadow: var(--shadow-hard-sm); font-weight: 800; padding: 0.75rem; text-transform: uppercase; cursor: pointer; font-family: var(--font-heading); margin: 0; box-sizing: border-box;" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    } else {
      const skillsMarkup = data.skills.map(skill => `<span>${skill}</span>`).join('');
      
      // Tạo 3 khối số liệu thống kê lớn Brutalist (nếu có)
      const hasMetrics = data.metrics && data.metrics.length > 0;
      const metricsMarkup = hasMetrics ? data.metrics.map(m => `
        <div class="metric-stat-block block-${m.theme}">
          <span class="metric-num">${m.value}</span>
          <span class="metric-label">${m.label}</span>
        </div>
      `).join('') : '';

      // Tạo hàng ảnh minh chứng lớn
      const proofImagesMarkup = data.proofImages.map(img => `
        <div style="border: var(--border-thick); background-color: var(--color-bg-light); height: 120px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 0.5rem; flex: 1; min-width: 120px;">
          <img src="${img}" alt="Project Campaign Image" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'100\\' viewBox=\\'0 0 160 100\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'150\\' height=\\'90\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'2\\' stroke-dasharray=\\'4,4\\'%3E%3C/rect%3E%3Cg transform=\\'translate(80, 55)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'10\\' font-weight=\\'bold\\'%3EẢnh minh chứng%3C/text%3E%3C/g%3E%3C/svg%3E';">
        </div>
      `).join('');

      modalContent.innerHTML = `
        <span class="project-num-badge" style="margin-top: 1rem; display: inline-block;">PROJECT DETAILS</span>
        <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading);">${data.title}</h3>
        <p style="font-weight: 800; color: var(--color-purple); font-size: 1.1rem; margin-bottom: 0.25rem;">Role: ${data.role}</p>
        ${data.category ? `<p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-bottom: 0.75rem;">Category/Date: ${data.category}</p>` : ''}
        
        <p class="modal-desc"><strong>Campaign/Project Context:</strong> ${data.context}</p>
        <p class="modal-desc"><strong>My Responsibilities:</strong> ${data.whatIDid}</p>
        
        ${hasMetrics ? `
        <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; margin-top: 1.5rem; margin-bottom: 0.75rem;">${data.id === 'lifebuoy-herbal-guard' ? 'Market Insights' : 'Key Results'}</h4>
        <div class="modal-metrics-container">
          ${metricsMarkup}
        </div>
        ${data.id === 'lifebuoy-herbal-guard' ? '<p style="font-size: 0.85rem; font-style: italic; color: #6b7280; margin-top: 0.5rem; margin-bottom: 1rem;">These figures were used as market context to support the product extension strategy, not as campaign performance results.</p>' : ''}
        ` : ''}
        
        <div class="modal-tech" style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${skillsMarkup}
        </div>

        <!-- Proof / Evidence Section -->
        <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1.25rem;">
          <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; margin-bottom: 0.75rem;">Proof / Evidence</h4>
          
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem;">
            ${proofImagesMarkup}
          </div>

          <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin-top: 0; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            LINK <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div class="modal-actions" style="margin-top: 1.25rem; border-top: none; padding-top: 0;">
          <button class="btn-form-submit" style="background-color: var(--color-black); color: var(--color-white); border: none; width: 100%; box-shadow: var(--shadow-hard-sm);" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    projectModal.setAttribute('aria-hidden', 'false');
  }

  // Helper to open award modal
  function openAwardModal(awardId) {
    const data = window.PORTFOLIO_DATA.awards.find(a => a.id === awardId);
    if (!data) return;

    modalContent.innerHTML = `
      <span class="project-num-badge" style="margin-top: 1rem; display: inline-block;">HONOR & AWARD</span>
      <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading);">${data.title} ${data.competition} ${data.year}</h3>
      <p style="font-weight: 800; color: var(--color-purple); font-size: 1rem; margin-bottom: 0.25rem;">Award: ${data.title}</p>
      <p style="font-weight: 700; color: var(--color-black); font-size: 0.95rem; margin-bottom: 0.25rem;">Case/Topic: ${data.caseTopic}</p>
      <p style="font-weight: 600; color: #4b5563; font-size: 0.9rem; margin-bottom: 1rem;">Role: ${data.role}</p>
      
      <p class="modal-desc">${data.desc}</p>
      
      ${data.whatIDidList ? `
      <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; margin-top: 1.5rem; margin-bottom: 0.75rem;">What I did</h4>
      <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
        ${data.whatIDidList.map(item => `<li style="display: flex; align-items: flex-start; gap: 0.5rem;"><i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.8rem; flex-shrink: 0;"></i> <span style="font-size: 0.95rem; color: #4b5563;">${item}</span></li>`).join('')}
      </ul>
      ` : `<p class="modal-desc"><strong>What I did:</strong> ${data.whatIDid}</p>`}
      
      ${data.skills ? `
      <div class="modal-tech" style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
        ${data.skills.map(s => `<span>${s}</span>`).join('')}
      </div>
      ` : ''}

      <!-- Visual certificate inside Modal -->
      <div style="border: var(--border-thick); background-color: #000; display: flex; align-items: center; justify-content: center; margin: 1.5rem 0; overflow: hidden; box-shadow: var(--shadow-hard-sm);">
        <img src="${data.modalImage || data.thumbnail}" alt="Award/Case Evidence" style="width: 100%; height: auto; display: block; object-fit: contain; max-height: 420px;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'100\\' viewBox=\\'0 0 160 100\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'150\\' height=\\'90\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'2\\' stroke-dasharray=\\'4,4\\'%3E%3C/rect%3E%3Cg transform=\\'translate(80, 55)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'10\\' font-weight=\\'bold\\'%3E${data.modalImagePlaceholder || 'Ảnh chứng nhận'}%3C/text%3E%3C/g%3E%3C/svg%3E';">
      </div>

      <div class="modal-actions">
        <button class="btn-form-submit" style="margin-top: 0; width: 100%;" onclick="closeProjectModal()">CLOSE DETAILS</button>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function openExperienceModal(expId) {
    const data = window.PORTFOLIO_DATA.experiences.find(e => e.id === expId);
    if (!data) return;

    const modalClass = document.querySelector('#project-modal .modal-card');
    if (modalClass) {
      if (expId === 'dehaus-creative' || expId === 'margroup-similac' || expId === 'margroup-sting') {
        modalClass.classList.add('marketing-assistant-modal');
      } else {
        modalClass.classList.remove('marketing-assistant-modal');
      }
    }

    if (expId === 'dehaus-creative') {
      // Replace Gallery Image 1
      const galleryImg1 = data.proofImages[1];
      // Replace Gallery Image 2
      const galleryImg2 = data.proofImages[2];
      // Replace Gallery Image 3
      const galleryImg3 = data.proofImages[3];
      
      const bulletsMarkup = data.responsibilities.map(b => `
        <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.85rem; flex-shrink: 0;"></i>
          <span style="font-size: 0.9rem; color: #374151; line-height: 1.45;">${b}</span>
        </li>
      `).join('');

      modalContent.innerHTML = `
        <div class="marketing-assistant-two-col">
          <!-- Left Column: Details & Content -->
          <div class="marketing-assistant-left-col">
            <span class="project-num-badge" style="position: relative !important; top: 0 !important; left: 0 !important; display: inline-block !important; margin-bottom: 1rem !important;">WORK EXPERIENCE</span>
            <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading); font-size: 1.5rem; line-height: 1.2; font-weight: 900;">${data.role}</h3>
            <p style="font-weight: 800; color: var(--color-purple); font-size: 1.05rem; margin-bottom: 0.25rem;">${data.company}</p>
            ${data.project ? `<p style="font-weight: 700; color: var(--color-black); font-size: 0.9rem; margin-bottom: 0.25rem;">Project: ${data.project}</p>` : ''}
            <p style="font-size: 0.8rem; font-weight: 700; color: #6b7280; margin-bottom: 1.25rem;">Date: ${data.date}</p>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">OVERVIEW</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 1.25rem;">Làm Bạn Với Insight is a branding course created by Cang Lê, alongside Cụ Non Marketing — a platform sharing marketing knowledge, brand case studies, and competition case breakdowns for young marketers. My role focused on supporting content development and course operations.</p>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">RESPONSIBILITIES</h4>
              <ul style="list-style: none; margin: 0 0 1.25rem 0; padding: 0;">
                ${bulletsMarkup}
              </ul>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">IMPACT</h4>
              <!-- SỬA: số liệu impact -->
              <div class="experience-impact-metrics">
                <div class="experience-metric-card pill-green">
                  <div class="metric-number">200K+</div>
                  <div class="metric-label">Highest Threads post views</div>
                </div>
                <div class="experience-metric-card pill-purple">
                  <div class="metric-number">6</div>
                  <div class="metric-label" style="color: #e5e7eb;">Course registrations</div>
                </div>
                <div class="experience-metric-card pill-white">
                  <div class="metric-number">3–4</div>
                  <div class="metric-label">Weekly educational posts</div>
                </div>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">CHANNELS & PLATFORMS</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Threads</span>
                <span class="experience-tool-tag">Facebook</span>
                <span class="experience-tool-tag">Instagram</span>
                <span class="experience-tool-tag">Google Docs</span>
                <span class="experience-tool-tag">Google Sheets</span>
                <span class="experience-tool-tag">Canva</span>
                <span class="experience-tool-tag">CapCut</span>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">WORKFLOW</h4>
              <div class="experience-workflow-flow">
                <span class="experience-workflow-chip">Research</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Find marketing cases</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Extract insights</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Create educational content</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Publish</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Track engagement</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Proof / Evidence Gallery & Key Takeaways -->
          <div class="marketing-assistant-right-col">
            <div>
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.75rem;">PROOF / EVIDENCE</h4>
              
              <!-- SỬA: ảnh minh chứng trong popup -->
              <div class="experience-proof-gallery-vertical" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 1rem;">
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg1}" alt="Gallery Image 1" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg2}" alt="Gallery Image 2" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg3}" alt="Gallery Image 3" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
              </div>

              <p style="font-size: 0.8rem; line-height: 1.4; color: #6b7280; font-style: italic; margin-top: 0.5rem; margin-bottom: 1rem;">
                Some original Threads posts and analytics are unavailable because the page was later removed. The remaining screenshots are provided as supporting evidence of my work during the project.
              </p>

              <!-- Key Takeaways Section (Redesigned from Reflection) -->
              <div style="margin-top: 1rem; margin-bottom: 1.5rem; text-align: left;">
                <h4 style="font-family: var(--font-heading); font-weight: 900; font-size: 1.25rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.25rem; letter-spacing: 0.5px;">KEY TAKEAWAYS</h4>
                <p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-top: 0; margin-bottom: 1rem; font-style: italic;">What this experience taught me</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <!-- Takeaway Card 1 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Campaign Logic</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Learned to look beyond what a brand did and understand why it chose a specific insight, message, and communication approach.</div>
                  </div>

                  <!-- Takeaway Card 2 (Purple) -->
                  <div style="border: var(--border-thick); background-color: #c084fc; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Case Study Thinking</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Practiced breaking down FMCG cases such as OMO and Ensure Gold from consumer tension to campaign strategy and execution.</div>
                  </div>

                  <!-- Takeaway Card 3 (White) -->
                  <div style="border: var(--border-thick); background-color: #ffffff; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Smarter Workflow</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Used sources like Primepulse, Ads of the World, and Marketing Mentor, while applying AI prompts and frameworks to turn research into clearer educational content.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full width buttons placed below the columns -->
        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; width: 100%; box-sizing: border-box; padding: 0;">
          <!-- SỬA: link minh chứng -->
          <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); border: none; padding: 0.75rem; font-weight: 800; text-transform: uppercase; box-shadow: 4px 4px 0px var(--color-purple); font-family: var(--font-heading); cursor: pointer;">
            ${data.proofLinkLabel} <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>

          <button class="btn-form-submit" style="background-color: #e5e7eb; color: var(--color-black); border: var(--border-thick); width: 100%; box-shadow: var(--shadow-hard-sm); font-weight: 800; padding: 0.75rem; text-transform: uppercase; cursor: pointer; font-family: var(--font-heading); margin: 0; box-sizing: border-box;" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    } else if (expId === 'margroup-similac') {
      // Replace Gallery Image 1
      const galleryImg1 = data.proofImages[1];
      // Replace Gallery Image 2
      const galleryImg2 = data.proofImages[2];
      // Replace Gallery Image 3
      const galleryImg3 = data.proofImages[3];
      
      const bulletsMarkup = data.responsibilities.map(b => `
        <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.85rem; flex-shrink: 0;"></i>
          <span style="font-size: 0.9rem; color: #374151; line-height: 1.45;">${b}</span>
        </li>
      `).join('');

      modalContent.innerHTML = `
        <div class="marketing-assistant-two-col">
          <!-- Left Column: Details & Content -->
          <div class="marketing-assistant-left-col">
            <span class="project-num-badge" style="position: relative !important; top: 0 !important; left: 0 !important; display: inline-block !important; margin-bottom: 1rem !important;">WORK EXPERIENCE</span>
            <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading); font-size: 1.5rem; line-height: 1.2; font-weight: 900;">${data.role}</h3>
            <p style="font-weight: 800; color: var(--color-purple); font-size: 1.05rem; margin-bottom: 0.25rem;">${data.company}</p>
            ${data.project ? `<p style="font-weight: 700; color: var(--color-black); font-size: 0.9rem; margin-bottom: 0.25rem;">Project: ${data.project}</p>` : ''}
            <p style="font-size: 0.8rem; font-weight: 700; color: #6b7280; margin-bottom: 1.25rem;">Date: ${data.date}</p>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">OVERVIEW</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 1.25rem;">
                SMAG is a student-run marketing agency collaborating with brands to execute real-world marketing campaigns.<br><br>This project supported the execution of Similac's social media minigame campaign, designed to engage parents and increase brand interaction through a prize-driven activation.
              </p>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">RESPONSIBILITIES</h4>
              <ul style="list-style: none; margin: 0 0 1.25rem 0; padding: 0;">
                ${bulletsMarkup}
              </ul>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">IMPACT</h4>
              <!-- SỬA: số liệu impact -->
              <div class="experience-impact-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem;">
                <div class="experience-metric-card pill-green">
                  <div class="metric-number">90+</div>
                  <div class="metric-label">Parenting Communities Researched</div>
                </div>
                <div class="experience-metric-card pill-purple">
                  <div class="metric-number">610+</div>
                  <div class="metric-label" style="color: #e5e7eb;">Participant Submissions Verified</div>
                </div>
                <div class="experience-metric-card pill-white">
                  <div class="metric-number">15M+</div>
                  <div class="metric-label">Campaign Views</div>
                </div>
                <div class="experience-metric-card pill-green">
                  <div class="metric-number">952</div>
                  <div class="metric-label">Participant Interactions</div>
                </div>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">CHANNELS & PLATFORMS</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Facebook</span>
                <span class="experience-tool-tag">Google Sheets</span>
                <span class="experience-tool-tag">Google Docs</span>
                <span class="experience-tool-tag">Community Groups</span>
                <span class="experience-tool-tag">Internal Tracking</span>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">WORKFLOW</h4>
              <div class="experience-workflow-flow">
                <span class="experience-workflow-chip">Campaign Execution</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Participant Management</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Submission Verification</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Performance Tracking</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Campaign Wrap-up</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Proof / Evidence Gallery & Key Takeaways -->
          <div class="marketing-assistant-right-col">
            <div>
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.75rem;">PROOF / EVIDENCE</h4>
              
              <!-- SỬA: ảnh minh chứng trong popup -->
              <div class="experience-proof-gallery-vertical" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 1rem;">
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg1}" alt="Gallery Image 1" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg2}" alt="Gallery Image 2" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg3}" alt="Gallery Image 3" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
              </div>

              <p style="font-size: 0.8rem; line-height: 1.4; color: #6b7280; font-style: italic; margin-top: 0.5rem; margin-bottom: 1rem;">
                Supporting screenshots illustrate participant verification, campaign tracking, and campaign operation workflows. Some internal campaign materials cannot be shared due to project confidentiality.
              </p>

              <!-- Key Takeaways Section -->
              <div style="margin-top: 1rem; margin-bottom: 1.5rem; text-align: left;">
                <h4 style="font-family: var(--font-heading); font-weight: 900; font-size: 1.25rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.25rem; letter-spacing: 0.5px;">KEY TAKEAWAYS</h4>
                <p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-top: 0; margin-bottom: 1rem; font-style: italic;">What this experience taught me</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <!-- Takeaway Card 1 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Consumer Behaviour</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Reviewing hundreds of participant entries helped me better understand how parents respond to campaign mechanics. Practical rewards for children consistently generated stronger engagement than general promotional incentives.</div>
                  </div>

                  <!-- Takeaway Card 2 (Purple) -->
                  <div style="border: var(--border-thick); background-color: #c084fc; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Campaign Operations</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Working behind the scenes taught me how large-scale digital campaigns rely on accurate participant verification, structured reporting, and disciplined execution to ensure campaign fairness and efficiency.</div>
                  </div>

                  <!-- Takeaway Card 3 (White) -->
                  <div style="border: var(--border-thick); background-color: #ffffff; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Process Improvement</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Handling large datasets highlighted opportunities to improve campaign operations through standardized tracking systems, automation, and more efficient verification workflows.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full width buttons placed below the columns -->
        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; width: 100%; box-sizing: border-box; padding: 0;">
          <!-- SỬA: link minh chứng -->
          <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); border: none; padding: 0.75rem; font-weight: 800; text-transform: uppercase; box-shadow: 4px 4px 0px var(--color-purple); font-family: var(--font-heading); cursor: pointer;">
            ${data.proofLinkLabel} <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>

          <button class="btn-form-submit" style="background-color: #e5e7eb; color: var(--color-black); border: var(--border-thick); width: 100%; box-shadow: var(--shadow-hard-sm); font-weight: 800; padding: 0.75rem; text-transform: uppercase; cursor: pointer; font-family: var(--font-heading); margin: 0; box-sizing: border-box;" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    } else if (expId === 'margroup-sting') {
      // Replace Gallery Image 1
      const galleryImg1 = data.proofImages[1];
      // Replace Gallery Image 2
      const galleryImg2 = data.proofImages[2];
      // Replace Gallery Image 3
      const galleryImg3 = data.proofImages[3];
      
      const bulletsMarkup = data.responsibilities.map(b => `
        <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.85rem; flex-shrink: 0;"></i>
          <span style="font-size: 0.9rem; color: #374151; line-height: 1.45;">${b}</span>
        </li>
      `).join('');

      modalContent.innerHTML = `
        <div class="marketing-assistant-two-col">
          <!-- Left Column: Details & Content -->
          <div class="marketing-assistant-left-col">
            <span class="project-num-badge" style="position: relative !important; top: 0 !important; left: 0 !important; display: inline-block !important; margin-bottom: 1rem !important;">WORK EXPERIENCE</span>
            <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading); font-size: 1.5rem; line-height: 1.2; font-weight: 900;">${data.role}</h3>
            <p style="font-weight: 800; color: var(--color-purple); font-size: 1.05rem; margin-bottom: 0.25rem;">${data.company}</p>
            ${data.project ? `<p style="font-weight: 700; color: var(--color-black); font-size: 0.9rem; margin-bottom: 0.25rem;">Project: ${data.project.replace(/\n/g, '<br>')}</p>` : ''}
            <p style="font-size: 0.8rem; font-weight: 700; color: #6b7280; margin-bottom: 1.25rem;">Date: ${data.date}</p>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">OVERVIEW</h4>
              <p style="font-size: 0.9rem; line-height: 1.45; color: #374151; margin-bottom: 1.25rem;">
                SMAG is a student-run marketing agency collaborating with brands to execute real marketing campaigns.<br><br>In this project, I supported the execution of STING's campus campaign by coordinating student ambassadors, managing seeding activities, and ensuring campaign operations ran smoothly from recruitment to reporting.
              </p>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">RESPONSIBILITIES</h4>
              <ul style="list-style: none; margin: 0 0 1.25rem 0; padding: 0;">
                ${bulletsMarkup}
              </ul>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">IMPACT</h4>
              <!-- SỬA: số liệu impact -->
              <div class="experience-impact-metrics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem;">
                <div class="experience-metric-card pill-green">
                  <div class="metric-number">30+</div>
                  <div class="metric-label">Student KOLs Recruited</div>
                </div>
                <div class="experience-metric-card pill-purple">
                  <div class="metric-number">100+</div>
                  <div class="metric-label" style="color: #e5e7eb;">Seeding Members</div>
                </div>
                <div class="experience-metric-card pill-white">
                  <div class="metric-number">VND 7M+</div>
                  <div class="metric-label">Seeding Budget</div>
                </div>
              </div>
              <div class="experience-metric-card pill-green" style="margin-top: 0.75rem; width: 100%; box-sizing: border-box; text-align: center;">
                <div class="metric-number">27.3K+ Reactions & 170+ Shares</div>
                <div class="metric-label">Social Seeding Campaign Performance</div>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">WORKFLOW & TOOLS</h4>
              <div class="experience-tool-tags">
                <span class="experience-tool-tag">Facebook</span>
                <span class="experience-tool-tag">Google Sheets</span>
                <span class="experience-tool-tag">Google Docs</span>
                <span class="experience-tool-tag">Microsoft Excel</span>
                <span class="experience-tool-tag">Messenger</span>
                <span class="experience-tool-tag">Email</span>
              </div>
            </div>

            <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem; text-transform: uppercase; color: var(--color-black); margin-bottom: 0.4rem;">WORKFLOW</h4>
              <div class="experience-workflow-flow">
                <span class="experience-workflow-chip">Recruit Student KOLs</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Coordinate Seeding</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Track Deliverables</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Budget & Payment</span>
                <span class="experience-workflow-arrow">→</span>
                <span class="experience-workflow-chip">Campaign Wrap-up</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Proof / Evidence Gallery & Key Takeaways -->
          <div class="marketing-assistant-right-col">
            <div>
              <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.75rem;">PROOF / EVIDENCE</h4>
              
              <!-- SỬA: ảnh minh chứng trong popup -->
              <div class="experience-proof-gallery-vertical" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 1rem;">
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg1}" alt="Gallery Image 1" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg2}" alt="Gallery Image 2" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
                <div style="width: 100%; height: 200px; border: var(--border-thick); box-shadow: var(--shadow-hard-sm); overflow: hidden; background-color: #e5e7eb;">
                  <img src="${galleryImg3}" alt="Gallery Image 3" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3C/svg%3E';">
                </div>
              </div>

              <p style="font-size: 0.8rem; line-height: 1.4; color: #6b7280; font-style: italic; margin-top: 0.5rem; margin-bottom: 1rem;">
                Screenshots are selected examples from the campaign. Additional internal documents and coordination materials are omitted for confidentiality.
              </p>

              <!-- Key Takeaways Section -->
              <div style="margin-top: 1rem; margin-bottom: 1.5rem; text-align: left;">
                <h4 style="font-family: var(--font-heading); font-weight: 900; font-size: 1.25rem; text-transform: uppercase; color: var(--color-black); margin-top: 0; margin-bottom: 0.25rem; letter-spacing: 0.5px;">KEY TAKEAWAYS</h4>
                <p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-top: 0; margin-bottom: 1rem; font-style: italic;">What this experience taught me</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <!-- Takeaway Card 1 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">KOL Selection</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">This campaign showed me that successful seeding is more than simply finding influencers—it starts with selecting the right student voices that genuinely fit the brand's personality and audience.</div>
                  </div>

                  <!-- Takeaway Card 2 (Purple) -->
                  <div style="border: var(--border-thick); background-color: #c084fc; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Campaign Operations</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Working with over one hundred participants taught me how large-scale campaign coordination depends on accurate communication, organized tracking systems, and careful execution across many moving parts.</div>
                  </div>

                  <!-- Takeaway Card 3 (White) -->
                  <div style="border: var(--border-thick); background-color: #ffffff; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Multi-Stakeholder Coordination</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">Beyond operations, I gained practical experience managing recruitment, booking, scheduling, budget tracking, and campaign reporting while balancing multiple stakeholders simultaneously.</div>
                  </div>

                  <!-- Takeaway Card 4 (Neon Green) -->
                  <div style="border: var(--border-thick); background-color: #a3e635; color: #000; box-shadow: 3px 3px 0px #000; padding: 1rem; box-sizing: border-box;">
                    <div style="font-family: var(--font-heading); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;">Authentic Awareness</div>
                    <div style="font-size: 0.8rem; line-height: 1.4; font-weight: 600;">This experience strengthened my understanding of how brands use peer influence and campus communities to build authentic awareness among young consumers.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full width buttons placed below the columns -->
        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; width: 100%; box-sizing: border-box; padding: 0;">
          <!-- SỬA: link minh chứng -->
          <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin: 0; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-sizing: border-box; background-color: var(--color-black); color: var(--color-white); border: none; padding: 0.75rem; font-weight: 800; text-transform: uppercase; box-shadow: 4px 4px 0px var(--color-purple); font-family: var(--font-heading); cursor: pointer;">
            VIEW CAMPAIGN <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>

          <button class="btn-form-submit" style="background-color: #e5e7eb; color: var(--color-black); border: var(--border-thick); width: 100%; box-shadow: var(--shadow-hard-sm); font-weight: 800; padding: 0.75rem; text-transform: uppercase; cursor: pointer; font-family: var(--font-heading); margin: 0; box-sizing: border-box;" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    } else {
      const bulletsMarkup = data.responsibilities.map(b => `<li style="display: flex; align-items: flex-start; gap: 0.5rem;"><i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.9rem; flex-shrink: 0;"></i> <span>${b}</span></li>`).join('');
      const skillsMarkup = data.tags.map(skill => `<span>${skill}</span>`).join('');
      
      const proofImagesMarkup = data.proofImages.map(img => `
        <div style="border: var(--border-thick); background-color: var(--color-bg-light); height: 120px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 0.5rem; flex: 1; min-width: 120px;">
          <img src="${img}" alt="Experience Proof Image" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'100\\' viewBox=\\'0 0 160 100\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'150\\' height=\\'90\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'2\\' stroke-dasharray=\\'4,4\\'%3E%3C/rect%3E%3Cg transform=\\'translate(80, 55)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'10\\' font-weight=\\'bold\\'%3EẢnh minh chứng%3C/text%3E%3C/g%3E%3C/svg%3E';">
        </div>
      `).join('');

      modalContent.innerHTML = `
        <span class="project-num-badge" style="margin-top: 1rem; display: inline-block;">WORK EXPERIENCE</span>
        <h3 style="margin-top: 0.5rem; text-transform: uppercase; font-family: var(--font-heading);">${data.role}</h3>
        <p style="font-weight: 800; color: var(--color-purple); font-size: 1.1rem; margin-bottom: 0.25rem;">${data.company}</p>
        ${data.project ? `<p style="font-weight: 700; color: var(--color-black); font-size: 0.95rem; margin-bottom: 0.25rem;">Project: ${data.project}</p>` : ''}
        <p style="font-size: 0.85rem; font-weight: 700; color: #6b7280; margin-bottom: 1rem;">Date: ${data.date}</p>
        
        <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; margin-bottom: 0.75rem;">Responsibilities</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; padding: 0;">
          ${bulletsMarkup}
        </ul>

        <div class="modal-tech" style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          ${skillsMarkup}
        </div>

        <!-- Proof / Evidence Section -->
        <div style="border-top: 2px dashed var(--color-black); padding-top: 1rem; margin-top: 1.25rem;">
          <h4 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; text-transform: uppercase; margin-bottom: 0.75rem;">Proof / Evidence</h4>
          
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem;">
            ${proofImagesMarkup}
          </div>

          <a href="${data.proofLinkHref}" target="_blank" rel="noopener" class="btn-form-submit" style="margin-top: 0; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            ${data.proofLinkLabel} <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div class="modal-actions" style="margin-top: 1.25rem; border-top: none; padding-top: 0;">
          <button class="btn-form-submit" style="background-color: var(--color-black); color: var(--color-white); border: none; width: 100%; box-shadow: var(--shadow-hard-sm);" onclick="closeProjectModal()">CLOSE DETAILS</button>
        </div>
      `;
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    projectModal.setAttribute('aria-hidden', 'true');
    const modalClass = document.querySelector('#project-modal .modal-card');
    if (modalClass) {
      modalClass.classList.remove('marketing-assistant-modal');
    }
  }

  window.closeProjectModal = closeProjectModal;

  // Lắng nghe sự kiện click mở modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  awardCards.forEach(card => {
    card.addEventListener('click', () => {
      const awardId = card.getAttribute('data-award');
      openAwardModal(awardId);
    });
  });

  experienceCards.forEach(card => {
    card.addEventListener('click', () => {
      const expId = card.getAttribute('data-experience');
      openExperienceModal(expId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     CONTACT FORM MODAL
     ========================================================================== */
  const btnTriggerForm = document.getElementById('btn-trigger-form');
  const btnSeeArchive = document.getElementById('btn-see-archive');
  const contactModal = document.getElementById('contact-modal');
  const contactModalClose = document.getElementById('contact-modal-close');
  const brutalistContactForm = document.getElementById('brutalist-contact-form');

  function openContactModal() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    contactModal.setAttribute('aria-hidden', 'false');
  }

  function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
    contactModal.setAttribute('aria-hidden', 'true');
  }

  if (btnTriggerForm) btnTriggerForm.addEventListener('click', openContactModal);
  if (btnSeeArchive) {
    btnSeeArchive.addEventListener('click', () => {
      openContactModal();
      const formMsg = document.getElementById('form-message');
      if (formMsg) {
        formMsg.value = "Hi Ngoc, I would like to request access to your full marketing projects archive.";
      }
    });
  }
  
  if (contactModalClose) contactModalClose.addEventListener('click', closeContactModal);

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      closeContactModal();
    }
  });

  if (brutalistContactForm) {
    brutalistContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const message = document.getElementById('form-message').value;

      alert(`Cảm ơn ${name}! Tin nhắn của bạn đã được gửi thành công đến hngocphan0505@gmail.com.\n\nNội dung: "${message}"`);
      
      brutalistContactForm.reset();
      closeContactModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal.classList.contains('active')) closeProjectModal();
      if (contactModal.classList.contains('active')) closeContactModal();
    }
  });

  /* ==========================================================================
     SMOOTH LINK NAVIGATION SCROLL
     ========================================================================== */
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const offset = 70;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
