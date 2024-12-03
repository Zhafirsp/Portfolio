"use client";
import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function Project({
  index,
  title,
  location,
  service,
  year,
  id, // Ensure `id` is passed as a prop
  manageModal,
}) {
  return (
    <tr
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className={styles.project}
    >
      <td>
        <Link href={`/projects/${id}`} passHref className={styles.link}>
          <h2>{title}</h2>
        </Link>
      </td>
      <td>
        <p>{location}</p>
      </td>
      <td>
        <p>{service}</p>
      </td>
      <td>
        <p>{year}</p>
      </td>
    </tr>
  );
}
