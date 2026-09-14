/**
 * One-shot entrance reveals.
 *
 * Elements marked `data-reveal` start hidden (see index.css) and receive `data-revealed` when they scroll into view,
 * which plays a short opacity and transform transition and dispatches a `reveal` event (count-ups listen for it).
 * Reveals are not scrubbed to the scroll position, so they run for every visitor, including under reduced motion.
 * A timed sweep reveals anything in or above the viewport even if the observer never fires, so no content can stay
 * hidden. While animations are paused, index.css shows every element immediately.
 */
export function startReveals(root: ParentNode = document): () => void {
  const pending = new Set<Element>(Array.from(root.querySelectorAll('[data-reveal]:not([data-revealed])')));
  let observer: IntersectionObserver | null = null;
  let timer = 0;
  let frame = 0;

  const stop = () => {
    window.clearInterval(timer);
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    observer?.disconnect();
  };

  const reveal = (el: Element) => {
    if (!pending.delete(el)) return;
    el.setAttribute('data-revealed', '');
    observer?.unobserve(el);
    el.dispatchEvent(new CustomEvent('reveal'));
    if (pending.size === 0) stop();
  };

  const sweep = () => {
    const limit = window.innerHeight * 0.94;
    for (const el of Array.from(pending)) {
      if (el.getBoundingClientRect().top < limit) reveal(el);
    }
  };

  function onScroll() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sweep);
  }

  if (!('IntersectionObserver' in window)) {
    Array.from(pending).forEach(reveal);
    return stop;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
  );
  pending.forEach((el) => observer?.observe(el));

  // Fallback so nothing can stay hidden if the observer never fires.
  timer = window.setInterval(sweep, 700);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  return stop;
}
