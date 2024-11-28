"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";
import gsap from "gsap";

const images = [
  "san_project.jpg",
  "readly.jpg",
  "neko.jpg",
  "fresh_diwww_tehpoci.jpg",
  "fresh_diwww_dimsum.jpg",
  "market_day.jpg",
  "neko.jpg",
  "market_day_2.jpg",
  "neko.jpg",
  "market_day.jpg",
  "fresh_diwww_tehpoci.jpg",
  "market_day_2.jpg",
];

export default function ParallaxScroll() {
  const sliderProject = useRef(null);
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useLayoutEffect(() => {
    const slider = sliderProject.current;

    if (!slider) return;

    // Dapatkan lebar layar dan lebar satu elemen teks
    const screenWidth = window.innerWidth;
    const elementWidth = slider.children[0].offsetWidth;

    // Hitung jumlah elemen yang dibutuhkan untuk memenuhi layar
    const clonesNeeded = Math.ceil(screenWidth / elementWidth);

    // Clone elemen hingga memenuhi layar
    for (let i = 0; i < clonesNeeded; i++) {
      Array.from(slider.children).forEach((child) => {
        slider.appendChild(child.cloneNode(true));
      });
    }

    // Total panjang elemen setelah cloning
    const totalWidth = slider.scrollWidth;

    // Set ulang posisi slider untuk animasi loop
    gsap.set(slider, { x: 0 });

    // Animasi GSAP tanpa jeda
    gsap.to(slider, {
      x: `-=${totalWidth / 2}px`, // Geser setengah panjang total
      duration: totalWidth / 100, // Durasi animasi sesuai panjang teks
      ease: "linear", // Gerakan linear untuk animasi mulus
      repeat: -1, // Loop tak terbatas
    });

    return () => {
      // Bersihkan elemen clone (jika diperlukan)
      while (slider.children.length > 4) {
        slider.removeChild(slider.lastChild);
      }
    };
  }, []);

  return (
    <main className={styles.main}>
      <motion.main className={styles.sliderProject}>
        <div className={styles.sliderProjectContainer}>
          <div ref={sliderProject} className={styles.sliderProject}>
            <p className="text-before">{`WORK`}&nbsp;↓&nbsp;</p>
          </div>
        </div>
      </motion.main>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className={styles.spacer}></div>
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <Image src={`/images/${src}`} alt="image" fill />
          </div>
        );
      })}
    </motion.div>
  );
};
