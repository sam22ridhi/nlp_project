import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import all your components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AuthModal from './components/AuthModal';
import ResearchAssistant from './components/ResearchAssistant';
import AIGrader from './components/AIGrader';
import ContentCreator from './components/ContentCreator';
import AuthCallback from './components/AuthCallback';

/**
 * This component contains the logic that was previously in your AppContent.
 * It now uses routing to navigate between pages.
 */
function MainApp() {
  const { teacher } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // This function is now simplified. It either navigates or shows the login modal.
  const handleFeatureClick = (featurePath: string) => {
    // The grader is a protected feature
    if (featurePath === '/grader' && !teacher) {
      setShowAuthModal(true);
    } else {
      navigate(featurePath); // Navigate to the page's URL
    }
  };
  
  // This is passed to the navbar to handle navigation
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* The Navbar now uses the router-aware navigation function */}
      <Navbar onNavigate={handleNavigate} />
      
      {/* The Routes component renders the correct page based on the URL */}
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Hero onGetStarted={() => handleFeatureClick('/grader')} />
              <Features onFeatureClick={handleFeatureClick} />
            </>
          } 
        />
        <Route path="/research" element={<ResearchAssistant onBack={() => navigate('/')} />} />
        <Route path="/grader" element={<AIGrader onBack={() => navigate('/')} />} />
        <Route path="/content" element={<ContentCreator onBack={() => navigate('/')} />} />
      </Routes>

      {/* The AuthModal is shown when needed */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

/**
 * The root App component sets up the router and global context.
 * It handles the special /auth/callback route.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* This special route is ONLY for handling the redirect from Microsoft */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* All other URLs are handled by our MainApp component */}
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;