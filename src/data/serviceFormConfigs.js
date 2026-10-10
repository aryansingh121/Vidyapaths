/**
 * serviceFormConfigs.js
 * 
 * Formal configuration for Vidyapaths service-specific enquiry forms.
 * Covers all six services with dedicated field sets, validation rules,
 * headings, and descriptions for lead qualification.
 */

export const SHARED_FIELDS = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'e.g. Aryan Sharma',
    required: true,
    colSpan: 1,
    errorMessage: 'Full Name is required'
  },
  {
    name: 'mobileNumber',
    label: 'Mobile Number',
    type: 'tel',
    placeholder: 'e.g. 9876543210',
    required: true,
    colSpan: 1,
    errorMessage: 'Enter a valid 10-digit mobile number'
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'e.g. aryan@example.com',
    required: true,
    colSpan: 1,
    errorMessage: 'Enter a valid email address'
  },
  {
    name: 'currentCity',
    label: 'Current City',
    type: 'text',
    placeholder: 'e.g. Delhi, Lucknow, Patna',
    required: true,
    colSpan: 1,
    errorMessage: 'Current City is required'
  }
];

export const SERVICE_FORM_CONFIGS = {
  'college-admissions': {
    id: 'college-admissions',
    displayName: 'College Admission & Guidance',
    modalHeading: 'College Admission & Guidance',
    shortDescription: 'Get personalized merit evaluation, cutoff analysis, and verified college options.',
    aliases: [
      'college admission',
      'college admission & guidance',
      'college admissions',
      'admission guidance',
      'colleges',
      'admissions'
    ],
    fields: [
      // Required Service Fields
      {
        name: 'currentQualification',
        label: 'Current Qualification',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Class 10th / 11th',
          'Class 12th (Appearing / Passed)',
          'Undergraduate Student',
          'Graduate / Degree Holder',
          'Postgraduate Student',
          'Other'
        ],
        errorMessage: 'Please select your current qualification'
      },
      {
        name: 'passingYear',
        label: 'Passing Year',
        type: 'select',
        required: true,
        colSpan: 1,
        options: ['2027 or later', '2026', '2025', '2024', '2023 or earlier'],
        errorMessage: 'Please select your passing year'
      },
      {
        name: 'preferredCourse',
        label: 'Preferred Course',
        type: 'text',
        placeholder: 'e.g. B.Tech CS, MBA, MBBS, BCA, BBA, B.Com, Law',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter your preferred course'
      },
      {
        name: 'preferredLocation',
        label: 'Preferred Study Location',
        type: 'text',
        placeholder: 'e.g. Delhi NCR, Bangalore, Pune, Mumbai, Anywhere',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter your preferred study location'
      },
      {
        name: 'expectedAdmissionYear',
        label: 'Expected Admission Year',
        type: 'select',
        required: true,
        colSpan: 1,
        options: ['2026', '2027', '2028'],
        errorMessage: 'Please select expected admission year'
      },
      // Optional Service Fields
      {
        name: 'preferredCollege',
        label: 'Preferred College / University',
        type: 'text',
        placeholder: 'e.g. DU, IPU, Top Tier Private / Specific Campus',
        required: false,
        colSpan: 1
      },
      {
        name: 'entranceExamScore',
        label: 'Entrance Exam and Score',
        type: 'text',
        placeholder: 'e.g. JEE Main 92%ile, CUET, CAT 88%ile, None',
        required: false,
        colSpan: 1
      },
      {
        name: 'budgetRange',
        label: 'Approximate Budget Range',
        type: 'select',
        required: false,
        colSpan: 1,
        options: [
          'Flexible',
          'Under ₹3 Lakhs/year',
          '₹3 - ₹6 Lakhs/year',
          '₹6 - ₹10 Lakhs/year',
          '₹10+ Lakhs/year'
        ]
      },
      {
        name: 'message',
        label: 'Additional Message',
        type: 'textarea',
        placeholder: 'Tell us about your score, background, or specific admission requirements.',
        required: false,
        colSpan: 2,
        rows: 2
      }
    ]
  },

  'career-counselling': {
    id: 'career-counselling',
    displayName: 'Career Counselling',
    modalHeading: 'Book 1-on-1 Career Counselling',
    shortDescription: 'Discover career paths aligned with your interests, personality, and strengths.',
    aliases: [
      'career counselling',
      'career counseling',
      'counselling',
      'career roadmap',
      'general counselling'
    ],
    fields: [
      // Required Service Fields
      {
        name: 'educationLevel',
        label: 'Current Education Level',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'High School (Class 9th - 10th)',
          'Senior Secondary (Class 11th - 12th)',
          'Undergraduate (UG Student)',
          'Recent Graduate',
          'Working Professional',
          'Career Switcher'
        ],
        errorMessage: 'Please select your current education level'
      },
      {
        name: 'areasOfInterest',
        label: 'Areas of Interest',
        type: 'text',
        placeholder: 'e.g. Tech, Management, Design, Law, Healthcare, Creative Arts',
        required: true,
        colSpan: 1,
        errorMessage: 'Please mention your areas of interest'
      },
      {
        name: 'mainCareerConcern',
        label: 'Main Career Concern',
        type: 'text',
        placeholder: 'e.g. Confused between Engineering & Management, choosing right stream',
        required: true,
        colSpan: 2,
        errorMessage: 'Please share your main career concern or confusion'
      },
      // Optional Service Fields
      {
        name: 'careerGoals',
        label: 'Career Goals / Preferred Industry',
        type: 'text',
        placeholder: 'e.g. Product Management, AI & Data, Civil Services',
        required: false,
        colSpan: 1
      },
      {
        name: 'counsellingMode',
        label: 'Preferred Counselling Mode',
        type: 'select',
        required: false,
        colSpan: 1,
        options: [
          'Online (Video Call / Google Meet)',
          'In-person / Hybrid'
        ]
      },
      {
        name: 'preferredSessionTime',
        label: 'Preferred Session Time',
        type: 'select',
        required: false,
        colSpan: 1,
        options: [
          'Morning (10 AM - 1 PM)',
          'Afternoon (1 PM - 5 PM)',
          'Evening (5 PM - 8 PM)',
          'Weekend'
        ]
      },
      {
        name: 'message',
        label: 'Additional Message',
        type: 'textarea',
        placeholder: 'Any specific questions you would like your counsellor to address.',
        required: false,
        colSpan: 2,
        rows: 2
      }
    ]
  },

  'internship-assistance': {
    id: 'internship-assistance',
    displayName: 'Internship Assistance',
    modalHeading: 'Internship Assistance & Placement Prep',
    shortDescription: 'Connect with industry internships, portfolio enhancement, and corporate prep.',
    aliases: [
      'internship assistance',
      'internships',
      'internship',
      'internship guidance request',
      'internship assistance request'
    ],
    fields: [
      // Required Service Fields
      {
        name: 'currentQualification',
        label: 'Current Qualification',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Undergraduate (1st / 2nd Year)',
          'Undergraduate (Pre-Final / Final Year)',
          'Postgraduate (1st / 2nd Year)',
          'Recent Graduate',
          'Diploma / Certificate Student'
        ],
        errorMessage: 'Please select your current qualification'
      },
      {
        name: 'studyYearOrGradStatus',
        label: 'Year of Study or Graduation Status',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          '1st Year',
          '2nd Year',
          '3rd Year',
          '4th Year (Final Year)',
          'Graduated in 2025/2026',
          'Pursuing PG'
        ],
        errorMessage: 'Please select year of study or graduation status'
      },
      {
        name: 'preferredDomain',
        label: 'Preferred Internship Domain',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Software / Web Development',
          'Data Science & AI',
          'Digital Marketing & Content',
          'Finance & Accounting',
          'Human Resources (HR)',
          'Business Development & Sales',
          'UI/UX Design',
          'Operations & Management'
        ],
        errorMessage: 'Please select preferred internship domain'
      },
      {
        name: 'workMode',
        label: 'Preferred Work Mode',
        type: 'select',
        required: true,
        colSpan: 1,
        options: ['Remote', 'Hybrid', 'On-site', 'Any'],
        errorMessage: 'Please select preferred work mode'
      },
      // Optional Service Fields
      {
        name: 'collegeName',
        label: 'College Name',
        type: 'text',
        placeholder: 'e.g. Delhi University, IP University, Amity',
        required: false,
        colSpan: 1
      },
      {
        name: 'skillsExperience',
        label: 'Skills and Relevant Experience',
        type: 'text',
        placeholder: 'e.g. React, Python, Figma, SEO, Financial Modeling',
        required: false,
        colSpan: 1
      },
      {
        name: 'availabilityStartDate',
        label: 'Availability / Expected Start Date',
        type: 'text',
        placeholder: 'e.g. Immediate, Next Month, Summer 2026',
        required: false,
        colSpan: 1
      },
      {
        name: 'portfolioUrl',
        label: 'Resume or Portfolio URL',
        type: 'url',
        placeholder: 'https://linkedin.com/in/... or Google Drive link',
        required: false,
        colSpan: 1,
        errorMessage: 'Enter a valid URL (starting with http:// or https://)'
      },
      {
        name: 'message',
        label: 'Additional Message',
        type: 'textarea',
        placeholder: 'Specific companies, stipend expectations, or goals.',
        required: false,
        colSpan: 2,
        rows: 2
      }
    ]
  },

  'study-abroad': {
    id: 'study-abroad',
    displayName: 'Study Abroad',
    modalHeading: 'Study Abroad University Guidance',
    shortDescription: 'Get end-to-end guidance for university applications, SOPs, tests, and visas.',
    aliases: [
      'study abroad',
      'study-abroad',
      'study abroad guidance',
      'international admissions',
      'overseas'
    ],
    fields: [
      // Required Service Fields
      {
        name: 'currentQualification',
        label: 'Current Qualification',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Class 12th (Appearing / Passed)',
          'Undergraduate Student',
          "Bachelor's Degree Holder",
          "Master's Degree Holder",
          'Working Professional'
        ],
        errorMessage: 'Please select your current qualification'
      },
      {
        name: 'intendedCountries',
        label: 'Intended Country or Countries',
        type: 'text',
        placeholder: 'e.g. UK, USA, Canada, Germany, Australia, Ireland',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter intended country or countries'
      },
      {
        name: 'preferredCourse',
        label: 'Preferred Course',
        type: 'text',
        placeholder: 'e.g. MS Computer Science, MBA, MIM, Data Analytics',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter your preferred course'
      },
      {
        name: 'degreeLevel',
        label: 'Degree Level',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          "Bachelor's Degree (UG)",
          "Master's / Postgraduate (PG)",
          'MBA',
          'Diploma / Post-Baccalaureate',
          'PhD / Doctorate'
        ],
        errorMessage: 'Please select degree level'
      },
      {
        name: 'intendedIntakeYear',
        label: 'Intended Intake and Year',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Fall 2026 (Aug/Sep)',
          'Spring 2027 (Jan/Feb)',
          'Fall 2027',
          'Summer 2026',
          '2028 or later'
        ],
        errorMessage: 'Please select intended intake and year'
      },
      // Optional Service Fields
      {
        name: 'academicScore',
        label: 'Academic Score / Grade Range',
        type: 'text',
        placeholder: 'e.g. 8.2 CGPA or 78% in Degree/12th',
        required: false,
        colSpan: 1
      },
      {
        name: 'englishTestStatus',
        label: 'English Test Status',
        type: 'select',
        required: false,
        colSpan: 1,
        options: [
          'Not Taken Yet',
          'Planning to take IELTS / TOEFL / PTE',
          'IELTS Taken',
          'TOEFL Taken',
          'PTE Taken',
          'Exempted / Native Speaker'
        ]
      },
      {
        name: 'annualBudget',
        label: 'Approximate Annual Budget',
        type: 'select',
        required: false,
        colSpan: 1,
        options: [
          'Flexible',
          '₹15 - ₹25 Lakhs / year',
          '₹25 - ₹35 Lakhs / year',
          '₹35 - ₹50 Lakhs / year',
          '₹50+ Lakhs / year'
        ]
      },
      {
        name: 'passportStatus',
        label: 'Passport Status',
        type: 'select',
        required: false,
        colSpan: 1,
        options: ['Ready / Valid', 'Applied / In Process', 'Not Yet Applied']
      },
      {
        name: 'message',
        label: 'Additional Message',
        type: 'textarea',
        placeholder: 'Any preferred universities, scholarship queries, or target deadlines.',
        required: false,
        colSpan: 2,
        rows: 2
      }
    ]
  },

  'resume-interview': {
    id: 'resume-interview',
    displayName: 'Resume & Interview Support',
    modalHeading: 'Resume & Interview Coaching',
    shortDescription: 'ATS resume makeover, LinkedIn optimization, and targeted mock interviews.',
    aliases: [
      'resume & interview support',
      'resume-interview',
      'resume & interview',
      'resume',
      'interview'
    ],
    fields: [
      // Required Service Fields
      {
        name: 'professionalStatus',
        label: 'Current Qualification or Professional Status',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Fresher / Final Year Student',
          '1 - 3 Years Experience (Junior)',
          '3 - 6 Years Experience (Mid-level)',
          '6+ Years Experience (Senior)',
          'Career Transition / Break'
        ],
        errorMessage: 'Please select your current qualification or status'
      },
      {
        name: 'targetRoleIndustry',
        label: 'Target Role or Industry',
        type: 'text',
        placeholder: 'e.g. Full Stack Developer, Product Manager, Analyst',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter your target role or industry'
      },
      {
        name: 'supportRequired',
        label: 'Support Required',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'All (Resume + LinkedIn + Mock Interview)',
          'ATS Resume Makeover Only',
          'Mock Interview Coaching Only',
          'LinkedIn Profile Branding Only'
        ],
        errorMessage: 'Please select the type of support required'
      },
      {
        name: 'experienceLevel',
        label: 'Experience Level',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Fresher (0 - 1 year)',
          'Early Career (1 - 3 years)',
          'Mid Career (3 - 6 years)',
          'Senior / Leadership (7+ years)'
        ],
        errorMessage: 'Please select your experience level'
      },
      // Optional Service Fields
      {
        name: 'portfolioUrl',
        label: 'Resume or LinkedIn URL',
        type: 'url',
        placeholder: 'https://linkedin.com/in/... or Drive link to resume',
        required: false,
        colSpan: 1,
        errorMessage: 'Enter a valid URL (starting with http:// or https://)'
      },
      {
        name: 'interviewDeadline',
        label: 'Interview / Application Deadline',
        type: 'text',
        placeholder: 'e.g. Within 2 weeks, Next month, Ongoing drives',
        required: false,
        colSpan: 1
      },
      {
        name: 'message',
        label: 'Specific Challenges or Goals',
        type: 'textarea',
        placeholder: 'e.g. Not getting interview calls, nervous during HR/technical rounds.',
        required: false,
        colSpan: 2,
        rows: 2
      }
    ]
  },

  'scholarships-loans': {
    id: 'scholarships-loans',
    displayName: 'Scholarship & Education Loans',
    modalHeading: 'Scholarship & Education Loan Guidance',
    shortDescription: 'Assistance with merit/need scholarships, banking partners, and low-interest loans.',
    aliases: [
      'scholarship & education loans',
      'scholarships-loans',
      'scholarship & education loan',
      'scholarships',
      'scholarship',
      'education loan',
      'loan'
    ],
    fields: [
      // Required Service Fields
      {
        name: 'currentQualification',
        label: 'Current Qualification',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Class 12th Completed',
          'Undergraduate Student / Degree',
          "Bachelor's Degree Holder",
          'Working Professional'
        ],
        errorMessage: 'Please select your current qualification'
      },
      {
        name: 'intendedCourse',
        label: 'Intended Course',
        type: 'text',
        placeholder: 'e.g. B.Tech, MBA, MS Abroad, MBBS, Law',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter your intended course'
      },
      {
        name: 'intendedInstitution',
        label: 'Intended Institution',
        type: 'text',
        placeholder: 'e.g. Target College / University Name & Location',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter intended institution'
      },
      {
        name: 'countryOrState',
        label: 'Country or State of Study',
        type: 'text',
        placeholder: 'e.g. India (Delhi/Karnataka) or UK, USA, Germany',
        required: true,
        colSpan: 1,
        errorMessage: 'Please enter country or state of study'
      },
      {
        name: 'assistanceType',
        label: 'Type of Assistance',
        type: 'select',
        required: true,
        colSpan: 1,
        options: [
          'Both (Scholarship & Education Loan)',
          'Merit / Need Scholarship Only',
          'Education Loan Only'
        ],
        errorMessage: 'Please select type of assistance'
      },
      // Optional Service Fields
      {
        name: 'academicScore',
        label: 'Academic Score / Grade Range',
        type: 'text',
        placeholder: 'e.g. 85% in 12th / 8.5 CGPA in Graduation',
        required: false,
        colSpan: 1
      },
      {
        name: 'fundingRequired',
        label: 'Approximate Funding Required',
        type: 'select',
        required: false,
        colSpan: 1,
        options: [
          'Under ₹5 Lakhs',
          '₹5 - ₹10 Lakhs',
          '₹10 - ₹20 Lakhs',
          '₹20 - ₹40 Lakhs',
          '₹40+ Lakhs'
        ]
      },
      {
        name: 'admissionStatus',
        label: 'Admission Status',
        type: 'select',
        required: false,
        colSpan: 1,
        options: [
          'Offer Letter Received (Admitted)',
          'Applied & Awaiting Result',
          'Planning to Apply Soon'
        ]
      },
      {
        name: 'fundingDeadline',
        label: 'Funding Deadline',
        type: 'text',
        placeholder: 'e.g. Within 30 days, Next 3 months, Before August 2026',
        required: false,
        colSpan: 1
      },
      {
        name: 'message',
        label: 'Additional Message',
        type: 'textarea',
        placeholder: 'Any specific collateral constraints, co-applicant details, or questions.',
        required: false,
        colSpan: 2,
        rows: 2
      }
    ]
  }
};

