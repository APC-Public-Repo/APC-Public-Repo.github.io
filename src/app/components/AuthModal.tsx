import { useState } from 'react';
import { X, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

export interface AuthUser {
  username: string;
  name: string;
  role: 'admin' | 'researcher';
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}

// Demo credentials — in production these would be verified server-side
const USERS: Record<string, { password: string; name: string; role: 'admin' | 'researcher' }> = {
  'admin': { password: 'apcresearch2024', name: 'Administrator', role: 'admin' },
  'hendra.w': { password: 'nanophysics', name: 'Prof. Dr. Hendra Wijaya', role: 'researcher' },
  'anisa.k': { password: 'nanomaterials', name: 'Dr. Anisa Kusumawati', role: 'researcher' },
  'budi.s': { password: 'wastewater', name: 'Dr. Budi Santoso', role: 'researcher' },
  'siti.r': { password: 'nanofibers', name: 'Dr. Siti Rahayu', role: 'researcher' },
  'rizky.h': { password: 'nanopetro', name: 'Dr. Rizky Hidayat', role: 'researcher' },
  'lia.a': { password: 'lowdim', name: 'Dr. Lia Amara', role: 'researcher' },
};

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = USERS[username.trim().toLowerCase()];
      if (user && user.password === password) {
        onLogin({ username: username.trim().toLowerCase(), name: user.name, role: user.role });
        setUsername('');
        setPassword('');
        setLoading(false);
        onClose();
      } else {
        setError('Invalid username or password. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#1E3A5F] px-8 py-6 text-center relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="w-14 h-14 bg-[#2D9CDB]/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheck size={28} className="text-[#2D9CDB]" />
          </div>
          <h2 className="text-white text-xl font-bold">Researcher Login</h2>
          <p className="text-blue-200 text-sm mt-1">Sign in to publish and manage papers</p>
        </div>

        {/* Form */}
        <div className="px-8 py-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. hendra.w"
                autoComplete="username"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:border-[#2D9CDB] focus:ring-1 focus:ring-[#2D9CDB] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-gray-200 text-sm text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:border-[#2D9CDB] focus:ring-1 focus:ring-[#2D9CDB] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D9CDB] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
                <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#2D9CDB] text-white rounded-full font-semibold hover:bg-[#1E3A5F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <Lock size={15} />
              )}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-[#F0F6FF] rounded-xl">
            <p className="text-xs font-semibold text-[#1E3A5F] mb-2 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-[#2D9CDB]" />
              Demo credentials
            </p>
            <div className="text-xs text-gray-600 space-y-1 font-mono">
              <p><span className="text-[#1E3A5F] font-semibold">admin</span> / apcresearch2024</p>
              <p><span className="text-[#1E3A5F] font-semibold">hendra.w</span> / nanophysics</p>
              <p><span className="text-[#1E3A5F] font-semibold">budi.s</span> / wastewater</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Access restricted to APC Research members.<br />Contact <a href="mailto:apc@nano.id" className="text-[#2D9CDB] hover:underline">apc@nano.id</a> for access.
          </p>
        </div>
      </div>
    </div>
  );
}
