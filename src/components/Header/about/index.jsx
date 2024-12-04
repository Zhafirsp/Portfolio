"use client";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function HeaderAbout() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.main initial="initial" animate="enter" className={styles.landing}>
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <p>Hello World</p>
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
        className={`${styles.hoverText} ${isHovered ? styles.showText : ""}`}
      >
        Hi it&#39;s me cowwie
      </div>

      <div className={styles.descContainer}>
        <div data-scroll data-scroll-speed={0.1} className={styles.description}>
          <p>
            I&#39;m zhafir. a frontend engineer, web developer and ui/ux
            designer based in the rain city, more specifically planet earth 🌎 *
          </p>
          <p className={styles.location}>* Currently in Bandung, Indonesia.</p>
        </div>
        <hr />
      </div>
    </motion.main>
  );
}
