"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

// Sponsor logos
const sponsors = [
  { id: 1, name: "Applied", logo: "/applied.png" },
  { id: 2, name: "Oil", logo: "/oil.jpeg" },
  { id: 3, name: "SBI", logo: "/sbi.png" },
  { id: 4, name: "Rinex", logo: "/rinex.png" },
  { id: 5, name: "Vedanta", logo: "/vedanta.jpg" },
  { id: 6, name: "MCL", logo: "/mcl.png" },
  { id: 7, name: "DIC", logo: "/DIC.svg" },
]

export function Sponsors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="sponsors" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-yellow-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-40 h-40 rounded-full bg-orange-500/20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
            Our Sponsors
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-300 to-orange-500 mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            We are grateful to our sponsors for their support in making Pravaah a success.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Sponsor Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {sponsors.map((sponsor) => (
              <motion.div 
                key={sponsor.id} 
                whileHover={{ scale: 1.1 }}
                className="bg-[#1a1a3a] p-6 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.3)] flex items-center justify-center"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-20 w-auto object-contain filter grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
          >
            <span className="mr-2">Become a sponsor</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}