"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  speed: number
  life: number
  blue: boolean
}

function fade(value: number) {
  return value * value * value * (value * (value * 6 - 15) + 10)
}

function latticeHash(x: number, y: number) {
  let value = Math.imul(x, 0x1f1f1f1f) ^ Math.imul(y, 0x5f356495)
  value = Math.imul(value ^ (value >>> 15), 0x2c1b3c6d)
  return value ^ (value >>> 12)
}

function gradient(hash: number, x: number, y: number) {
  switch (hash & 7) {
    case 0:
      return x + y
    case 1:
      return -x + y
    case 2:
      return x - y
    case 3:
      return -x - y
    case 4:
      return x
    case 5:
      return -x
    case 6:
      return y
    default:
      return -y
  }
}

function perlin2D(x: number, y: number) {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const dx = x - x0
  const dy = y - y0
  const smoothX = fade(dx)
  const smoothY = fade(dy)

  const top = gradient(latticeHash(x0, y0), dx, dy)
  const right = gradient(latticeHash(x0 + 1, y0), dx - 1, dy)
  const bottom = gradient(latticeHash(x0, y0 + 1), dx, dy - 1)
  const bottomRight = gradient(latticeHash(x0 + 1, y0 + 1), dx - 1, dy - 1)
  const upper = top + smoothX * (right - top)
  const lower = bottom + smoothX * (bottomRight - bottom)

  return upper + smoothY * (lower - upper)
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    speed: 0.55 + Math.random() * 0.75,
    life: 500 + Math.random() * 1000,
    blue: Math.random() < 0.82,
  }
}

export function FlowFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { alpha: false })
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )
    const mobileViewport = window.matchMedia("(max-width: 767px)")
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let blueSegments = new Float32Array(0)
    let lightSegments = new Float32Array(0)
    let frameId: number | null = null
    let time = 0
    let lastFrameTime = 0
    let pointerX = -1000
    let pointerY = -1000

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      const isMobile = mobileViewport.matches
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5)

      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.fillStyle = "#080808"
      context.fillRect(0, 0, width, height)

      const particleCount = isMobile
        ? Math.max(50, Math.min(100, Math.floor((width * height) / 8500)))
        : Math.max(140, Math.min(320, Math.floor((width * height) / 4500)))
      particles = Array.from({ length: particleCount }, () =>
        createParticle(width, height),
      )
      blueSegments = new Float32Array(particleCount * 4)
      lightSegments = new Float32Array(particleCount * 4)
    }

    const animate = (timestamp: number) => {
      if (reducedMotion.matches) {
        frameId = null
        return
      }

      if (timestamp - lastFrameTime < 1000 / 60) {
        frameId = window.requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      context.fillStyle = "rgba(8, 8, 8, 0.2)"
      context.fillRect(0, 0, width, height)

      let blueCount = 0
      let lightCount = 0

      for (const particle of particles) {
        particle.life -= 1
        if (particle.life <= 0) {
          Object.assign(particle, createParticle(width, height))
          continue
        }

        let angle =
          perlin2D(particle.x * 0.0026 + time, particle.y * 0.0026 - time * 0.7) *
          Math.PI *
          2
        const distanceX = pointerX - particle.x
        const distanceY = pointerY - particle.y
        const distance = Math.hypot(distanceX, distanceY)

        if (distance < 190 && distance > 0) {
          const influence = (1 - distance / 190) * 0.28
          const flowX = Math.cos(angle) * (1 - influence) +
            (distanceX / distance) * influence
          const flowY = Math.sin(angle) * (1 - influence) +
            (distanceY / distance) * influence
          angle = Math.atan2(flowY, flowX)
        }

        const previousX = particle.x
        const previousY = particle.y
        particle.x += Math.cos(angle) * particle.speed
        particle.y += Math.sin(angle) * particle.speed

        if (
          particle.x < 0 ||
          particle.x > width ||
          particle.y < 0 ||
          particle.y > height
        ) {
          Object.assign(particle, createParticle(width, height))
          continue
        }

        const segments = particle.blue ? blueSegments : lightSegments
        const offset = (particle.blue ? blueCount++ : lightCount++) * 4
        segments[offset] = previousX
        segments[offset + 1] = previousY
        segments[offset + 2] = particle.x
        segments[offset + 3] = particle.y
      }

      context.lineWidth = 0.8
      context.beginPath()
      for (let index = 0; index < blueCount * 4; index += 4) {
        context.moveTo(blueSegments[index]!, blueSegments[index + 1]!)
        context.lineTo(blueSegments[index + 2]!, blueSegments[index + 3]!)
      }
      context.strokeStyle = "rgba(91, 130, 255, 0.29)"
      context.stroke()

      context.beginPath()
      for (let index = 0; index < lightCount * 4; index += 4) {
        context.moveTo(lightSegments[index]!, lightSegments[index + 1]!)
        context.lineTo(lightSegments[index + 2]!, lightSegments[index + 3]!)
      }
      context.strokeStyle = "rgba(240, 238, 230, 0.18)"
      context.stroke()

      time += 0.0015
      frameId = window.requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!reducedMotion.matches && frameId === null) {
        lastFrameTime = 0
        frameId = window.requestAnimationFrame(animate)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointerX = event.clientX - bounds.left
      pointerY = event.clientY - bounds.top
    }

    const handlePointerLeave = () => {
      pointerX = -1000
      pointerY = -1000
    }

    const handleMotionPreference = () => {
      if (reducedMotion.matches && frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      } else {
        startAnimation()
      }
    }

    resize()
    startAnimation()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)
    reducedMotion.addEventListener("change", handleMotionPreference)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      reducedMotion.removeEventListener("change", handleMotionPreference)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}
