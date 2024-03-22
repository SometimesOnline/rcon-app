export interface MessageResponse {
  isSuccess: boolean;
  body: string;
}

export interface ConnectionInfo {
  host: string;
  port: number | undefined;
  password: string;
}
