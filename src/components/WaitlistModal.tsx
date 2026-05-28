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
  const [role, setRole] = useState('');
  const [otherRole, setOtherRole] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const roles = ['Singer', 'Composer', 'Instrumentalist', 'Producer', 'Recording Studio', 'Sound Engineer', 'Other'];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState('loading');

    if (!supabase) {
      setSubmitState('error');
      return;
    }

    const finalRole = role === 'Other' ? (otherRole.trim() || 'Other') : (role || null);

    const { error } = await supabase
      .from('waitlist')
      .insert([{ name: name.trim(), email: email.trim().toLowerCase(), role: finalRole, created_at: new Date().toISOString() }]);

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
        style={{ background: 'rgba(10, 4, 26, 0.85)', backdropFilter: 'blur(12px)' }}
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
            boxShadow: '0 0 80px rgba(0,217,255,0.07), 0 24px 64px rgba(0,0,0,0.5)',
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
                  style={{ background: 'rgba(0,217,255,0.1)', border: '1.5px solid rgba(0,217,255,0.3)' }}
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
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,217,255,0.4)')}
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
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,217,255,0.4)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
                  />
                </div>

                {/* Who are you */}
                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs tracking-wide" style={{ color: 'var(--text-dim)' }}>
                    Who are you?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((r) => {
                      const selected = role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => { setRole(selected ? '' : r); if (selected) setOtherRole(''); }}
                          className="font-body text-xs rounded-full px-3 py-1.5 cursor-pointer transition-all"
                          style={{
                            background: selected ? 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(224,64,251,0.18))' : 'rgba(255,255,255,0.04)',
                            border: selected ? '1px solid rgba(0,217,255,0.5)' : '1px solid rgba(255,255,255,0.09)',
                            color: selected ? 'var(--accent-cyan)' : 'var(--text-dim)',
                            boxShadow: selected ? '0 0 12px rgba(0,217,255,0.15)' : 'none',
                          }}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>

                  {/* Other text input */}
                  <AnimatePresence>
                    {role === 'Other' && (
                      <motion.input
                        key="other-input"
                        type="text"
                        placeholder="Tell us what you do…"
                        value={otherRole}
                        onChange={(e) => setOtherRole(e.target.value)}
                        style={inputStyle}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.2 }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,217,255,0.4)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
                      />
                    )}
                  </AnimatePresence>
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
                        : 'linear-gradient(135deg, #00e5ff, #e040fb)',
                    color: submitState === 'loading' ? 'var(--text-dim)' : '#06060c',
                    letterSpacing: '0.02em',
                    transition: 'background 0.3s, box-shadow 0.3s',
                  }}
                  whileHover={submitState !== 'loading' ? { scale: 1.03, boxShadow: '0 0 30px rgba(0,229,255,0.35)' } : {}}
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
