"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const events = [
  { id: 1, title: "Free Fire", category: "Gaming", date: "April 3", image: "/freefire.png", description: "A high-intensity Free Fire tournament testing strategy, teamwork, and survival skills." },
  { id: 2, title: "Clash Royale", category: "Gaming", date: "April 3", image: "/clashroyale.png", description: "A strategic Clash Royale tournament where players compete in real-time battles." },
  { id: 3, title: "Valorant", category: "Gaming", date: "April 4", image: "/valorant.png", description: "A tactical Valorant tournament where teams showcase precision, strategy, and teamwork." },
  { id: 4, title: "BGMI", category: "Gaming", date: "April 4", image: "/bgmi1.png", description: "A competitive BGMI tournament where squads battle for survival in intense matches." },
  { id: 5, title: "Meme Mania", category: "Creative", date: "April 3", image: "/meme.png", description: "A contest where participants create witty memes based on given themes." },
  { id: 6, title: "CAD Modelling", category: "Technical", date: "April 5", image: "/cad.png", description: "A design challenge where participants create 3D models to showcase technical skills." },
  { id: 7, title: "Kavoday", category: "Cultural", date: "April 3", image: "/kavoday.png", description: "A Hindi slam poetry competition where words create impact through rhythm and storytelling." },
  { id: 8, title: "Trekkon", category: "Robotics", date: "April 5", image: "/trekkon.png", description: "A robotics race where autonomous bots follow a track with speed and precision." },
  { id: 9, title: "Robowars", category: "Robotics", date: "April 6", image: "/robowar.png", description: "A combat robotics competition where participants design and battle powerful fighting bots." },
  { id: 10, title: "Kick-Off", category: "Robotics", date: "April 5", image: "/kickoff.png", description: "A robotics soccer competition where autonomous bots showcase precision and strategy." },
  { id: 11, title: "Robo Race", category: "Robotics", date: "April 4", image: "/roborace.png", description: "A fast-paced robotics competition where bots navigate an obstacle-filled track at high speed." },
  { id: 12, title: "ML Hackathon", category: "Technical", date: "April 3-4", image: "/mlhack.png", description: "A competition where teams develop AI solutions to solve real-world challenges." },
  { id: 13, title: "Web Hackathon", category: "Technical", date: "April 3-4", image: "/hackathon.png", description: "A challenge to design and develop innovative web solutions within a limited timeframe." },
  { id: 14, title: "Game Development", category: "Technical", date: "April 4", image: "/game.png", description: "A challenge to design and build immersive and innovative games." },
  { id: 15, title: "Competitive Programming Contest", category: "Technical", date: "April 5", image: "/cp.png", description: "A coding challenge where participants solve algorithmic problems under time constraints." },
  { id: 16, title: "B-Plan", category: "Entrepreneurial", date: "April 6", image: "/bplan1.png", description: "A business plan competition where participants present innovative and scalable startup ideas." },
  { id: 17, title: "Enigma", category: "Case Study", date: "April 4", image: "/enigma.png", description: "A case-solving challenge where teams tackle real-world business problems using strategic thinking." },
  { id: 18, title: "Sci-Biz-Tech Quiz", category: "Technical", date: "April 5", image: "/quiz1.png", description: "A thrilling quiz covering science, business, and technology, testing knowledge and quick thinking." },
  { id: 19, title: "Film Quiz", category: "Cultural", date: "April 4", image: "/filmquiz.png", description: "A competition testing knowledge of Bollywood, Hollywood, and world cinema." },
  { id: 20, title: "Mind Over Math", category: "Technical", date: "April 3", image: "/math.png", description: "A challenging math contest testing problem-solving and analytical skills." },
  { id: 21, title: "Startup Expo", category: "Entrepreneurial", date: "April 6", image: "/startupexpo.png", description: "A platform for startups to showcase ideas, connect with investors, and gain industry exposure." },
  { id: 22, title: "Innovation Expo", category: "Technical", date: "April 6", image: "/innovationexpo.png", description: "A showcase for groundbreaking ideas, fostering creativity, networking, and expert feedback." },
  { id: 23, title: "Marcatus", category: "Marketing", date: "April 4", image: "/marcatus.png", description: "A dynamic marketing competition designed to test strategic thinking and creativity." },
  { id: 24, title: "IPL Auction", category: "Sports", date: "April 5", image: "/iplauction.png", description: "A strategic bidding competition where participants form the best IPL team through an exciting auction." },
  { id: 25, title: "Solo Dance", category: "Cultural", date: "April 3", image: "/solodance.png", description: "A stage for dancers to showcase creativity, rhythm, and expressive movements." },
  { id: 26, title: "Group Dance", category: "Cultural", date: "April 4", image: "/groupdance.png", description: "A dynamic dance competition where teams deliver synchronized and creative performances." },
  { id: 27, title: "Street Battle", category: "Cultural", date: "April 5", image: "/streetdance.png", description: "A raw and high-energy street dance competition where freestyle meets fierce competition." },
  { id: 28, title: "Shipwreck", category: "Cultural", date: "April 3", image: "/shipwreck.png", description: "A role-playing competition where participants argue for survival with wit and persuasion." },
  { id: 29, title: "Viewfinder", category: "Creative", date: "April 3", image: "/viewfinder.png", description: "A photography challenge capturing architecture, motion, and creative digital artistry." },
  { id: 30, title: "51-Hour Competition", category: "Filmmaking", date: "April 4-6", image: "/51.png", description: "A high-pressure challenge where filmmakers create a short film within 51 hours, testing creativity and technical skills." },
  { id: 31, title: "B-Roll", category: "Creative", date: "April 3", image: "/broll1.png", description: "A competition challenging participants to create stunning B-Roll sequences that enhance storytelling through creative visuals." },
];


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
