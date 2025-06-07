'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import BackToTop from '@/components/back-to-top';
import ParticleBackground from '@/components/ParticleBackground';

import article1 from '/public/articles/create-loading-screen-in-reactjs.jpg';
import article2 from '/public/articles/pagination-component-in-reactjs.jpg';
import article3 from '/public/articles/form-validation-in-reactjs-using-custom-react-hook.png';
import article4 from '/public/articles/create-modal-component-in-react-using-react-portals.png';
import article5 from '/public/articles/smooth-scrolling-in-reactjs.png';
import article6 from '/public/articles/What-is-higher-order-component-in-React.jpg';


const FramerImage = motion(Image);

type MovingImgProps = {
  title: string;
  img: StaticImageData;
  link: string;
};

const MovingImg: React.FC<MovingImgProps> = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleMouse = (event: React.MouseEvent) => {
    if (imgRef.current) {
      imgRef.current.style.display = 'inline-block';
      x.set(event.pageX);
      y.set(-10);
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.display = 'none';
      x.set(0);
      y.set(0);
    }
  };

  return (
    <Link href={link} target="_blank" onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
      <h2 className="capitalize text-xl font-semibold hover:underline text-white">{title}</h2>
      <FramerImage
        style={{ x, y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={title}
        className="z-10 w-96 h-auto hidden absolute rounded-lg lg:!hidden md:!hidden"
      />
    </Link>
  );
};

type ArticleProps = {
  img: StaticImageData;
  title: string;
  date: string;
  link: string;
};

const Article: React.FC<ArticleProps> = ({ img, title, date, link }) => (
  <motion.li
    initial={{ y: 200 }}
    whileInView={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    viewport={{ once: true }}
    className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between glass-card border border-solid border-[#00d4ff]/20 border-r-4 border-b-4 sm:flex-col"
  >
    <MovingImg title={title} img={img} link={link} />
    <span className="text-[#00d4ff] font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm">{date}</span>
  </motion.li>
);

type FeaturedArticleProps = {
  img: StaticImageData;
  title: string;
  time: string;
  summary: string;
  link: string;
};

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ img, title, time, summary, link }) => (
  <li className="relative col-span-1 w-full p-4 glass-card border border-solid border-[#00d4ff]/20 rounded-2xl">
    <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.0rem] bg-gradient-to-br from-[#00d4ff]/10 to-[#00ff88]/10 rounded-br-3xl" />
    <Link
      href={link}
      target="_blank"
      className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
    >
      <FramerImage
        src={img}
        alt={title}
        className="w-full h-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      />
    </Link>
    <Link href={link} target="_blank">
      <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg text-white">
        {title}
      </h2>
    </Link>
    <p className="text-sm mb-2 text-[#b4bcd0]">{summary}</p>
    <span className="text-[#00d4ff] font-semibold">{time}</span>
  </li>
);

const ArticlesPage: React.FC = () => {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10">
        <Navigation />

        <section className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent"
            >
              Words can change the world
            </motion.h1>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-8 md:gap-y-16 mb-32">
              <FeaturedArticle
                title="Build A Custom Pagination Component In Reactjs From Scratch"
                summary="Learn how to create stunning loading screens in React with 3 different methods. Discover how to use React-Loading, React-Lottie & build a custom loading screen. Improve the user experience."
                time="9 min read"
                link="https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/"
                img={article1}
              />
              <FeaturedArticle
                title="Creating Stunning Loading Screens In React: Build 3 Types Of Loading Screens"
                summary="Learn how to build a custom pagination component in ReactJS from scratch. Follow this step-by-step guide to integrate Pagination component in your ReactJS project."
                time="10 min read"
                link="https://medium.com/@davidarmah2022/building-a-custom-pagination-component-in-reactjs-from-scratch-9404f9611cd0"
                img={article2}
              />
            </ul>

            <h2 className="font-bold text-4xl w-full text-center my-16 text-white">All Articles</h2>

            <ul>
              <Article
                title="Form Validation In Reactjs: Build A Reusable Custom Hook For Inputs And Error Handling"
                date="November 2, 2023"
                link="https://www.freecodecamp.org/news/how-to-validate-forms-in-react/"
                img={article3}
              />
              <Article
                title="Redux Simplified: A Beginner's Guide For Web Developers"
                date="November 5, 2023"
                link="https://www.freecodecamp.org/news/redux-and-redux-toolkit-for-beginners/"
                img={article4}
              />
              <Article
                title="Silky Smooth Scrolling In Reactjs: A Step-By-Step Guide For React Developers"
                date="September 17, 2023"
                link="https://www.digitalocean.com/community/tutorials/how-to-implement-smooth-scrolling-in-react"
                img={article5}
              />
              <Article
                title="Creating An Efficient Modal Component In React Using Hooks And Portals"
                date="October 17, 2023"
                link="https://hackernoon.com/reactjs-custom-modal-component-using-hooks-and-portals-p12j35le"
                img={article6}
              />
            </ul>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </main>
  );
};

export default ArticlesPage;
