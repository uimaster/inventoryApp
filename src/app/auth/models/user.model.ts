export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  status: string;
  data: {};
}
