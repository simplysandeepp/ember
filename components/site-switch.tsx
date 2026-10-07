"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  celebrate,
  radialWipe,
  prefersReducedMotion,
  navigateTo,
  resetCelebration,
} from "@/lib/celebrate";
import {
  SIBLING_SITE,
  THIS_SITE,
  SWITCH_HASH,
  siblingHref,
} from "@/lib/sibling-site";

/**
 * Jump between the two portfolio designs.
 *
 * A horizontal two-state toggle sitting beside the theme switch and built to
 * the same restraint as the rest of this nav: greyscale, small, quiet until
 * hovered. Click it and the knob slides, confetti pops, a lime wipe sweeps
 * out from the button, and the browser navigates — same tab, same path, no
 * new window.
 *
 * It is a real anchor, so it works with JavaScript off, survives middle-click
 * and cmd-click, and shows its destination in the status bar. The animation
 * is an enhancement layered on top of a plain navigation.
 *
 * The two sites are different origins, so a cross-document view transition is
 * not possible; the wipe reproduces the theme toggle's circular reveal
 * locally and hands over once the screen is covered.
 */

/** Long enough to read as deliberate, short enough not to feel like latency. */
const WIPE_MS = 420;

/** If the navigation has not taken us away by now, it was cancelled or
    blocked — put the page back rather than leave a green screen over it. */
const GIVE_UP_MS = 4000;

export default function SiteSwitch() {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
  const [leaving, setLeaving] = useState(false);

  const centre = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return { x: window.innerWidth / 2, y: 80 };
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  // Arrival. The sibling site appends SWITCH_HASH on its way out, so a reader
  // who came through the switch is greeted with the same burst that saw them
  // off. The hash is stripped immediately, which also stops a client-side
  // route change from re-firing it.
  useEffect(() => {
    if (window.location.hash !== SWITCH_HASH) return;
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    if (prefersReducedMotion()) return;
    const { x, y } = centre();
    const id = window.setTimeout(() => celebrate(x, y), 220);
    return () => window.clearTimeout(id);
  }, [centre]);

  // Back/forward. Pressing Back from the other site restores this page from
  // the browser's back/forward cache exactly as it was left — wipe overlay and
  // all, so the reader sees a solid green screen. `pageshow` with `persisted`
  // is the only signal that happens, and it fires without a re-mount.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      resetCelebration();
      setLeaving(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle every intentional "somewhere else" click.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const href = event.currentTarget.href;
    if (prefersReducedMotion()) return; // plain navigation, no delay

    event.preventDefault();
    setLeaving(true);

    const { x, y } = centre();
    celebrate(x, y);
    radialWipe(x, y, "#c4f82a", WIPE_MS).then(() => {
      navigateTo(href);
      // Normally the page is gone before this runs. If it is not, the
      // navigation never happened and the overlay has to come down.
      window.setTimeout(() => {
        resetCelebration();
        setLeaving(false);
      }, GIVE_UP_MS);
    });
  };

  // The knob sits under the active half, and slides across as you leave.
  const onLeft = !leaving;

  return (
    <a
      ref={ref}
      href={siblingHref(pathname)}
      onClick={onClick}
      data-leaving={leaving}
      aria-label={`Switch to ${SIBLING_SITE.name} at ${SIBLING_SITE.url.replace("https://", "")}`}
      title={`Switch to ${SIBLING_SITE.label} — ${SIBLING_SITE.name}`}
      className="group relative ml-1.5 inline-flex shrink-0 items-center rounded-full border border-neutral-300 p-[3px] transition-colors duration-200 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500"
    >
      {/* Sliding knob. Animated with a transform so it never reflows the
          labels sitting above it. */}
      <span
        aria-hidden="true"
        className={`absolute left-[3px] top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] rounded-full bg-neutral-900 transition-transform duration-300 ease-out dark:bg-neutral-100 ${
          onLeft ? "translate-x-0" : "translate-x-full"
        }`}
      />
      {[THIS_SITE.label, SIBLING_SITE.label].map((label, i) => {
        const active = i === 0 ? onLeft : !onLeft;
        return (
          <span
            key={label}
            aria-hidden="true"
            className={`relative z-10 w-8 py-2 text-center font-mono text-[12px] font-medium leading-none transition-colors duration-200 ${
              active
                ? "text-white dark:text-neutral-900"
                : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
            }`}
          >
            {label}
          </span>
        );
      })}
    </a>
  );
}
