"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { slideUp } from "./animation";
import { motion } from "framer-motion";
import Footer from "../../components/Header/nav/Footer";
import Magnetic from "../../common/Magnetic";
import SliderHeader from "../../components/SliderHeader";
import Transition from "../../components/Transition"; // Import the transition component

export default function ContactPage() {
  const [time, setTime] = useState("");
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const [showContent, setShowContent] = useState(false);

  const handleTransitionComplete = () => {
    setShowContent(true); // Show page content after transition completes
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  useLayoutEffect(() => {
    if (showContent) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.25,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => (direction = e.direction * -1),
        },
        x: "-2700px",
      });
    }
  }, [showContent]);

  useEffect(() => {
    const updateTime = () => {
      const bandungTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());

      setTime(bandungTime);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      {/* Trigger transition effect */}
      <Transition onComplete={handleTransitionComplete} />

      {/* Page content will only render after transition */}
      {showContent && (
        <div className={styles.contact}>
          <motion.main
            variants={slideUp}
            initial="initial"
            animate="enter"
            className={styles.landing}
          >
            <div className={styles.sliderContainer}>
              <div ref={slider} className={styles.slider}>
                <p ref={firstText}>Muhammad Zhafir</p>
                {/* <p ref={secondText}>Frontend Developer -</p> */}
              </div>
            </div>
          </motion.main>
          <div className={styles.hello}>
            <p className={styles.hey}>Hello</p>
            <p className={styles.hey2}>world</p>
          </div>
          <div className={styles.emailForm}>
            <div>
              <p className={styles.emailText}>wanna make some badass stuff?</p>
              <p className={styles.email}>zhafirsp@gmail.com</p>
            </div>
          </div>

          <Image
            id="aboutImage"
            src="/images/cow.png"
            alt="Profile Image"
            width={350}
            height={350}
            className={styles.aboutImage}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          {/* Hover Text */}
          <div
            className={`${styles.hoverText} ${
              isHovered ? styles.showText : ""
            }`}
          >
            Hi it&#39;s me cowwie
          </div>

          <div className={styles.info}>
            <div>
              <span>
                <h3>Copyright:</h3>
                <p>All Right Reserved ©2024</p>
              </span>
              <span>
                <h3>Location:</h3>
                <p>Bandung, Indonesia {time}</p>
              </span>
              <span>
                <h3>Fast Travel:</h3>
                <p className={styles.scrollToTop} onClick={scrollToTop}>
                  Go Back to Top
                </p>
              </span>
            </div>
            <div className={styles.socials}>
              <span>
                <h3>Socials:</h3>
                <Magnetic>
                  <a
                    href="https://www.linkedin.com/in/muhammad-zhafir"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>LinkedIn</p>
                  </a>
                </Magnetic>
              </span>
              <Magnetic>
                <a
                  href="https://www.instagram.com/zhafirsp_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>Instagram</p>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://x.com/iniakunspamm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>Twitter</p>
                </a>
              </Magnetic>
            </div>
          </div>
          <div className={styles.sliderHeader}>
            <SliderHeader />
          </div>
        </div>
      )}
    </>
  );
}
