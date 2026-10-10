import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EnquiryModal from './components/EnquiryModal';
import ScrollToTop from './components/ScrollToTop';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [initialFormData, setInitialFormData] = useState({});

  const handleOpenEnquiry = (serviceOrOptions = '', maybeOptions = {}) => {
    let service = '';
    let initialValues = {};

    if (serviceOrOptions && typeof serviceOrOptions === 'object') {
      service = serviceOrOptions.service || serviceOrOptions.defaultService || 'college-admission';
      if (serviceOrOptions.course) {
        initialValues.preferredCourse = serviceOrOptions.course;
      }
      if (serviceOrOptions.college) {
        initialValues.preferredCollege = serviceOrOptions.college;
        initialValues.preferredCollege1 = serviceOrOptions.college;
      }
      if (serviceOrOptions.country) {
        initialValues.intendedCountries = serviceOrOptions.country;
        initialValues.country = serviceOrOptions.country;
      }
      if (serviceOrOptions.domain || serviceOrOptions.preferredDomain) {
        const dom = serviceOrOptions.domain || serviceOrOptions.preferredDomain;
        initialValues.preferredDomain = dom;
        initialValues.domain = dom;
      }
      if (serviceOrOptions.initialValues) {
        initialValues = { ...initialValues, ...serviceOrOptions.initialValues };
      }
    } else if (typeof serviceOrOptions === 'string') {
      service = serviceOrOptions;
      if (maybeOptions && typeof maybeOptions === 'object') {
        if (maybeOptions.course) {
          initialValues.preferredCourse = maybeOptions.course;
        }
        if (maybeOptions.college) {
          initialValues.preferredCollege = maybeOptions.college;
          initialValues.preferredCollege1 = maybeOptions.college;
        }
        if (maybeOptions.country) {
          initialValues.intendedCountries = maybeOptions.country;
          initialValues.country = maybeOptions.country;
        }
        if (maybeOptions.domain || maybeOptions.preferredDomain) {
          const dom = maybeOptions.domain || maybeOptions.preferredDomain;
          initialValues.preferredDomain = dom;
          initialValues.domain = dom;
        }
        if (maybeOptions.initialValues) {
          initialValues = { ...initialValues, ...maybeOptions.initialValues };
        }
      }

      // Detect college comparison requests
      if (
        service === 'College Comparison Request' ||
        service.toLowerCase().includes('comparison') ||
        service.toLowerCase().includes('compare cutoffs') ||
        service.toLowerCase().includes('college comparison sheet')
      ) {
        service = 'college-comparison';
      }

      // Detect study abroad requests from string
      if (
        service.startsWith('Study Abroad Counselling for ') ||
        service.startsWith('Study Abroad - ')
      ) {
        const countryName = service
          .replace('Study Abroad Counselling for ', '')
          .replace('Study Abroad - ', '')
          .trim();
        initialValues.intendedCountries = countryName;
        initialValues.country = countryName;
        service = 'study-abroad';
      } else if (
        service === 'Study Abroad' ||
        service === 'study-abroad' ||
        service.toLowerCase().includes('study abroad')
      ) {
        service = 'study-abroad';
      }

      // Detect internship sector requests from string
      if (service.startsWith('Internship in ')) {
        const domainName = service.replace('Internship in ', '').trim();
        initialValues.preferredDomain = domainName;
        initialValues.domain = domainName;
        service = 'internship-assistance';
      }

      // Fallback parsing for college and course guidance string format
      if (service.startsWith('Admission Guidance - ')) {
        const collegeName = service.replace('Admission Guidance - ', '').trim();
        initialValues.preferredCollege = collegeName;
        initialValues.preferredCollege1 = collegeName;
        service = 'college-admission';
      } else if (service.startsWith('Admission Guidance: ')) {
        const details = service.replace('Admission Guidance: ', '').trim();
        if (details.includes(' at ')) {
          const [prog, col] = details.split(' at ');
          initialValues.preferredCourse = prog.trim();
          initialValues.preferredCollege = col.trim();
          initialValues.preferredCollege1 = col.trim();
        }
        service = 'college-admission';
      }

      if (!initialValues.preferredCourse) {
        if (service.startsWith('Admission Guidance for ')) {
          initialValues.preferredCourse = service.replace('Admission Guidance for ', '').trim();
          service = 'college-admission';
        } else if (service.startsWith('Colleges in ')) {
          initialValues.preferredCourse = service.replace('Colleges in ', '').trim();
          service = 'college-admission';
        }
      }
    }

    setSelectedService(service);
    setInitialFormData(initialValues);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
    setSelectedService('');
    setInitialFormData({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-orange-500 selection:text-white font-sans">
      {/* Scroll restoration across route changes and hash navigation */}
      <ScrollToTop />

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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/terms" element={<TermsOfService />} />
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
        initialValues={initialFormData}
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
