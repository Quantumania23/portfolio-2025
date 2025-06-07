
export default function ParticleBackground() {
  // Generate static values instead of random ones during server rendering
  // This prevents hydration mismatches and window reference issues
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    width: 50 + (i % 5) * 20,
    height: 50 + (i % 5) * 20,
    top: (i * 5) % 100,
    left: (i * 7) % 100,
    duration: 10 + (i % 10),
    delay: i % 5,
    opacity: 0.1 + (i % 5) * 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}
