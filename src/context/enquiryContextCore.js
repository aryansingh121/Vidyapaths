/**
 * enquiryContextCore.js
 * Core React Context definition for EnquiryModal state.
 * Separated to ensure fast-refresh component purity.
 */
import { createContext } from 'react';

export const EnquiryContext = createContext(null);

export default EnquiryContext;
