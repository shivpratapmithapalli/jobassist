import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { EmailConfirmationPage } from './pages/EmailConfirmationPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResumeSuggestionsPage } from './pages/ResumeSuggestionsPage';
import { JobListPage } from './pages/JobListPage';
import { useStore } from './store/useStore';
import { useAuthInit } from './hooks/useAuthInit';

function App() {
  const { isAuthenticated } = useStore();
  useAuthInit();

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/applications" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/applications" />} />
          <Route path="/email-confirmation" element={!isAuthenticated ? <EmailConfirmationPage /> : <Navigate to="/applications" />} />
          
          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route path="/" element={<Layout />}>
              <Route path="applications" element={<JobListPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="resume" element={<ResumeSuggestionsPage />} />
            </Route>
          ) : null}
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/applications" : "/"} />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;