import styles from "./styles.module.css";

function Modal({ data }) {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.contaner}>{data}</div>
      </div>
    </>
  );
}

export default Modal;
