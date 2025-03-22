"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const events = [
  { id: 1, title: "Hackathon", category: "Technical", date: "April 3-4", image: "/hackathon.png", description: "A 24-hour coding marathon to build innovative solutions for real-world problems." },
  { id: 2, title: "Cultural Night", category: "Cultural", date: "April 4", image: "/culture.png", description: "An evening of music, dance, and theatrical performances showcasing diverse talents." },
  { id: 3, title: "Startup Pitch", category: "Entrepreneurial", date: "April 5", image: "/pitch.png", description: "Present your business ideas to industry experts and potential investors." },
  { id: 4, title: "Robotics Challenge", category: "Technical", date: "April 5-6", image: "/robot.png", description: "Design and program robots to navigate complex challenges and obstacles." },
  { id: 5, title: "Art Exhibition", category: "Cultural", date: "April 3-6", image: "/art.png", description: "A showcase of visual arts exploring the theme of 'Sun' through various mediums." },
  { id: 6, title: "Panel Discussion", category: "Entrepreneurial", date: "April 6", image: "/panel.png", description: "Industry leaders discuss the future of technology and innovation in India." },
  { id: 7, title: "B-Roll", category: "Creative", date: "April 3", image: "/broll.png", description: "A competition challenging participants to create cinematic B-Roll sequences." },
  { id: 8, title: "51-Hour Competition", category: "Filmmaking", date: "April 4-6", image: "/51hour.png", description: "A fast-paced filmmaking challenge where participants create a short film within 51 hours." },
  { id: 9, title: "Startup Expo", category: "Entrepreneurial", date: "April 6", image: "/expo.png", description: "A platform for emerging entrepreneurs to showcase their startups and connect with experts." },
  { id: 10, title: "SCI-BIZ-TECH Quiz", category: "Technical", date: "April 5", image: "/quiz.png", description: "A quiz challenging teams on science, business, and technology through engaging prelims and finals." },
  { id: 11, title: "Marcatus", category: "Marketing", date: "April 4", image: "/marketing.png", description: "A competitive marketing event testing strategic thinking and promotional skills." },
  { id: 12, title: "B-Plan", category: "Entrepreneurial", date: "April 6", image: "/business.png", description: "A business plan competition where participants present innovative startup ideas." },
  { id: 13, title: "IPL Auction", category: "Sports", date: "April 5", image: "/auction.png", description: "A virtual bidding competition where teams strategize to build their dream IPL team." },
  { id: 14, title: "Enigma", category: "Case Study", date: "April 4", image: "/case.png", description: "A business case-solving competition where teams tackle real-time industry challenges." },
  { id: 15, title: "Trekkon", category: "Robotics", date: "April 5", image: "/trekkon.png", description: "A robotics competition where participants build autonomous bots to follow a black line." },
  { id: 16, title: "RoboWars", category: "Robotics", date: "April 6", image: "/robowar.png", description: "A thrilling combat robotics competition where participants design and battle custom-built robots." },
  { id: 17, title: "Kick-Off", category: "Robotics", date: "April 5", image: "/kickoff.png", description: "A robotic soccer competition where bots showcase precision, strategy, and control." },
  { id: 18, title: "BGMI Tournament", category: "Gaming", date: "April 3", image: "/bgmi.png", description: "A high-intensity squad-based BGMI battle where teams compete for victory in three matches." },
]

export function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [showMore, setShowMore] = useState(false)

  const handleEventClick = () => {
    window.location.href = "https://linktr.ee/Pravaah_iitbbs"
  }

  return (
    <section id="events" className="py-20 md:py-32 bg-[#080818] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
            Featured Events
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Explore our diverse range of events spanning technology, culture, and entrepreneurship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showMore ? events : events.slice(0, 9)).map((event, index) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative bg-[#0c0c24] rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 cursor-pointer"
              onClick={handleEventClick}>
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">{event.category}</div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors duration-300">{event.title}</h3>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {!showMore && (
          <div className="text-center mt-8">
            <button onClick={() => setShowMore(true)} className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300">
              More Events
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
