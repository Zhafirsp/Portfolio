"use client";
import { useEffect, useState } from "react";
import SlidingImages from "../../components/SlidingImages";
import ParallaxScroll from "../../components/ParallaxScroll";
import Projects from "../projects";
import styles from "./style.module.scss";
import Transition from "../../components/Transition"; // Import the transition component
import Contact from "../../components/Contact";

export default function Work() {
  const [showContent, setShowContent] = useState(false);

  const handleTransitionComplete = () => {
    setShowContent(true); // Show page content after transition completes
  };

  return (
    <>
      {/* Trigger transition effect */}
      <Transition onComplete={handleTransitionComplete} />
      {/* Page content will only render after transition */}
      {showContent && (
        <div className={styles.header}>
          <ParallaxScroll />
          <Projects />
          <SlidingImages />
          <Contact />
        </div>
      )}
    </>
  );
}
