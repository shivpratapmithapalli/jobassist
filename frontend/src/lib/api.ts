const API_BASE_URL = 'http://localhost:8080/api/v1';

// Types for API requests and responses
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  currentRole?: string;
  experienceLevel?: string;
  salaryExpectation?: string;
  emailVerified: boolean;
  profileCompleted: boolean;
}

export interface ApiError {
  error: string;
  message: string;
  timestamp: number;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    // Try to get token from localStorage or sessionStorage
    this.token = this.getStoredToken();
  }

  private getStoredToken(): string | null {
    // Check both localStorage and sessionStorage for token
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }

  private setStoredToken(token: string, rememberMe: boolean = true): void {
    this.token = token;
    if (rememberMe) {
      localStorage.setItem('auth_token', token);
      sessionStorage.removeItem('auth_token');
    } else {
      sessionStorage.setItem('auth_token', token);
      localStorage.removeItem('auth_token');
    }
  }

  private removeStoredToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<{ data?: T; error?: ApiError }> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add Authorization header if token exists
    if (this.token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return { error: data };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { 
        error: { 
          error: 'Network Error', 
          message: 'Failed to connect to server', 
          timestamp: Date.now() 
        } 
      };
    }
  }

  // Authentication methods
  async register(registerData: RegisterRequest, rememberMe: boolean = true): Promise<{ data?: AuthResponse; error?: ApiError }> {
    const result = await this.request<AuthResponse>('/user/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
    });

    if (result.data?.token) {
      this.setStoredToken(result.data.token, rememberMe);
    }

    return result;
  }

  async login(loginData: LoginRequest, rememberMe: boolean = true): Promise<{ data?: AuthResponse; error?: ApiError }> {
    const result = await this.request<AuthResponse>('/user/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    if (result.data?.token) {
      this.setStoredToken(result.data.token, rememberMe);
    }

    return result;
  }

  async logout(): Promise<void> {
    this.removeStoredToken();
  }

  async getUserProfile(): Promise<{ data?: any; error?: ApiError }> {
    return this.request('/user/profile', {
      method: 'GET',
    });
  }

  async updateUserProfile(updates: any): Promise<{ data?: any; error?: ApiError }> {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async checkEmailExists(email: string): Promise<{ data?: { exists: boolean }; error?: ApiError }> {
    return this.request(`/user/check-email?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    });
  }

  async healthCheck(): Promise<{ data?: string; error?: ApiError }> {
    return this.request('/user/health', {
      method: 'GET',
    });
  }

  // Token management
  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(token: string, rememberMe: boolean = true): void {
    this.setStoredToken(token, rememberMe);
  }

  clearToken(): void {
    this.removeStoredToken();
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;