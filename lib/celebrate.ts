/**
 * Celebration primitives for the portfolio switch.
 *
 * Hand-written canvas confetti and a radial wipe, both under a couple of
 * kilobytes and with no dependency. Each one is a no-op under
 * prefers-reduced-motion and a no-op on the server, so callers never have to
 * branch — they can always await the promise and navigate when it settles.
 *
 * The wipe deliberately mirrors the theme toggle's circular reveal: same
 * origin-at-the-button geometry, same easing. The two sites live on different
 * origins, so a real cross-document view transition is not available — this
 * reproduces the feel locally and then hands over to the browser.
 */

/** The Playground accents, borrowed from the v5 design. This site is
    otherwise greyscale — the switch is the one place colour belongs, and
    using the same five means the celebration reads identically from either
    direction. */
export const CONFETTI_COLORS = ['#c4f82a', '#ff6b4a', '#4fd6e0', '#9b7cff', '#ffb627'];

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  spin: number;
  angle: number;
  color: string;
};

/**
 * A burst of paper from a point on screen.
 *
 * Draws to a throwaway full-viewport canvas layered above everything and
 * removes it once the last particle has fallen out of frame, so nothing is
 * left behind in the DOM and no listener outlives the animation.
 */
export function confettiBurst(
  x: number,
  y: number,
  { count = 90, colors = CONFETTI_COLORS }: { count?: number; colors?: string[] } = {}
): void {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  document.body.appendChild(canvas);

  const particles: Particle[] = Array.from({ length: count }, () => {
    // Biased upward: gravity does the rest, so the arc reads as a pop
    // rather than a sphere expanding in every direction.
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.1;
    const speed = 5 + Math.random() * 9;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 5 + Math.random() * 5,
      h: 3 + Math.random() * 4,
      spin: (Math.random() - 0.5) * 0.3,
      angle: Math.random() * Math.PI,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });

  const started = performance.now();
  const LIFE = 2400;
  let frame = 0;

  const tick = (now: number) => {
    const elapsed = now - started;
    ctx.clearRect(0, 0, w, h);

    let alive = 0;
    for (const p of particles) {
      p.vy += 0.3; // gravity
      p.vx *= 0.99; // drag
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      if (p.y - p.h > h) continue;
      alive++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = Math.max(0, 1 - elapsed / LIFE);
      ctx.fillStyle = p.color;
      // Flip the width by the spin phase so each piece reads as a flat
      // rectangle tumbling in 3D rather than a spinning sticker.
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w * Math.abs(Math.cos(p.angle)), p.h);
      ctx.restore();
    }

    if (alive > 0 && elapsed < LIFE) {
      frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      canvas.remove();
    }
  };

  frame = requestAnimationFrame(tick);
}

/**
 * Expand a filled circle from (x, y) until it covers the viewport.
 *
 * Resolves when the screen is covered, which is the moment a caller should
 * navigate. The overlay is left in place on purpose: the page is about to be
 * replaced, and removing it first would flash the old page back.
 */
export function radialWipe(
  x: number,
  y: number,
  color: string,
  duration = 420
): Promise<void> {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return Promise.resolve();
  }

  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const veil = document.createElement('div');
  veil.setAttribute('aria-hidden', 'true');
  veil.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:9998;background:${color}`;
  document.body.appendChild(veil);

  const animation = veil.animate(
    [
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
    ],
    { duration, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
  );

  return animation.finished.then(() => undefined).catch(() => undefined);
}

/**
 * Leave for another origin, in the same tab.
 *
 * A one-line wrapper, but it keeps the hard-to-stub `window.location` out of
 * the components and gives tests a seam they can observe — jsdom makes both
 * `location` and `location.assign` read-only.
 */
export function navigateTo(href: string): void {
  window.location.assign(href);
}
