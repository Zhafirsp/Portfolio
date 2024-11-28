import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation"; // Import usePathname

const TransitionPage = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: Slide In, 1: Handwriting, 2: Slide Out, 3: Done
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const pathname = usePathname(); // Ambil pathname aktif
  const pageContent = getPageContent(pathname); // Dapatkan konten berdasarkan pathname
  const [transitionCompleted, setTransitionCompleted] = useState(false);

  useEffect(() => {
    if (!transitionCompleted) {
      const timers = [
        setTimeout(() => setStage(1), 1000), // Slide In selesai
        setTimeout(() => setStage(2), 4000), // Handwriting selesai
        setTimeout(() => {
          setStage(3); // Slide Out selesai
          if (onComplete) onComplete();
          setTransitionCompleted(true); // Mark transition as completed
        }, 5000),
      ];

      return () => timers.forEach((timer) => clearTimeout(timer)); // Cleanup timers on unmount
    }
  }, []); // Re-run effect when transition completes

  return (
    <>
      {/* Transisi Slide In */}
      {stage < 3 && (
        <motion.div
          className={styles.transitionOverlay}
          initial={{ y: "100%" }}
          animate={{ y: stage === 2 ? "-100%" : "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Handwritten Text animasi di stage 1 */}
          {stage === 1 && (
            <motion.div
              className={styles.logoContainer}
              key="handwrittenAnimation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.handwrittenText}>Zhafir</div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Konten Halaman Utama */}
      {stage === 3 && (
        <div className={styles.pageContent}>{getPageContent(pathname)}</div>
      )}
    </>
  );
};

const getPageContent = (pathname) => {
  console.log("Fetching content for pathname:", pathname);
  switch (pathname) {
    case "/About":
      return;
    case "/Work":
      return;
    case "/Contact":
      return;
    default:
      return;
  }
};

export default TransitionPage;
