import styles from "./styles.module.css";
import crossIcon from "../../assets/icons/close-circle.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeSlashIcon from "../../assets/icons/eye-slash.svg";
import { useState } from "react";

function LoginInput({
  placeholder,
  cross,
  type,
  data,
  onInputChange,
  onKeyDown,
  error,
}) {
  const [typeInput, setTypeInput] = useState(type);
  const [typeEye, setTypeEye] = useState(type);
  const [view, setView] = useState(false);
  const [inputValue, setInputValue] = useState(data);

  const handleView = () => {
    setTypeInput("text");
    setView(true);
  };

  const handleNoView = () => {
    setTypeInput("password");
    setView(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  const handleDelete = () => {
    setInputValue("");
    setTypeInput(type);
    setView(false);
    onInputChange("");
  };

  return (
    <div className={styles.contaner}>
      <input
        placeholder={placeholder}
        type={typeInput}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      ></input>
      {typeInput === "password" && inputValue !== "" && view === false && (
        <img
          src={eyeIcon}
          alt="show"
          width={16}
          height={16}
          onClick={handleView}
        />
      )}
      {typeEye === "password" && inputValue !== "" && view === true && (
        <img src={eyeSlashIcon} width={16} height={16} onClick={handleNoView} />
      )}
      {cross && inputValue !== "" && (
        <img
          src={crossIcon}
          alt="delete"
          width={16}
          height={16}
          onClick={handleDelete}
        />
      )}
    </div>
  );
}
export default LoginInput;
