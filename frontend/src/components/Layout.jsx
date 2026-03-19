import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navigation = [
    { name: 'Public Alerts', path: '/public-alerts', roles: ['admin', 'analyst', 'user', 'guest'] },
    { name: 'User Dashboard', path: '/user-dashboard', roles: ['admin', 'analyst', 'user'] },
    { name: 'Threat Intel', path: '/analyst-dashboard', roles: ['admin', 'analyst'] },
    { name: 'Admin Control', path: '/admin-dashboard', roles: ['admin'] },
  ];

  return (
    <div className="flex h-screen bg-cyber-dark text-cyber-text font-mono overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-cyber-panel border-r border-cyber-border hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-cyber-border px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50"></div>
          <h1 className="text-cyber-cyan font-bold tracking-widest uppercase truncate">Cyber_Mon</h1>
        </div>
        
        <div className="px-4 py-6 border-b border-cyber-border">
          <p className="text-xs uppercase text-cyber-text/50 tracking-wider mb-1">Current User</p>
          <p className="text-cyber-white font-bold tracking-wider truncate">{user?.username || 'GUEST'}</p>
          <span className={`inline-block mt-2 px-2 py-1 bg-cyber-dark border text-[10px] uppercase tracking-widest rounded ${
            user?.role === 'admin' ? 'border-cyber-cyan text-cyber-cyan' :
            user?.role === 'analyst' ? 'border-cyber-neon text-cyber-neon' :
            user?.role === 'user' ? 'border-white text-white' : 'border-cyber-text text-cyber-text'
          }`}>
            Role: {user?.role || 'NONE'}
          </span>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2 relative scrollbar-hide overflow-y-auto">
          {navigation.map((item) => {
            const isAuthorized = item.roles.includes(user?.role);
            const isActive = location.pathname === item.path;
            
            return (
              <div key={item.name}>
                {isAuthorized ? (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm tracking-wider uppercase transition-colors rounded ${
                      isActive 
                      ? 'bg-cyber-cyan/10 text-cyber-cyan border-l-2 border-cyber-cyan' 
                      : 'text-cyber-text hover:bg-cyber-dark hover:text-cyber-white text-opacity-80'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div className="flex items-center px-4 py-3 text-sm tracking-wider uppercase rounded text-cyber-text/30 cursor-not-allowed opacity-50 filter grayscale">
                    {item.name}
                    <span className="ml-auto text-[9px] bg-red-900/40 text-cyber-red px-1 border border-cyber-red">DENIED</span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cyber-border mt-auto">
          <button 
            onClick={logout}
            className="w-full py-2 border border-cyber-border text-cyber-text hover:text-cyber-red hover:border-cyber-red transition-colors text-xs font-bold uppercase tracking-widest"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,10,15,0.9),rgba(10,10,15,0.9)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] z-0 pointer-events-none"></div>
        
        <header className="h-16 border-b border-cyber-border bg-cyber-panel/80 backdrop-blur flex items-center px-6 z-10 relative">
          <div className="flex items-center w-full justify-between">
            <h2 className="text-lg font-bold text-cyber-white uppercase tracking-wider relative flex items-center">
              <span className="w-2 h-2 mr-3 bg-cyber-neon rounded-full animate-pulse shadow-[0_0_8px_#00ff9d]"></span>
              {navigation.find(n => n.path === location.pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4 md:hidden">
              <button onClick={logout} className="text-cyber-red text-sm uppercase tracking-widest border border-cyber-red px-2 py-1 rounded">Quit</button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6 z-10 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
