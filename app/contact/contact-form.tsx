'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6">
        Send a message
      </h2>

      {status === 'success' ? (
        <div className="py-10 text-center">
          <p className="text-sm font-medium text-neutral-900">Message sent.</p>
          <p className="text-sm text-neutral-500 mt-1">
            I&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-xs text-neutral-400 underline underline-offset-2 hover:text-neutral-900 transition-colors duration-200"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Web3Forms access key — set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local and Vercel */}
          <input
            type="hidden"
            name="access_key"
            value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''}
          />
          {/* Honeypot spam protection */}
          <input type="checkbox" name="botcheck" className="hidden" />

          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-xs text-neutral-500"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors duration-200"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="subject"
              className="block text-xs text-neutral-500"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What is this about?"
              className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors duration-200"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="message"
              className="block text-xs text-neutral-500"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project, opportunity, or just say hi."
              className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors duration-200 resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-500">
              Something went wrong. Try emailing me directly instead.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {status === 'loading' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  );
}
