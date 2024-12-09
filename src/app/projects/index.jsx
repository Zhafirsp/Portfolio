"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "../../components/project";
import { motion } from "framer-motion";
import projects from "../../data/projectsData";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import Link from "next/link";
// import { HiOutlineQueueList } from "react-icons/hi2";
// import { SlGrid } from "react-icons/sl";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);
  const [visibleProjects, setVisibleProjects] = useState([]); // For the displayed projects
  const [isClient, setIsClient] = useState(false); // To ensure the code runs only on the client side
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // This state toggles the menu
  // const [activeView, setActiveView] = useState("list"); // Default set to 'list' view
  // const [isActive, setIsActive] = useState(false); // Track active state

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // const toggleView = (view) => {
  //   setActiveView(view); // Set active view when a button is clicked (either grid or list)
  // };

  // const handleClick = () => {
  //   setIsActive((prev) => !prev); // Toggle active state on click
  // };

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  // Ensures the code runs only on the client side
  useEffect(() => {
    setIsClient(true); // This will be true only after the component mounts
  }, []);

  useEffect(() => {
    if (isClient) {
      const currentPath = window.location.pathname;

      // Sort projects by year (descending)
      const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

      if (currentPath === "/") {
        // Show only 3 projects on the homepage
        setVisibleProjects(sortedProjects.slice(0, 4));
      } else if (currentPath === "/work") {
        // Show all projects on the /work page
        setVisibleProjects(sortedProjects);
      }
    }
  }, [isClient]);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };

  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}
    >
      <div className={styles.body}>
        {/* <div className={styles.toggleContainer}>
          <Rounded onClick={() => toggleView("list")}>
            <p className={styles.toggleButton}>
              <HiOutlineQueueList />
            </p>
          </Rounded>

          <Rounded onClick={() => toggleView("grid")}>
            <p className={styles.toggleButton}>
              <SlGrid />
            </p>
          </Rounded>
        </div> */}
        {/* 
        <div
          className={activeView === "grid" ? styles.gridView : styles.listView}
        > */}
        {/* <div> */}
        <table>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Title</th>
              <th>Location</th>
              <th>Service</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {visibleProjects.map((project, index) => (
              <Project
                key={project.id} // Using project.id as the key
                index={index}
                title={project.title}
                location={project.location}
                service={project.service}
                year={project.year}
                manageModal={manageModal}
                id={project.id} // Pass the project id to the Project component
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
      {/* </div> */}

      {/* Conditionally render the Rounded component for "More Work" */}
      {isClient && window.location.pathname !== "/work" && (
        <Rounded>
          <Link href="/work" className={styles.link}>
            <p>More work</p>
          </Link>
        </Rounded>
      )}

      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div
            style={{ top: index * -100 + "%" }}
            className={styles.modalSlider}
          >
            {visibleProjects.map((project, index) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <Image src={`${src}`} width={300} height={0} alt="image" />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          View
        </motion.div>
      </>
    </main>
  );
}
