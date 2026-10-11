/**
 * EnquiryModal.jsx
 * High-conversion lead capture modal with service tab navigation.
 * Integrates with global EnquiryContext or functions as a standalone controlled modal.
 */
import React from 'react';
import { useEnquiry } from '../hooks/useEnquiry';
import { SERVICE_FORM_CONFIGS, getServiceConfig } from '../data/serviceFormConfigs';
import Modal from './common/Modal';
import EnquiryForm from './EnquiryForm';

export default function EnquiryModal({ 
  isOpen: propIsOpen, 
  onClose: propOnClose, 
  defaultService: propDefaultService,
  initialValues: propInitialValues
}) {
  const context = useEnquiry();

  // Support both context state and controlled props
  const isOpen = propIsOpen !== undefined ? propIsOpen : context?.isModalOpen;
  const onClose = propOnClose || context?.closeEnquiry;
  
  const activeServiceId = propDefaultService 
    ? getServiceConfig(propDefaultService).id 
    : (context?.activeServiceId || 'college-admissions');

  const initialValues = propInitialValues !== undefined 
    ? propInitialValues 
    : (context?.initialValues || {});

  const handleServiceChange = (newServiceId) => {
    if (context?.changeService) {
      context.changeService(newServiceId);
    }
  };

  if (!isOpen) return null;

  const currentConfig = SERVICE_FORM_CONFIGS[activeServiceId] || getServiceConfig(activeServiceId);
  const initialValuesKey = JSON.stringify(initialValues);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentConfig.modalHeading}
      subtitle={currentConfig.shortDescription}
      badge={currentConfig.badgeText !== null ? (currentConfig.badgeText || "100% Free") : null}
    >
      <EnquiryForm 
        key={`${activeServiceId}-${initialValuesKey}`}
        defaultService={activeServiceId} 
        activeServiceId={activeServiceId}
        onServiceChange={handleServiceChange}
        initialValues={initialValues}
        source={context?.source || "Popup Modal"} 
        isModal={true} 
      />
    </Modal>
  );
}
