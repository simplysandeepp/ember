import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  source: string;
};

export default function MDXContent({ source }: Props) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-neutral-900 dark:prose-a:text-neutral-100 prose-a:underline prose-a:underline-offset-2 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal">
      <MDXRemote source={source} />
    </div>
  );
}
