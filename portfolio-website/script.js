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
      const tagsMarkup = exp.tags.map(t => `<span>${t}</span>`).join('');
      const proofImagesMarkup = exp.proofImages.slice(0, 2).map(img => `
        <img src="${img}" alt="Experience Proof Placeholder" class="small-proof-img" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'70\\' viewBox=\\'0 0 120 70\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'110\\' height=\\'60\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'1.5\\' stroke-dasharray=\\'3,3\\'%3E%3C/rect%3E%3Cg transform=\\'translate(60, 40)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'9\\' font-weight=\\'bold\\'%3EẢnh minh chứng%3C/text%3E%3C/g%3E%3C/svg%3E';">
      `).join('');

      return `
        <div class="experience-card" data-experience="${exp.id}">
          <div class="exp-badge">${exp.date}</div>
          <div class="exp-header">
            <span class="exp-company">${exp.company}</span>
            <h3>${exp.role}</h3>
            ${exp.project ? `<span class="exp-subtitle">${exp.project}</span>` : ''}
          </div>
          
          <div class="card-proof-row">
            ${proofImagesMarkup}
          </div>

          <div class="exp-tags">
            ${tagsMarkup}
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Tạo thẻ Dự án nổi bật (Projects)
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid && window.PORTFOLIO_DATA.projects) {
    projectsGrid.innerHTML = window.PORTFOLIO_DATA.projects.map(proj => {
      const isProj3 = proj.id === 'lifebuoy-herbal-guard';
      const skillsMarkup = proj.skills.map(s => `<span ${isProj3 ? 'style="display: inline-flex !important; width: fit-content !important; max-width: 100% !important; padding: 4px 8px !important; font-size: 0.7rem !important; line-height: 1 !important; white-space: nowrap !important; margin: 0 !important;"' : ''}>${s}</span>`).join('');
      const proofImagesMarkup = proj.proofImages.slice(0, 2).map(img => `
        <img src="${img}" alt="Project Campaign Placeholder" class="small-proof-img" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'70\\' viewBox=\\'0 0 120 70\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'110\\' height=\\'60\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'1.5\\' stroke-dasharray=\\'3,3\\'%3E%3C/rect%3E%3Cg transform=\\'translate(60, 40)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'9\\' font-weight=\\'bold\\'%3EẢnh minh chứng%3C/text%3E%3C/g%3E%3C/svg%3E';">
      `).join('');

      return `
        <div class="project-card" data-project="${proj.id}">
          <div class="project-num-badge">${proj.number}</div>
          <div class="project-card-body">
            <div class="project-title-row" style="margin-bottom: 0.4rem;">
              <h3 style="color: var(--color-black); font-weight: 800; font-size: 1.25rem; line-height: 1.2; margin: 0;">${proj.title}</h3>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem;">
              <p style="color: var(--color-purple); font-weight: 700; font-size: 0.95rem; margin: 0;">${proj.role}</p>
              <p style="color: var(--color-black); font-weight: 700; font-size: 0.85rem; margin: 0;">${proj.course}</p>
              <div style="margin-top: 0.2rem;"><span style="font-size: 0.7rem; font-weight: 700; background-color: var(--color-bg-light); border: var(--border-thin); padding: 0.2rem 0.6rem; border-radius: 100px; display: inline-block; color: var(--color-black);">${proj.time}</span></div>
            </div>

            <div class="card-proof-row">
              ${proofImagesMarkup}
            </div>

            <div class="project-tags" ${isProj3 ? 'style="display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 6px !important; align-items: center !important;"' : ''}>
              ${skillsMarkup}
            </div>

            <button class="btn-project-proof">LINK <i class="fa-solid fa-arrow-right"></i></button>
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
      <div style="border: var(--border-thick); background-color: var(--color-bg-light); height: 200px; display: flex; align-items: center; justify-content: center; margin: 1.5rem 0; padding: 0.5rem;">
        <img src="${data.modalImage || data.thumbnail}" alt="Award/Case Evidence" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'100\\' viewBox=\\'0 0 160 100\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23e5e7eb\\'%3E%3C/rect%3E%3Crect x=\\'5\\' y=\\'5\\' width=\\'150\\' height=\\'90\\' fill=\\'none\\' stroke=\\'%239ca3af\\' stroke-width=\\'2\\' stroke-dasharray=\\'4,4\\'%3E%3C/rect%3E%3Cg transform=\\'translate(80, 55)\\' text-anchor=\\'middle\\' fill=\\'%236b7280\\' font-family=\\'system-ui, sans-serif\\'%3E%3Ctext x=\\'0\\' y=\\'0\\' font-size=\\'10\\' font-weight=\\'bold\\'%3E${data.modalImagePlaceholder || 'Ảnh chứng nhận'}%3C/text%3E%3C/g%3E%3C/svg%3E';">
      </div>

      <div class="modal-actions">
        <button class="btn-form-submit" style="margin-top: 0; width: 100%;" onclick="closeProjectModal()">CLOSE DETAILS</button>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    projectModal.setAttribute('aria-hidden', 'false');
  }

  // Helper to open experience modal
  function openExperienceModal(expId) {
    const data = window.PORTFOLIO_DATA.experiences.find(e => e.id === expId);
    if (!data) return;

    const bulletsMarkup = data.responsibilities.map(b => `<li style="display: flex; align-items: flex-start; gap: 0.5rem;"><i class="fa-solid fa-circle-chevron-right" style="color: var(--color-purple); margin-top: 0.25rem; font-size: 0.9rem; flex-shrink: 0;"></i> <span>${b}</span></li>`).join('');
    const skillsMarkup = data.tags.map(skill => `<span>${skill}</span>`).join('');
    
    // Tạo hàng ảnh minh chứng lớn
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

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    projectModal.setAttribute('aria-hidden', 'false');
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    projectModal.setAttribute('aria-hidden', 'true');
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
