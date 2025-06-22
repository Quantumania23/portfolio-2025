"use client";

import AnimatedText from "@/components/AnimatedText";
import React, { useRef, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { motion, useMotionValue, useScroll } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMediaQuery } from "react-responsive";
import TransitionEffect from "@/components/TransitionEffect";
import LiIcon from "@/components/LiIcon";
import RenderModel from "@/Section/RenderModel";
import Staff from "@/Section/Staff";
import Developer from "@/Section/Developer";
import ArticlesFooter from "./ArticlesFooter";
import ArticlesNavigation from "./ArticlesNavigation";
import CanvasLoader from "@/components/CanvasLoader";
const FramerImage = motion(Image);

// Particle Background Component
function ParticleBackground() {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    width: 50 + (i % 5) * 20,
    height: 50 + (i % 5) * 20,
    top: (i * 5) % 100,
    left: (i * 7) % 100,
    duration: 10 + (i % 10),
    delay: i % 5,
    opacity: 0.1 + (i % 5) * 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

const MovingImg = ({ title, img, link, onHover }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    if (imgRef.current && window.innerWidth > 768) {
      imgRef.current.style.display = "inline-block";
      x.set(event.pageX);
      y.set(-10);
    }
  }

  function handleMouseLeave(event) {
    if (imgRef.current) {
      imgRef.current.style.display = "none";
      x.set(0);
      y.set(0);
    }
    // Call the hover callback when leaving
    onHover?.(false);
  }

  return (
    <Link 
      href={link} 
      target="_blank" 
      onMouseMove={handleMouse} 
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHover?.(true)}
      className="group"
    >
      <h2 className="capitalize text-xl font-semibold group-hover:underline transition-all duration-300 
        lg:text-lg md:text-base sm:text-sm xs:text-xs leading-relaxed">
        {title}
      </h2>
      {img && (
        <FramerImage
          style={{ x: x, y: y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
          ref={imgRef}
          src={img.src}
          width={img.width}
          height={img.height}
          alt={title}
          className="z-10 w-96 h-auto hidden absolute rounded-lg shadow-2xl border-2 border-primary/20
            lg:!hidden md:!hidden"
        />
      )}
    </Link>
  );
};

const Article = ({ img, title, date, link, onHover }) => {
  const ref = useRef(null);

  return (
    <motion.li
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }}
      viewport={{ once: true }}
      className="relative w-full group"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* Timeline dot positioned outside */}
      <LiIcon reference={ref} />
      
      {/* Article card */}
      <div className="ml-16 p-6 rounded-2xl bg-light/50 backdrop-blur-sm border border-dark/10 
        hover:bg-light hover:shadow-lg transition-all duration-300 
        dark:bg-dark/50 dark:border-light/10 dark:hover:bg-dark/80
        lg:ml-14 md:ml-12 sm:ml-8 xs:ml-6
        lg:p-5 md:p-4 sm:p-3 xs:p-2">
        
        <div className="flex items-start justify-between gap-4 
          sm:flex-col sm:gap-2 xs:gap-1">
          
          <div className="flex-1 min-w-0">
            <MovingImg title={title} img={img} link={link} onHover={onHover} />
          </div>
          
          <div className="flex-shrink-0 sm:self-start">
            <span className="text-primary font-semibold text-sm px-3 py-1 rounded-full 
              bg-primary/10 dark:text-primaryDark dark:bg-primaryDark/10
              lg:text-xs sm:text-xs xs:text-[10px] xs:px-2 xs:py-0.5">
              {date}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link, onHover }) => {
  const ref = useRef(null);

  return (
    <motion.li 
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }}
      viewport={{ once: true }}
      className="relative w-full group"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* Timeline dot positioned outside - same as regular articles */}
      <LiIcon reference={ref} />
      
      {/* Featured article card */}
      <div className="ml-16 bg-gradient-to-br from-light to-light/50 
        border border-dark/10 rounded-3xl overflow-hidden hover:border-primary/30 
        transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]
        dark:from-dark dark:to-dark/50 dark:border-light/10 dark:hover:border-primaryDark/30
        lg:ml-14 md:ml-12 sm:ml-8 xs:ml-6
        lg:rounded-2xl md:rounded-xl sm:rounded-lg xs:rounded-md">
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 
          group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative p-8 lg:p-6 md:p-5 sm:p-4 xs:p-3">
          {/* Image */}
          <Link href={link} target="_blank" className="block mb-6 overflow-hidden rounded-2xl
            lg:mb-5 md:mb-4 sm:mb-3 xs:mb-2">
            <FramerImage
              src={img.src}
              width={img.width}
              height={img.height}
              alt={title}
              className="w-full h-64 object-cover transition-transform duration-500 
                group-hover:scale-110 lg:h-56 md:h-48 sm:h-40 xs:h-32"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </Link>

          {/* Content */}
          <div className="space-y-4 lg:space-y-3 md:space-y-3 sm:space-y-2 xs:space-y-1">
            <Link href={link} target="_blank">
              <h2 className="text-2xl font-bold leading-tight hover:text-primary 
                transition-colors duration-300 group-hover:underline
                lg:text-xl md:text-lg sm:text-base xs:text-sm">
                {title}
              </h2>
            </Link>
            
            <p className="text-dark/70 dark:text-light/70 leading-relaxed
              lg:text-sm md:text-sm sm:text-xs xs:text-xs xs:leading-snug">
              {summary}
            </p>
            
            <div className="flex items-center justify-between pt-2 xs:pt-1">
              <span className="text-primary font-semibold text-sm px-3 py-1 rounded-full 
                bg-primary/10 dark:text-primaryDark dark:bg-primaryDark/10
                xs:text-xs xs:px-2 xs:py-0.5">
                {time}
              </span>
              
              <div className="flex items-center gap-2 text-dark/50 dark:text-light/50 text-sm
                xs:text-xs xs:gap-1">
                <svg className="w-4 h-4 xs:w-3 xs:h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  sm:hidden">
                  Read more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

