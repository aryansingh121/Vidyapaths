import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EnquiryModal from './components/EnquiryModal';
import { usePageMeta } from './utils/usePageMeta';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Colleges from './pages/Colleges';
import StudyAbroad from './pages/StudyAbroad';
import Internships from './pages/Internships';
import Contact from './pages/Contact';

function AppContent() {
  usePageMeta();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenEnquiry = (service = '') => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-orange-500 selection:text-white font-sans">
      {/* Top Navbar */}
      <Navbar onOpenEnquiry={() => handleOpenEnquiry('General Counselling')} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/about" element={<About onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/services" element={<Services onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/colleges" element={<Colleges onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/study-abroad" element={<StudyAbroad onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/internships" element={<Internships onOpenEnquiry={handleOpenEnquiry} />} />
          {/* Legacy route alias */}
          <Route path="/internships-admissions" element={<Internships onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home onOpenEnquiry={handleOpenEnquiry} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onOpenEnquiry={() => handleOpenEnquiry('Footer Quick CTA')} />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Global Lead / Free Counselling Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultService={selectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
