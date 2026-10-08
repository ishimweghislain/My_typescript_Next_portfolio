import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      <div className="card p-8 md:p-12 max-w-lg w-full flex flex-col items-center shadow-lg border border-[var(--border)]">
        {/* Terminal badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="mono text-xs text-[var(--muted)] ml-2">404 // ROUTE_NOT_FOUND</span>
        </div>

        {/* Large 404 display */}
        <h1
          className="mono text-6xl md:text-7xl font-bold tracking-tight mb-4"
          style={{ color: 'var(--accent-text,var(--accent))' }}
        >
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Page Not Found
        </h2>

        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
          The path you requested does not exist or has been relocated in the portfolio architecture.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <Link href="/" className="btn btn-primary w-full sm:w-auto justify-center">
            <Home size={15} strokeWidth={2} />
            <span>Back to Homepage</span>
          </Link>
          <Link href="/#projects" className="btn btn-secondary w-full sm:w-auto justify-center">
            <ArrowLeft size={15} strokeWidth={1.75} />
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
