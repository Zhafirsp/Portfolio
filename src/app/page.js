"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import Landing from "../components/Landing";
import Projects from "./projects";
import Description from "../components/Description";
import SlidingImages from "../components/SlidingImages";
import SliderHeader from "../components/SliderHeader";
import Contact from "../components/Contact";
import Transition from "../components/Transition"; // Import the transition component

export default function Home() {
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
        <main className={styles.main}>
          <SliderHeader />
          <Landing />
          <Description />
          <Projects />
          <SlidingImages />
          <Contact />
        </main>
      )}
    </>
  );
}
