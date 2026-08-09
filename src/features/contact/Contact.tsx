import React, { useState } from 'react';
import { CodeTerminal } from '@core/ui';
import { useLanguage } from '@core/i18n';
import { CONTACT_API_URL } from '@core/config/siteConfig';
import './Contact.css';

export const Contact: React.FC = () => {
  const { copy } = useLanguage();
  const { contact: cCopy } = copy;

  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [renderedAt] = useState<number>(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formRenderedAt: renderedAt,
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactJson = `{
  "status": "${cCopy.statusAvailable}",
  "contact": {
    "email": "georgesg97@gmail.com",
    "phone_uk": "+44 (0) 7432 586690",
    "phone_gr": "+30 698 496 1329"
  },
  "social": {
    "github": "github.com/illutic",
    "linkedin": "linkedin.com/in/g-sigalas"
  },
  "location": "Portsmouth, UK",
  "response_time": "< 24h"
}`;

  return (
    <div className="contact-page">
      <main className="container contact-container">
        <div className="contact-grid">
          {/* Left Side: Interactive JSON Terminal */}
          <div className="terminal-panel">
            <CodeTerminal filename="contact_info.json" code={contactJson} />
            <div className="ping-status font-label-mono">
              <span className="text-primary">~</span>$ ping -c 3 georgesg97@gmail.com
              <br />
              PING georgesg97 (127.0.0.1): 56 data bytes
              <br />
              64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.039 ms
            </div>
          </div>

          {/* Right Side: Developer Contact Form */}
          <div className="form-panel glow-active">
            <div className="form-header">
              <h1 className="form-title">{cCopy.title}</h1>
              <p className="form-subtitle">{cCopy.subtitle}</p>
            </div>

            {status === 'success' ? (
              <div className="contact-alert success font-label-mono">
                ✓ Handshake successful! Message sent.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="developer-form">
                {status === 'error' && (
                  <div className="contact-alert error font-label-mono">
                    ✕ Execution failed. Please check parameters and retry.
                  </div>
                )}

                {/* Honeypot field for bot defense */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Name */}
                <div className="input-group glow-active">
                  <label htmlFor="name" className="input-label font-label-mono">
                    {cCopy.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="form-input font-body-md"
                    placeholder={cCopy.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="input-group glow-active">
                  <label htmlFor="email" className="input-label font-label-mono">
                    {cCopy.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="form-input font-body-md"
                    placeholder={cCopy.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Message */}
                <div className="input-group glow-active">
                  <label htmlFor="message" className="input-label font-label-mono">
                    {cCopy.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="form-input form-textarea font-body-md"
                    placeholder={cCopy.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="submit-btn font-label-mono"
                >
                  {status === 'loading' ? 'EXECUTING...' : cCopy.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
