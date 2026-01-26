export interface AuthorizationRequest {
    licenseNumber: number;
    password: string;
}

export interface AuthorizationResponse {
    token: string;
}