import { radialWipe, resetCelebration, celebrate } from "@/lib/celebrate";

let reduced = false;

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: () => ({
      get matches() {
        return reduced;
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  });
});

beforeEach(() => {
  reduced = false;
  document.body.innerHTML = "";
});

describe("resetCelebration", () => {
  it("removes every overlay the module added", () => {
    document.body.innerHTML =
      '<div data-pg-celebrate></div><canvas data-pg-celebrate></canvas><p id="keep">page</p>';
    resetCelebration();
    expect(document.querySelectorAll("[data-pg-celebrate]")).toHaveLength(0);
  });

  it("leaves the rest of the page alone", () => {
    document.body.innerHTML =
      '<div data-pg-celebrate></div><p id="keep">page</p>';
    resetCelebration();
    expect(document.getElementById("keep")).not.toBeNull();
  });

  it("is safe to call when there is nothing to remove", () => {
    expect(() => resetCelebration()).not.toThrow();
  });
});

describe("radialWipe", () => {
  it("resolves immediately under reduced motion, adding nothing", async () => {
    reduced = true;
    await radialWipe(10, 10, "#c4f82a");
    expect(document.querySelector("[data-pg-celebrate]")).toBeNull();
  });

  // jsdom has no Web Animations API. The wipe must degrade, not throw, and
  // must not leave an unanimated solid overlay covering the page.
  it("degrades without the Web Animations API", async () => {
    await expect(radialWipe(10, 10, "#c4f82a")).resolves.toBeUndefined();
    expect(document.querySelector("[data-pg-celebrate]")).toBeNull();
  });

  it("tags its overlay so a sweep can find it", async () => {
    const original = HTMLElement.prototype.animate;
    HTMLElement.prototype.animate = jest.fn(() => ({
      finished: Promise.resolve(),
    })) as unknown as typeof original;

    await radialWipe(10, 10, "#c4f82a");
    expect(document.querySelector("[data-pg-celebrate]")).not.toBeNull();

    resetCelebration();
    expect(document.querySelector("[data-pg-celebrate]")).toBeNull();
    HTMLElement.prototype.animate = original;
  });
});

describe("celebrate", () => {
  it("does nothing under reduced motion", () => {
    reduced = true;
    celebrate(100, 40);
    expect(document.querySelector("canvas")).toBeNull();
  });
});
