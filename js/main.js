// noa LP - main.js

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  // ---- hero見出し：1文字ずつ流れるように表示 ----
  const CHAR_STEP_MS = 45;
  let charIndex = 0;

  document.querySelectorAll('.js-char-flow').forEach((line) => {
    const text = line.textContent;
    line.textContent = '';

    const lineDelay = charIndex * CHAR_STEP_MS;
    line.style.setProperty('--line-delay', `${lineDelay}ms`);

    Array.from(text).forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.animationDelay = `${charIndex * CHAR_STEP_MS}ms`;
      span.textContent = char === ' ' ? ' ' : char;
      line.appendChild(span);
      charIndex += 1;
    });
  });

  // ---- アンカーリンクのスムーススクロール ----
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      if (mobileNav && !mobileNav.hidden) {
        closeMobileNav();
      }
    });
  });

  // ---- ヘッダー：スクロールで背景を切り替え ----
  if (header) {
    const toggleHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    toggleHeaderState();
    window.addEventListener('scroll', toggleHeaderState, { passive: true });
  }

  // ---- モバイルメニュー ----
  function openMobileNav() {
    mobileNav.hidden = false;
    requestAnimationFrame(() => {
      mobileNav.classList.add('is-open');
    });
    document.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'メニューを閉じる');
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'メニューを開く');

    const onTransitionEnd = () => {
      mobileNav.hidden = true;
      mobileNav.removeEventListener('transitionend', onTransitionEnd);
    };
    mobileNav.addEventListener('transitionend', onTransitionEnd);
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // ---- スクロールで要素をフェードイン ----
  const revealTargets = document.querySelectorAll('.reveal, .reveal-group');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }
});
