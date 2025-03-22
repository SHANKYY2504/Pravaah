"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-yellow-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-orange-500/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
            About Pravaah
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-300 to-orange-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 absolute inset-0 blur-xl"></div>
            <div className="relative z-10 rounded-lg overflow-hidden border border-yellow-500/20 shadow-[0_0_25px_rgba(255,165,0,0.15)]">
              <img src="/aboutp.png?height=500&width=500" alt="Pravaah Festival" className="w-full h-auto" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="text-yellow-400 font-semibold">Pravaah</span> is the annual cultural and technopreneurial
              festival of IIT Bhubaneswar, celebrating the confluence of art, technology, and entrepreneurship.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Drawing inspiration from the Sun, this year's theme symbolizes energy, innovation, and the radiant spirit
              that drives our community forward. Just as the Sun nurtures life on Earth, Pravaah nurtures talent,
              creativity, and the entrepreneurial mindset.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Join us for four days of exhilarating competitions, workshops, performances, and networking opportunities
              that promise to ignite your passion and expand your horizons.
            </p>

            <div className="pt-4">
              <button className="px-6 py-2 border border-yellow-500 rounded-full text-yellow-400 hover:bg-yellow-500/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

