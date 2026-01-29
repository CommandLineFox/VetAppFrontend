export interface AuthorizationRequest {
    licenseNumber: number;
    password: string;
}

export interface AuthorizationGoogleRequest {
    token: string;
}

export interface AuthorizationResponse {
    token: string;
}