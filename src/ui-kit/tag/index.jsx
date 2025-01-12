import styles from "./styles.module.css";
import { ReactComponent as DeleteIcon } from "../../assets/icons/Close.svg";

function Tag({ title, id, onDelete }) {
  const handleClick = () => {
    onDelete();
  };

  return (
    <div className={styles.contaner}>
      <span>{title}</span>
      <DeleteIcon onClick={handleClick} />
    </div>
  );
}

export default Tag;
