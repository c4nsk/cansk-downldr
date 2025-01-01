import axios from 'axios';
import type { APIResponse, DownloadResult } from './types';
import { APIError } from '../utils/error';

const API_BASE_URL = 'https://youtube-mp36.p.rapidapi.com';
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

export const getMP3DownloadLink = async (videoId: string): Promise<DownloadResult> => {
  try {
    console.log('API isteği gönderiliyor:', videoId); // Debug için log

    const response = await axios.get<APIResponse>(`${API_BASE_URL}/dl`, {
      params: { id: videoId },
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    });

    console.log('API yanıtı:', response.data); // Debug için log

    if (response.data?.link) {
      return {
        success: true,
        link: response.data.link
      };
    }

    throw new APIError('İndirme linki oluşturulamadı');
  } catch (error) {
    console.error('API Hatası:', error); // Debug için log
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || 'API bağlantı hatası'
      };
    }
    return {
      success: false,
      error: error instanceof APIError ? error.message : 'API bağlantı hatası'
    };
  }
};