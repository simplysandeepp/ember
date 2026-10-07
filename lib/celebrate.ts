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
export const CONFETTI_COLORS = [
  "#c4f82a",
  "#ff6b4a",
  "#4fd6e0",
  "#9b7cff",
  "#ffb627",
];

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Every overlay this module adds carries this attribute, so a single sweep
    can remove all of them — see resetCelebration. */
const TAG = "data-pg-celebrate";

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

type Emitter = {
  x: number;
  y: number;
  /** Centre of the spray, radians. -PI/2 is straight up, PI/2 straight down. */
  angle: number;
  /** Half-width of the spray, radians. */
  spread: number;
  count: number;
  speed: [number, number];
};

/**
 * Draw particles from one or more emitters on a throwaway full-viewport canvas
 * layered above everything. The canvas removes itself once the last particle
 * has fallen out of frame, so nothing is left in the DOM and no listener
 * outlives the animation.
 */
function spray(emitters: Emitter[], colors: string[], life: number): void {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.setAttribute(TAG, "");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  document.body.appendChild(canvas);

  const particles: Particle[] = emitters.flatMap((e) =>
    Array.from({ length: e.count }, () => {
      const angle = e.angle + (Math.random() - 0.5) * 2 * e.spread;
      const speed = e.speed[0] + Math.random() * (e.speed[1] - e.speed[0]);
      return {
        x: e.x,
        y: e.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        spin: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }),
  );

  const started = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    const elapsed = now - started;
    ctx.clearRect(0, 0, w, h);

    let alive = 0;
    for (const p of particles) {
      p.vy += 0.28; // gravity
      p.vx *= 0.992; // drag
      p.vy *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      if (p.y - p.h > h) continue;
      alive++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      // Fade only over the last third, so the show stays at full strength
      // for most of its life instead of dimming from the first frame.
      ctx.globalAlpha = Math.min(1, Math.max(0, (life - elapsed) / (life / 3)));
      ctx.fillStyle = p.color;
      // Flip the width by the spin phase so each piece reads as a flat
      // rectangle tumbling in 3D rather than a spinning sticker.
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w * Math.abs(Math.cos(p.angle)), p.h);
      ctx.restore();
    }

    if (alive > 0 && elapsed < life) {
      frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      canvas.remove();
    }
  };

  frame = requestAnimationFrame(tick);
}

/**
 * The celebration, sized for the whole window.
 *
 * The switch lives in the navbar, at the very top of the viewport — so a burst
 * that only fires upward from the button is already off-screen on the first
 * frame. Instead three things go off together: a pop from the button that
 * falls down through the page, a cannon from each bottom corner, and a rain
 * across the full width. Between them the window is covered edge to edge.
 */
export function celebrate(
  x: number,
  y: number,
  { colors = CONFETTI_COLORS }: { colors?: string[] } = {},
): void {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  // Fewer pieces on a phone: same coverage, no dropped frames.
  const scale = w < 640 ? 0.6 : 1;
  const n = (count: number) => Math.round(count * scale);

  spray(
    [
      // Pop from the button, fanned downward into the page.
      { x, y, angle: Math.PI / 2, spread: 1.3, count: n(60), speed: [4, 10] },
      // Corner cannons, aimed up and inward.
      {
        x: 0,
        y: h,
        angle: -Math.PI / 3,
        spread: 0.45,
        count: n(60),
        speed: [13, 21],
      },
      {
        x: w,
        y: h,
        angle: (-2 * Math.PI) / 3,
        spread: 0.45,
        count: n(60),
        speed: [13, 21],
      },
      // Rain across the whole top edge.
      ...Array.from({ length: n(14) }, (_, i) => ({
        x: ((i + 0.5) / n(14)) * w,
        y: -12,
        angle: Math.PI / 2,
        spread: 0.5,
        count: 4,
        speed: [1, 4] as [number, number],
      })),
    ],
    colors,
    3400,
  );
}

/** A small single pop. Kept for callers that want a quieter moment. */
export function confettiBurst(
  x: number,
  y: number,
  {
    count = 90,
    colors = CONFETTI_COLORS,
  }: { count?: number; colors?: string[] } = {},
): void {
  if (typeof window === "undefined" || prefersReducedMotion()) return;
  spray(
    [{ x, y, angle: Math.PI / 2, spread: 1.4, count, speed: [4, 10] }],
    colors,
    2400,
  );
}

/**
 * Expand a filled circle from (x, y) until it covers the viewport.
 *
 * Resolves when the screen is covered, which is the moment a caller should
 * navigate. The overlay stays up so the old page does not flash back during
 * the hand-over — which means it MUST be swept by resetCelebration if the
 * page is ever shown again. Pressing Back restores this page from the
 * back/forward cache with the overlay still on it, and the reader sees a
 * solid green screen.
 */
export function radialWipe(
  x: number,
  y: number,
  color: string,
  duration = 420,
): Promise<void> {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return Promise.resolve();
  }

  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const veil = document.createElement("div");
  veil.setAttribute("aria-hidden", "true");
  veil.setAttribute(TAG, "");
  veil.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:9998;background:${color}`;
  // No Web Animations support: skip the flourish rather than throw, and
  // never leave a half-built overlay behind.
  if (typeof veil.animate !== "function") return Promise.resolve();
  document.body.appendChild(veil);

  const animation = veil.animate(
    [
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
    ],
    { duration, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" },
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

/**
 * Remove every overlay this module has put on the page.
 *
 * Call it when a page is restored from the back/forward cache (`pageshow` with
 * `persisted`), and as a fallback if a navigation never completes.
 */
export function resetCelebration(): void {
  if (typeof document === "undefined") return;
  document.querySelectorAll(`[${TAG}]`).forEach((el) => el.remove());
}
