import styles from "./styles.module.css";
import icon from "../../assets/icons/chekbox.svg";

function CheckBox({ data, onChekBoxChange, disabled }) {
  const handleActive = () => {
    onChekBoxChange();
  };

  return (
    <div
      className={styles.contaner}
      onClick={disabled ? () => {} : handleActive}
      style={{
        backgroundColor: disabled ? "#E8ECED" : "#FFFFFF",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {data && <img src={icon} alt="active" width={16} height={16} />}
    </div>
  );
}

export default CheckBox;
