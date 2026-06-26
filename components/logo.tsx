type Props = {
  size?: 'sm' | 'lg';
  wordmark?: boolean;
};

export default function Logo({ size = 'sm', wordmark = true }: Props) {
  if (size === 'lg') {
    return (
      <div className="w-14 h-14 rounded-[6px] bg-neutral-900 dark:bg-neutral-50 flex items-center justify-center select-none shrink-0">
        <span className="text-lg font-bold text-white dark:text-neutral-900 tracking-tight font-sans leading-none">
          SP
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-[26px] h-[26px] rounded-[4px] bg-neutral-900 dark:bg-neutral-50 flex items-center justify-center select-none shrink-0">
        <span className="text-[10px] font-bold text-white dark:text-neutral-900 tracking-tight font-sans leading-none">
          SP
        </span>
      </div>
      {wordmark && (
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          sp.
        </span>
      )}
    </div>
  );
}
