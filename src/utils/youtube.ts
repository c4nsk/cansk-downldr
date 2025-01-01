export const extractVideoId = (url: string): string | null => {
  // Normal YouTube URL'leri
  let match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];

  // Kısa YouTube URL'leri
  match = url.match(/youtu\.be\/([^?]+)/);
  if (match) return match[1];

  // Embed URL'leri
  match = url.match(/embed\/([^?]+)/);
  if (match) return match[1];

  return null;
};