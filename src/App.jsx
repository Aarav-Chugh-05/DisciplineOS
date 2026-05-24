import { useEffect, useState } from 'react';

/**
 * Step 1 scaffold:
 * Verifies the token system + dark-mode toggle work end-to-end.
 * Replaced in Step 2 by the real Layout shell.
 */
export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const raw = localStorage.getItem('ds_settings');
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && parsed.theme) return parsed.theme;
    } catch (_) {
      /* ignore */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    try {
      const raw = localStorage.getItem('ds_settings');
      const parsed = raw ? JSON.parse(raw) : {};
      localStorage.setItem('ds_settings', JSON.stringify({ ...parsed, theme }));
    } catch (_) {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-base text-text-primary">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-default">
        <h1 className="text-accent font-semibold text-xl tracking-tight">DisciplineOS</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted hidden sm:inline">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="px-3 py-1.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover focus:outline-none focus:ring-2 ring-accent transition-colors"
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      {/* Token preview */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <section>
          <p className="text-sm uppercase tracking-wide text-text-muted mb-2">
            Step 1 — Token system
          </p>
          <h2 className="text-2xl font-semibold mb-1">Theme toggle is wired up.</h2>
          <p className="text-text-muted">
            All colors below come from CSS variables. Toggling the theme should swap every
            swatch instantly with no flash.
          </p>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'bg-base', cls: 'bg-base border border-default' },
            { label: 'bg-surface', cls: 'bg-surface border border-default' },
            { label: 'bg-accent-tint', cls: 'bg-accent-tint border border-default' },
            { label: 'bg-accent', cls: 'bg-accent text-white' },
          ].map((s) => (
            <div
              key={s.label}
              className={`h-20 rounded-lg flex items-center justify-center text-xs font-medium ${s.cls}`}
            >
              {s.label}
            </div>
          ))}
        </section>

        <section className="bg-surface border border-default rounded-xl p-5 space-y-3">
          <h3 className="font-semibold">Sample card on bg-surface</h3>
          <p className="text-text-muted text-sm">
            Muted body text uses <code>text-text-muted</code>. Headings and primary
            content use <code>text-text-primary</code>.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover focus:outline-none focus:ring-2 ring-accent transition-colors">
              Primary action
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium opacity-40 cursor-not-allowed">
              Disabled
            </button>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-tint text-accent border border-default">
              Streak · 7d
            </span>
          </div>
        </section>

        {/* Accent ring sanity check (will become the Pomodoro ring later) */}
        <section className="flex items-center gap-6">
          <svg width="96" height="96" viewBox="0 0 96 96" className="shrink-0">
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="6"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * 0.35}`}
              transform="rotate(-90 48 48)"
            />
          </svg>
          <div>
            <p className="text-sm text-text-muted">Accent ring preview</p>
            <p className="font-medium">SVG stroke uses var(--color-accent)</p>
          </div>
        </section>
      </main>
    </div>
  );
}
