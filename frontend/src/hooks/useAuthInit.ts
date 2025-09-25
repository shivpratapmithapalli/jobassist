import { useEffect } from 'react';

export function useAuthInit() {
  useEffect(() => {
    // Auth initialization is handled automatically in the store
    // via supabase.auth.getSession() and onAuthStateChange()
    // No additional initialization needed
  }, []);
}
