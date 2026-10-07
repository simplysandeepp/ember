import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SiteSwitch from "@/components/site-switch";
import { SWITCH_HASH } from "@/lib/sibling-site";

const mockPathname = jest.fn(() => "/");
jest.mock("next/navigation", () => ({ usePathname: () => mockPathname() }));

const celebrate = jest.fn();
const resetCelebration = jest.fn();
const radialWipe = jest.fn(() => Promise.resolve());
const navigateTo = jest.fn();
let reduced = false;

jest.mock("@/lib/celebrate", () => ({
  celebrate: (...args: unknown[]) => celebrate(...args),
  resetCelebration: () => resetCelebration(),
  radialWipe: (...args: unknown[]) => radialWipe(...args),
  navigateTo: (...args: unknown[]) => navigateTo(...args),
  prefersReducedMotion: () => reduced,
}));

let replaceState: jest.SpyInstance;

/** Point jsdom at a URL for real, rather than stubbing `window.location` —
    jsdom makes that property non-configurable, so it cannot be replaced. */
function visit(path: string) {
  window.history.replaceState(null, "", path);
}

beforeEach(() => {
  jest.useFakeTimers();
  celebrate.mockClear();
  resetCelebration.mockClear();
  radialWipe.mockClear();
  reduced = false;
  mockPathname.mockReturnValue("/");
  visit("/");
  navigateTo.mockClear();
  replaceState = jest.spyOn(window.history, "replaceState");
});

afterEach(() => {
  jest.useRealTimers();
  replaceState.mockRestore();
});

const link = () => screen.getByRole("link");

describe("SiteSwitch", () => {
  it("renders a real anchor, so it works without JavaScript", () => {
    render(<SiteSwitch />);
    expect(link()).toHaveAttribute(
      "href",
      `https://beta.sandeepp.in${SWITCH_HASH}`,
    );
  });

  it("carries the current path to the other site", () => {
    mockPathname.mockReturnValue("/projects/aegis");
    render(<SiteSwitch />);
    expect(link()).toHaveAttribute(
      "href",
      `https://beta.sandeepp.in/projects/aegis${SWITCH_HASH}`,
    );
  });

  it("names its destination for a screen reader", () => {
    render(<SiteSwitch />);
    expect(link()).toHaveAccessibleName(/switch to the playground redesign/i);
  });

  it("does not open a new tab", () => {
    render(<SiteSwitch />);
    expect(link()).not.toHaveAttribute("target");
  });

  describe("clicking", () => {
    it("celebrates, wipes, then navigates in the same tab", async () => {
      render(<SiteSwitch />);
      fireEvent.click(link(), { button: 0 });

      expect(celebrate).toHaveBeenCalled();
      expect(radialWipe).toHaveBeenCalled();

      await act(async () => {
        await Promise.resolve();
      });
      // The DOM normalises the anchor's href, which adds the root slash.
      expect(navigateTo).toHaveBeenCalledWith(
        `https://beta.sandeepp.in/${SWITCH_HASH}`,
      );
    });

    it("slides the knob while leaving", () => {
      render(<SiteSwitch />);
      expect(link()).toHaveAttribute("data-leaving", "false");
      fireEvent.click(link(), { button: 0 });
      expect(link()).toHaveAttribute("data-leaving", "true");
    });

    // Modified clicks mean "open this somewhere else" — intercepting them
    // would break cmd-click and middle-click.
    it.each([
      ["meta", { metaKey: true }],
      ["ctrl", { ctrlKey: true }],
      ["shift", { shiftKey: true }],
      ["middle button", { button: 1 }],
    ])("leaves a %s click to the browser", (_name, init) => {
      render(<SiteSwitch />);
      fireEvent.click(link(), { button: 0, ...init });
      expect(celebrate).not.toHaveBeenCalled();
      expect(radialWipe).not.toHaveBeenCalled();
    });

    it("navigates straight away under reduced motion", () => {
      reduced = true;
      render(<SiteSwitch />);
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      fireEvent(link(), event);

      expect(celebrate).not.toHaveBeenCalled();
      expect(radialWipe).not.toHaveBeenCalled();
      // Not intercepted — the browser performs the plain navigation.
      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe("arriving through the switch", () => {
    it("celebrates and strips the marker", () => {
      visit(`/about${SWITCH_HASH}`);
      replaceState.mockClear();
      render(<SiteSwitch />);

      expect(replaceState).toHaveBeenCalledWith(null, "", "/about");
      act(() => {
        jest.advanceTimersByTime(400);
      });
      expect(celebrate).toHaveBeenCalled();
    });

    it("stays quiet on an ordinary visit", () => {
      visit("/about");
      replaceState.mockClear();
      render(<SiteSwitch />);
      act(() => {
        jest.advanceTimersByTime(400);
      });
      expect(celebrate).not.toHaveBeenCalled();
      expect(replaceState).not.toHaveBeenCalled();
    });

    it("strips the marker but skips the burst under reduced motion", () => {
      reduced = true;
      visit(`/${SWITCH_HASH}`);
      replaceState.mockClear();
      render(<SiteSwitch />);
      act(() => {
        jest.advanceTimersByTime(400);
      });
      expect(replaceState).toHaveBeenCalled();
      expect(celebrate).not.toHaveBeenCalled();
    });
  });

  describe("returning with Back", () => {
    const pageshow = (persisted: boolean) => {
      const event = new Event("pageshow") as PageTransitionEvent;
      Object.defineProperty(event, "persisted", { value: persisted });
      act(() => {
        window.dispatchEvent(event);
      });
    };

    // Back restores the page from the bfcache with the wipe overlay still on
    // it — the reader sees a solid green screen.
    it("clears the overlay and resets the knob when restored from cache", () => {
      render(<SiteSwitch />);
      fireEvent.click(link(), { button: 0 });
      expect(link()).toHaveAttribute("data-leaving", "true");

      pageshow(true);

      expect(resetCelebration).toHaveBeenCalled();
      expect(link()).toHaveAttribute("data-leaving", "false");
    });

    it("leaves an ordinary page load alone", () => {
      render(<SiteSwitch />);
      pageshow(false);
      expect(resetCelebration).not.toHaveBeenCalled();
    });

    it("stops listening once unmounted", () => {
      const { unmount } = render(<SiteSwitch />);
      unmount();
      pageshow(true);
      expect(resetCelebration).not.toHaveBeenCalled();
    });

    // If the navigation is blocked or cancelled the page never goes away, and
    // the overlay would sit on it forever.
    it("takes the overlay down if the navigation never happens", async () => {
      render(<SiteSwitch />);
      fireEvent.click(link(), { button: 0 });
      await act(async () => {
        await Promise.resolve();
      });
      expect(resetCelebration).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(4100);
      });

      expect(resetCelebration).toHaveBeenCalled();
      expect(link()).toHaveAttribute("data-leaving", "false");
    });
  });
});
