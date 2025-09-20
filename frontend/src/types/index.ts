export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  currentRole?: string;
  experienceLevel?: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  salaryExpectation?: string;
  education: Education[];
  skills: string[];
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: number;
}

export interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  applicationDate: string;
  status?: 'Applied' | 'Interview' | 'Rejected' | 'Offer' | 'Withdrawn';
  description: string;
  notes?: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  description: string;
}

export interface AIsuggestion {
  id: string;
  category: 'Skills' | 'Experience' | 'Education' | 'Formatting' | 'Keywords';
  recommendation: string;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface UploadedResume {
  file: File;
  uploadDate: string;
  suggestions: AIsuggestion[];
}