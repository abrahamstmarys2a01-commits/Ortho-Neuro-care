import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  ShieldCheck, 
  ExternalLink, 
  AlertCircle, 
  Sparkles,
  CheckCircle2,
  Activity
} from 'lucide-react';

export const Login = () => {
  const { login } = useApp();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const cleanUser = (username || '').trim();
    if (!cleanUser) {
      setErrorMessage('Please enter your username.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    // Instant verification with zero delay
    const res = login(cleanUser, password);
    if (!res.success) {
      setErrorMessage(res.message || 'Invalid username or password. Please try again.');
    }
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f6f3eb',
      backgroundImage: `
        radial-gradient(circle at 15% 20%, rgba(30, 77, 43, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(192, 125, 43, 0.06) 0%, transparent 45%),
        linear-gradient(135deg, #f7f4ec 0%, #ede6d6 100%)
      `,
      padding: '20px 16px',
      position: 'relative',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* Top Brand Link to Website */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 10
      }}>
        <a
          href="https://ortho-neuro-care-frontend.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '7px 14px',
            backgroundColor: '#ffffff',
            border: '1px solid #dfd5c2',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            color: '#1e4d2b',
            textDecoration: 'none',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease'
          }}
          className="hover-lift"
        >
          <Activity size={14} color="#1e4d2b" />
          <span>Patient Portal</span>
          <ExternalLink size={12} color="#708375" />
        </a>
      </div>

      {/* Main Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 16px 45px -8px rgba(25, 45, 30, 0.12), 0 4px 14px rgba(0,0,0,0.04)',
        border: '1px solid #e7decb',
        overflow: 'hidden'
      }}>
        {/* Card Header with Hospital Logo & Branding */}
        <div style={{
          backgroundColor: '#1e4d2b',
          backgroundImage: 'linear-gradient(135deg, #1b4527 0%, #295e38 100%)',
          padding: '28px 24px 24px 24px',
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative'
        }}>
          {/* Subtle decorative glow */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            pointerEvents: 'none'
          }} />

          {/* Logo badge */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            margin: '0 auto 14px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <img 
              src="/images/logo.png" 
              alt="Ortho Neuro Care Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                // Fallback to stylized SVG emblem if image is still loading
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1e4d2b" stroke-width="2.2">
                    <path d="M12 2C7 6 3 11 3 16C3 20.4 6.6 24 11 24C11.3 24 11.7 24 12 23.9C12.3 24 12.7 24 13 24C17.4 24 21 20.4 21 16C21 11 17 6 12 2Z" fill="#eaf2eb"/>
                  </svg>
                `;
              }}
            />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.65rem',
            fontWeight: 700,
            margin: '0 0 4px 0',
            letterSpacing: '-0.01em',
            color: '#ffffff'
          }}>
            Ortho Neuro Care
          </h1>

          <p style={{
            fontSize: '0.82rem',
            color: '#cce2d3',
            margin: 0,
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            Clinical &amp; Ayurvedic ERP Portal
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            padding: '4px 10px',
            borderRadius: '9999px',
            marginTop: '12px',
            fontSize: '0.72rem',
            color: '#f0f8f2'
          }}>
            <ShieldCheck size={13} color="#7fe0a3" />
            <span>Authorized Staff Access Only</span>
          </div>
        </div>

        {/* Card Body & Form */}
        <div style={{ padding: '26px 24px 22px 24px' }}>
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '12px 14px',
              borderRadius: '10px',
              marginBottom: '18px',
              fontSize: '0.84rem',
              lineHeight: 1.4,
              animation: 'shake 0.3s ease-in-out'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#2a3b2f',
                marginBottom: '6px'
              }}>
                Username / Admin ID
              </label>
              <div style={{ position: 'relative' }}>
                <User 
                  size={16} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6e8073'
                  }} 
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  autoComplete="username"
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 40px',
                    borderRadius: '10px',
                    border: '1.5px solid #dfd6c4',
                    fontSize: '0.9rem',
                    color: '#243328',
                    backgroundColor: '#fcfbf8',
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1e4d2b';
                    e.target.style.boxShadow = '0 0 0 3px rgba(30, 77, 43, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#dfd6c4';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#2a3b2f',
                  margin: 0
                }}>
                  Password
                </label>
                <span style={{ fontSize: '0.74rem', color: '#6e8073' }}>
                  Default: <strong style={{ color: '#1e4d2b' }}>admin123</strong>
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={16} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6e8073'
                  }} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '11px 44px 11px 40px',
                    borderRadius: '10px',
                    border: '1.5px solid #dfd6c4',
                    fontSize: '0.9rem',
                    color: '#243328',
                    backgroundColor: '#fcfbf8',
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1e4d2b';
                    e.target.style.boxShadow = '0 0 0 3px rgba(30, 77, 43, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#dfd6c4';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#708375',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Quick Helper */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              fontSize: '0.8rem'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#445648' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#1e4d2b', width: '15px', height: '15px' }}
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={handleQuickFill}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1e4d2b',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0
                }}
              >
                Auto-fill default
              </button>
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px 20px',
                backgroundColor: '#1e4d2b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.96rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 18px rgba(30, 77, 43, 0.28)',
                transition: 'background 0.15s ease'
              }}
            >
              <LogIn size={18} />
              <span>Open ERP System</span>
            </button>
          </form>

          {/* Quick Info Box */}
          <div style={{
            marginTop: '22px',
            padding: '12px 14px',
            backgroundColor: '#f7f4ec',
            border: '1px dashed #dcd3be',
            borderRadius: '10px',
            fontSize: '0.76rem',
            color: '#556758',
            lineHeight: 1.5
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#1e4d2b', marginBottom: '2px' }}>
              <CheckCircle2 size={13} color="#1e4d2b" />
              <span>Initial Credentials Configured</span>
            </div>
            <div>Username: <strong style={{ color: '#243328' }}>admin</strong> &bull; Password: <strong style={{ color: '#243328' }}>admin123</strong></div>
            <div style={{ marginTop: '2px', color: '#7a8c7e', fontSize: '0.72rem' }}>
              You can change your password anytime inside <strong>ERP Settings</strong>.
            </div>
          </div>
        </div>

        {/* Footer Link to Patient Website */}
        <div style={{
          padding: '14px 20px',
          backgroundColor: '#faf8f2',
          borderTop: '1px solid #efe8db',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#657769'
        }}>
          <span>Looking for the patient booking website? </span>
          <a
            href="https://ortho-neuro-care-frontend.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1e4d2b',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Visit Live Site <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Copyright info */}
      <div style={{
        marginTop: '18px',
        fontSize: '0.75rem',
        color: '#8c9c90',
        textAlign: 'center'
      }}>
        &copy; {new Date().getFullYear()} Ortho Neuro Care &amp; Ayurvedic ERP. All rights reserved.
      </div>
    </div>
  );
};
