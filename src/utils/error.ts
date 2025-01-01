import { AxiosError } from 'axios';

export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message;
  }
  
  if (error instanceof AxiosError) {
    return error.response?.data?.message || 'API bağlantı hatası';
  }
  
  return 'Beklenmeyen bir hata oluştu';
};