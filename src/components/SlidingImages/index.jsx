"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
  {
    color: "#e3e5e7",
    src: "c2.jpg",
  },
  {
    color: "#d6d7dc",
    src: "decimal.jpg",
  },
  {
    color: "#e3e3e3",
    src: "funny.jpg",
  },
  {
    color: "#21242b",
    src: "google.jpg",
  },
];

const slider2 = [
  {
    color: "#d4e3ec",
    src: "homework_gigih.png",
  },
  {
    color: "#e5e0e1",
    src: "oz.png",
  },
  {
    color: "#d7d4cf",
    src: "readly.png",
  },
  {
    color: "#e1dad6",
    src: "oz_home1.png",
  },
];

export default function SlidingImages() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const [isClient, setIsClient] = useState(false);
  const [isWorkPage, setIsWorkPage] = useState(false);

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  // Ensures the code runs only on the client side
  useEffect(() => {
    setIsClient(true); // This will be true only after the component mounts

    // Check if the current path is '/Work'
    if (window.location.pathname === "/Work") {
      setIsWorkPage(true);
    } else {
      setIsWorkPage(false);
    }
  }, []);

  return (
    <>
      <div
        ref={container}
        className={`${styles.slidingImages} ${
          isWorkPage ? styles.workPage : ""
        }`}
      >
        {/* <motion.div style={{x: x1}} className={styles.slider}>
                    {
                        slider1.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div className={styles.imageContainer}>
                                    <Image 
                                    fill={true}
                                    alt={"image"}
                                    src={`/images/${project.src}`}/>
                                </div>
                            </div>
                        })
                    }
                </motion.div> */}
        {/* Conditionally render the Rounded component */}
        {isClient && window.location.pathname !== "/Work" && (
          <motion.div style={{ x: x2 }} className={styles.slider}>
            {slider2.map((project, index) => {
              return (
                <div
                  key={index}
                  className={styles.project}
                  style={{ backgroundColor: project.color }}
                >
                  <div key={index} className={styles.imageContainer}>
                    <Image
                      fill={true}
                      alt={"image"}
                      src={`/images/${project.src}`}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
        <motion.div
          style={{ height }}
          className={`${styles.circleContainer} ${
            isWorkPage ? styles.circlePage : ""
          }`}
        >
          <div className={styles.circle}></div>
        </motion.div>
      </div>
    </>
  );
}
