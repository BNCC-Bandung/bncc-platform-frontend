interface AuthType<T> {
  userData: T;
  setUserData: React.Dispatch<React.SetStateAction<T>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  getProfile: () => void;
  logout: () => void;
  isUserLoading: boolean;
  isLogoutLoading: boolean;
}

export type { AuthType };
