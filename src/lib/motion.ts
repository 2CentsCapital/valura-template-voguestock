import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';

/*
 * Motion policy for this page.
 *
 * Designed motion (entrance reveals, count-ups, ambient CSS loops, canvases, carousel auto-advance) runs for every
 * visitor, including when the system asks for reduced motion. Under that setting only smooth scrolling is switched
 * off and ambient loops run a little slower. Visitors stop ambient motion with the "Pause animations" toggle in the
 * footer; the choice is kept in localStorage and applied by an inline script in index.html before first paint.
 */

export const MOTION_STORAGE_KEY = 'voguestock-motion-paused';
const PAUSED_CLASS = 'motion-paused';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function readStoredPause(): boolean {
  try {
    return window.localStorage.getItem(MOTION_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

let paused = document.documentElement.classList.contains(PAUSED_CLASS) || readStoredPause();
const listeners = new Set<() => void>();

function applyPaused(next: boolean) {
  paused = next;
  document.documentElement.classList.toggle(PAUSED_CLASS, next);
  listeners.forEach((listener) => listener());
}

document.documentElement.classList.toggle(PAUSED_CLASS, paused);
window.addEventListener('storage', (event) => {
  if (event.key === MOTION_STORAGE_KEY) applyPaused(event.newValue === '1');
});

/** Pauses or resumes ambient motion across the page and remembers the choice. */
export function setMotionPaused(next: boolean): void {
  try {
    if (next) window.localStorage.setItem(MOTION_STORAGE_KEY, '1');
    else window.localStorage.removeItem(MOTION_STORAGE_KEY);
  } catch {
    // Storage can be unavailable (for example in a private window); the choice then lasts for this visit.
  }
  applyPaused(next);
}

function subscribePaused(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useMotionPaused(): boolean {
  return useSyncExternalStore(subscribePaused, () => paused);
}

function subscribeReduced(listener: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}

/** The system reduced-motion setting: used only to switch off smooth scrolling and to slow ambient loops. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED_QUERY).matches);
}

/** Speed multiplier for JS-driven ambient loops: a little slower under reduced motion, never frozen. */
export function useMotionSpeed(): number {
  return usePrefersReducedMotion() ? 0.6 : 1;
}

function subscribeVisibility(listener: () => void) {
  document.addEventListener('visibilitychange', listener);
  return () => document.removeEventListener('visibilitychange', listener);
}

export function usePageVisible(): boolean {
  return useSyncExternalStore(subscribeVisibility, () => document.visibilityState !== 'hidden');
}

/** True while the element is within `rootMargin` of the viewport. */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = '200px'): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/**
 * CSS loops (elements with the `loop` class) inside a zone run only while the zone is near the viewport.
 * Usage: `const loops = useLoopZone(ref)` then `<section ref={ref} data-loops={loops}>`.
 */
export function useLoopZone<T extends Element>(ref: RefObject<T | null>, rootMargin = '120px'): 'on' | 'off' {
  return useInView(ref, rootMargin) ? 'on' : 'off';
}
