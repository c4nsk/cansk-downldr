import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { extractVideoId } from '../utils/youtube';
import { getMP3DownloadLink } from '../services/youtubeApi';
import { getErrorMessage } from '../utils/error';

export function DownloadForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Lütfen bir YouTube linki girin');
      return;
    }

    const videoId = extractVideoId(url);

    if (!videoId) {
      setError('Geçersiz YouTube linki');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await getMP3DownloadLink(videoId);
      
      if (result.success && result.link) {
        window.open(result.link, '_blank');
      } else {
        setError(result.error || 'İndirme işlemi başarısız oldu');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          YouTube Video Linki
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <span>İndiriliyor...</span>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>MP3 Olarak İndir</span>
          </>
        )}
      </button>
    </form>
  );
}