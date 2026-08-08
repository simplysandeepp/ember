import { gitLastModified } from '@/lib/git-date';
import { execSync } from 'child_process';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe('gitLastModified', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns date from git log output', () => {
    mockExecSync.mockReturnValue(Buffer.from('2024-06-15T10:30:00+05:30\n'));
    const result = gitLastModified('content/blog/test.md', '2024-01-01');
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(5); // June
  });

  it('returns fallback date when git returns empty output', () => {
    mockExecSync.mockReturnValue(Buffer.from(''));
    const result = gitLastModified('content/blog/test.md', '2024-01-01');
    expect(result).toEqual(new Date('2024-01-01'));
  });

  it('returns fallback date when git command fails', () => {
    mockExecSync.mockImplementation(() => {
      throw new Error('not a git repo');
    });
    const result = gitLastModified('content/blog/test.md', '2024-03-15');
    expect(result).toEqual(new Date('2024-03-15'));
  });

  it('calls git log with correct path', () => {
    mockExecSync.mockReturnValue(Buffer.from('2024-01-01T00:00:00+00:00'));
    gitLastModified('content/blog/post.md', '2024-01-01');
    expect(mockExecSync).toHaveBeenCalledWith(
      'git log -1 --format=%cI -- "content/blog/post.md"',
      expect.objectContaining({ stdio: ['ignore', 'pipe', 'ignore'] })
    );
  });

  it('trims whitespace from git output', () => {
    mockExecSync.mockReturnValue(Buffer.from('  2024-08-20T12:00:00+00:00  \n'));
    const result = gitLastModified('file.md', '2024-01-01');
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(7); // August
  });

  it('returns fallback for whitespace-only output', () => {
    mockExecSync.mockReturnValue(Buffer.from('   \n'));
    const result = gitLastModified('file.md', '2024-06-01');
    expect(result).toEqual(new Date('2024-06-01'));
  });
});
