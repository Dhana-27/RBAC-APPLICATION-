import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import { AdminDashboard, AnalystDashboard, UserDashboard, PublicAlerts } from './pages/Dashboards';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="flex h-screen items-center justify-center bg-cyber-dark text-cyber-neon text-xl tracking-widest uppercase">Initializing Security Matrix...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={
        <div className="flex flex-col h-screen items-center justify-center bg-cyber-dark text-center">
          <div className="text-cyber-red text-6xl mb-4">⚠</div>
          <h1 className="text-cyber-red text-3xl font-bold tracking-wider mb-2 uppercase">Access Denied</h1>
          <p className="text-cyber-text text-lg tracking-widest">Insufficient Privileges</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-8 px-6 py-2 border border-cyber-border text-cyber-neon hover:bg-cyber-neon hover:text-black transition-colors duration-300 tracking-wider">
            RETURN TO SAFETY
          </button>
        </div>
      } />
      
      <Route path="/" element={
        <ProtectedRoute allowedRoles={['admin', 'analyst', 'user', 'guest']}>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/public-alerts" replace />} />
        
        <Route path="public-alerts" element={
          <ProtectedRoute allowedRoles={['admin', 'analyst', 'user', 'guest']}>
            <PublicAlerts />
          </ProtectedRoute>
        } />
        
        <Route path="user-dashboard" element={
          <ProtectedRoute allowedRoles={['admin', 'analyst', 'user']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="analyst-dashboard" element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <AnalystDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="admin-dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
