import React from "react";
import { motion } from "framer-motion";
import SocialMedia from "../animations/SocialMedia";
import BlurText from "../animations/BlurText";

const Contact = () => {
  return (
    <section
      className="w-full py-20 px-4 flex flex-col items-center"
      aria-labelledby="contact-heading"
      role="region"
    >
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        <BlurText
          text="Let&apos;s connect!"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-4xl md:text-5xl mb-8 text-white font-heading font-bold"
        />

        {/* Hidden accessible heading for screen readers */}
        <h2 id="contact-heading" className="sr-only">
          Contact Me
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-400 mt-6 text-md sm:text-xl"
        >
          Whether you have an idea, a collaboration in mind, or just want to say
          hello — feel free to get in touch. I’d love to hear from you!
        </motion.p>

        <div className="mt-28">
          <SocialMedia />
        </div>
      </div>
    </section>
  );
};

export default Contact;
