"use client";
import styles from "./style.module.scss";
import { useParams } from "next/navigation";
import Rounded from "../../../common/RoundedButton";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Magnetic from "../../../common/Magnetic";

const projects = [
  {
    id: 1, // Add unique id for each project
    title: "San Project",
    location: "Bandung, Indonesia",
    service: "Design & Development",
    year: "2021",
    src: "/images/san_project.png",
    credit: "San Project Team",
    video1: "/videos/sanproject_home.mp4",
    video2: "/videos/sanproject_about.mp4",
  },
  {
    id: 2,
    title: "Readly",
    location: "Bogor, Indonesia",
    service: "Design & Development",
    year: "2022",
    src: "/images/readly.png",
    credit: "Readly Team",
    video1: "/videos/readly_homepage.mp4",
    video2: "/videos/readly_about.mp4",
    video3: "/videos/readly_readpage.mp4",
    video4: "/videos/readly_countpage.mp4",
  },
  {
    id: 3,
    title: "Homework Gigih",
    location: "Bogor, Indonesia",
    service: "Design & Development",
    year: "2022",
    src: "/images/homework_gigih.png",
    credit: "Muhammad Zhafir",
    video1: "/videos/homework_gigih.mp4",
  },
  {
    id: 4,
    title: "OZ Project Prototype 1",
    location: "Bandung, Indonesia",
    service: "Design & Development",
    year: "2024",
    src: "/images/oz_home1.png",
    credit: "Zhafir, Fahri & Riffi",
    video1: "/videos/oz_home1_homepage.mp4",
    video2: "/videos/oz_home1_newspage.mp4",
    video3: "/videos/oz_home1_eventpage.mp4",
  },
  {
    id: 5,
    title: "OZ Project Prototype 2",
    location: "Bandung, Indonesia",
    service: "Design & Development",
    year: "2024",
    src: "/images/oz.png",
    credit: "Zhafir, Fahri, Teguh",
    video1: "/videos/oz_home2_homepage.mp4",
    video2: "/videos/oz_home2_newspage.mp4",
    video3: "/videos/oz_home2_eventpage.mp4",
    video4: "/videos/oz_home2_about.mp4",
  },
];

