import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LiveLogs = () => {
  const [logs, setLogs] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    let interval;
    if (user && ['admin', 'analyst'].includes(user.role)) {
      const fetchLogs = async () => {
        try {
          const res = await axios.get('http://localhost:3001/api/data/system-logs');
          setLogs(res.data);
        } catch (err) {
          console.error("Failed to fetch logs");
        }
      };

      fetchLogs();
      interval = setInterval(fetchLogs, 3000); // Poll every 3 seconds for simulation
    }
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!['admin', 'analyst'].includes(user?.role)) {
    return null;
  }

  return (
    <div className="mt-8 border border-cyber-border bg-black/80 rounded shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col h-72">
      <div className="px-4 py-3 border-b border-cyber-border flex justify-between items-center bg-cyber-panel/50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-cyber-cyan flex items-center">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan mr-2 animate-pulse shadow-[0_0_5px_#00f0ff]"></span>
          Live Access Logs
        </h3>
        <span className="text-[10px] text-cyber-text tracking-widest border border-cyber-border px-2 py-0.5 rounded">AUTO-REFRESH: ON</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-[11px] md:text-xs leading-relaxed"
      >
        {logs.slice().reverse().map((log, i) => (
          <div key={log._id || i} className={`mb-1.5 flex items-start ${log.status === 'denied' ? 'text-cyber-red' : 'text-cyber-text'}`}>
            <span className="opacity-50 min-w-[100px] shrink-0">[{new Date(log.createdAt).toLocaleTimeString()}]</span>
            <span className="flex-1">
              <span className={`${log.status === 'denied' ? 'text-cyber-red font-bold' : 'text-cyber-white'}`}>{log.user}</span>{' '}
              <span className="opacity-70 text-[10px]">({log.role})</span>{' '}
              {log.action === 'LOGIN' ? 'attempted login via' : 'tried to access'}{' '}
              <span className="text-cyber-neon font-bold">{log.resource}</span>{' '}
              <span className="mx-2 opacity-50">→</span>{' '}
              <span className={`font-bold uppercase tracking-widest ${log.status === 'denied' ? 'bg-red-900/40 px-1.5 py-0.5 border border-cyber-red inline-block' : 'text-cyber-cyan'}`}>
                {log.status === 'denied' ? 'DENIED' : 'SUCCESS'}
              </span>
            </span>
          </div>
        ))}
        {logs.length === 0 && <span className="text-cyber-text/50 animate-pulse mt-2 inline-block">Listening for system events via WebSocket stream...</span>}
      </div>
    </div>
  );
};

export default LiveLogs;
