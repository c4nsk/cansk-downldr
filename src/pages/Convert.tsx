import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { getMP3DownloadLink } from '../services/youtubeApi'
import { Link } from 'react-router-dom'
import { extractVideoId } from '../utils/youtube'

export default function Convert() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'converting' | 'downloading'>('idle')
  const [error, setError] = useState('')

  const getButtonText = () => {
    switch (status) {
      case 'converting':
        return 'MP3\'e Dönüştürülüyor...'
      case 'downloading':
        return 'İndiriliyor...'
      default:
        return 'MP3\'e Dönüştür ve İndir'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        throw new Error('Lütfen geçerli bir YouTube linki giriniz')
      }

      const videoId = extractVideoId(url)
      if (!videoId) {
        throw new Error('Video ID bulunamadı. Lütfen geçerli bir YouTube linki giriniz')
      }

      setStatus('converting')
      const result = await getMP3DownloadLink(videoId)
      
      if (!result.success || !result.link) {
        throw new Error(result.error || 'Dönüştürme başarısız')
      }

      setStatus('downloading')
      const link = document.createElement('a')
      link.href = result.link
      link.click()
      
      setUrl('')
      setStatus('idle')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-xl border border-green-500 shadow-2xl shadow-green-500/20 p-8 w-full max-w-md"
      >
        <Link to="/" className="block mb-8">
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center text-green-500 font-mono"
          >
            <span className="mr-2">←</span>
            [return /home]
          </motion.div>
        </Link>

        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-mono text-center mb-8 glitch-text"
        >
          can.sk_downloader.exe
        </motion.h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="$ paste_youtube_url"
              className="w-full p-4 bg-black border border-green-500 rounded-lg 
                       text-green-500 font-mono focus:ring-2 focus:ring-green-500 
                       focus:border-transparent outline-none transition-all"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400"
              >
                ✕
              </button>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status !== 'idle' || !url}
            className="w-full p-4 bg-green-500 text-black rounded-lg font-mono
                     hover:bg-green-400 transition-all duration-200
                     disabled:bg-gray-600 disabled:cursor-not-allowed
                     matrix-btn"
          >
            <span className="flex items-center justify-center">
              {status !== 'idle' && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {getButtonText()}
            </span>
          </motion.button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-red-900/50 border border-red-500 text-red-500 rounded-lg font-mono"
          >
            <p className="flex items-center">
              <span className="mr-2">!</span>
              {error}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 