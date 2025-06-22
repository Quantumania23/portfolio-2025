import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import anime from 'animejs'
import { Bullet } from './Bullet'

const MAX_AMMO = 7
const RELOAD_TIME = 2000 // in ms

const Gun = React.memo(function Gun(props) {
  const { nodes, materials } = useGLTF('/Models/gun.glb')

  const groupRef = useRef()
  const slideRef = useRef()
  const bulletRef = useRef()
  const casingRef = useRef()
  const flashRef = useRef()
  const smokeRef = useRef()

  const fireInterval = useRef(null)
  const [ammo, setAmmo] = useState(MAX_AMMO)
  const [isReloading, setIsReloading] = useState(false)

  // Handle reload
  const reload = () => {
    if (!isReloading && ammo < MAX_AMMO) {
      setIsReloading(true)
      setTimeout(() => {
        setAmmo(MAX_AMMO)
        setIsReloading(false)
      }, RELOAD_TIME)
    }
  }

  // Key press reload
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'r') reload()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ammo, isReloading])

  const startFiring = () => {
    if (isReloading || ammo <= 0) return
    fire()
    fireInterval.current = setInterval(() => {
      if (ammo > 0 && !isReloading) fire()
      else stopFiring()
    }, 300)
  }

  const stopFiring = () => {
    clearInterval(fireInterval.current)
    fireInterval.current = null
  }

  const fire = () => {
    if (ammo <= 0 || isReloading) return

    setAmmo((prev) => prev - 1)

    // 🔁 Gun recoil (entire gun group)
    anime({
      targets: groupRef.current.position,
      z: [-0.05, 0],
      duration: 120,
      easing: 'easeOutQuad',
    })

    // 🔧 Slide cock
    anime({
      targets: slideRef.current.position,
      z: [-0.05, 0],
      duration: 100,
      easing: 'easeOutQuad',
    })

    // 💥 Bullet
    if (bulletRef.current) {
      bulletRef.current.visible = true
      bulletRef.current.position.set(0, 0, 0.5)
      anime({
        targets: bulletRef.current.position,
        z: [0.5, -10],
        duration: 600,
        easing: 'easeInQuad',
        complete: () => {
          bulletRef.current.visible = false
        },
      })
    }

    // 🧩 Casing
    if (casingRef.current) {
      casingRef.current.visible = true
      casingRef.current.position.set(0.03, 0.03, 0)
      casingRef.current.rotation.set(0, 0, 0)
      anime({
        targets: casingRef.current.position,
        x: 0.3,
        y: 0.2,
        z: -0.2,
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          casingRef.current.visible = false
        },
      })
      anime({
        targets: casingRef.current.rotation,
        z: [0, 6.28],
        duration: 500,
        easing: 'easeOutQuad',
      })
    }

    // 🔥 Flash
    if (flashRef.current) {
      flashRef.current.visible = true
      anime({
        targets: flashRef.current.scale,
        x: [0.1, 0.6],
        y: [0.1, 0.6],
        z: [0.1, 0.6],
        duration: 100,
        direction: 'alternate',
        easing: 'easeOutQuad',
        complete: () => {
          flashRef.current.visible = false
        },
      })
    }

    // 💨 Smoke
    if (smokeRef.current) {
      smokeRef.current.visible = true
      smokeRef.current.scale.set(0.01, 0.01, 0.01)
      smokeRef.current.material.opacity = 1
      anime({
        targets: smokeRef.current.scale,
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 800,
        easing: 'easeOutQuad',
      })
      anime({
        targets: smokeRef.current.material,
        opacity: 0,
        duration: 800,
        easing: 'easeOutQuad',
        complete: () => {
          smokeRef.current.visible = false
        },
      })
    }
  }

  return (
    <group
      {...props}
      ref={groupRef}
      dispose={null}
      onPointerDown={startFiring}
      onPointerUp={stopFiring}
      onPointerLeave={stopFiring}
    >
      {/* Gun Base */}
      <mesh geometry={nodes['Mesh_(2)_Default_0'].geometry} material={materials.Default} castShadow receiveShadow />
      <mesh geometry={nodes.Fingerprotector_Default_0.geometry} material={materials.Default} castShadow receiveShadow />
      <mesh geometry={nodes.Trigger_Default_0.geometry} material={materials.Default} castShadow receiveShadow />
      <mesh geometry={nodes.Secure_Default_0.geometry} material={materials.Default} castShadow receiveShadow />
      <mesh geometry={nodes.Hammer_Default_0.geometry} material={materials.Default} castShadow receiveShadow />

      {/* Slide */}
      <mesh ref={slideRef} geometry={nodes.Top_Default_0.geometry} material={materials.Default} castShadow receiveShadow />

      <mesh geometry={nodes.Rubbers_Default_0.geometry} material={materials.Default} castShadow receiveShadow />
      <mesh geometry={nodes.Magazine_Default_0.geometry} material={materials.Default} castShadow receiveShadow />

      {/* Bullet */}
      <group ref={bulletRef} visible={false}>
        <Bullet scale={0.03} />
      </group>

      {/* Casing */}
      <mesh ref={casingRef} visible={false}>
        <cylinderGeometry args={[0.007, 0.007, 0.025, 8]} />
        <meshStandardMaterial color="#a08657" metalness={1} roughness={0.3} />
      </mesh>

      {/* Flash */}
      <mesh ref={flashRef} visible={false} position={[0, 0, -0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="orange" />
      </mesh>

      {/* Smoke */}
      <mesh ref={smokeRef} visible={false} position={[0, 0.02, -0.5]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#999" transparent opacity={0.5} />
      </mesh>

      {/* HUD (optional debug text) */}
      <Html position={[0, -0.2, 0]}>
        <div style={{ color: 'white', fontSize: '0.8rem', textAlign: 'center' }}>
          {isReloading ? 'Reloading...' : `Ammo: ${ammo} / ${MAX_AMMO}`}
          <br />
          <span style={{ opacity: 0.6 }}>Press R to reload</span>
        </div>
      </Html>
    </group>
  )
})

export default Gun

useGLTF.preload('/Models/gun.glb')
