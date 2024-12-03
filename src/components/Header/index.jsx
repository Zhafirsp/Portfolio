"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import Link from "next/link";

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  const getMarginTop = () => {
    if (pathname === "/work") return "-10px";
    if (pathname === "/about") return "3vh";
    if (pathname === "/contact") return "-10px";
    if (pathname === "/") return "3vh";
    return "0";
  };

  const getMenuMarginTop = () => {
    if (pathname === "/work") return "-10vh";
    if (pathname.startsWith("/projects/")) return "-30vh"; // Sesuaikan menu untuk halaman proyek
    return "0";
  };

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
        },
      },
    });
  }, []);

  return (
    <>
      <div
        ref={header}
        className={styles.header}
        style={{
          marginTop: getMarginTop(),
        }}
      >
        <Magnetic>
          <Link
            href="/"
            className={`${styles.link} ${
              pathname === "/contact" ? styles.contactLink : ""
            }`}
          >
            <div className={styles.logo}>
              <p className={styles.copyright}>©</p>
              <div className={styles.name}>
                <p className={styles.codeBy}>Code by</p>
                <p className={styles.zhafir}>Zhafir</p>
                <p className={styles.muhammad}>Muhammad</p>
              </div>
            </div>
          </Link>
        </Magnetic>
        <div className={styles.nav}>
          <Magnetic>
            <Link
              href="/work"
              className={`${styles.link} ${
                pathname === "/contact" ? styles.contactLink : ""
              }`}
            >
              <div className={styles.el}>
                Work
                <div className={styles.indicator}></div>
              </div>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className={`${styles.link} ${
                pathname === "/contact" ? styles.contactLink : ""
              }`}
            >
              <div className={styles.el}>
                About
                <div className={styles.indicator}></div>
              </div>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className={`${styles.link} ${
                pathname === "/contact" ? styles.contactLink : ""
              }`}
            >
              <div className={styles.el}>
                Contact
                <div className={styles.indicator}></div>
              </div>
            </Link>
          </Magnetic>
        </div>
      </div>
      <div
        ref={button}
        className={styles.headerButtonContainer}
        style={{ marginTop: getMenuMarginTop() }}
      >
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
