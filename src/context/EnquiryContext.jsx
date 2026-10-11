/**
 * EnquiryContext.jsx
 * State provider for global enquiry modal lifecycle and active service selection.
 */
import React, { useState, useCallback, useMemo } from 'react';
import { EnquiryContext } from './enquiryContextCore';
import { resolveServiceAndPrefill } from '../utils/serviceMapper';

export function EnquiryProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('college-admissions');
  const [initialValues, setInitialValues] = useState({});
  const [source, setSource] = useState('General');

  const openEnquiry = useCallback((serviceOrOptions = '', maybeOptions = {}, triggerSource = 'Direct Click') => {
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
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsModalOpen(false);
    setInitialValues({});
  }, []);

  const changeService = useCallback((newServiceId) => {
    setActiveServiceId(newServiceId);
  }, []);

  const value = useMemo(() => ({
    isModalOpen,
    activeServiceId,
    initialValues,
    source,
    openEnquiry,
    closeEnquiry,
    changeService,
    setActiveServiceId
  }), [isModalOpen, activeServiceId, initialValues, source, openEnquiry, closeEnquiry, changeService]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
    </EnquiryContext.Provider>
  );
}

export default EnquiryProvider;
