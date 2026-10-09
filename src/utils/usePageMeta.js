import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeMeta = {
  '/': {
    title: 'Vidyapaths — Right Guidance. Brighter Future. | Career & Education Consultancy',
    description: 'Vidyapaths is a student-focused Career & Education Consultancy helping students make confident decisions for college admissions, career guidance, internships, and study abroad.'
  },
  '/about': {
    title: 'About Vidyapaths | Mission, Vision & Student-First Mentorship',
    description: 'Learn about Vidyapaths, our ethical advisory philosophy, transparent college cutoffs analysis, and student-focused career guidance.'
  },
  '/services': {
    title: 'Our Services | College Admissions, Career Counselling & Study Abroad — Vidyapaths',
    description: 'Explore Vidyapaths comprehensive education guidance services: UG/PG admissions, career counselling, internship assistance, and international degrees.'
  },
  '/colleges': {
    title: 'Explore Colleges & Courses | UG, PG & Specialized Programs — Vidyapaths',
    description: 'Discover colleges and explore undergraduate, postgraduate, and specialized programs. Get personalized guidance to choose a course that fits your career goals.'
  },
  '/study-abroad': {
    title: 'Study Abroad Consultancy | UK, USA, Canada, Australia & More — Vidyapaths',
    description: 'End-to-end overseas education guidance for 9 top destinations: UK, USA, Canada, Australia, Germany, Ireland, New Zealand, UAE, and Singapore.'
  },
  '/internships': {
    title: 'Internship Assistance & Corporate Readiness — Vidyapaths',
    description: 'Bridge academic learning with corporate exposure. Guidance on ATS resume optimization, project portfolios, and interview mastery.'
  },
  '/internships-admissions': {
    title: 'Internship Assistance & Corporate Readiness — Vidyapaths',
    description: 'Bridge academic learning with corporate exposure. Guidance on ATS resume optimization, project portfolios, and interview mastery.'
  },
  '/contact': {
    title: 'Contact Vidyapaths | Book Free Career & Admission Counselling',
    description: 'Get in touch with Vidyapaths academic counsellors. Request free 1-on-1 guidance, explore colleges, or chat directly on WhatsApp.'
  }
};

export function usePageMeta() {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMeta[location.pathname] || routeMeta['/'];
    document.title = meta.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    }
  }, [location.pathname]);
}
