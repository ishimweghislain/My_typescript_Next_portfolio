'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { profile } from '@/data';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const socialIconsMap: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  Instagram: <InstagramIcon />,
  GitHub: <GitHubIcon />,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honey: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      e.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      e.message = 'Please include a brief message.';
    }
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Bot honeypot filter
    if (formData._honey) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Primary: SMTP with auto-reply receipt via serverless function
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setStatus({
          ok: true,
          msg: 'Thank you! Your message has been sent, and a confirmation receipt has been delivered to your email.',
        });
        setFormData({ name: '', email: '', subject: '', message: '', _honey: '' });
        return;
      }

      // Fallback: If in pure static local dev and EmailJS credentials exist
      if (
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      ) {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'Portfolio Inquiry',
            message: formData.message,
            to_name: 'Ishimwe Ghislain',
            to_email: profile.email,
            reply_to: formData.email,
          }
        );
        setStatus({
          ok: true,
          msg: 'Thank you! Your message has been sent.',
        });
        setFormData({ name: '', email: '', subject: '', message: '', _honey: '' });
        return;
      }

      throw new Error(data?.error || 'Failed to deliver message');
    } catch {
      setStatus({
        ok: false,
        msg: 'Unable to send message directly. Please write to ishimweghislain82@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="mb-14">
          <p className="section-label mb-2">07 / CONTACT</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: 'var(--text-h2)', color: 'var(--text)' }}
              >
                Let&apos;s build something solid.
              </h2>
              <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
                Open to remote and Kigali-based opportunities.
              </p>
            </div>
            <div className="mono text-xs text-[var(--accent-text,var(--accent))] shrink-0">
              Usually responds within 24 hours
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 max-w-5xl mx-auto">
          {/* Left Info Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 text-[var(--text)]">
                Direct Communication
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                Whether you have an upcoming project, a contract role, or an engineering question, feel free to reach out.
              </p>

              {/* Email Card with Copy Button */}
              <div className="card p-4 mb-6">
                <span className="mono text-[0.7rem] uppercase tracking-wider text-[var(--muted)]">
                  Primary Email
                </span>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="mono text-sm font-semibold truncate hover:text-[var(--accent-text,var(--accent))] transition-colors"
                    style={{ color: 'var(--text)' }}
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn btn-secondary !p-2 !min-w-[36px] !min-h-[36px] flex items-center justify-center shrink-0"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check size={14} className="text-[var(--accent-text,var(--accent))]" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Location badge */}
              <div className="flex items-center gap-2 mb-8 text-xs mono" style={{ color: 'var(--muted)' }}>
                <MapPin size={14} className="text-[var(--accent-text,var(--accent))]" />
                <span>Kamonyi, Rwanda • Central Africa Time (UTC+2)</span>
              </div>
            </div>

            {/* Social channels */}
            <div>
              <p className="mono text-xs uppercase tracking-wider text-[var(--muted)] mb-3">
                Professional Networks
              </p>
              <div className="flex gap-3">
                {profile.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="btn btn-secondary !p-2.5 !min-w-[44px] !min-h-[44px] flex items-center justify-center"
                    style={{ color: 'var(--muted)' }}
                    title={s.name}
                  >
                    {socialIconsMap[s.name] || <Mail size={16} />}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Form Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="card p-6 md:p-8">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Honeypot field for anti-bot */}
                <input
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alex Ndoli"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project inquiry / Full stack role"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project, timeline, or requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`form-input ${errors.message ? 'error' : ''}`}
                  />
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>

                {status && (
                  <div
                    className="p-3.5 rounded-[var(--radius-sm)] text-xs mono leading-relaxed"
                    style={{
                      background: status.ok ? 'var(--accent-soft)' : 'rgba(255,95,87,0.12)',
                      color: status.ok ? 'var(--accent-text,var(--accent))' : '#FF5F57',
                      border: `1px solid ${status.ok ? 'var(--accent)' : 'rgba(255,95,87,0.4)'}`,
                    }}
                  >
                    {status.msg}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    <span>{isSubmitting ? 'Sending Message…' : 'Send Message'}</span>
                    <Send size={14} strokeWidth={2} className="btn-arrow" />
                  </button>

                  <span className="mono text-[0.7rem] text-[var(--muted)] hidden sm:inline">
                    Protected by Honeypot
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
