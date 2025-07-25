"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import * as THREE from "three"
import Developer from "@/Section/Developer"
import DemoComputer from "@/Section/DemoComputer"

// 3D Scene Component
function AvatarScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const avatarRef = useRef<THREE.Group>(null)
  const computerRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  
  const [animationName, setAnimationName] = useState('idle')
  const [isTransitioning, setIsTransitioning] = useState(false)

  useFrame((state, delta) => {
    if (!groupRef.current || !avatarRef.current) return

    const time = state.clock.elapsedTime

    // Scroll-based transformations
    if (scrollProgress > 0.1 && scrollProgress < 0.8) {
      // Start transition animation
      if (!isTransitioning) {
        setIsTransitioning(true)
        setAnimationName('victory')
      }

      // Avatar starts moving and scaling
      const transitionProgress = Math.min((scrollProgress - 0.1) / 0.7, 1)
      
      // Move avatar towards camera and scale down
      avatarRef.current.position.z = THREE.MathUtils.lerp(0, 3, transitionProgress)
      avatarRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.3, transitionProgress))
      
      // Rotate the avatar
      avatarRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 2, transitionProgress)
      
      // Create tube/portal effect
      if (transitionProgress > 0.5) {
        // Add swirling motion
        avatarRef.current.position.x = Math.sin(time * 3) * 0.2 * transitionProgress
        avatarRef.current.position.y = Math.cos(time * 2) * 0.1 * transitionProgress
      }
    } else if (scrollProgress <= 0.1) {
      // Reset to initial state
      if (isTransitioning) {
        setIsTransitioning(false)
        setAnimationName('idle')
      }
      
      // Gentle floating animation
      if (avatarRef.current) {
        avatarRef.current.position.y = Math.sin(time * 0.5) * 0.1
        avatarRef.current.rotation.y += 0.002
        avatarRef.current.scale.setScalar(1)
        avatarRef.current.position.z = 0
        avatarRef.current.position.x = 0
      }
    }

    // Computer gentle animation
    if (computerRef.current) {
      computerRef.current.rotation.y = Math.sin(time * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00d4ff" />
      
      {/* Computer Setup */}
      <group ref={computerRef} position={[0, -1, -1]}>
        <Suspense fallback={null}>
          <DemoComputer 
            scale={[0.8, 0.8, 0.8]}
            texture="/textures/project/project1.mp4"
          />
        </Suspense>
      </group>

      {/* Avatar */}
      <group ref={avatarRef} position={[0, -1, 0]}>
        <Suspense fallback={null}>
          <Developer 
            animationName={animationName}
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
          />
        </Suspense>
      </group>

      {/* Tube/Portal Effect */}
      {isTransitioning && (
        <mesh position={[0, 0, 2]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[2, 0.5, 8, 32, 1, true]} />
          <meshBasicMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Particle Effects */}
      {isTransitioning && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={100}
              array={new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 10))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#00ff88" transparent opacity={0.6} />
        </points>
      )}
    </group>
  )
}

// Loading fallback
function SceneLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d4ff" wireframe />
    </mesh>
  )
}

// Main 3D Scene Component
export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0)

  useEffect(() => {
    return scrollProgress.onChange((latest) => {
      setCurrentScrollProgress(latest)
    })
  }, [scrollProgress])

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        className="w-full h-full"
      >
        <Suspense fallback={<SceneLoader />}>
          <AvatarScene scrollProgress={currentScrollProgress} />
          <Environment preset="studio" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}