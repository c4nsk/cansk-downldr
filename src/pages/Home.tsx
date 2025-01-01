import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-mono mb-8 glitch-text">can.sk</h1>
        <h2 className="text-2xl font-mono mb-8 text-green-400">downloader_program</h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-8 font-mono typing-text"
        >
          [root@system]: Initializing secure connection...
        </motion.div>

        <Link to="/convert">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-green-500 text-green-500 
                     hover:bg-green-500 hover:text-black transition-all duration-300
                     font-mono rounded-lg text-lg matrix-btn"
          >
            $ ./start_program.sh
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-4 font-mono text-sm matrix-text"
      >
        <div className="flex items-center space-x-2">
          <span className="animate-pulse">▶</span>
          <span className="typing-text">Architect: can.sk</span>
        </div>
      </motion.div>
    </div>
  )
} 