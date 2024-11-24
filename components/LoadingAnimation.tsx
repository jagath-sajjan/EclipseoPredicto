/* eslint-disable react/no-unescaped-entities */

'use client'

import { motion } from 'framer-motion'

export const LoadingAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-green-400 font-mono space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          &gt; INITIALIZING ASTRONOMICAL CALCULATIONS...
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.2, repeatType: "reverse" }}
        >
          &gt; COMPUTING LUNAR TRAJECTORIES...
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.4, repeatType: "reverse" }}
        >
          &gt; ANALYZING SOLAR POSITIONS...
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, delay: 0.6, repeatType: "reverse" }}
        >
          &gt; CALCULATING ECLIPSE PARAMETERS...
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
        >
          <span className="inline-block w-2 h-2 bg-green-400"></span>
          <span className="inline-block w-2 h-2 bg-green-400"></span>
          <span className="inline-block w-2 h-2 bg-green-400"></span>
        </motion.div>
      </div>
    </motion.div>
  )
}

