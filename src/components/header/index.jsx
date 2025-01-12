import styles from "./styles.module.css";

function Header({ title }) {
  return (
    <header className={styles.contaner}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
    </header>
  );
}

export default Header;