export const SERVICE_OPTIONS = Object.values(SERVICE_FORM_CONFIGS).map(cfg => ({
  id: cfg.id,
  displayName: cfg.displayName
}));

/**
 * Resolves a given raw service string or ID to the corresponding service configuration.
 * Returns default ('college-admissions') if not matched.
 */
export function getServiceConfig(rawService = '') {
  if (!rawService) return SERVICE_FORM_CONFIGS['college-admissions'];

  const normalized = rawService.toLowerCase().trim();

  // 1. Direct ID match
  if (SERVICE_FORM_CONFIGS[normalized]) {
    return SERVICE_FORM_CONFIGS[normalized];
  }

  // 2. Check aliases or exact displayName match
  for (const key of Object.keys(SERVICE_FORM_CONFIGS)) {
    const config = SERVICE_FORM_CONFIGS[key];
    if (config.displayName.toLowerCase() === normalized) {
      return config;
    }
    if (config.aliases.some(alias => normalized === alias || normalized.includes(alias))) {
      return config;
    }
  }

  // 3. Keyword heuristic matching
  if (normalized.includes('admission') || normalized.includes('college')) {
    return SERVICE_FORM_CONFIGS['college-admissions'];
  }
  if (normalized.includes('abroad') || normalized.includes('overseas') || normalized.includes('country') || normalized.includes('uk') || normalized.includes('usa') || normalized.includes('canada')) {
    return SERVICE_FORM_CONFIGS['study-abroad'];
  }
  if (normalized.includes('intern') || normalized.includes('placement')) {
    return SERVICE_FORM_CONFIGS['internship-assistance'];
  }
  if (normalized.includes('resume') || normalized.includes('interview')) {
    return SERVICE_FORM_CONFIGS['resume-interview'];
  }
  if (normalized.includes('loan') || normalized.includes('scholarship') || normalized.includes('fund')) {
    return SERVICE_FORM_CONFIGS['scholarships-loans'];
  }
  if (normalized.includes('counsel') || normalized.includes('career') || normalized.includes('guidance')) {
    return SERVICE_FORM_CONFIGS['career-counselling'];
  }

  // Fallback to College Admission
  return SERVICE_FORM_CONFIGS['college-admissions'];
}
