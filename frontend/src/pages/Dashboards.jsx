import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import LiveLogs from '../components/LiveLogs';

const DashboardCard = ({ title, children, isWarning = false }) => (
  <div className={`p-6 border ${isWarning ? 'border-cyber-red bg-red-900/10' : 'border-cyber-border bg-cyber-panel'} rounded shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur relative overflow-hidden`}>
    {isWarning && <div className="absolute top-0 left-0 w-full h-1 bg-cyber-red"></div>}
    {!isWarning && <div className="absolute top-0 left-0 w-full h-1 bg-cyber-cyan opacity-50"></div>}
    <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center ${isWarning ? 'text-cyber-red' : 'text-cyber-cyan'}`}>
      {isWarning && <span className="mr-2">⚠</span>}
      {title}
    </h3>
    <div className="text-cyber-text text-sm">
      {children}
    </div>
  </div>
);

// Public Area (Guest)
export const PublicAlerts = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/data/public-alerts')
      .then(res => setData(res.data.message))
      .catch(err => {
        setData('Failed to fetch telemetry.');
        setError(err.response?.data?.message || 'Access Denied');
      });
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <DashboardCard title="Global Threat Status">
        {error ? (
          <p className="text-cyber-red font-bold uppercase border border-cyber-red p-4 bg-red-900/30">{error}</p>
        ) : (
          <>
            <p className="text-xl mb-6 font-bold text-cyber-white">{data || 'Fetching telemetry...'}</p>
            <div className="h-2 w-full bg-cyber-dark rounded overflow-hidden border border-cyber-border">
              <div className="h-full bg-cyber-neon w-[15%] relative">
                 <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs uppercase text-cyber-text/50">
              <span>DEFCON 4</span>
              <span>Normal Readiness</span>
            </div>
          </>
        )}
      </DashboardCard>
    </div>
  );
};

// User Dashboard
export const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [reported, setReported] = useState(false);
  const [error, setError] = useState(null);
  
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/data/user-dashboard')
      .then(res => setData(res.data.message))
      .catch(err => setError(err.response?.data?.message || 'Access Denied'));
  }, []);

  const handleReport = () => {
    axios.post('http://localhost:3001/api/data/report-incident')
      .then(() => setReported(true))
      .catch(err => alert(err.response?.data?.message || "Failed"));
  }

  if (error) {
    return <DashboardCard title="Access Restriction" isWarning><p>{error}</p></DashboardCard>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <DashboardCard title="Personal Operations">
        <p className="text-lg text-cyber-white">{data || 'Loading...'}</p>
      </DashboardCard>
      
      <DashboardCard title="Incident Reporting" isWarning>
        <p className="mb-6">Notice anomalous activity? Report it immediately to the security team.</p>
        {reported ? (
          <div className="p-3 border border-cyber-neon bg-cyber-neon/10 text-cyber-neon font-bold uppercase tracking-widest text-center">Incident Logged Securely</div>
        ) : (
          <button onClick={handleReport} className="bg-transparent border border-cyber-red text-cyber-red font-bold uppercase tracking-widest py-3 px-6 hover:bg-cyber-red hover:text-white transition-colors w-full md:w-auto relative overflow-hidden group">
            <span className="relative z-10">Submit Incident Report</span>
            <div className="absolute inset-0 bg-cyber-red w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
        )}
      </DashboardCard>
    </div>
  );
};

// Analyst Dashboard
export const AnalystDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  React.useEffect(() => {
    axios.get('http://localhost:3001/api/data/threat-dashboard')
      .then(res => setData(res.data.message))
      .catch(err => setError(err.response?.data?.message || 'Access Denied'));
  }, []);

  if (error) {
    return <DashboardCard title="Access Restriction" isWarning><p>{error}</p></DashboardCard>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Active Threats" isWarning>
          <p className="text-lg text-cyber-white mb-4">{data || 'Loading...'}</p>
          <div className="p-4 border border-cyber-red/30 bg-black/60 text-xs font-mono">
            <div className="mb-1"><span className="text-cyber-red font-bold">» [WARN]</span> Port scanning detected on subnet 192.168.1.0/24</div>
            <div className="mb-1"><span className="text-cyber-neon font-bold">» [INFO]</span> Firewall rules updated automatically</div>
            <div><span className="text-cyber-red font-bold">» [WARN]</span> Unauthorized access attempts from unknown IPs</div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Investigation Tasks">
          <ul className="space-y-4">
            <li className="flex flex-col border-b border-cyber-border/50 pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyber-white">Review VPN Logs</span>
                <span className="text-[10px] text-cyber-neon border border-cyber-neon px-2 py-0.5 rounded tracking-widest">PENDING</span>
              </div>
              <span className="text-xs text-cyber-text/60">Analyze multi-geography logins for anomalities.</span>
            </li>
            <li className="flex flex-col border-b border-cyber-border/50 pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyber-white">Analyze Phishing Campaign</span>
                <span className="text-[10px] text-cyber-red border border-cyber-red bg-red-900/40 px-2 py-0.5 rounded tracking-widest font-bold animate-pulse">URGENT</span>
              </div>
              <span className="text-xs text-cyber-text/60">Source IP investigation required for recent mail spike.</span>
            </li>
          </ul>
        </DashboardCard>
      </div>
      
      <LiveLogs />
    </div>
  );
};

// Admin Dashboard
export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3001/api/data/admin-dashboard')
      .then(res => setData(res.data.message))
      .catch(err => setError(err.response?.data?.message || 'Access Denied'));
  }, []);

  if (error) {
    return <DashboardCard title="Access Restriction" isWarning><p>{error}</p></DashboardCard>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
           <DashboardCard title="System Control">
            <div className="flex items-center justify-between border-b border-cyber-border/50 pb-4 mb-4">
              <p className="text-xl text-cyber-cyan font-bold tracking-widest">CORE SYSTEM</p>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-cyber-neon rounded-full mr-2 shadow-[0_0_5px_#00ff9d]"></span>
                <span className="text-cyber-neon font-bold text-xs">ONLINE</span>
              </div>
            </div>
            <p className="text-cyber-white">{data || 'Loading...'}</p>
            <p className="mt-4 text-xs opacity-75 border-l-2 border-cyber-cyan pl-3">All sub-systems operating within normal parameters. Access control active.</p>
          </DashboardCard>
        </div>
        <DashboardCard title="Quick Actions">
          <div className="flex flex-col space-y-3">
            <button className="text-left px-4 py-3 bg-cyber-dark/50 hover:bg-cyber-dark border border-cyber-border hover:border-cyber-cyan transition-colors text-xs font-bold uppercase tracking-widest group flex justify-between">
              <span>Provision User</span>
              <span className="text-cyber-cyan group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="text-left px-4 py-3 bg-cyber-dark/50 hover:bg-cyber-dark border border-cyber-border hover:border-cyber-cyan transition-colors text-xs font-bold uppercase tracking-widest group flex justify-between">
              <span>System Settings</span>
              <span className="text-cyber-cyan group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="text-left px-4 py-3 bg-cyber-dark/50 hover:bg-red-900/20 border border-cyber-border hover:border-cyber-red transition-colors text-xs font-bold uppercase tracking-widest text-cyber-red group flex justify-between">
              <span>Emergency Lockdown</span>
              <span className="text-cyber-red group-hover:translate-x-1 transition-transform">⚠</span>
            </button>
          </div>
        </DashboardCard>
      </div>

      <LiveLogs />
    </div>
  );
};
