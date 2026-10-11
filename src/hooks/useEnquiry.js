/**
 * useEnquiry.js
 * Custom hook providing access to global EnquiryContext.
 */
import { useContext } from 'react';
import { EnquiryContext } from '../context/enquiryContextCore';

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}

export default useEnquiry;
