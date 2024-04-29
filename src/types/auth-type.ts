interface AuthType<T> {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    userData: T;
    setUserData: React.Dispatch<React.SetStateAction<T>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    getProfile: () => void;
    refreshToken: () => void;
    logout: () => void;
}

export type { AuthType };