// Enhanced articles data
const articles = {
  article1: {
    src: "/articles/pagination-component-in-reactjs.jpg",
    width: 800,
    height: 600,
    title: "Build A Custom Pagination Component In Reactjs From Scratch"
  },
  article2: {
    src: "/articles/create-loading-screen-in-reactjs.jpg",
    width: 800,
    height: 600,
    title: "Creating Stunning Loading Screens In React"
  },
  article3: {
    src: "/articles/form-validation-in-reactjs-using-custom-react-hook.png",
    width: 800,
    height: 600,
    title: "Form Validation In Reactjs"
  },
  article4: {
    src: "/articles/What-is-higher-order-component-in-React.jpg",
    width: 800,
    height: 600,
    title: "Redux Simplified"
  },
  article5: {
    src: "/articles/smooth-scrolling-in-reactjs.png",
    width: 800,
    height: 600,
    title: "Silky Smooth Scrolling In Reactjs"
  },
  article6: {
    src: "/articles/create-modal-component-in-react-using-react-portals.png",
    width: 800,
    height: 600,
    title: "Creating An Efficient Modal Component In React"
  },
  article7: {
    src: "https://placehold.co/800x600/png?text=React+Performance",
    width: 800,
    height: 600,
    title: "React Performance Optimization Techniques"
  },
  article8: {
    src: "https://placehold.co/800x600/png?text=React+Hooks",
    width: 800,
    height: 600,
    title: "Advanced React Hooks Patterns"
  }
};

// Animation mapping for different interaction types
const getRandomAnimation = () => {
  const animations = ['clapping', 'salute', 'victory'];
  return animations[Math.floor(Math.random() * animations.length)];
};

