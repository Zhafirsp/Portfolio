"use client";
import { useState } from "react";
import Description from "../../components/Description";
import Transition from "../../components/Transition"; // Import the transition component
import styles from "./style.module.scss"; // Page-specific styles
import Contact from "../../components/Contact";
import SliderHeader from "../../components/SliderHeader";
import HeaderAbout from "../../components/Header/about";
import Vision from "../../components/Vision";

export default function About() {
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
        <div className={styles.pageContent}>
          <SliderHeader />
          <HeaderAbout />
          <Vision />
          {/* <Description /> */}
          <Contact />
        </div>
      )}
    </>
  );
}
