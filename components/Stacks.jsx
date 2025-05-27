import React from "react";
import { motion } from "framer-motion";

const Stack = ({ name, x, y }) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-semibold bg-dark text-light
        py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light
        lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent
        xs:text-dark xs:dark:text-light xs:font-bold
        "
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: {duration: 1.5} }}
      viewport={{once: true}}
    >
      {name}
    </motion.div>
  );
};
const Stacks = () => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32">Stacks</h2>
      <div className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark
      lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
      lg:bg-circularLightLg lg:dark:bg-circularDarkLg
      md:bg-circularLightMd md:dark:bg-circularDarkMd
      sm:bg-circularLightSm sm:dark:bg-circularDarkSm
      ">
        <motion.div
          className="flex items-center justify-center rounded-full font-semibold bg-dark text-light
        p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light
        lg:p-6 md:p-4 xs:text-xs xs:p-1
        "
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>

        <Stack name="HTML" x="-20vw" y="-2vw" />
        <Stack name="CSS" x="-5vw" y="8vw" />
        <Stack name="Bootstrap" x="-2vw" y="17vw" />
        <Stack name="Javascript" x="-25vw" y="6vw" />
        <Stack name="ReactJS" x="-19vw" y="18vw" />
        <Stack name="NextJS" x="-20vw" y="-15vw" />
        <Stack name="Tailwind CSS" x="2vw" y="-9vw" />
        <Stack name="Figma" x="32vw" y="-5vw" />
        <Stack name="Adobe Photoshop" x="0vw" y="-20vw" />
        <Stack name="MongoDb" x="17vw" y="-14vw" />
        <Stack name="Adobe Illustrator" x="18vw" y="5vw" />
        <Stack name="Firebase" x="18vw" y="18vw" />
        <Stack name="NodeJS" x="36vw" y="15vw" />
      </div>
    </>
  );
};

export default Stacks;