export default function ProjectDetail() {
  const { id } = useParams(); // Ambil ID dari URL
  // const [time, setTime] = useState("");
  const sliderProject = useRef(null);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  const project = projects.find((p) => p.id === parseInt(id));

  useLayoutEffect(() => {
    const slider = sliderProject.current;

    if (!slider) return; // Early exit if the slider is not available

    const screenWidth = window.innerWidth;
    const elementWidth = slider.children[0]?.offsetWidth;

    if (!elementWidth) return; // Ensure the element has a valid width

    const clonesNeeded = Math.ceil(screenWidth / elementWidth);

    // Clone elements to fill the screen
    Array.from({ length: clonesNeeded }).forEach(() => {
      Array.from(slider.children).forEach((child) => {
        slider.appendChild(child.cloneNode(true));
      });
    });

    const totalWidth = slider.scrollWidth;

    // Set initial position for GSAP animation
    gsap.set(slider, { x: 0 });

    // GSAP animation for infinite scrolling
    gsap.to(slider, {
      x: `-=${totalWidth / 2}px`,
      duration: totalWidth / 100,
      ease: "linear",
      repeat: -1,
    });

    return () => {
      // Cleanup cloned elements
      while (slider.children.length > clonesNeeded) {
        slider.removeChild(slider.lastChild);
      }
    };
  }, []);

  
  if (!project) {
    return <p>404 - Project Not Found</p>; // Tampilkan pesan 404 jika data tidak ada
  }

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth", // Smooth scrolling
  //   });
  // };

  // useEffect(() => {
  //   const updateTime = () => {
  //     const bandungTime = new Intl.DateTimeFormat("en-US", {
  //       timeZone: "Asia/Jakarta",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     }).format(new Date());

  //     setTime(bandungTime);
  //   };

  //   updateTime(); // Set initial time
  //   const interval = setInterval(updateTime, 1000); // Update every second

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <>
      <main className={styles.project}>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.detail}>
          <p>
            Role/Service <span>{project.service}</span>
          </p>
          <p>
            Credits <span>{project.credit}</span>
          </p>
          <p>
            Location & Year{" "}
            <span>
              {project.location}
              {project.year}
            </span>
          </p>
        </div>
        <div className={styles.image}>
          <Rounded backgroundColor={"#eb5e28"} className={styles.button}>
            <p>See Live</p>
          </Rounded>
          <Image
            src={project.src}
            alt={project.title}
            layout="responsive"
            width={500} // Adjust as needed
            height={500} // Adjust as needed
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentImage}>
            {Object.keys(project)
              .filter((key) => key.startsWith("video") && project[key])
              .map((key, index, videos) => {
                const isOddNumberOfVideos = videos.length % 2 !== 0; // Mengecek jika jumlah video ganjil
                const isLastVideo = index === videos.length - 1;

                return (
                  <video
                    key={index}
                    width={isOddNumberOfVideos && isLastVideo ? "60%" : "45%"} // Hanya ubah lebar video terakhir jika jumlah video ganjil
                    autoPlay
                    loop
                    muted
                    className={styles.video}
                  >
                    <source src={project[key]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                );
              })}
          </div>
        </div>
        <motion.div style={{ height }} className={styles.circleContainer}>
          <motion.div className={styles.circle}></motion.div>
        </motion.div>
        <div className={styles.nextCase}>
          <motion.main className={styles.sliderProject}>
            <div className={styles.sliderProjectContainer}>
              <div ref={sliderProject} className={styles.sliderProject}>
                <p className="text-before">{`WORK`}&nbsp;↓&nbsp;</p>
              </div>
            </div>
          </motion.main>
          <section className={styles.recommendedProjects}>
            <p>Next Cases</p>
            <div className={styles.recommendedContainer}>
              {(() => {
                const currentIndex = projects.findIndex(
                  (p) => p.id === parseInt(id)
                );

                // Menghitung indeks proyek berikutnya, menggunakan modulo untuk siklus kembali ke awal
                const nextIndex1 = (currentIndex + 1) % projects.length;
                const nextIndex2 = (nextIndex1 + 1) % projects.length;

                const nextProject1 = projects[nextIndex1];
                const nextProject2 = projects[nextIndex2];

                return (
                  <>
                    <div
                      key={nextProject1.id}
                      className={styles.recommendedCard}
                    >
                      <a href={`/projects/${nextProject1.id}`}>
                        <Image
                          src={nextProject1.src}
                          alt={nextProject1.title}
                          width={400} // Adjust width
                          height={400} // Adjust height
                          className={styles.projectImage}
                        />
                        <h3>{nextProject1.title}</h3>
                      </a>
                    </div>

                    <div
                      key={nextProject2.id}
                      className={styles.recommendedCard}
                    >
                      <a href={`/projects/${nextProject2.id}`}>
                        <Image
                          src={nextProject2.src}
                          alt={nextProject2.title}
                          width={400} // Adjust width
                          height={400} // Adjust height
                          className={styles.projectImage}
                        />
                        <h3>{nextProject2.title}</h3>
                      </a>
                    </div>
                  </>
                );
              })()}
            </div>
          </section>
        </div>
        {/* <div className={styles.info}>
          <div>
            <span>
              <h3>Copyright:</h3>
              <p>All Right Reserved ©2024</p>
            </span>
            <span>
              <h3>Location:</h3>
              <p>Bandung, Indonesia {time}</p>
            </span>
            <span>
              <h3>Fast Travel:</h3>
              <p className={styles.scrollToTop} onClick={scrollToTop}>
                Go Back to Top
              </p>
            </span>
          </div>
          <div>
            <span>
              <h3>Socials:</h3>
              <Magnetic>
                <a
                  href="https://www.linkedin.com/in/muhammad-zhafir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>LinkedIn</p>
                </a>
              </Magnetic>
            </span>
            <Magnetic>
              <a
                href="https://www.instagram.com/zhafirsp_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Instagram</p>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://x.com/iniakunspamm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Twitter</p>
              </a>
            </Magnetic>
          </div>
        </div> */}
      </main>
    </>
  );
}
