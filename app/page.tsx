'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import EclipseCalculator, { calculateEclipses } from '../components/EclipseCalculator'
import UpcomingEclipses from '../components/UpcomingEclipses'
import { motion } from 'framer-motion'

export default function Home() {
  const [upcomingEclipses, setUpcomingEclipses] = useState<Array<{ date: Date, type: string }>>([])

  useEffect(() => {
    // Calculate upcoming eclipses for the next 5 years
    const startDate = new Date()
    const endDate = dayjs(startDate).add(5, 'year').toDate()
    const eclipses = calculateEclipses(startDate, endDate)
    setUpcomingEclipses(eclipses.slice(0, 10)) // Get the next 10 eclipses
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4 sm:p-8">
      <motion.h1 
        className="text-3xl sm:text-4xl mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Eclipse0-Predict0
      </motion.h1>
      <motion.p 
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Simplified Eclipse Predictor - Jagath Sajjan
       </motion.p>
      <EclipseCalculator />
      <UpcomingEclipses eclipses={upcomingEclipses} />
    </div>
  )
}

