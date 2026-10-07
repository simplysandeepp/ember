/**
 * The other portfolio.
 *
 * Two designs of the same content live on two hosts: this one (v4) is the
 * original at `sandeepp.in`, and `beta.sandeepp.in` is the Playground rebuild
 * (v5). The nav switch jumps between them in the same tab, keeping the
 * current path, so a reader comparing a specific project does not land back
 * on a home page.
 *
 * Paths are safe to carry across because the beta site's `content/` is copied
 * verbatim from this repo — every route that exists here exists there. If the
 * two ever diverge, drop `keepPath` and the switch will land on the
 * destination's home page instead.
 */

export const SIBLING_SITE = {
  url: 'https://beta.sandeepp.in',
  /** Short label for the inactive half of the toggle. */
  label: 'v5',
  /** Spoken in the accessible name. */
  name: 'the Playground redesign',
  keepPath: true,
} as const;

export const THIS_SITE = {
  label: 'v4',
  name: 'the original portfolio',
} as const;

/**
 * Marks an arrival that came through the switch, so the destination can
 * celebrate once and then clean up after itself.
 *
 * A hash rather than a query parameter: it never reaches the server, is never
 * treated as a distinct URL by a crawler, and `replaceState` can strip it
 * without touching history.
 */
export const SWITCH_HASH = '#switched';

/** Where the switch should send the reader from the page they are on. */
export function siblingHref(pathname: string): string {
  const path = SIBLING_SITE.keepPath && pathname !== '/' ? pathname : '';
  return `${SIBLING_SITE.url}${path}${SWITCH_HASH}`;
}
