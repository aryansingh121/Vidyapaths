import React from 'react';
import Hero from '../sections/Hero';
import Benefits from '../sections/Benefits';
import ServicesPreview from '../sections/ServicesPreview';
import HowItWorks from '../sections/HowItWorks';
import CollegeAdmissionSection from '../sections/CollegeAdmissionSection';
import StudyAbroadSection from '../sections/StudyAbroadSection';
import InternshipSection from '../sections/InternshipSection';
import WhyVidyapaths from '../sections/WhyVidyapaths';
import TestimonialsSection from '../sections/TestimonialsSection';
import FinalCTA from '../sections/FinalCTA';

export default function Home({ onOpenEnquiry }) {
  return (
    <div>
      <Hero onOpenEnquiry={() => onOpenEnquiry('Hero')} />
      <Benefits onOpenEnquiry={() => onOpenEnquiry('Benefits Section')} />
      <ServicesPreview onOpenEnquiry={onOpenEnquiry} />
      <HowItWorks onOpenEnquiry={() => onOpenEnquiry('How It Works Section')} />
      <CollegeAdmissionSection onOpenEnquiry={onOpenEnquiry} />
      <StudyAbroadSection onOpenEnquiry={onOpenEnquiry} />
      <InternshipSection onOpenEnquiry={onOpenEnquiry} />
      <WhyVidyapaths />
      <TestimonialsSection onOpenEnquiry={() => onOpenEnquiry('Testimonials Section')} />
      <FinalCTA onOpenEnquiry={() => onOpenEnquiry('Final CTA Section')} />
    </div>
  );
}
