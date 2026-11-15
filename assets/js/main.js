// 渲染与交互。内容来自 data.js。
(function () {
  const $ = (sel, root) => (root || document).querySelector(sel);
  const mediaUrl = (name) => 'assets/media/' + name;

  function tagStack(stack) {
    return (stack || []).map((s) => `<span class="tag">${s}</span>`).join('');
  }

  function coverHtml(p, cls) {
    if (p.cover) {
      return `<div class="${cls}"><img src="${p.cover}" alt="${p.title} 作品封面" loading="lazy" /></div>`;
    }
    return `<div class="${cls}"><div class="placeholder">暂无封面素材<br />（线框占位，待补充截图）</div></div>`;
  }

  function hero() {
    $('#hero-tagline').textContent = PROFILE.tagline;
    $('#hero-meta').textContent = PROFILE.education;
  }

  function initBanner() {
    const bg = $('#banner-bg');
    if (!bg) return;
    bg.style.background = 'linear-gradient(120deg, #ece2cf 0%, #f2eee6 55%, #e6dac3 100%)';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      const onScroll = () => { bg.style.transform = `translateY(${window.scrollY * 0.1}px)`; };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  function spawnRipple(host, e) {
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = (e.clientX - rect.left - size / 2) + 'px';
    dot.style.top = (e.clientY - rect.top - size / 2) + 'px';
    host.appendChild(dot);
    setTimeout(() => dot.remove(), 650);
  }

  function editorialCard(p, idx) {
    return `
      <article class="editorial-item" data-id="${p.id}" tabindex="0" role="button" aria-label="查看 ${p.title} 详情">
        ${coverHtml(p, 'item-media')}
        <div class="item-body">
          <span class="item-index">${String(idx + 1).padStart(2, '0')} / ${CATEGORY_LABEL[p.category]}</span>
          <h3>${p.title}<span class="item-en">${p.titleEn || ''}</span></h3>
          <p class="item-role">${p.role}</p>
          <p class="item-summary">${p.summary}</p>
          <div class="item-tags">${tagStack(p.stack)}</div>
        </div>
      </article>`;
  }

  function workCard(p) {
    return `
      <article class="work-card" data-id="${p.id}" tabindex="0" role="button" aria-label="查看 ${p.title} 详情">
        ${coverHtml(p, 'work-cover')}
        <div class="work-body">
          <h3>${p.title}</h3>
          <p class="work-role">${p.role}</p>
        </div>
      </article>`;
  }

  function renderLists() {
    const games = PROJECTS.filter((p) => p.category === 'game');
    const scenes = PROJECTS.filter((p) => p.category === 'scene');
    $('#game-list').innerHTML = games.map((p, i) => editorialCard(p, i)).join('');
    $('#scene-list').innerHTML = scenes.map((p, i) => editorialCard(p, i)).join('');
    $('#art-grid').innerHTML = PROJECTS.filter((p) => p.category === 'art').map(workCard).join('');
    const sculpts = PROJECTS.filter((p) => p.category === 'sculpt');
    $('#sculpt-list').innerHTML = sculpts.map((p, i) => editorialCard(p, i)).join('');
  }

  function renderAbout() {
    const intro = PROFILE.aboutIntro.map((p) => `<p class="about-p">${p}</p>`).join('');
    const contact =
      '<ul class="about-contact">' +
      `<li>邮箱：<a href="mailto:${PROFILE.contact.email}">${PROFILE.contact.email}</a></li>` +
      `<li>电话：<a href="tel:${PROFILE.contact.phone}">${PROFILE.contact.phone}</a></li>` +
      `<li>所在地：${PROFILE.contact.location}</li>` +
      '</ul>';
    $('#about-root').innerHTML = `
      <figure class="about-photo">
        <img src="${PROFILE.aboutPhoto}" alt="袁莉茹 本人照片" loading="lazy" />
      </figure>
      <div class="about-text">
        <h3 class="about-name">${PROFILE.name}<span class="about-alias">${PROFILE.alias}</span></h3>
        <p class="about-role">${PROFILE.direction} · 游戏美术方向</p>
        ${intro}
        ${contact}
      </div>`;
    $('#footer-contact').textContent = `${PROFILE.contact.email} · ${PROFILE.contact.phone} · ${PROFILE.contact.location}`;
  }

  // 详情弹层
  const overlay = $('#overlay');
  let lastScroll = 0;

  function mediaGrid(p) {
    if (!p.media || !p.media.length) {
      return `<div class="detail-media"><div class="placeholder">暂无作品图片<br />待补充素材</div></div>`;
    }
    return `<div class="detail-media">` +
      p.media.map((m) => `<img src="${mediaUrl(m)}" alt="${p.title} 作品图" loading="lazy" />`).join('') +
      `</div>`;
  }

  function linkBlock(p) {
    if (!p.links) return '';
    const items = [];
    if (p.links.taptap) {
      items.push(`<a class="detail-link" href="${p.links.taptap}" target="_blank" rel="noopener noreferrer">前往 TapTap 查看 / 试玩 DEMO ↗</a>`);
    }
    return items.length ? `<div class="detail-links">${items.join('')}</div>` : '';
  }

  function videoBlock(p) {
    if (!p.video) return '';
    return `<div class="detail-video">
      <video controls preload="metadata" poster="${p.video.poster}" src="${p.video.src}"></video>
    </div>`;
  }

  function openDetail(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    lastScroll = window.scrollY;
    const points = (p.highlights || []).map((h) => `<li>${h}</li>`).join('');
    $('#detail-root').innerHTML = `
      <p class="detail-kicker">${CATEGORY_LABEL[p.category]}</p>
      <h3 class="detail-title">${p.title}<span class="detail-en">　${p.titleEn || ''}</span></h3>
      <p class="detail-role">${p.role}</p>
      <p class="detail-summary">${p.summary}</p>
      <div class="detail-highlights"><div class="item-tags">${tagStack(p.stack)}</div></div>
      ${linkBlock(p)}
      ${videoBlock(p)}
      ${points ? `<div class="detail-points"><h3>要点</h3><ul>${points}</ul></div>` : ''}
      ${p.course ? `<p class="detail-course">${p.course}</p>` : ''}
      ${p.gap ? `<p class="detail-gap">${p.gap}</p>` : ''}
      ${mediaGrid(p)}
    `;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.overlay-close', overlay).focus();
  }

  function closeDetail() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    window.scrollTo(0, lastScroll);
  }

  // 图片灯箱：点击完整单独展示
  const lightbox = $('#lightbox');
  const lbImg = $('#lightbox-img');
  let lbList = [];
  let lbIdx = 0;
  const LB_MIN_SCALE = 1;
  const LB_MAX_SCALE = 3;
  const LB_SCALE_STEP = 0.15;
  let lbScale = 1;
  let lbX = 0;
  let lbY = 0;
  let lbDragging = false;
  let lbStartX = 0;
  let lbStartY = 0;
  let lbOriginX = 0;
  let lbOriginY = 0;

  function applyLbTransform() {
    lbImg.style.transform = `translate(${lbX}px, ${lbY}px) scale(${lbScale})`;
  }

  function resetLbPan() {
    lbX = 0; lbY = 0; lbDragging = false;
  }

  function openLightbox(src) {
    lbList = [...document.querySelectorAll('.detail-media img')].map((i) => i.src);
    lbIdx = Math.max(0, lbList.indexOf(src));
    showLightbox();
  }

  function showLightbox() {
    lbScale = LB_MIN_SCALE;
    resetLbPan();
    applyLbTransform();
    lbImg.src = lbList[lbIdx];
    lightbox.hidden = false;
    document.querySelector('[data-lb-prev]').disabled = lbList.length <= 1;
    document.querySelector('[data-lb-next]').disabled = lbList.length <= 1;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lbImg.src = '';
    lbScale = LB_MIN_SCALE;
    resetLbPan();
    applyLbTransform();
  }

  function stepLightbox(d) {
    if (lbList.length <= 1) return;
    lbIdx = (lbIdx + d + lbList.length) % lbList.length;
    showLightbox();
  }

  function onLbWheel(e) {
    e.preventDefault();
    lbScale += e.deltaY < 0 ? LB_SCALE_STEP : -LB_SCALE_STEP;
    lbScale = Math.min(LB_MAX_SCALE, Math.max(LB_MIN_SCALE, lbScale));
    applyLbTransform();
  }

  function clampLbPan() {
    const maxX = window.innerWidth * 0.45;
    const maxY = window.innerHeight * 0.45;
    lbX = Math.min(maxX, Math.max(-maxX, lbX));
    lbY = Math.min(maxY, Math.max(-maxY, lbY));
  }

  function onLbMouseDown(e) {
    if (e.button !== 1 || lbScale <= LB_MIN_SCALE) return;
    e.preventDefault();
    lbDragging = true;
    lightbox.classList.add('lb-dragging');
    lbStartX = e.clientX;
    lbStartY = e.clientY;
    lbOriginX = lbX;
    lbOriginY = lbY;
  }

  function onLbMouseMove(e) {
    if (!lbDragging) return;
    lbX = lbOriginX + (e.clientX - lbStartX);
    lbY = lbOriginY + (e.clientY - lbStartY);
    clampLbPan();
    applyLbTransform();
  }

  function onLbMouseUp() {
    lbDragging = false;
    lightbox.classList.remove('lb-dragging');
  }

  function bindEvents() {
    const toTop = $('#to-top');
    const onToTopScroll = () => toTop.classList.toggle('show', window.scrollY > 400);
    window.addEventListener('scroll', onToTopScroll, { passive: true });
    onToTopScroll();
    toTop.addEventListener('click', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });

    lightbox.addEventListener('wheel', onLbWheel, { passive: false });
    lightbox.addEventListener('mousedown', onLbMouseDown);
    document.addEventListener('mousemove', onLbMouseMove);
    document.addEventListener('mouseup', onLbMouseUp);
    document.addEventListener('click', (e) => {
      const rippleHost = e.target.closest('.banner-btn, [data-id]');
      if (rippleHost) spawnRipple(rippleHost, e);
      const lbImage = e.target.closest('.detail-media img');
      if (lbImage) { openLightbox(lbImage.src); return; }
      if (e.target.closest('[data-lb-close]')) { closeLightbox(); return; }
      if (e.target.closest('[data-lb-prev]')) { stepLightbox(-1); return; }
      if (e.target.closest('[data-lb-next]')) { stepLightbox(1); return; }
      const card = e.target.closest('[data-id]');
      if (card) { openDetail(card.dataset.id); return; }
      if (e.target.closest('[data-close]')) closeDetail();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.hidden) {
        if (e.key === 'Escape') { closeLightbox(); return; }
        if (e.key === 'ArrowLeft') { stepLightbox(-1); return; }
        if (e.key === 'ArrowRight') { stepLightbox(1); return; }
      }
      if (e.key === 'Escape' && !overlay.hidden) closeDetail();
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-id]')) {
        e.preventDefault(); openDetail(e.target.dataset.id);
      }
    });
  }

  hero();
  initBanner();
  renderLists();
  renderAbout();
  bindEvents();
})();
