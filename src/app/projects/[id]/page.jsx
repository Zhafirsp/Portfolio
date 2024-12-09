"use client";
import styles from "./style.module.scss";
import { useParams } from "next/navigation";
import Rounded from "../../../common/RoundedButton";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import projects from "../../../data/projectsData";
import Magnetic from "../../../common/Magnetic";

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

  useLayoutEffect(() => {
    if (!sliderProject.current) return;

    const slider = sliderProject.current;

    // Dapatkan lebar layar dan lebar satu elemen teks
    const screenWidth = window.innerWidth;
    const elementWidth = slider.children[0]?.offsetWidth;

    if (!elementWidth) return; // Pastikan elemen memiliki lebar yang valid

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
      // Bersihkan elemen clone
      while (slider.children.length > clonesNeeded) {
        slider.removeChild(slider.lastChild);
      }
    };
  }, []);

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
            Location & Year
            <span>
              {project.location} &copy; {project.year}
            </span>
          </p>
        </div>
        <div className={styles.image}>
          <a href={project.link} target="_blank">
            <Rounded backgroundColor={"#eb5e28"} className={styles.button}>
              <p>See Live</p>
            </Rounded>
          </a>
          <Image
            src={project.src}
            alt={project.title}
            id={project.id}
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
