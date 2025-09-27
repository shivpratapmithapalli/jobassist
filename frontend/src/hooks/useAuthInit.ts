import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useAuthInit() {
  const initializeAuth = useStore((state) => state.initializeAuth);
  
  useEffect(() => {
    // Initialize auth state from stored token
    initializeAuth();
  }, [initializeAuth]);
}
