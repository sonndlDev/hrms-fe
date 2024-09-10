import { StateCreator } from 'zustand';
import { loginUser, fetchUserProfile, updateUserProfile, registerUser } from '../api/userApi';

type User = {
  id?: number;
  username: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

type AuthActions = {
  login: (credentials: { username: string; password: string }, navigate: (path: string)=> void) => Promise<void>;
  registerUser: (credentials: { username: string; password: string; passwordConfirm: string }, navigate: (path: string)=> void) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (profileData: User) => Promise<void>;
  isAdmin: () => boolean;
  isStaff: () => boolean;
  isEmployee: () => boolean;
};

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<
  AuthSlice, // state + actions
  [["zustand/immer", never]], // using immer for immutable state updates
  [], // no additional enhancers
  AuthSlice // the return type, which includes both state and actions
> = (set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (credentials, navigate) => {
    try {
      set({ loading: true, error: null });
      const { user, token } = await loginUser(credentials);
      set({ user, token, loading: false });
      localStorage.setItem('token', token);

      // Redirect to dashboard on successful login
      if (navigate) {
        navigate('/overview');
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  registerUser: async (credentials, navigate) => {
    try {
      set({ loading: true, error: null });
      const { user, token } = await registerUser(credentials);
      set({ user, token, loading: false });
      localStorage.setItem('token', token);

      // Redirect to dashboard on successful login
      if (navigate) {
        navigate('/overview');
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const user = await fetchUserProfile();
      set({ user, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({ loading: true, error: null });
      const updatedUser = await updateUserProfile(profileData);
      set({ user: updatedUser, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  // Helper functions to check user role
  isAdmin: () => {
    const state = get();
    return state.user?.role === 'admin';
  },

  isStaff: () => {
    const state = get();
    return state.user?.role === 'staff';
  },
  isEmployee: () => {
    const state = get();
    return state.user?.role === 'employee';
  },
});
