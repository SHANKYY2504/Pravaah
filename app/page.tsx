import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Events } from "@/components/events"
import { Sponsors } from "@/components/sponsors"
import { Footer } from "@/components/footer"
import OurTeam from "@/components/OurTeam"
import Past from "@/components/Past"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1f] via-[#0f0f2d] to-[#0a0a1f] text-white overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Sponsors />
        <Past />
        <OurTeam/>
      </main>
      <Footer />
    </div>
  )
}

