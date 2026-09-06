'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealOptions {
  /** CSS selector for the elements to reveal, relative to the container. Defaults to direct children. */
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>({
  selector,
  y = 24,
  stagger = 0.08,
  start = 'top 85%',
}: ScrollRevealOptions = {}) {
  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      const targets = selector
        ? containerRef.current?.querySelectorAll(selector)
        : containerRef.current?.children;
      if (!targets || targets.length === 0) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Note: intentionally not gsap.from() + toggleActions. That combo lets ScrollTrigger's
      // creation-time state sync animate the tween once immediately (to reconcile the "from"
      // values against the natural DOM state), and that phantom play/reverse leaves the
      // trigger unable to fire on the user's real scroll afterwards. Setting the hidden state
      // with gsap.set() up front and driving visibility from onEnter/onLeaveBack directly
      // avoids that sync step entirely.
      gsap.set(targets, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start,
        onEnter: () => gsap.to(targets, { opacity: 1, y: 0, duration: 0.5, stagger, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(targets, { opacity: 0, y, duration: 0.3, stagger, ease: 'power2.out' }),
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}
