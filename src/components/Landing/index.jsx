"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { slideUp } from "./animation";
import { motion } from "framer-motion";

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Track mouse position
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top } = e.target.getBoundingClientRect();
    const x = clientX - left; // Mouse position inside the image (x axis)
    const y = clientY - top; // Mouse position inside the image (y axis)

    setHoverPosition({ left: x, top: y });
  };

  // Mouse enter to trigger hover effect
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Mouse leave to reset hover effect
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    // if (xPercent < -100) {
    //   xPercent = 0;
    // } else if (xPercent > 0) {
    //   xPercent = -100;
    // }
    // gsap.set(firstText.current, { xPercent: xPercent });
    // gsap.set(secondText.current, { xPercent: xPercent });
    // requestAnimationFrame(animate);
    // xPercent += 0.1 * direction;
  };

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className={styles.landing}
    >
      <div
        className={`${styles.imageContainer} ${
          isHovered ? styles.hovered : ""
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          "--mouse-x": `${hoverPosition.left}px`,
          "--mouse-y": `${hoverPosition.top}px`,
        }}
      >
        <Image
          src="/images/profile1.png"
          alt="Profile Image"
          width={350}
          height={350}
        />
      </div>
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Muhammad Zhafir</p>
          {/* <p ref={secondText}>Frontend Developer -</p> */}
        </div>
      </div>
      {/* <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
            fill="white"
          />
        </svg>
        <p>Web Designer</p>
        <p>Web Developer</p>
      </div> */}
    </motion.main>
  );
}