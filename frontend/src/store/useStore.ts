import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, JobApplication, UploadedResume } from '../types';

interface AppState {
  user: User | null;
  jobApplications: JobApplication[];
  uploadedResume: UploadedResume | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  addJobApplication: (application: JobApplication) => void;
  updateJobApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteJobApplication: (id: string) => void;
  setUploadedResume: (resume: UploadedResume) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      jobApplications: [],
      uploadedResume: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      login: (email, password) => {
        // Mock login - in real app, this would call an API
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          currentRole: 'Frontend Developer',
          experienceLevel: 'Mid',
          salaryExpectation: '$80,000 - $120,000',
          education: [
            {
              id: '1',
              degree: 'Bachelor of Computer Science',
              institution: 'University of California',
              graduationYear: 2020
            }
          ],
          skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
          links: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            portfolio: 'https://johndoe.dev'
          }
        };
        set({ user: mockUser, isAuthenticated: true });
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      addJobApplication: (application) => 
        set((state) => ({ 
          jobApplications: [...state.jobApplications, application] 
        })),

      updateJobApplication: (id, updates) =>
        set((state) => ({
          jobApplications: state.jobApplications.map(app =>
            app.id === id ? { ...app, ...updates } : app
          )
        })),

      deleteJobApplication: (id) =>
        set((state) => ({
          jobApplications: state.jobApplications.filter(app => app.id !== id)
        })),

      setUploadedResume: (resume) => set({ uploadedResume: resume }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
    }),
    {
      name: 'job-assistant-storage',
      partialize: (state) => ({ 
        user: state.user, 
        jobApplications: state.jobApplications,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);