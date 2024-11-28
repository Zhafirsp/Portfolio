"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import { usePathname } from "next/navigation";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  useEffect(() => {
    const pageTitleMap = {
      "/": "Portfolio Muhammad Zhafir",
      "/Work": "Work - Portfolio",
      "/About": "About - Portfolio",
      "/Contact": "Contact - Portfolio",
    };

    const faviconMap = {
      "/": "/images/profile3.png",
      "/Work": "/images/profile3.png",
      "/About": "/images/profile3.png",
      "/Contact": "/images/profile3.png",
    };

    document.title = pageTitleMap[pathname] || "Portfolio";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = faviconMap[pathname] || "/images/profile3.png";
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Header currentPath={pathname} />
        {children}
        {/* <Contact /> */}
      </body>
    </html>
  );
}
