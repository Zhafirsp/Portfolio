"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";

export default function Contact() {
  const [time, setTime] = useState("");
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

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
      <motion.div style={{ y }} ref={container} className={styles.contact}>
        <div className={styles.body}>
          <div className={styles.title}>
            <span>
              {/* <div className={styles.imageContainer}>
              <Image fill={true} alt={"image"} src={`/images/profile.jpg`} />
            </div> */}
              <h2>Muhammad Zhafir</h2>
            </span>
            <h3>Sunandy Pramana</h3>
            <motion.div style={{ x }} className={styles.buttonContainer}>
              <Link href="/contact">
                <Rounded backgroundColor={"#eb5e28"} className={styles.button}>
                  <p>Get in touch</p>
                </Rounded>
              </Link>
            </motion.div>
            {/* <motion.svg
            style={{ rotate, scale: 2 }}
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
          </motion.svg> */}
          </div>
          <div className={styles.nav}>
            <a href="mailto: zhafirsp@gmail.com " target="_blanks">
              <Rounded>
                <p>zhafirsp@gmail.com</p>
              </Rounded>
            </a>
            <a href="https://wa.me/6282213302003 " target="_blanks">
              <Rounded>
                <p>+62 822 1330 2003</p>
              </Rounded>
            </a>
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
            <div>
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
        </div>
      </motion.div>
    </>
  );
}
