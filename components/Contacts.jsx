import { useRef, useState, useEffect, Suspense } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import Alert from "@/components/Alert";
import UseAlert from "@/hooks/UseAlert";
import AnimatedText from "@/components/AnimatedText";

// Fox Component with corrected path
const Fox = ({ currentAnimation, ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Models/fox.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.stop());
    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model">
          <group name="root">
            <group name="GLTF_SceneRootNode">
              <group name="Armature002_27">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials["Material.012"]}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials["Material.013"]}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials["Material.014"]}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials["Material.016"]}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials["Material.017"]}
                    skeleton={nodes.Object_11.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

const FallbackModel = () => {
  const meshRef = useRef();
  
  useEffect(() => {
    const mesh = meshRef.current;
    if (mesh) {
      const animate = () => {
        mesh.rotation.y += 0.01;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#00c6ff" metalness={0.7} roughness={0.3} />
    </mesh>
  );
};

const Contact = ({ handleClose }) => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setisLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [modelError, setModelError] = useState(false);
  const { alert, showAlert, hideAlert } = UseAlert();

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setCurrentAnimation("walk");

    try {
      await emailjs.send(
        'service_rfb2t5f',
        'template_gjgq5ws',
        {
          from_name: form.name,
          to_name: "Mike",
          from_email: form.email,
          to_email: "mikepeace981@gmail.com",
          message: form.message,
        },
        'aBMbA5GZxqC_qCD_n'
      );

      setisLoading(false);
      setCurrentAnimation("hit");
      showAlert({
        show: true,
        text: "Message sent successfully 😃!",
        type: "success",
      });

      setTimeout(() => {
        hideAlert();
        setForm({ name: "", email: "", message: "" });
        setCurrentAnimation("idle");
        handleClose();
      }, 3000);

    } catch (error) {
      setisLoading(false);
      setCurrentAnimation("idle");
      console.error(error);
      showAlert({
        show: true,
        text: "I did not receive your message 😢",
        type: "danger",
      });
    }
  };

  const getResponsiveConfig = () => ({
    containerClass: isMobile ? "max-w-sm" : isTablet ? "max-w-3xl" : "max-w-4xl",
    gridClass: isMobile ? "grid-cols-1 gap-4" : isTablet ? "grid-cols-1 gap-6" : "grid-cols-1 lg:grid-cols-2 gap-8",
    modelHeight: isMobile ? "h-48" : isTablet ? "h-56" : "h-64 lg:h-full min-h-[300px]",
    textSize: isMobile ? "text-lg md:text-xl" : isTablet ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
    foxScale: isMobile ? [0.5, 0.5, 0.5] : isTablet ? [0.6, 0.6, 0.6] : [0.8, 0.8, 0.8],
    foxPosition: [0, 0.2, 0],
    cameraPosition: isMobile ? [0, 0, 6] : isTablet ? [0, 0, 7] : [0, 0, 8],
    fov: isMobile ? 50 : 45
  });

  const config = getResponsiveConfig();

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`w-full ${config.containerClass} p-6 md:p-8 rounded-lg relative max-h-[90vh] overflow-y-auto
        bg-white dark:bg-gray-900 shadow-xl`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-2xl font-bold cursor-pointer z-10 w-8 h-8 
            flex items-center justify-center rounded-full
            text-gray-700 dark:text-gray-300 
            hover:text-red-500 dark:hover:text-red-400
            transition-colors duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>
        
        <div className="text-center mb-6">
          <AnimatedText 
            text="Turning Vision Into Reality With Code And Design"
            className={`${config.textSize} font-bold text-primary light:text-primary`}
          />
        </div>

        <div className={`grid ${config.gridClass}`}>
          <div className={`${config.modelHeight} rounded-lg overflow-hidden 
            bg-gradient-to-br from-blue-50 to-indigo-100 
            dark:from-gray-800 dark:to-gray-700
            ${isMobile || isTablet ? 'order-1' : ''}`}>
            <Canvas
              camera={{ position: config.cameraPosition, fov: config.fov }}
              className="w-full h-full"
              onError={() => setModelError(true)}
              gl={{ antialias: true }}
            >
              <Suspense fallback={<FallbackModel />}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
                <pointLight position={[-5, 5, 5]} intensity={0.3} />
                {!modelError ? (
                  <Fox 
                    currentAnimation={currentAnimation}
                    position={config.foxPosition}
                    rotation={[0, 0.5, 0]}
                    scale={config.foxScale}
                  />
                ) : (
                  <FallbackModel />
                )}
                <OrbitControls 
                  enablePan={false}
                  enableZoom={false}
                  enableDamping={true}
                  dampingFactor={0.05}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 4}
                  maxAzimuthAngle={isMobile ? Math.PI / 6 : Math.PI / 3}
                  minAzimuthAngle={isMobile ? -Math.PI / 6 : -Math.PI / 3}
                  enableRotate={!isMobile || true}
                  rotateSpeed={isMobile ? 0.5 : 1}
                />
              </Suspense>
            </Canvas>
          </div>

          <div className={`flex flex-col ${isMobile || isTablet ? 'order-2' : ''}`}>
            {alert.show && <Alert {...alert} />}

            <form 
              className={`w-full flex flex-col ${isMobile ? 'gap-4' : 'gap-6'} mt-4`}
              onSubmit={handleSubmit} 
              ref={formRef}
            >
              <label className="text-gray-900 dark:text-gray-100 font-semibold">
                Name
                <input
                  type="text"
                  name="name"
                  className="mt-2.5 w-full px-4 py-2 text-gray-900 dark:text-white
                    bg-gray-50 dark:bg-gray-800
                    border border-gray-300 dark:border-gray-600
                    rounded-lg shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </label>
              
              <label className="text-gray-900 dark:text-gray-100 font-semibold">
                Email
                <input
                  type="email"
                  name="email"
                  className="mt-2.5 w-full px-4 py-2 text-gray-900 dark:text-white
                    bg-gray-50 dark:bg-gray-800
                    border border-gray-300 dark:border-gray-600
                    rounded-lg shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="johndoe@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </label>
              
              <label className="text-gray-900 dark:text-gray-100 font-semibold">
                Cast your Message
                <textarea
                  name="message"
                  className="mt-2.5 w-full px-4 py-2 text-gray-900 dark:text-white
                    bg-gray-50 dark:bg-gray-800
                    border border-gray-300 dark:border-gray-600
                    rounded-lg shadow-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    resize-none"
                  placeholder="Let me know how I can help you..."
                  required
                  rows={isMobile ? 3 : 4}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 text-sm font-medium text-white
                  bg-gradient-to-r from-[#00c6ff] to-[#0072ff]
                  hover:from-[#0072ff] hover:to-[#00c6ff]
                  rounded-lg shadow-sm
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  dark:focus:ring-offset-gray-900"
              >
                {isLoading ? "Sending..." : "Cognize"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;