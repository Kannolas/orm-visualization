import styles from "./styles.module.css";
import icon from "../../assets/icons/chekbox.svg";
import { ReactComponent as Minus } from "../../assets/icons/minus.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

function DropdownCheckBox({ data, onChekBoxChange }) {
  const handleActive = () => {
    onChekBoxChange();
  };

  return (
    <div className={styles.contaner} onClick={handleActive}>
      {data ? <Minus /> : <Plus />}
    </div>
  );
}

export default DropdownCheckBox;
