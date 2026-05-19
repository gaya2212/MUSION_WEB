import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  onClose: () => void;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

export default function WaitlistModal({ onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState('loading');

    if (!supabase) {
      setSubmitState('error');
      return;
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ name: name.trim(), email: email.trim().toLowerCase(), created_at: new Date().toISOString() }]);

    if (!error) {
      setSubmitState('success');
      return;
    }

    // Supabase unique-constraint violation code
    if (error.code === '23505') {
      setSubmitState('duplicate');
    } else {
      setSubmitState('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '0.625rem',
    color: 'var(--text-primary)',
    padding: '0.75rem 1rem',
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '0.9375rem',
    transition: 'border-color 0.2s',
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: 'rgba(5, 7, 13, 0.9)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Panel */}
        <motion.div
          className="relative w-full max-w-md rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 0 80px rgba(56,182,204,0.06), 0 24px 64px rgba(0,0,0,0.5)',
          }}
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full transition-colors"
            style={{ color: 'var(--text-dim)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Heading */}
          <h2
            className="font-body font-semibold text-xl mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Join the Waitlist
          </h2>
          <p className="font-body text-sm mb-6" style={{ color: 'var(--text-dim)' }}>
            Be first to know when Musion launches in your city.
          </p>

          <AnimatePresence mode="wait">
            {submitState === 'success' ? (
              /* Success state */
              <motion.div
                key="success"
                className="flex flex-col items-center gap-4 py-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.div
                  className="flex items-center justify-center w-14 h-14 rounded-full"
                  style={{ background: 'rgba(56,182,204,0.1)', border: '1.5px solid rgba(56,182,204,0.3)' }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Check size={28} color="var(--accent-cyan)" strokeWidth={2.5} />
                </motion.div>
                <motion.p
                  className="font-body font-semibold text-lg text-center"
                  style={{ color: 'var(--accent-cyan)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  You're on the list.
                </motion.p>
                <motion.p
                  className="font-body text-sm text-center"
                  style={{ color: 'var(--text-dim)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  We'll be in touch when Musion launches in your city.
                </motion.p>
              </motion.div>
            ) : (
              /* Form state */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-wide" style={{ color: 'var(--text-dim)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(56,182,204,0.4)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-wide" style={{ color: 'var(--text-dim)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(56,182,204,0.4)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
                  />
                </div>

                {/* Inline error messages */}
                <AnimatePresence>
                  {(submitState === 'duplicate' || submitState === 'error') && (
                    <motion.p
                      className="font-body text-sm"
                      style={{ color: submitState === 'duplicate' ? 'var(--accent-cyan)' : '#ff6b6b' }}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {submitState === 'duplicate'
                        ? "You're already on the list."
                        : 'Something went wrong. Please try again.'}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="mt-1 font-body font-semibold text-sm rounded-full py-3.5 cursor-pointer relative overflow-hidden"
                  style={{
                    background:
                      submitState === 'loading'
                        ? 'rgba(255,255,255,0.1)'
                        : 'linear-gradient(135deg, #38b6cc, #d4935a)',
                    color: submitState === 'loading' ? 'var(--text-dim)' : '#06060c',
                    letterSpacing: '0.02em',
                    transition: 'background 0.3s, box-shadow 0.3s',
                  }}
                  whileHover={submitState !== 'loading' ? { scale: 1.03, boxShadow: '0 0 30px rgba(56,182,204,0.28)' } : {}}
                  whileTap={submitState !== 'loading' ? { scale: 0.97 } : {}}
                >
                  {submitState === 'loading' ? 'Submitting…' : 'Join the Waitlist'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
