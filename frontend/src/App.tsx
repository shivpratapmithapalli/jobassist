import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResumeSuggestionsPage } from './pages/ResumeSuggestionsPage';
import { JobListPage } from './pages/JobListPage';
import { useStore } from './store/useStore';

function App() {
  const { isAuthenticated } = useStore();

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/" element={isAuthenticated ? <Layout /> : <LandingPage />}>
            <Route index element={<JobListPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="resume" element={<ResumeSuggestionsPage />} />
            <Route path="applications" element={<JobListPage />} />
          </Route>
          
          {/* Redirect authenticated users from login to applications */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/applications" /> : <LoginPage />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/applications" : "/"} />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;