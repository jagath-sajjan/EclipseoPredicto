/* eslint-disable react/no-unescaped-entities */

'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

interface Eclipse {
  date: Date
  type: string
}

interface UpcomingEclipsesProps {
  eclipses: Eclipse[]
}

const UpcomingEclipses: React.FC<UpcomingEclipsesProps> = ({ eclipses }) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatCountdown = (targetDate: Date) => {
    const diff = dayjs(targetDate).diff(now, 'second')
    if (diff <= 0) return 'Occurred'

    const days = Math.floor(diff / 86400)
    const hours = Math.floor((diff % 86400) / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    const seconds = diff % 60

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  return (
    <motion.div 
      className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg border border-green-400/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl sm:text-2xl mb-4 text-green-400 font-mono">Upcoming Eclipses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {eclipses.map((eclipse, index) => (
          <motion.div 
            key={index} 
            className="bg-gray-800 p-4 rounded border border-green-400/30 font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs ${
                eclipse.type === 'Solar' 
                  ? 'bg-yellow-500/20 text-yellow-300' 
                  : 'bg-blue-500/20 text-blue-300'
              }`}>
                {eclipse.type} Eclipse
              </span>
            </div>
            <div className="text-green-400">{dayjs(eclipse.date).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div className="text-yellow-400 mt-2">
              <span className="text-green-400"> </span>
              {formatCountdown(eclipse.date)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default UpcomingEclipses

