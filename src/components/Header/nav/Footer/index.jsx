import styles from "./style.module.scss";

export default function index() {
  return (
    <div className={styles.footer}>
      <a
        href="https://www.linkedin.com/in/muhammad-zhafir"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>LinkedIn</p>
      </a>
      <a
        href="https://www.instagram.com/zhafirsp_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>Instagram</p>
      </a>
      <a
        href="https://x.com/iniakunspamm"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>Twitter</p>
      </a>
    </div>
  );
}
