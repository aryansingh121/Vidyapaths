/**
 * EnquiryContext.jsx
 * State provider for global enquiry and free counselling modal lifecycles.
 */
import React, { useState, useCallback, useMemo } from 'react';
import { EnquiryContext } from './enquiryContextCore';
import { resolveServiceAndPrefill } from '../utils/serviceMapper';

export function EnquiryProvider({ children }) {
  // Service-specific enquiry modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('college-admissions');
  const [initialValues, setInitialValues] = useState({});
  const [source, setSource] = useState('General');

  // Dedicated 4-field Free Counselling modal state
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [counsellingSource, setCounsellingSource] = useState('Get Free Counselling Button');

  const openCounselling = useCallback((triggerSource = 'Get Free Counselling Button') => {
    setIsModalOpen(false); // Ensure only one modal is active
    setCounsellingSource(typeof triggerSource === 'string' && triggerSource ? triggerSource : 'Get Free Counselling Button');
    setIsCounsellingOpen(true);
  }, []);

  const closeCounselling = useCallback(() => {
    setIsCounsellingOpen(false);
  }, []);

  const openEnquiry = useCallback((serviceOrOptions = '', maybeOptions = {}, triggerSource = 'Direct Click') => {
    // If called with counselling triggers or general CTA names, open the 4-field CounsellingModal
    const isGeneralCounselling = 
      !serviceOrOptions ||
      (typeof serviceOrOptions === 'string' && (
        serviceOrOptions.toLowerCase().includes('counselling') ||
        serviceOrOptions.toLowerCase().includes('counseling') ||
        serviceOrOptions === 'Header Main CTA' ||
        serviceOrOptions === 'Mobile Header Button' ||
        serviceOrOptions === 'Mobile Menu Big CTA' ||
        serviceOrOptions === 'Hero' ||
        serviceOrOptions === 'Hero Primary CTA' ||
        serviceOrOptions === 'Hero Consultation Card' ||
        serviceOrOptions === 'Final CTA Section' ||
        serviceOrOptions === 'Final CTA Banner' ||
        serviceOrOptions === 'Footer Quick CTA' ||
        serviceOrOptions === 'Footer CTA' ||
        serviceOrOptions === 'Colleges Page Final CTA' ||
        serviceOrOptions === 'Colleges Advisory CTA' ||
        serviceOrOptions === 'Career Roadmap Consultation' ||
        serviceOrOptions === 'How It Works Enquiry' ||
        serviceOrOptions === 'How It Works Step 1'
      ));

    if (isGeneralCounselling && typeof serviceOrOptions !== 'object') {
      const eff = typeof serviceOrOptions === 'string' && serviceOrOptions ? serviceOrOptions : triggerSource;
      openCounselling(eff);
      return;
    }

    // Otherwise, open the service-specific enquiry modal
    setIsCounsellingOpen(false); // Ensure only one modal is active

    const { serviceId, initialValues: resolvedInitial } = resolveServiceAndPrefill(serviceOrOptions, maybeOptions);
    
    // Determine effective trigger source
    let effectiveSource = triggerSource;
    if (typeof serviceOrOptions === 'object' && serviceOrOptions?.source) {
      effectiveSource = serviceOrOptions.source;
    } else if (typeof maybeOptions === 'object' && maybeOptions?.source) {
      effectiveSource = maybeOptions.source;
    } else if (typeof serviceOrOptions === 'string' && serviceOrOptions.length > 0 && !serviceOrOptions.includes('-')) {
      effectiveSource = serviceOrOptions;
    }

    setActiveServiceId(serviceId);
    setInitialValues(resolvedInitial || {});
    setSource(effectiveSource);
    setIsModalOpen(true);
  }, [openCounselling]);

  const closeEnquiry = useCallback(() => {
    setIsModalOpen(false);
    setInitialValues({});
  }, []);

  const changeService = useCallback((newServiceId) => {
    setActiveServiceId(newServiceId);
  }, []);

  const value = useMemo(() => ({
    // Service-specific enquiry modal state & actions
    isModalOpen,
    activeServiceId,
    initialValues,
    source,
    openEnquiry,
    closeEnquiry,
    changeService,
    setActiveServiceId,

    // Free Counselling modal state & actions
    isCounsellingOpen,
    counsellingSource,
    openCounselling,
    closeCounselling,
    openCounsellingModal: openCounselling,
    closeCounsellingModal: closeCounselling
  }), [
    isModalOpen,
    activeServiceId,
    initialValues,
    source,
    openEnquiry,
    closeEnquiry,
    changeService,
    isCounsellingOpen,
    counsellingSource,
    openCounselling,
    closeCounselling
  ]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
    </EnquiryContext.Provider>
  );
}

export default EnquiryProvider;
