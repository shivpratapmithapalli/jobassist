import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, JobApplication, UploadedResume } from '../types';
import { supabase } from '../lib/supabase';
import type { AuthError, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AppState extends AuthState {
  jobApplications: JobApplication[];
  uploadedResume: UploadedResume | null;
  
  // Auth Actions
  signUp: (email: string, password: string, userData?: Partial<User>) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (password: string) => Promise<{ error: AuthError | null }>;
  setAuthState: (session: Session | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  
  // App Actions
  addJobApplication: (application: JobApplication) => void;
  updateJobApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteJobApplication: (id: string) => void;
  setUploadedResume: (resume: UploadedResume) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const createUserFromAuthUser = (authUser: any, additionalData: Partial<User> = {}): User => {
  return {
    id: authUser.id,
    email: authUser.email,
    name: additionalData.name || authUser.user_metadata?.name || '',
    phone: additionalData.phone || '',
    location: additionalData.location || '',
    currentRole: additionalData.currentRole || '',
    experienceLevel: additionalData.experienceLevel || 'Entry',
    salaryExpectation: additionalData.salaryExpectation || '',
    education: additionalData.education || [],
    skills: additionalData.skills || [],
    links: additionalData.links || {},
    created_at: authUser.created_at,
    email_verified: authUser.email_confirmed_at ? true : false,
  };
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      jobApplications: [],
      uploadedResume: null,

      // Auth Actions
      signUp: async (email: string, password: string, userData?: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: userData ? {
              name: userData.name,
              phone: userData.phone,
              location: userData.location
            } : {}
          }
        });

        if (error) {
          set({ isLoading: false, error: error.message });
          return { error };
        }

        if (data.user) {
          const user = createUserFromAuthUser(data.user, userData);
          set({ 
            user,
            session: data.session,
            isAuthenticated: !!data.session,
            isLoading: false,
            error: null
          });
        }

        return { error: null };
      },

      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          set({ isLoading: false, error: error.message });
          return { error };
        }

        if (data.user) {
          const user = createUserFromAuthUser(data.user);
          set({ 
            user,
            session: data.session,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        }

        return { error: null };
      },

      signOut: async () => {
        set({ isLoading: true });
        await supabase.auth.signOut();
        set({ 
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      },

      resetPassword: async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return { error };
      },

      updatePassword: async (password: string) => {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
          set({ error: error.message });
        }
        return { error };
      },

      setAuthState: (session: Session | null) => {
        if (session?.user) {
          const user = createUserFromAuthUser(session.user);
          set({ 
            user,
            session,
            isAuthenticated: true,
            error: null
          });
        } else {
          set({ 
            user: null,
            session: null,
            isAuthenticated: false,
            error: null
          });
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
        const { error } = await supabase.auth.updateUser({
          data: updates
        });
        
        if (!error) {
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null
          }));
        }
      },
    }),
    {
      name: 'job-assistant-storage',
      partialize: (state) => ({ 
        jobApplications: state.jobApplications,
        // Don't persist auth state - let Supabase handle it
      })
    }
  )
);

// Initialize auth state from Supabase session
supabase.auth.getSession().then(({ data: { session } }) => {
  useStore.getState().setAuthState(session);
});

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useStore.getState().setAuthState(session);
});
