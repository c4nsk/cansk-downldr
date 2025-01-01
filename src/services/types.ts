export interface APIResponse {
  link?: string;
  status?: string;
  msg?: string;
}

export interface DownloadResult {
  success: boolean;
  link?: string;
  error?: string;
}