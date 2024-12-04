"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function Home() {
  const sliderHeader = useRef(null);

  useLayoutEffect(() => {
    const slider = sliderHeader.current;

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
    <motion.main className={styles.sliderHeader}>
      <div className={styles.sliderHeaderContainer}>
        <div ref={sliderHeader} className={styles.sliderHeader}>
          <p className="text-before">{`Frontend Engineer`}&nbsp;⟶&nbsp;</p>
          <p className="text-before">{`Web Developer`}&nbsp;⟶&nbsp;</p>
          <p className="text-before">{`UI/UX`}&nbsp;⟶&nbsp;</p>
          <p className="text-before">{`Web Designer`}&nbsp;⟶&nbsp;</p>
          <p className="text-before">{`Frontend Developer`}&nbsp;⟶&nbsp;</p>
          <p className="text-before">{`Graphic Designer`}&nbsp;⟶&nbsp;</p>
        </div>
      </div>
    </motion.main>
  );
}
