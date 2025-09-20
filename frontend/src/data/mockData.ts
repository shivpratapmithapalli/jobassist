import { JobApplication, AIsuggestion } from '../types';

export const mockJobApplications: JobApplication[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'Remote',
    applicationDate: '2025-01-15',
    status: 'Interview',
    description: 'We are looking for a Senior Frontend Developer to join our team and help build the next generation of web applications using React, TypeScript, and modern web technologies.',
    notes: 'Great company culture, competitive salary',
    timeline: [
      {
        id: '1',
        date: '2025-01-15',
        event: 'Application Submitted',
        description: 'Applied through company website'
      },
      {
        id: '2',
        date: '2025-01-18',
        event: 'Phone Screening',
        description: 'Initial call with HR team'
      },
      {
        id: '3',
        date: '2025-01-22',
        event: 'Technical Interview',
        description: 'Live coding session with senior developer'
      }
    ]
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'San Francisco, CA',
    applicationDate: '2025-01-10',
    status: 'Applied',
    description: 'Join our fast-growing startup as a Full Stack Engineer. You\'ll work with React, Node.js, and PostgreSQL to build scalable web applications.',
    notes: 'Startup environment, potential for equity',
    timeline: [
      {
        id: '1',
        date: '2025-01-10',
        event: 'Application Submitted',
        description: 'Applied via LinkedIn'
      }
    ]
  },
  {
    id: '3',
    jobTitle: 'React Developer',
    company: 'Digital Agency Pro',
    location: 'New York, NY',
    applicationDate: '2025-01-08',
    status: 'Rejected',
    description: 'We need a React Developer to work on client projects. Experience with modern React patterns and state management required.',
    notes: 'Position required more design skills',
    timeline: [
      {
        id: '1',
        date: '2025-01-08',
        event: 'Application Submitted',
        description: 'Applied through job board'
      },
      {
        id: '2',
        date: '2025-01-12',
        event: 'Rejection Email',
        description: 'Position filled with another candidate'
      }
    ]
  },
  {
    id: '4',
    jobTitle: 'Software Engineer',
    company: 'MegaCorp Solutions',
    location: 'Austin, TX',
    applicationDate: '2025-01-20',
    status: 'Offer',
    description: 'Software Engineer position focusing on web application development using modern JavaScript frameworks and cloud technologies.',
    notes: 'Excellent benefits, room for growth',
    timeline: [
      {
        id: '1',
        date: '2025-01-20',
        event: 'Application Submitted',
        description: 'Applied through company career page'
      },
      {
        id: '2',
        date: '2025-01-23',
        event: 'Phone Screening',
        description: 'HR phone interview'
      },
      {
        id: '3',
        date: '2025-01-26',
        event: 'Technical Interview',
        description: 'Technical discussion with team lead'
      },
      {
        id: '4',
        date: '2025-01-30',
        event: 'Final Interview',
        description: 'Interview with hiring manager'
      },
      {
        id: '5',
        date: '2025-02-01',
        event: 'Offer Received',
        description: 'Verbal offer extended'
      }
    ]
  }
];

export const mockAISuggestions: AIsuggestion[] = [
  {
    id: '1',
    category: 'Keywords',
    recommendation: 'Add "React Hooks" to your skills section',
    impact: 'High',
    description: 'Many job postings in your field mention React Hooks. Adding this keyword could improve your resume\'s ATS compatibility.'
  },
  {
    id: '2',
    category: 'Experience',
    recommendation: 'Quantify your achievements with specific metrics',
    impact: 'High',
    description: 'Consider adding metrics like "Improved page load time by 40%" or "Managed team of 5 developers" to make your experience more compelling.'
  },
  {
    id: '3',
    category: 'Skills',
    recommendation: 'Include TypeScript expertise',
    impact: 'Medium',
    description: 'TypeScript is increasingly popular. If you have experience with it, make sure it\'s prominently featured in your skills section.'
  },
  {
    id: '4',
    category: 'Formatting',
    recommendation: 'Use consistent date formatting',
    impact: 'Low',
    description: 'Ensure all dates follow the same format (e.g., "Jan 2020 - Present") for a professional appearance.'
  },
  {
    id: '5',
    category: 'Education',
    recommendation: 'Add relevant certifications or courses',
    impact: 'Medium',
    description: 'Consider adding any recent certifications, online courses, or bootcamps that are relevant to your target positions.'
  }
];