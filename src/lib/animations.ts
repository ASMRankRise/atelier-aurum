import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register plugins on client only to prevent SSR / static generation failures
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Architectural luxury easing presets matching high-end editorial aesthetics
 */
export const EASINGS = {
  luxury: "power3.out",
  smoothExpo: "power4.out",
  architectural: "expo.out",
  cinematic: "power2.inOut",
  springGentle: "back.out(1.15)",
} as const;

export interface RevealOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  duration?: number;
  delay?: number;
  y?: number;
  opacity?: number;
  stagger?: number;
  scrub?: boolean | number;
  ease?: string;
}

/**
 * Reveal element(s) upward with a soft, architectural fade
 */
export function revealOnScroll(
  target: gsap.DOMTarget,
  options: RevealOptions = {}
): gsap.core.Tween | undefined {
  if (typeof window === "undefined") return undefined;

  const {
    trigger = target,
    start = "top 88%",
    duration = 1.1,
    delay = 0,
    y = 35,
    opacity = 0,
    stagger = 0.08,
    scrub = false,
    ease = EASINGS.luxury,
  } = options;

  return gsap.fromTo(
    target,
    {
      y,
      opacity,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        scrub,
        toggleActions: scrub ? undefined : "play none none reverse",
      },
    }
  );
}

export interface TextStaggerOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  duration?: number;
  delay?: number;
  y?: number;
  stagger?: number;
  ease?: string;
}

/**
 * Staggers lines, words, or badge tags into view with editorial precision
 */
export function textStagger(
  target: gsap.DOMTarget,
  options: TextStaggerOptions = {}
): gsap.core.Tween | undefined {
  if (typeof window === "undefined") return undefined;

  const {
    trigger = target,
    start = "top 90%",
    duration = 1.0,
    delay = 0.05,
    y = 25,
    stagger = 0.06,
    ease = EASINGS.architectural,
  } = options;

  return gsap.fromTo(
    target,
    {
      y,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
}

export interface ParallaxOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  speed?: number; // negative moves upward faster, positive moves downward
  scrub?: boolean | number;
  ease?: string;
}

/**
 * Silky scroll-linked vertical parallax for architectural imagery and blueprint panels
 */
export function parallaxTween(
  target: gsap.DOMTarget,
  speed: number = 0.15,
  options: ParallaxOptions = {}
): gsap.core.Tween | undefined {
  if (typeof window === "undefined") return undefined;

  const {
    trigger = target,
    start = "top bottom",
    end = "bottom top",
    scrub = 1.2,
    ease = "none",
  } = options;

  const yMovement = speed * 150;

  return gsap.fromTo(
    target,
    {
      y: -yMovement,
    },
    {
      y: yMovement,
      ease,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        end,
        scrub,
      },
    }
  );
}

/**
 * Architectural hairline divider draw animation
 */
export function hairlineDrawOnScroll(
  target: gsap.DOMTarget,
  options: {
    trigger?: gsap.DOMTarget;
    start?: string;
    duration?: number;
    delay?: number;
  } = {}
): gsap.core.Tween | undefined {
  if (typeof window === "undefined") return undefined;

  const {
    trigger = target,
    start = "top 92%",
    duration = 1.2,
    delay = 0,
  } = options;

  return gsap.fromTo(
    target,
    {
      scaleX: 0,
      transformOrigin: "left center",
    },
    {
      scaleX: 1,
      duration,
      delay,
      ease: EASINGS.smoothExpo,
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
}
