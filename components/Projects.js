/* eslint-disable react/jsx-no-undef */
import AnimatedText from '@/components/AnimatedText';
import CanvasLoader from '@/components/Loading';
import TransitionEffect from '@/components/TransitionEffect';
import { myProjects } from '@/constants';
// import DemoComputer from '@/Section/DemoComputer';
import { useGSAP } from '@gsap/react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

const DemoComputer = dynamic(() => import('@/Section/DemoComputer'), {
  ssr: false,
});

const FramerImage = motion.img;

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' }
    );
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <>
      <Head>
        <title>Q23 Studdios | Projects</title>
        <meta name="description" content="Showcasing my latest work" />
      </Head>
      <TransitionEffect/>
      <Layout className="pt-16">
        <section className="text-center mb-16">
          <AnimatedText text="Imagination trumps knowledge" className="text-4xl sm:text-6xl lg:text-7xl mb-12" />
        </section>

        <section className="c-space my-20">
      <p className="head-text">My Selected Work</p>
        <div className="grid grid-cols-2 mt-12 gap-5 w-full">
          {/* Left Panel - Project Details */}
          <div className="flex flex-col gap-5 relative py-10 px-5 shadow-2xl shadow-black-200 h-25rem 2xl:max-h-fit xl:max-h-fit lg:max-h-fit md:max-h-fit sm:max-h-fit xs:max-h-fit">
            <div className="absolute top-0 right-0">
              <Image src={currentProject.spotlight} alt="spotlight" className="w-full h-96 sm:h-1/5 xs:h-1/6 object-cover rounded-xl" />
            </div>

            <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
              <Image className="w-12 h-12 shadow-md md:w-9 md:h-9 sm:w-7 sm:h-7 xs:w-5 xs:h-5" src={currentProject.logo} alt="logo" />
            </div>

            <div className="flex flex-col gap-3 text-white my-5 flex-wrap">
              <h2 className="text-white text-2xl md:text-xl sm:text-xl xs:text-sm font-semibold animatedText">{currentProject.title}</h2>
              <p className="animatedText xs:text-xs sm:items-start ">{currentProject.desc}</p>
              <p className="animatedText lg:hidden md:hidden sm:hidden xs:hidden">{currentProject.subdesc}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  <div key={index} className="tech-logo sm:hidden xs:hidden">
                  <Image src={tag.path} alt={tag.name} />
                  </div>
                ))}
              </div>

              <a
              className="flex items-center gap-2 cursor-pointer text-white-600 "
              href={currentProject.href}
              target="_blank"
              rel="noreferrer">
              <p
              className='md:justify-start sm:justify-start xs:justify-start sm:text-sm xs:text-xs'
              >Check Live Site</p>
              <Image src="/assets/arrow-up.png" alt="arrow" className="w-4 h-4 xs:text-xs" />
            </a>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
                <Image src="/assets/left-arrow.png" alt="left arrow" />
              </button>
              
              <button className="arrow-btn" onClick={() => handleNavigation('next')}>
                <Image src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel - 3D Demo */}
          <div className="bg-gray-800 rounded-xl h-25rem xl:h-96 lg:h-80 md:h-72 sm:h-64 xs:h-60">
       <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls 
            maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
          </div>
        </div>
        </section>

        {/* Additional Projects */}
        <section>
          <h2 className="head-text text-3xl font-bold mb-8">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-16">
            {myProjects.map((project, index) => (
              <article key={index} className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-lg">
                
                {project.href ? (
                  <Link href={project.href} target="_blank" className="w-full overflow-hidden rounded-lg">
                    <FramerImage
                      src={'/bulb.png'}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ) : (
                  <div className="w-full overflow-hidden rounded-lg">
                    <FramerImage
                      src={'/assets/images/calculator.png'}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm mt-2">{project.summary}</p>
                  <div className="mt-4 flex justify-center gap-4">
                    {project.github && (
                      <Link href={project.github} target="_blank">
                        <GithubIcon />
                      </Link>
                    )}
                    {project.href && (
                      <Link href={project.href} target="_blank" className="bg-primary text-white px-6 py-2 rounded-md">
                        View Project
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Projects;
