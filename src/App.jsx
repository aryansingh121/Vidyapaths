/**
 * App.jsx
 * Application root component with routing, global providers,
 * and high-availability error boundaries.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EnquiryModal from './components/EnquiryModal';
import CounsellingModal from './components/CounsellingModal';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import { EnquiryProvider } from './context/EnquiryContext';
import { useEnquiry } from './hooks/useEnquiry';
import { usePageMeta } from './utils/usePageMeta';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Colleges from './pages/Colleges';
import StudyAbroad from './pages/StudyAbroad';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function AppContent() {
  usePageMeta();
  const { 
    openEnquiry, 
    openCounselling, 
    isCounsellingOpen, 
    closeCounselling, 
    counsellingSource 
  } = useEnquiry();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-orange-500 selection:text-white font-sans">
      {/* Scroll restoration across route changes and hash navigation */}
      <ScrollToTop />

      {/* Top Navbar */}
      <Navbar 
        onOpenEnquiry={openEnquiry} 
        onOpenCounselling={openCounselling} 
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <ErrorBoundary>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onOpenEnquiry={openEnquiry} 
                  onOpenCounselling={openCounselling} 
                />
              } 
            />
            <Route 
              path="/about" 
              element={
                <About 
                  onOpenEnquiry={openEnquiry} 
                  onOpenCounselling={openCounselling} 
                />
              } 
            />
            <Route 
              path="/services" 
              element={
                <Services 
                  onOpenEnquiry={openEnquiry} 
                  onOpenCounselling={openCounselling} 
                />
              } 
            />
            <Route 
              path="/colleges" 
              element={
                <Colleges 
                  onOpenEnquiry={openEnquiry} 
                  onOpenCounselling={openCounselling} 
                />
              } 
            />
            <Route 
              path="/study-abroad" 
              element={
                <StudyAbroad 
                  onOpenEnquiry={openEnquiry} 
                  onOpenCounselling={openCounselling} 
                />
              } 
            />
            <Route 
              path="/internships" 
              element={
                <Internships 
                  onOpenEnquiry={openEnquiry} 
                  onOpenCounselling={openCounselling} 
                />
              } 
            />
            {/* Clean legacy route redirects */}
            <Route path="/internships-admissions" element={<Navigate to="/internships" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
            {/* Fallback to Home */}
            <Route 
              path="*" 
              element={
                <Home 
                  onOpenEnquiry={openEnquiry} 
                  onOpenCounselling={openCounselling} 
                />
              } 
            />
          </Routes>
        </ErrorBoundary>
      </main>

      {/* Global Footer */}
      <Footer 
        onOpenEnquiry={openEnquiry} 
        onOpenCounselling={openCounselling} 
      />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Reusable 4-Field Free Counselling Modal */}
      <CounsellingModal 
        isOpen={isCounsellingOpen} 
        onClose={closeCounselling} 
        source={counsellingSource} 
      />

      {/* Global Service-Specific Enquiry Modal */}
      <EnquiryModal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <EnquiryProvider>
          <AppContent />
        </EnquiryProvider>
      </Router>
    </ErrorBoundary>
  );
}
