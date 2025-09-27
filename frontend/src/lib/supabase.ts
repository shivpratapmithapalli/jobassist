import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Custom storage adapter that can switch between localStorage and sessionStorage
class DynamicStorage {
  private useSessionStorage = false;
  
  setStorageType(useSessionStorage: boolean) {
    this.useSessionStorage = useSessionStorage;
  }
  
  getItem(key: string): string | null {
    try {
      // First check if the item exists in sessionStorage (for current session)
      const sessionItem = window.sessionStorage.getItem(key);
      if (sessionItem) {
        return sessionItem;
      }
      
      // Then check localStorage (for persistent sessions)
      const localItem = window.localStorage.getItem(key);
      if (localItem) {
        return localItem;
      }
      
      return null;
    } catch {
      return null;
    }
  }
  
  setItem(key: string, value: string): void {
    try {
      const storage = this.useSessionStorage ? window.sessionStorage : window.localStorage;
      storage.setItem(key, value);
      
      // Clear from the other storage to avoid conflicts
      const otherStorage = this.useSessionStorage ? window.localStorage : window.sessionStorage;
      otherStorage.removeItem(key);
    } catch {
      // Storage access might fail in some browsers
    }
  }
  
  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
      window.sessionStorage.removeItem(key);
    } catch {
      // Storage access might fail in some browsers
    }
  }
}

const dynamicStorage = new DynamicStorage();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: dynamicStorage
  }
});

// Function to configure session storage based on Remember Me preference
export const configureSessionStorage = (rememberMe: boolean) => {
  dynamicStorage.setStorageType(!rememberMe); // Use sessionStorage when Remember Me is false
};
