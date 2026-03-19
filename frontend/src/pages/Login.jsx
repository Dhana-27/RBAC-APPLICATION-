import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) {
      navigate('/public-alerts');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-cyber-dark text-cyber-text font-mono">
      <div className="w-full max-w-md bg-cyber-panel border border-cyber-border rounded-lg p-8 shadow-[0_0_15px_rgba(0,240,255,0.1)] relative overflow-hidden">
        {/* Decorative corner grid */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-cyber-cyan opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-cyber-cyan opacity-20"></div>

        <h2 className="text-2xl font-bold text-cyber-cyan mb-6 text-center tracking-widest uppercase">
          System Access
        </h2>
        
        {error && (
          <div className="bg-red-900/30 border border-cyber-red text-cyber-red px-4 py-2 mb-6 rounded text-sm relative">
            <span className="absolute left-0 top-0 h-full w-1 bg-cyber-red"></span>
            [ERROR]: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs text-cyber-text uppercase tracking-wider mb-2">Identifier</label>
            <input
              type="text"
              className="w-full bg-cyber-dark border border-cyber-border rounded px-4 py-2 text-cyber-white focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-cyber-text uppercase tracking-wider mb-2">Passcode</label>
            <input
              type="password"
              className="w-full bg-cyber-dark border border-cyber-border rounded px-4 py-2 text-cyber-white focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-transparent border border-cyber-neon text-cyber-neon hover:bg-cyber-neon hover:text-black font-bold py-3 rounded transition-all duration-300 uppercase tracking-widest mt-4 group relative overflow-hidden"
          >
            <span className="relative z-10">Authenticate</span>
            <div className="absolute inset-0 h-full w-0 bg-cyber-neon transition-all duration-300 ease-out group-hover:w-full"></div>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-cyber-border/50 text-xs text-cyber-text/70 relative z-10">
          <p className="mb-2 uppercase text-[10px] tracking-widest text-cyber-text">Demo Accounts:</p>
          <ul className="grid grid-cols-2 gap-2 font-mono">
            <li>admin / admin123</li>
            <li>analyst / analyst123</li>
            <li>user / user123</li>
            <li>guest / guest123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
