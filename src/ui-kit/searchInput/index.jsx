import styles from "./styles.module.css";
import crossIcon from "../../assets/icons/close-circle.svg";
import search from "../../assets/icons/Search.svg";
import { useEffect, useState } from "react";

function SearchInput({ onInputChange, data, cross, size, placeholder }) {
  const [inputValue, setInputValue] = useState(data);
  const [inputSize, setInputSize] = useState("inputLarge");

  useEffect(() => {
    if (size && size === "small") {
      setInputSize("inputSmall");
    }
  }, [size]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  const handleClear = () => {
    setInputValue("");
    onInputChange("");
  };

  return (
    <div className={styles[inputSize]}>
      <img src={search} alt="dd" width={16} height={16} />
      <input
        className={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      ></input>
      {cross && inputValue !== "" && (
        <img
          src={crossIcon}
          alt="delete"
          width={16}
          height={16}
          onClick={handleClear}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
}

export default SearchInput;
