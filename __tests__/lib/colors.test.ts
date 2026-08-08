import { colors } from '@/lib/colors';

describe('colors', () => {
  describe('foreground colors', () => {
    it('has fg color', () => {
      expect(colors.fg).toContain('text-neutral-900');
      expect(colors.fg).toContain('dark:text-neutral-100');
    });

    it('has fgMuted color', () => {
      expect(colors.fgMuted).toContain('text-neutral-500');
      expect(colors.fgMuted).toContain('dark:text-neutral-400');
    });

    it('has fgSubtle color', () => {
      expect(colors.fgSubtle).toContain('text-neutral-400');
      expect(colors.fgSubtle).toContain('dark:text-neutral-500');
    });

    it('has fgFaint color', () => {
      expect(colors.fgFaint).toContain('text-neutral-300');
      expect(colors.fgFaint).toContain('dark:text-neutral-600');
    });

    it('has fgInvert color', () => {
      expect(colors.fgInvert).toContain('text-white');
      expect(colors.fgInvert).toContain('dark:text-neutral-900');
    });
  });

  describe('background colors', () => {
    it('has bg color', () => {
      expect(colors.bg).toContain('bg-white');
      expect(colors.bg).toContain('dark:bg-neutral-950');
    });

    it('has bgMuted color', () => {
      expect(colors.bgMuted).toContain('bg-neutral-50');
      expect(colors.bgMuted).toContain('dark:bg-neutral-900');
    });

    it('has bgSubtle color', () => {
      expect(colors.bgSubtle).toContain('bg-neutral-100');
      expect(colors.bgSubtle).toContain('dark:bg-neutral-800');
    });

    it('has bgInvert color', () => {
      expect(colors.bgInvert).toContain('bg-neutral-900');
      expect(colors.bgInvert).toContain('dark:bg-neutral-100');
    });
  });

  describe('border colors', () => {
    it('has border color', () => {
      expect(colors.border).toContain('border-neutral-100');
      expect(colors.border).toContain('dark:border-neutral-800');
    });

    it('has borderStrong color', () => {
      expect(colors.borderStrong).toContain('border-neutral-200');
      expect(colors.borderStrong).toContain('dark:border-neutral-700');
    });
  });

  describe('hover colors', () => {
    it('has hoverFg color', () => {
      expect(colors.hoverFg).toContain('hover:text-neutral-900');
      expect(colors.hoverFg).toContain('dark:hover:text-neutral-100');
    });

    it('has hoverBg color', () => {
      expect(colors.hoverBg).toContain('hover:bg-neutral-50');
      expect(colors.hoverBg).toContain('dark:hover:bg-neutral-900/40');
    });
  });

  describe('object structure', () => {
    it('has at least 12 color tokens', () => {
      expect(Object.keys(colors).length).toBeGreaterThanOrEqual(12);
    });

    it('all values are strings', () => {
      Object.values(colors).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });
  });
});
