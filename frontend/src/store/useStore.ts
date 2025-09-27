import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, JobApplication, UploadedResume } from '../types';
import apiService, { type AuthResponse, type ApiError } from '../lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AppState extends AuthState {
  jobApplications: JobApplication[];
  uploadedResume: UploadedResume | null;
  
  // Auth Actions
  signUp: (email: string, password: string, userData?: Partial<User>, rememberMe?: boolean) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  initializeAuth: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  
  // App Actions
  addJobApplication: (application: JobApplication) => void;
  updateJobApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteJobApplication: (id: string) => void;
  setUploadedResume: (resume: UploadedResume) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

// Helper function to create user from API response
const createUserFromApiResponse = (apiUser: AuthResponse): User => {
  return {
    id: apiUser.id.toString(),
    email: apiUser.email,
    name: apiUser.name || '',
    phone: apiUser.phone || '',
    location: apiUser.location || '',
    currentRole: apiUser.currentRole || '',
    experienceLevel: (apiUser.experienceLevel as any) || 'Entry',
    salaryExpectation: apiUser.salaryExpectation || '',
    education: [],
    skills: [],
    links: {},
    created_at: new Date().toISOString(),
    email_verified: apiUser.emailVerified,
  };
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: apiService.isAuthenticated(),
      isLoading: false,
      error: null,
      jobApplications: [],
      uploadedResume: null,

      // Auth Actions
      signUp: async (email: string, password: string, userData?: Partial<User>, rememberMe: boolean = true) => {
        set({ isLoading: true, error: null });
        
        const { data, error } = await apiService.register({
          email,
          password,
          name: userData?.name || '',
          phone: userData?.phone,
          location: userData?.location
        }, rememberMe);

        if (error) {
          set({ isLoading: false, error: error.message });
          return { error: error.message };
        }

        if (data) {
          const user = createUserFromApiResponse(data);
          set({ 
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        }

        return { error: null };
      },

      signIn: async (email: string, password: string, rememberMe: boolean = true) => {
        set({ isLoading: true, error: null });
        
        const { data, error } = await apiService.login({ email, password }, rememberMe);

        if (error) {
          set({ isLoading: false, error: error.message });
          return { error: error.message };
        }

        if (data) {
          const user = createUserFromApiResponse(data);
          set({ 
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        }

        return { error: null };
      },

      signOut: async () => {
        set({ isLoading: true });
        await apiService.logout();
        set({ 
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      },

      initializeAuth: async () => {
        const token = apiService.getToken();
        if (token) {
          // Try to get user profile to validate token
          const { data, error } = await apiService.getUserProfile();
          if (data) {
            // Convert backend user to frontend user format
            const user: User = {
              id: data.id?.toString() || '',
              email: data.email || '',
              name: data.name || '',
              phone: data.phone || '',
              location: data.location || '',
              currentRole: data.currentRole || '',
              experienceLevel: data.experienceLevel || 'Entry',
              salaryExpectation: data.salaryExpectation || '',
              education: [],
              skills: [],
              links: {},
              created_at: data.createdAt || new Date().toISOString(),
              email_verified: data.emailVerified || false,
            };
            set({ user, isAuthenticated: true, error: null });
          } else {
            // Token is invalid, clear it
            apiService.clearToken();
            set({ user: null, isAuthenticated: false, error: null });
          }
        }
      },

      setError: (error: string | null) => set({ error }),
      setLoading: (isLoading: boolean) => set({ isLoading }),

      // App Actions (unchanged)
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

      updateUser: async (updates: Partial<User>) => {
        const { data, error } = await apiService.updateUserProfile(updates);
        
        if (!error && data) {
          // Convert backend user to frontend user format
          const user: User = {
            id: data.id?.toString() || '',
            email: data.email || '',
            name: data.name || '',
            phone: data.phone || '',
            location: data.location || '',
            currentRole: data.currentRole || '',
            experienceLevel: data.experienceLevel || 'Entry',
            salaryExpectation: data.salaryExpectation || '',
            education: updates.education || [],
            skills: updates.skills || [],
            links: updates.links || {},
            created_at: data.createdAt || new Date().toISOString(),
            email_verified: data.emailVerified || false,
          };
          set({ user });
        }
      },
    }),
    {
      name: 'job-assistant-storage',
      partialize: (state) => ({ 
        jobApplications: state.jobApplications,
        // Don't persist auth state - handled by apiService
      })
    }
  )
);

// Initialize auth state on app start
useStore.getState().initializeAuth();
