import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import CursorFollower from './components/interaction/CursorFollower';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ArticleManagement from './pages/admin/ArticleManagement';
import StaffManagement from './pages/admin/StaffManagement';
import ProgramManagement from './pages/admin/ProgramManagement';
import GalleryManagement from './pages/admin/GalleryManagement';
import StatisticsManagement from './pages/admin/StatisticsManagement';

import './index.css';

function App() {
  useEffect(() => {
    if (window.location.hash && window.location.hash !== '#beranda') {
      window.history.replaceState(null, null, window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <AuthProvider>
      <CursorFollower />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/articles" element={
            <ProtectedRoute>
              <ArticleManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/staff" element={
            <ProtectedRoute>
              <StaffManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/programs" element={
            <ProtectedRoute>
              <ProgramManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/gallery" element={
            <ProtectedRoute>
              <GalleryManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/statistics" element={
            <ProtectedRoute>
              <StatisticsManagement />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
