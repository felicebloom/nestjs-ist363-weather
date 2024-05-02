import React from "react";
import styles from "./Container.module.scss";

const Container = ({ children, isLoading }) => {
  return (
    <div
      className={`${styles.container} ${
        isLoading ? styles.loadingContainer : ""
      }`}
    >
      {isLoading ? <div className={styles.loadingAnimation}></div> : children}
    </div>
  );
};

export default Container;
