"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { CountdownTimer } from "./countdown-timer"
import AutoScroll from "./Autoscroll"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  // Debounce function to limit resize events
  function debounce(fn: Function, ms = 300) {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 200)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.15

    let animationFrameId: number
    let time = 0
    let rotation = 0

    // Color settings for realistic sun
    const colorSettings = {
      core: { h: 45, s: 100, l: 75 }, // Core (yellow-white)
      photosphere: { h: 40, s: 100, l: 65 }, // Surface (yellow-orange)
      chromosphere: { h: 15, s: 100, l: 60 }, // Lower atmosphere (orange-red)
      corona: { h: 40, s: 90, l: 70 }, // Outer atmosphere (pale yellow)
    }

    // Create solar flares
    const flares: {
      angle: number
      length: number
      width: number
      speed: number
      lifetime: number
      age: number
      curve: number
      color: { h: number; s: number; l: number }
    }[] = []

    // Create surface hotspots (bright regions)
    const hotspots: {
      x: number
      y: number
      radius: number
      intensity: number
      lifetime: number
      age: number
    }[] = []

    // Create sunspots (dark regions)
    const sunspots: {
      x: number
      y: number
      radius: number
      lifetime: number
      age: number
    }[] = []

    // Create corona streamers
    const streamers: {
      angle: number
      length: number
      width: number
      lifetime: number
      age: number
    }[] = []

    // Generate initial features
    for (let i = 0; i < 15; i++) {
      createHotspot()
    }

    for (let i = 0; i < 3; i++) {
      createSunspot()
    }

    for (let i = 0; i < 8; i++) {
      createStreamer()
    }

    // Create a new solar flare
    const createFlare = () => {
      const angle = Math.random() * Math.PI * 2
      const colorVariation = Math.random() * 20 - 10

      flares.push({
        angle,
        length: baseRadius * (0.5 + Math.random() * 1.2),
        width: 5 + Math.random() * 20,
        speed: 0.01 + Math.random() * 0.03,
        lifetime: 100 + Math.random() * 200,
        age: 0,
        curve: (Math.random() - 0.5) * 1.5,
        color: {
          h: colorSettings.chromosphere.h + colorVariation,
          s: colorSettings.chromosphere.s,
          l: colorSettings.chromosphere.l + Math.random() * 10,
        },
      })
    }

    // Create a new hotspot
    function createHotspot() {
      // Position within the sun's radius (more concentrated toward equator)
      const distance = Math.random() * baseRadius * 0.85
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance * (0.7 + Math.random() * 0.3) // Flatten distribution

      hotspots.push({
        x,
        y,
        radius: 2 + Math.random() * 8,
        intensity: 0.3 + Math.random() * 0.7,
        lifetime: 50 + Math.random() * 150,
        age: 0,
      })
    }

    // Create a new sunspot
    function createSunspot() {
      // Sunspots appear more toward the equator
      const distance = (0.3 + Math.random() * 0.5) * baseRadius
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance * 0.7 // Flatten distribution

      sunspots.push({
        x,
        y,
        radius: 5 + Math.random() * 12,
        lifetime: 200 + Math.random() * 300,
        age: 0,
      })
    }

    // Create a new corona streamer
    function createStreamer() {
      const angle = Math.random() * Math.PI * 2

      streamers.push({
        angle,
        length: baseRadius * (1.5 + Math.random() * 2.5),
        width: 10 + Math.random() * 30,
        lifetime: 300 + Math.random() * 400,
        age: 0,
      })
    }

    // Perlin-like noise function for granulation texture
    const permutation: number[] = []
    for (let i = 0; i < 256; i++) {
      permutation.push(Math.floor(Math.random() * 256))
    }

    function fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10)
    }

    function lerp(a: number, b: number, t: number) {
      return a + t * (b - a)
    }

    function grad(hash: number, x: number, y: number) {
      const h = hash & 15
      const grad_x = 1 + (h & 7) // Gradient x component
      const grad_y = 1 + ((h >> 3) & 7) // Gradient y component
      // Convert to +/- 1.0
      const gx = grad_x & 1 ? -grad_x : grad_x
      const gy = grad_y & 1 ? -grad_y : grad_y
      return gx * x + gy * y
    }

    function noise(x: number, y: number) {
      // Find unit square that contains point
      const X = Math.floor(x) & 255
      const Y = Math.floor(y) & 255

      // Find relative x,y of point in square
      x -= Math.floor(x)
      y -= Math.floor(y)

      // Compute fade curves for x,y
      const u = fade(x)
      const v = fade(y)

      // Hash coordinates of the 4 square corners
      const A = permutation[X] + Y
      const B = permutation[X + 1] + Y
      const AA = permutation[A]
      const BA = permutation[B]
      const AB = permutation[A + 1]
      const BB = permutation[B + 1]

      // Add blended results from 4 corners of square
      return (
        lerp(
          lerp(grad(permutation[AA], x, y), grad(permutation[BA], x - 1, y), u),
          lerp(grad(permutation[AB], x, y - 1), grad(permutation[BB], x - 1, y - 1), u),
          v,
        ) *
          0.5 +
        0.5
      ) // Normalize to 0-1
    }

    // Fractal Brownian Motion for more complex noise
    function fbm(x: number, y: number, octaves: number) {
      let value = 0
      let amplitude = 0.5
      let frequency = 1
      let maxValue = 0

      for (let i = 0; i < octaves; i++) {
        value += amplitude * noise(x * frequency, y * frequency)
        maxValue += amplitude
        amplitude *= 0.5
        frequency *= 2
      }

      return value / maxValue
    }

    const render = () => {
      time += 0.01
      rotation += 0.0005 // Slow rotation
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw corona (outermost layer)
      const coronaRadius = baseRadius * 5
      const coronaGradient = ctx.createRadialGradient(centerX, centerY, baseRadius, centerX, centerY, coronaRadius)
      coronaGradient.addColorStop(
        0,
        `hsla(${colorSettings.corona.h}, ${colorSettings.corona.s}%, ${colorSettings.corona.l}%, 0.3)`,
      )
      coronaGradient.addColorStop(
        0.2,
        `hsla(${colorSettings.corona.h}, ${colorSettings.corona.s}%, ${colorSettings.corona.l}%, 0.15)`,
      )
      coronaGradient.addColorStop(
        0.5,
        `hsla(${colorSettings.corona.h}, ${colorSettings.corona.s}%, ${colorSettings.corona.l}%, 0.05)`,
      )
      coronaGradient.addColorStop(
        1,
        `hsla(${colorSettings.corona.h}, ${colorSettings.corona.s}%, ${colorSettings.corona.l}%, 0)`,
      )

      ctx.fillStyle = coronaGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, coronaRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw corona streamers
      for (let i = streamers.length - 1; i >= 0; i--) {
        const streamer = streamers[i]
        streamer.age++

        // Remove old streamers
        if (streamer.age > streamer.lifetime) {
          streamers.splice(i, 1)
          if (Math.random() < 0.8) {
            createStreamer()
          }
          continue
        }

        // Calculate opacity based on age
        const opacity =
          streamer.age < streamer.lifetime * 0.2
            ? streamer.age / (streamer.lifetime * 0.2)
            : 1 - (streamer.age - streamer.lifetime * 0.2) / (streamer.lifetime * 0.8)

        // Draw the streamer
        const angle = streamer.angle + rotation
        const startX = centerX + Math.cos(angle) * baseRadius
        const startY = centerY + Math.sin(angle) * baseRadius
        const endX = centerX + Math.cos(angle) * (baseRadius + streamer.length)
        const endY = centerY + Math.sin(angle) * (baseRadius + streamer.length)

        const streamerGradient = ctx.createLinearGradient(startX, startY, endX, endY)
        streamerGradient.addColorStop(
          0,
          `hsla(${colorSettings.corona.h}, ${colorSettings.corona.s}%, ${colorSettings.corona.l}%, ${opacity * 0.5})`,
        )
        streamerGradient.addColorStop(
          1,
          `hsla(${colorSettings.corona.h}, ${colorSettings.corona.s}%, ${colorSettings.corona.l - 10}%, 0)`,
        )

        ctx.strokeStyle = streamerGradient
        ctx.lineWidth = streamer.width * (1 - (streamer.age / streamer.lifetime) * 0.5)
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(startX, startY)

        // Create a curved streamer path
        const controlAngle = angle + Math.sin(time * 0.1) * 0.2
        const controlDist = baseRadius + streamer.length * 0.5
        const controlX = centerX + Math.cos(controlAngle) * controlDist
        const controlY = centerY + Math.sin(controlAngle) * controlDist

        ctx.quadraticCurveTo(controlX, controlY, endX, endY)
        ctx.stroke()
      }

      // Draw chromosphere (reddish layer)
      const chromosphereRadius = baseRadius * 1.05
      const chromosphereGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.95,
        centerX,
        centerY,
        chromosphereRadius,
      )
      chromosphereGradient.addColorStop(
        0,
        `hsla(${colorSettings.chromosphere.h}, ${colorSettings.chromosphere.s}%, ${colorSettings.chromosphere.l}%, 0.7)`,
      )
      chromosphereGradient.addColorStop(
        1,
        `hsla(${colorSettings.chromosphere.h}, ${colorSettings.chromosphere.s}%, ${colorSettings.chromosphere.l}%, 0)`,
      )

      ctx.fillStyle = chromosphereGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, chromosphereRadius, 0, Math.PI * 2)
      ctx.fill()

      // Main sun body (photosphere)
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius)
      sunGradient.addColorStop(
        0,
        `hsla(${colorSettings.core.h}, ${colorSettings.core.s}%, ${colorSettings.core.l}%, 1)`,
      )
      sunGradient.addColorStop(
        0.7,
        `hsla(${colorSettings.photosphere.h}, ${colorSettings.photosphere.s}%, ${colorSettings.photosphere.l}%, 1)`,
      )
      sunGradient.addColorStop(
        0.9,
        `hsla(${colorSettings.photosphere.h - 5}, ${
          colorSettings.photosphere.s
        }%, ${colorSettings.photosphere.l - 5}%, 1)`,
      )
      sunGradient.addColorStop(
        1,
        `hsla(${colorSettings.photosphere.h - 10}, ${
          colorSettings.photosphere.s
        }%, ${colorSettings.photosphere.l - 10}%, 1)`,
      )

      ctx.fillStyle = sunGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw surface granulation texture
      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
      ctx.clip()

      const cellSize = 4
      const granulationScale = 0.05

      for (let x = -baseRadius; x <= baseRadius; x += cellSize) {
        for (let y = -baseRadius; y <= baseRadius; y += cellSize) {
          const distance = Math.sqrt(x * x + y * y)
          if (distance < baseRadius) {
            // Rotate coordinates
            const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation)
            const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation)

            // Use FBM noise for more realistic granulation
            const noiseValue = fbm((centerX + rotatedX) * granulationScale, (centerY + rotatedY) * granulationScale, 3)

            // Limb darkening effect (edges are darker)
            const limbFactor = 1 - (distance / baseRadius) * 0.3

            // Calculate brightness based on noise and limb darkening
            const brightness = (0.7 + noiseValue * 0.3) * limbFactor

            // Adjust hue based on temperature (hotter is whiter)
            const hue = colorSettings.photosphere.h + noiseValue * 10
            const saturation = colorSettings.photosphere.s - noiseValue * 30
            const lightness = colorSettings.photosphere.l - 10 + noiseValue * 20

            ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.2 + noiseValue * 0.4})`
            ctx.fillRect(centerX + x, centerY + y, cellSize, cellSize)
          }
        }
      }

      // Draw sunspots
      for (let i = sunspots.length - 1; i >= 0; i--) {
        const spot = sunspots[i]
        spot.age++

        // Remove old sunspots
        if (spot.age > spot.lifetime) {
          sunspots.splice(i, 1)
          if (Math.random() < 0.3) {
            createSunspot()
          }
          continue
        }

        // Calculate opacity based on age
        const opacity =
          spot.age < spot.lifetime * 0.1
            ? spot.age / (spot.lifetime * 0.1)
            : spot.age > spot.lifetime * 0.9
              ? 1 - (spot.age - spot.lifetime * 0.9) / (spot.lifetime * 0.1)
              : 1

        // Rotate the sunspot position
        const angle = Math.atan2(spot.y, spot.x) + rotation
        const distance = Math.sqrt(spot.x * spot.x + spot.y * spot.y)
        const rotatedX = Math.cos(angle) * distance
        const rotatedY = Math.sin(angle) * distance

        // Draw the sunspot (dark center with lighter penumbra)
        const spotGradient = ctx.createRadialGradient(
          centerX + rotatedX,
          centerY + rotatedY,
          0,
          centerX + rotatedX,
          centerY + rotatedY,
          spot.radius,
        )

        spotGradient.addColorStop(0, `rgba(30, 20, 10, ${opacity * 0.8})`)
        spotGradient.addColorStop(0.5, `rgba(50, 30, 20, ${opacity * 0.6})`)
        spotGradient.addColorStop(1, `rgba(80, 50, 30, 0)`)

        ctx.fillStyle = spotGradient
        ctx.beginPath()
        ctx.arc(centerX + rotatedX, centerY + rotatedY, spot.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw hotspots
      for (let i = hotspots.length - 1; i >= 0; i--) {
        const spot = hotspots[i]
        spot.age++

        // Remove old hotspots
        if (spot.age > spot.lifetime) {
          hotspots.splice(i, 1)
          if (Math.random() < 0.7) {
            createHotspot()
          }
          continue
        }

        // Calculate opacity based on age
        const opacity =
          spot.age < spot.lifetime * 0.2
            ? spot.age / (spot.lifetime * 0.2)
            : 1 - (spot.age - spot.lifetime * 0.2) / (spot.lifetime * 0.8)

        // Rotate the hotspot position
        const angle = Math.atan2(spot.y, spot.x) + rotation
        const distance = Math.sqrt(spot.x * spot.x + spot.y * spot.y)
        const rotatedX = Math.cos(angle) * distance
        const rotatedY = Math.sin(angle) * distance

        const spotGradient = ctx.createRadialGradient(
          centerX + rotatedX,
          centerY + rotatedY,
          0,
          centerX + rotatedX,
          centerY + rotatedY,
          spot.radius,
        )

        spotGradient.addColorStop(
          0,
          `hsla(${colorSettings.core.h}, ${colorSettings.core.s - 20}%, ${
            colorSettings.core.l + 10
          }%, ${opacity * spot.intensity})`,
        )
        spotGradient.addColorStop(
          1,
          `hsla(${colorSettings.photosphere.h}, ${colorSettings.photosphere.s}%, ${colorSettings.photosphere.l}%, 0)`,
        )

        ctx.fillStyle = spotGradient
        ctx.beginPath()
        ctx.arc(centerX + rotatedX, centerY + rotatedY, spot.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw solar flares
      for (let i = flares.length - 1; i >= 0; i--) {
        const flare = flares[i]
        flare.age++

        // Remove old flares
        if (flare.age > flare.lifetime) {
          flares.splice(i, 1)
          continue
        }

        // Calculate opacity based on age
        const opacity =
          flare.age < flare.lifetime * 0.2
            ? flare.age / (flare.lifetime * 0.2)
            : 1 - (flare.age - flare.lifetime * 0.2) / (flare.lifetime * 0.8)

        // Draw the flare
        const angle = flare.angle + rotation
        const startX = centerX + Math.cos(angle) * baseRadius
        const startY = centerY + Math.sin(angle) * baseRadius
        const endX = centerX + Math.cos(angle) * (baseRadius + flare.length)
        const endY = centerY + Math.sin(angle) * (baseRadius + flare.length)

        const flareGradient = ctx.createLinearGradient(startX, startY, endX, endY)
        flareGradient.addColorStop(0, `hsla(${flare.color.h}, ${flare.color.s}%, ${flare.color.l}%, ${opacity})`)
        flareGradient.addColorStop(1, `hsla(${flare.color.h + 10}, ${flare.color.s - 10}%, ${flare.color.l + 10}%, 0)`)

        ctx.strokeStyle = flareGradient
        ctx.lineWidth = flare.width * (1 - (flare.age / flare.lifetime) * 0.3)
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(startX, startY)

        // Create a curved flare path with dynamic movement
        const waveOffset = Math.sin(time * flare.speed + flare.angle) * flare.curve
        const controlX = startX + Math.cos(angle + waveOffset) * flare.length * 0.7
        const controlY = startY + Math.sin(angle + waveOffset) * flare.length * 0.7

        ctx.quadraticCurveTo(controlX, controlY, endX, endY)
        ctx.stroke()

        // Add some smaller secondary flares
        if (flare.width > 15 && Math.random() < 0.1) {
          const secondaryAngle = angle + (Math.random() * 0.4 - 0.2)
          const secondaryLength = flare.length * (0.3 + Math.random() * 0.3)
          const secondaryEndX = startX + Math.cos(secondaryAngle) * secondaryLength
          const secondaryEndY = startY + Math.sin(secondaryAngle) * secondaryLength

          ctx.lineWidth = flare.width * 0.3
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(secondaryEndX, secondaryEndY)
          ctx.stroke()
        }
      }

      // Randomly create new flares
      if (Math.random() < 0.005 && flares.length < 5) {
        createFlare()
      }

      // Subtle pulsing effect
      const pulseTime = time * 0.8
      const pulseSize = baseRadius * (1 + 0.01 * Math.sin(pulseTime))

      const pulseGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        pulseSize * 0.95,
        centerX,
        centerY,
        pulseSize * 1.05,
      )

      pulseGradient.addColorStop(
        0,
        `hsla(${colorSettings.chromosphere.h}, ${colorSettings.chromosphere.s}%, ${colorSettings.chromosphere.l}%, 0.1)`,
      )
      pulseGradient.addColorStop(
        1,
        `hsla(${colorSettings.chromosphere.h}, ${colorSettings.chromosphere.s}%, ${colorSettings.chromosphere.l}%, 0)`,
      )

      ctx.fillStyle = pulseGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions])

  return (
    <div className="relative flex flex-col min-h-screen">
      <section id="hero" className="relative flex-grow flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        <div className="relative z-10 text-center px-4 py-8 sm:py-12 max-w-4xl mx-auto">
          <motion.p
            className="text-xs sm:text-sm md:text-base mt-2 tracking-[0.25em] uppercase"
            style={{
              color: "#b8a36e",
            }}
          >
            Solistra Novarion
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider"
            style={{
              color: "transparent",
              backgroundImage: "linear-gradient(to bottom, #e2d0a2, #b8a36e, #c7b178)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            PRAVAAH
          </motion.h1>

          <motion.p
            className="text-base sm:text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cultural Technopreneurial Fest of IIT Bhubaneswar
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CountdownTimer targetDate="April 3, 2025 00:00:00" />
          </motion.div>

          <motion.div
            className="mt-12 sm:mt-16 md:mt-24 lg:mt-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="https://forms.gle/zv23pCVk2aK5qSei7" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-bold text-base sm:text-lg hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-all duration-300">
                Register Now
              </button>
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white opacity-70"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* AutoScroll at the bottom of the page */}
      <div className="w-full relative z-10">
        <AutoScroll />
      </div>
    </div>
  )
}

