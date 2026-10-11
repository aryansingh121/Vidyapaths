/**
 * serviceMapper.js
 * Business logic for mapping service triggers, query prompts,
 * and string patterns into normalized service IDs and prefilled form fields.
 */
import { getServiceConfig, SERVICE_FORM_CONFIGS } from '../data/serviceFormConfigs';

/**
 * Normalizes input trigger options into { serviceId, initialValues }.
 * 
 * @param {string|Object} serviceOrOptions 
 * @param {Object} [maybeOptions={}] 
 * @returns {{ serviceId: string, initialValues: Object }}
 */
export function resolveServiceAndPrefill(serviceOrOptions = '', maybeOptions = {}) {
  let serviceName = '';
  let initialValues = {};

  if (serviceOrOptions && typeof serviceOrOptions === 'object') {
    serviceName = serviceOrOptions.service || serviceOrOptions.defaultService || 'college-admissions';

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
    serviceName = serviceOrOptions;

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

    // Heuristics for string triggers
    const trimmed = serviceName.trim();

    // 1. College comparison
    if (
      trimmed === 'College Comparison Request' ||
      trimmed.toLowerCase().includes('comparison') ||
      trimmed.toLowerCase().includes('compare cutoffs') ||
      trimmed.toLowerCase().includes('college comparison sheet')
    ) {
      serviceName = 'college-comparison';
    }

    // 2. Study abroad country detection
    else if (
      trimmed.startsWith('Study Abroad Counselling for ') ||
      trimmed.startsWith('Study Abroad - ')
    ) {
      const countryName = trimmed
        .replace('Study Abroad Counselling for ', '')
        .replace('Study Abroad - ', '')
        .trim();
      initialValues.intendedCountries = countryName;
      initialValues.country = countryName;
      serviceName = 'study-abroad';
    } else if (
      trimmed === 'Study Abroad' ||
      trimmed === 'study-abroad' ||
      trimmed.toLowerCase().includes('study abroad')
    ) {
      serviceName = 'study-abroad';
    }

    // 3. Internship sector detection
    else if (trimmed.startsWith('Internship in ')) {
      const domainName = trimmed.replace('Internship in ', '').trim();
      initialValues.preferredDomain = domainName;
      initialValues.domain = domainName;
      serviceName = 'internship-assistance';
    }

    // 4. College guidance format triggers
    else if (trimmed.startsWith('Admission Guidance - ')) {
      const collegeName = trimmed.replace('Admission Guidance - ', '').trim();
      initialValues.preferredCollege = collegeName;
      initialValues.preferredCollege1 = collegeName;
      serviceName = 'college-admissions';
    } else if (trimmed.startsWith('Admission Guidance: ')) {
      const details = trimmed.replace('Admission Guidance: ', '').trim();
      if (details.includes(' at ')) {
        const [prog, col] = details.split(' at ');
        initialValues.preferredCourse = prog.trim();
        initialValues.preferredCollege = col.trim();
        initialValues.preferredCollege1 = col.trim();
      }
      serviceName = 'college-admissions';
    } else if (trimmed.startsWith('Admission Guidance for ')) {
      initialValues.preferredCourse = trimmed.replace('Admission Guidance for ', '').trim();
      serviceName = 'college-admissions';
    } else if (trimmed.startsWith('Colleges in ')) {
      initialValues.preferredCourse = trimmed.replace('Colleges in ', '').trim();
      serviceName = 'college-admissions';
    }
  }

  // Resolve config to get stable serviceId
  const config = getServiceConfig(serviceName);
  const serviceId = config?.id || 'college-admissions';

  return {
    serviceId,
    serviceConfig: SERVICE_FORM_CONFIGS[serviceId] || config,
    initialValues
  };
}

export default {
  resolveServiceAndPrefill
};
