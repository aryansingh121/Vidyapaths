/**
 * useEnquiryForm.js
 * Custom hook isolating form business logic from UI rendering:
 * - State management for shared & service-specific fields
 * - Input change handlers & validation error tracking
 * - Asynchronous submission lifecycle via enquiryService
 */
import { useState, useCallback } from 'react';
import { validateEnquiryForm } from '../utils/validation';
import { submitEnquiry } from '../services/enquiryService';

const INITIAL_SHARED_STATE = Object.freeze({
  fullName: '',
  mobileNumber: '',
  email: '',
  currentCity: ''
});

export function useEnquiryForm({
  activeServiceId,
  activeConfig,
  initialValues = {},
  source = 'Lead Form'
}) {
  const [sharedData, setSharedData] = useState(INITIAL_SHARED_STATE);
  const [serviceFields, setServiceFields] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [prevInitialValues, setPrevInitialValues] = useState(initialValues);

  // Hydrate or merge initial values when changed
  if (initialValues !== prevInitialValues) {
    setPrevInitialValues(initialValues);
    if (initialValues && Object.keys(initialValues).length > 0) {
      setServiceFields(prev => ({
        ...prev,
        ...initialValues
      }));
    }
  }

  // Handle shared input updates
  const handleSharedChange = useCallback((field, value) => {
    setSharedData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  // Handle service-specific field updates
  const handleFieldChange = useCallback((fieldName, value) => {
    setServiceFields(prev => ({ ...prev, [fieldName]: value }));
    setErrors(prev => {
      if (prev[fieldName]) {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      }
      return prev;
    });
  }, []);

  // Handle checkbox group toggles
  const handleCheckboxToggle = useCallback((fieldName, optionValue) => {
    setServiceFields(prev => {
      const currentArr = Array.isArray(prev[fieldName]) ? prev[fieldName] : [];
      const updated = currentArr.includes(optionValue)
        ? currentArr.filter(v => v !== optionValue)
        : [...currentArr, optionValue];
      return { ...prev, [fieldName]: updated };
    });
    setErrors(prev => {
      if (prev[fieldName]) {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      }
      return prev;
    });
  }, []);

  // Submit handler
  const handleSubmit = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    setSubmitError('');

    // Validate fields
    const validationErrors = validateEnquiryForm(
      sharedData,
      serviceFields,
      activeConfig?.fields || []
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { success: false, errors: validationErrors };
    }

    setIsSubmitting(true);

    try {
      const result = await submitEnquiry({
        serviceId: activeServiceId,
        serviceConfig: activeConfig,
        sharedData,
        currentValues: serviceFields,
        source
      });

      if (result.success) {
        setSubmitSuccess(true);
        setErrors({});
        return { success: true };
      } else {
        setSubmitError(result.error || 'Submission failed. Please try again.');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const msg = err.message || 'An unexpected error occurred during submission.';
      setSubmitError(msg);
      return { success: false, error: msg };
    } finally {
      setIsSubmitting(false);
    }
  }, [sharedData, serviceFields, activeConfig, activeServiceId, source]);

  // Reset form
  const resetForm = useCallback(() => {
    setSharedData(INITIAL_SHARED_STATE);
    setServiceFields({});
    setErrors({});
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setSubmitError('');
  }, []);

  return {
    sharedData,
    serviceFields,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleSharedChange,
    handleFieldChange,
    handleCheckboxToggle,
    handleSubmit,
    resetForm,
    setSubmitError,
    setSubmitSuccess
  };
}

export default useEnquiryForm;
