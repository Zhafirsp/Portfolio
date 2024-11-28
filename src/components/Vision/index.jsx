import { useEffect, useState, useRef } from "react";
import styles from "./style.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ParallaxBackground() {
  const [showText, setShowText] = useState(false);
  const imageRef = useRef(null);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  // Fungsi untuk menangani hover event
  const handleMouseEnter = () => {
    setShowText(true); // Menampilkan teks saat hover
  };

  const handleMouseLeave = () => {
    setShowText(false); // Menyembunyikan teks saat mouse keluar
  };
  return (
    <>
      <div className={styles.visionSection}>
        <div
          ref={imageRef}
          className={styles.imageContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/images/about2.png" // Ganti dengan path gambar Anda
            alt="Vision"
            className={styles.image}
          />
        </div>
        <div
          className={`${styles.textContainer} ${
            showText ? styles.visible : styles.hidden
          }`}
        >
          <p className={styles.text}>
            This is how I envision myself in <s>15</s> 10 years
          </p>
        </div>
      </div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <motion.div className={styles.circle}></motion.div>
      </motion.div>
    </>
  );
}
