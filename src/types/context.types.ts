export interface DecodedToken {
    sub: string;
    permissions: string[];
    exp: number;
    iat: number;
}

export interface AuthState {
    token: string | null;
    permissions: string[];
    licenseNumber: string | null;
    isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
    saveAuth: (token: string) => void;
    logout: () => void;
}