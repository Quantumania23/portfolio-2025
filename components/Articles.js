import AnimatedText from "@/Components/AnimatedText";
import Layout from "@/Components/Layout";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import article1 from "../../public/images/articles/create loading screen in react js.jpg";
import article2 from "../../public/images/articles/pagination component in reactjs.jpg";
import { motion, useMotionValue } from "framer-motion";
import article3 from "../../public/images/articles/form validation in reactjs using custom react hook.png";
import article4 from "../../public/images/articles/create modal component in react using react portals.png";
import article5 from "../../public/images/articles/create loading screen in react js.jpg";
import article6 from "../../public/images/articles/What is higher order component in React.jpg";
import TransitionEffect from "@/Components/TransitionEffect";

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = "inline-block";
    x.set(event.pageX);
    y.set(-10);
  }

  function handleMouseLeave(event) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }
  return (
    <Link href={link} target="_blank" onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
      <h2 className="capitalize text-xl font-semibold hover:underline">{title}</h2>
      <FramerImage
        style={{ x: x, y: y }}
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

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center
    justify-between bg-light text-dark first:mt-0 border border-solid border-dark
    border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light
    sm:flex-col"
    >
      <MovingImg title={title} img={img} link={link} />
      <span className="text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.0rem] bg-dark
rounded-br-3xl"
      />
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
          sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <Link href={link} target="_blank">
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">{title}</h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">{time}</span>
    </li>
  );
};

const Articles = () => {
  return (
    <>
      <Head>
        <title>Mike&apos;s portfolio | Articles Page</title>
        <meta name="description" content="any description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Words can change the world"
            className="mb-16 lg:!text-7xl sm:!mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FeaturedArticle
              title="Build A Custom Pagination Component In Reactjs From Scratch"
              summary="Learn how to create stunning loading screens in React with 3 different methods.
              Discover how to use React-Loading, React-Lottie & build a custom loading screen.
              Improve the user experience."
              time="9 min read"
              link="https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/"
              img={article1}
            />
            <FeaturedArticle
              title="Creating Stunning Loading Screens In React: Build 3 Types Of Loading Screens
              A Custom Pagination Component In Reactjs From Scratch"
              summary=" Learn how to build a custom pagination component in ReactJS from scratch.
      Follow this step-by-step guide to integrate Pagination component in your ReactJS project."
              time="10 min read"
              link="https://medium.com/@davidarmah2022/building-a-custom-pagination-component-in-reactjs-from-scratch-9404f9611cd0"
              img={article2}
            />
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">All Articles</h2>
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
        </Layout>
      </main>
    </>
  );
};

export default Articles;
