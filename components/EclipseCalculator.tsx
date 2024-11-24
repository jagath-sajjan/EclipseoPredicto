'use client'

import { useState } from 'react'
import * as Astronomy from 'astronomy-engine'
import dayjs from 'dayjs'
import { motion, AnimatePresence } from 'framer-motion'
import { LoadingAnimation } from './LoadingAnimation'
import { downloadFile } from '../utils/downloadFile'

export const calculateEclipses = (start: Date, end: Date): Array<{ date: Date, type: string }> => {
  const eclipses: Array<{ date: Date, type: string }> = []

  let currentDate = start
  while (currentDate <= end) {
    const jd = Astronomy.MakeTime(currentDate)
    const moonPos = Astronomy.GeoMoon(jd)
    const sunPos = Astronomy.GeoVector(Astronomy.Body.Sun, jd, true)

    const moonLonLat = Astronomy.Ecliptic(moonPos)
    const sunLonLat = Astronomy.Ecliptic(sunPos)

    const distance = Math.sqrt(
      Math.pow(moonLonLat.elon - sunLonLat.elon, 2) +
      Math.pow(moonLonLat.elat - sunLonLat.elat, 2)
    )

    if (distance < 1.59754941) {
      // Adjusted threshold for solar eclipses
      const isSolar = distance < 0.8
      eclipses.push({ 
        date: new Date(currentDate), 
        type: isSolar ? 'Solar' : 'Lunar'
      })
      currentDate = dayjs(currentDate).add(1, 'day').toDate()
    } else {
      currentDate = dayjs(currentDate).add(5, 'minute').toDate()
    }
  }

  return eclipses
}

interface EclipseResult {
  date: Date
  type: string
  angle: number
}

const EclipseCalculator = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [results, setResults] = useState<EclipseResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const calculateEclipsesWithLoading = async () => {
    setIsLoading(true)
    // Artificial delay for effect
    await new Promise(resolve => setTimeout(resolve, 3000))

    const start = new Date(startDate)
    const end = new Date(endDate)
    const eclipses: EclipseResult[] = []

    let currentDate = start
    while (currentDate <= end) {
      const jd = Astronomy.MakeTime(currentDate)
      const moonPos = Astronomy.GeoMoon(jd)
      const sunPos = Astronomy.GeoVector(Astronomy.Body.Sun, jd, true)

      const moonLonLat = Astronomy.Ecliptic(moonPos)
      const sunLonLat = Astronomy.Ecliptic(sunPos)

      const distance = Math.sqrt(
        Math.pow(moonLonLat.elon - sunLonLat.elon, 2) +
        Math.pow(moonLonLat.elat - sunLonLat.elat, 2)
      )

      if (distance < 1.59754941) {
        const isSolar = distance < 0.8
        eclipses.push({ 
          date: new Date(currentDate), 
          type: isSolar ? 'Solar' : 'Lunar',
          angle: distance 
        })
        currentDate = dayjs(currentDate).add(1, 'day').toDate()
      } else {
        currentDate = dayjs(currentDate).add(5, 'minute').toDate()
      }
    }

    setResults(eclipses)
    setIsLoading(false)
  }

  const handleDownload = () => {
    const content = results.map(result => 
      `${dayjs(result.date).format('YYYY-MM-DD HH:mm:ss')},${result.type},${result.angle.toFixed(6)}`
    ).join('\n')
    
    const header = 'Date,Type,Angle\n'
    const fullContent = header + content
    
    downloadFile(fullContent, 'eclipse_results.csv', 'text/csv')
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>
      
      <motion.div 
        className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg mb-8 border border-green-400/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl mb-4 text-green-400">Eclipse Calculator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="start-date" className="block mb-2 text-green-400">Start Date:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-800 text-green-400 p-2 rounded border border-green-400/30"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block mb-2 text-green-400">End Date:</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-800 text-green-400 p-2 rounded border border-green-400/30"
            />
          </div>
        </div>
        <button
          onClick={calculateEclipsesWithLoading}
          disabled={isLoading}
          className="w-full sm:w-auto bg-green-400 text-gray-900 px-4 py-2 rounded hover:bg-green-500 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Calculating...' : 'Calculate Eclipses'}
        </button>
        {results.length > 0 && (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg sm:text-xl text-green-400">Results:</h3>
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Download CSV
              </button>
            </div>
            <div className="font-mono bg-gray-800 p-4 rounded border border-green-400/30 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-green-400/30">
                    <th className="py-2 px-4 text-green-400">Date</th>
                    <th className="py-2 px-4 text-green-400">Time</th>
                    <th className="py-2 px-4 text-green-400">Type</th>
                    <th className="py-2 px-4 text-green-400">Angle</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr 
                      key={index}
                      className="border-b border-green-400/10 hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-2 px-4">{dayjs(result.date).format('YYYY-MM-DD')}</td>
                      <td className="py-2 px-4">{dayjs(result.date).format('HH:mm:ss')}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          result.type === 'Solar' 
                            ? 'bg-yellow-500/20 text-yellow-300' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {result.type}
                        </span>
                      </td>
                      <td className="py-2 px-4">{result.angle.toFixed(6)}°</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default EclipseCalculator

