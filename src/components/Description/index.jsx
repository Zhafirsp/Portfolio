"use client";
import styles from "./style.module.scss";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Description() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const phrases = gsap.utils.toArray(".phrase");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Start pinning when the top of the section hits the top of the viewport
          end: "+=300%", // Pinning duration based on scroll distance
          scrub: 1, // Smooth scrubbing
          pin: true, // Pin the section
        },
      })
      .to(phrases[0], { autoAlpha: 0, y: -50, duration: 0.5 }) // Move up and fade out
      .fromTo(
        phrases[1],
        { autoAlpha: 0, y: 50 }, // Start below
        { autoAlpha: 1, y: 0, duration: 0.5 } // Move into place
      )
      .to(phrases[1], { autoAlpha: 0, y: -50, duration: 0.5 })
      .fromTo(
        phrases[2],
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.5 }
      )
      .to(phrases[2], { autoAlpha: 0, y: -50, duration: 0.5 })
      .fromTo(
        phrases[3],
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.5 }
      );
  }, []);

  return (
    <div ref={sectionRef} className={styles.pinnedSection}>
      <div
        className="phrase"
        style={{ fontSize: "36px", textAlign: "center" }}
      >{`Hey, I'm Muhammad Zhafir. A frontend web developer based in Bogor, West Java.`}</div>
      <div
        className="phrase"
        style={{ fontSize: "36px", textAlign: "center" }}
      >{`I focus on creating dynamic, user-centric websites that prioritize performance and seamless functionality`}</div>
      <div
        className="phrase"
        style={{ fontSize: "36px", textAlign: "center" }}
      >{`With a passion for coding and design, I create seamless, intuitive experiences.`}</div>
      <div
        className="phrase"
        style={{ fontSize: "36px", textAlign: "center" }}
      >{`I believe in code and design as the best way to communicate with the world.`}</div>
    </div>
  );
}
