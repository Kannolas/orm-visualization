import styles from "./styles.module.css";
import { ReactComponent as CrossIcon } from "../../assets/icons/close-circle.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as EyeSlashIcon } from "../../assets/icons/eye-slash.svg";
import { useEffect, useState } from "react";

function CustomInput({
  title,
  required,
  cross,
  data,
  onInputChange,
  type,
  placeholder,
  size,
  color,
  error,
  disabled,
  description,
  onKeyDown,
  maxLength,
  condition,
}) {
  const [typeInput, setTypeInput] = useState("text");

  const [view, setView] = useState(false);
  const [inputValue, setInputValue] = useState(data);
  const [inputSize, setInputSize] = useState("32px");
  const [inputColor, setInputColor] = useState("#ffffff");
  const [inputStyle, setInputStyle] = useState("inputbody");
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    if (size && size === "large") {
      setInputSize("48px");
    }

    if (size && size === "small") {
      setInputSize("24px");
    }
    if (color && color === "grey") {
      setInputColor("#F8F8FA");
    }
    if (error) {
      setBorderColor("#ff4f12");
    } else setBorderColor(!inputActive ? "#ffffff" : "#7700FF");

    if (disabled) {
      setInputStyle("disabledInput");
      setInputColor("#E8ECED");
    } else setInputStyle("inputbody");

    // } else {
    //   setInputStyle("inputbody");
    // }
  }, [size, color, error, disabled, inputActive]);

  const handleView = () => {
    setTypeInput("text");
    setView(true);
  };

  const handleNoView = () => {
    setTypeInput("password");
    setView(false);
  };

  useEffect(() => {
    setInputValue(data);
    setTypeInput(type);
  }, [data, type]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (type === "password" && value.includes(" ")) {
      return; // игнорируем пробелы
    }

    if (condition && condition === "number" && !/^\d*$/.test(value)) {
      return;
    }

    if (
      condition &&
      condition === "telegram" &&
      (!/^[\d\s\W]*$/.test(value) || value.includes(" "))
    ) {
      return; // игнорируем ввод, если в строке есть что-то кроме цифр и спецсимволов
    }

    if (condition && condition === "time" && !/^[\d:]*$/.test(value)) {
      return; // игнорируем ввод, если в строке есть что-то кроме цифр и двоеточия
    }

    if (condition && condition === "time") {
      if (e.nativeEvent.inputType === "deleteContentBackward") {
        setInputValue(value);
        onInputChange(value);
        return;
      }
      // Проверяем, если значение содержит только цифры
      if (/^\d*$/.test(value)) {
        // Разрешаем пользователю стирать значение из инпута, даже если введено двоеточие
        setInputValue(value);
        onInputChange(value);

        // Автоматически добавляем двоеточие после ввода двух цифр
        if (value.length === 2) {
          setInputValue(value + ":");
          onInputChange(value + ":");
          return;
        }
      }
    } else {
      setInputValue(value);
      onInputChange(value);
      return;
    }

    setInputValue(value);
    onInputChange(value);
  };

  const handleDelete = () => {
    setInputValue("");
    setTypeInput(type);
    setView(false);
    onInputChange("");
  };

  const handeleInputFocus = () => {
    setInputActive(true);
  };

  const handleInputBlur = () => {
    setInputActive(false);
  };

  return (
    <div className={styles.contaner}>
      {title && (
        <span className={styles.title}>
          {title}
          {required && <span style={{ color: "red" }}>*</span>}
        </span>
      )}
      <div
        className={styles[inputStyle]}
        style={{
          backgroundColor: inputColor,
          height: inputSize,
          border: `1px solid ${borderColor}`,
        }}
      >
        <input
          placeholder={placeholder}
          type={typeInput}
          value={inputValue}
          onChange={handleChange}
          style={{ backgroundColor: inputColor }}
          disabled={disabled}
          onFocus={handeleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
        ></input>
        {typeInput === "password" &&
          inputValue !== "" &&
          view === false &&
          !disabled && (
            // <img
            //   src={eyeIcon}
            //   alt="show"
            //   width={16}
            //   height={16}
            //   onClick={handleView}
            // />
            <EyeIcon onClick={handleView} className={styles.cross} />
          )}
        {typeInput === "password" &&
          inputValue !== "" &&
          view === true &&
          !disabled && (
            // <img
            //   src={eyeSlashIcon}
            //   width={16}
            //   height={16}
            //   onClick={handleNoView}
            // />
            <EyeSlashIcon onClick={handleNoView} className={styles.cross} />
          )}
        {cross && inputValue !== "" && !disabled && (
          <CrossIcon className={styles.cross} onClick={handleDelete} />
        )}
      </div>
      {error && <span className={styles.errorDesc}>{error}</span>}
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
}

export default CustomInput;
