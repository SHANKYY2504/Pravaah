"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

export default function AutoScroll() {
  const containerRef = useRef(null)
  const controls = useAnimation()

  const dates = [
    "3 APR - 6 APR, 2025",
    "3 APR - 6 APR, 2025",
    "3 APR - 6 APR, 2025",
  ]

  useEffect(() => {
    const startScrolling = async () => {
      while (true) {
        await controls.start({ x: "-100%", transition: { duration: 10, ease: "linear" } })
        controls.set({ x: "0%" }) // Instantly reset to start
      }
    }
    startScrolling()
  }, [controls])

  return (
    <div className="overflow-hidden py-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        ref={containerRef}
        className="flex w-max"
        animate={controls}
      >
        {[...dates, ...dates].map((date, index) => (
          <div key={index} className="flex-shrink-0 mx-8 text-white text-lg sm:text-xl whitespace-nowrap">
            {date}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