const Articles = () => {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationName, setAnimationName] = useState('idle');
  const [hoverTimeout, setHoverTimeout] = useState(null);
  
  // Media queries for responsive behavior
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1279px) and (min-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });

  // Developer responsive positioning
  const developerScale = isTablet ? [0.8, 0.8, 0.8] : [1.0, 1.0, 1.0];
  const developerPosition = isTablet ? [0.35, -1.1, 1.4] : [0.4, -1.1, 1.4];
  const developerRotation = [12.8, 0.0, 0];

  // Enhanced hover handler with animation variety
  const handleHover = useCallback((isHovered, interactionType = 'default') => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    if (isHovered) {
      setIsHovering(true);
      // Set different animations based on interaction type
      const animation = interactionType === 'featured' 
        ? 'victory' 
        : interactionType === 'click'
        ? 'clapping'
        : getRandomAnimation();
      setAnimationName(animation);
    } else {
      // Delay turning off hover to allow for smooth transitions
      const timeout = setTimeout(() => {
        setIsHovering(false);
        setAnimationName('idle');
      }, 300);
      setHoverTimeout(timeout);
    }
  }, [hoverTimeout]);

  // Special handler for featured articles
  const handleFeaturedHover = useCallback((isHovered) => {
    handleHover(isHovered, 'featured');
  }, [handleHover]);

  // Special handler for clicks
  const handleArticleClick = useCallback(() => {
    handleHover(true, 'click');
    setTimeout(() => handleHover(false), 1000);
  }, [handleHover]);

  return (
    <>
      <ArticlesNavigation />
      <main className="w-full min-h-screen flex overflow-hidden 
        dark:text-light bg-gradient-to-br from-light via-light/50 to-light/30 
        dark:from-dark dark:via-dark/50 dark:to-dark/30 relative">
        
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Main Content Area */}
        <div className={`flex-1 px-6 pt-32 mx-auto lg:px-4 md:px-3 sm:px-2 relative z-10
          ${isDesktop ? 'max-w-5xl pr-80' : isTablet ? 'max-w-4xl pr-60' : 'max-w-4xl'}
          xl:max-w-6xl lg:max-w-5xl md:max-w-4xl sm:max-w-full`}>
          
          {/* Hero Section */}
          <div className="text-center mb-20 lg:mb-16 md:mb-12 sm:mb-8">
            <AnimatedText
              text="Words can change the world"
              className="mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent
                lg:!text-6xl md:!text-5xl sm:!text-3xl xs:!text-2xl"
            />
            <p className="text-icons-dark/60 dark:text-icons-light/60 text-lg max-w-2xl mx-auto leading-relaxed
              lg:text-base md:text-sm sm:text-sm xs:text-xs xs:max-w-sm">
              Discover insights, tutorials, and best practices for modern web development
            </p>
          </div>

          {/* All Articles Section - Single Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-16 lg:text-2xl md:text-xl sm:text-lg xs:text-base sm:mb-8 xs:mb-6">
              Latest Articles
            </h2>
            
            {/* Timeline Container */}
            <div ref={ref} className="relative">
              {/* Vertical Timeline Line */}
              <motion.div 
                style={{ scaleY: scrollYProgress }}
                className="absolute left-8 top-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary/20 
                  origin-top shadow-lg rounded-full
                  lg:left-9 md:left-6 sm:left-5 xs:left-4
                  lg:w-0.5 md:w-0.5 sm:w-0.5"
              />
              
              {/* Articles List - All in one timeline */}
              <ul className="space-y-8 lg:space-y-6 md:space-y-4 sm:space-y-3 xs:space-y-2">
                {/* Featured Articles */}
                <div onClick={handleArticleClick}>
                  <FeaturedArticle
                    title="Build A Custom Pagination Component In Reactjs From Scratch"
                    summary="Learn how to create stunning loading screens in React with 3 different methods. Discover how to use React-Loading, React-Lottie & build a custom loading screen. Improve the user experience."
                    time="9 min read"
                    link="https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/"
                    img={articles.article1}
                    onHover={handleFeaturedHover}
                  />
                </div>
                <div onClick={handleArticleClick}>
                  <FeaturedArticle
                    title="Creating Stunning Loading Screens In React"
                    summary="Learn how to build a custom pagination component in ReactJS from scratch. Follow this step-by-step guide to integrate Pagination component in your ReactJS project."
                    time="10 min read"
                    link="https://medium.com/@davidarmah2022/building-a-custom-pagination-component-in-reactjs-from-scratch-9404f9611cd0"
                    img={articles.article2}
                    onHover={handleFeaturedHover}
                  />
                </div>
                
                {/* Regular Articles */}
                <div onClick={handleArticleClick}>
                  <Article
                    title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                    date="Nov 2, 2023"
                    link="https://www.freecodecamp.org/news/how-to-validate-forms-in-react/"
                    img={articles.article3}
                    onHover={handleHover}
                  />
                </div>
                <div onClick={handleArticleClick}>
                  <Article
                    title="Redux Simplified: A Beginner's Guide For Web Developers"
                    date="Nov 5, 2023"
                    link="https://www.freecodecamp.org/news/redux-and-redux-toolkit-for-beginners/"
                    img={articles.article4}
                    onHover={handleHover}
                  />
                </div>
                <div onClick={handleArticleClick}>
                  <Article
                    title="Silky Smooth Scrolling In Reactjs: A Step-By-Step Guide For React Developers"
                    date="Sep 17, 2023"
                    link="https://www.digitalocean.com/community/tutorials/how-to-implement-smooth-scrolling-in-react"
                    img={articles.article5}
                    onHover={handleHover}
                  />
                </div>
                <div onClick={handleArticleClick}>
                  <Article
                    title="Creating An Efficient Modal Component In React Using Hooks And Portals"
                    date="Oct 17, 2023"
                    link="https://hackernoon.com/reactjs-custom-modal-component-using-hooks-and-portals-p12j35le"
                    img={articles.article6}
                    onHover={handleHover}
                  />
                </div>
                <div onClick={handleArticleClick}>
                  <Article
                    title="React Performance Optimization Techniques"
                    date="Aug 12, 2023"
                    link="#"
                    img={articles.article7}
                    onHover={handleHover}
                  />
                </div>
                <div onClick={handleArticleClick}>
                  <Article
                    title="Advanced React Hooks Patterns"
                    date="Jul 28, 2023"
                    link="#"
                    img={articles.article8}
                    onHover={handleHover}
                  />
                </div>
              </ul>
            </div>
          </section>
        </div>

        {/* 3D Developer Model - Desktop & Tablet Only */}
        {(isDesktop || isTablet) && (
          <div className={`fixed right-0 top-0 h-screen z-20 pointer-events-none
            ${isDesktop ? 'w-80' : 'w-60'}`}>
            <div className="w-full h-full relative">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={2} />
                <spotLight 
                  position={[10, 10, 10]} 
                  angle={0.15} 
                  penumbra={1} 
                  intensity={1} 
                />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  enableRotate={false}
                  maxPolarAngle={Math.PI / 2} 
                />

                <Suspense fallback={<CanvasLoader />}>
                  <Developer 
                    position={developerPosition}
                    animationName={animationName}
                    rotation={developerRotation}
                    scale={developerScale}
                  />
                </Suspense>
              </Canvas>
              
              {/* Blend overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-light/20 
                dark:to-dark/20 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Mobile Staff Model - Show only on mobile */}
        {isMobile && (
          <div className="fixed bottom-4 right-4 w-24 h-24 z-20 pointer-events-none
            lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-12 sm:h-12">
            <RenderModel className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <Staff onHover={isHovering} />
            </RenderModel>
          </div>
        )}

        {/* Enhanced Magical Screen Effects */}
        {isHovering && (
          <>
            {/* Screen glow effect */}
            <div className="fixed inset-0 pointer-events-none z-30">
              <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-primary/3 to-transparent animate-pulse" />
            </div>
            
            {/* Sparkle effects around the screen edges */}
            <div className="fixed inset-0 pointer-events-none z-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/60 rounded-full animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>

            {/* Additional magical particles for desktop */}
            {(isDesktop || isTablet) && (
              <div className="fixed inset-0 pointer-events-none z-30">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/80 rounded-full animate-bounce"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      right: `${5 + Math.random() * 25}%`,
                      animationDelay: `${Math.random() * 1.5}s`,
                      animationDuration: `${0.8 + Math.random() * 0.7}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <ArticlesFooter />
      <TransitionEffect />
    </>
  );
};

export default Articles;