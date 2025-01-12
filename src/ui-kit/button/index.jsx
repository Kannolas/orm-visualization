import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

function Button({ title, size, color, onButtonClick, icon, disabled }) {
  const [buttonSize, setButtonSize] = useState();
  const [buttonColor, setButtonColor] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [colorTitle, setColorTitle] = useState();

  useEffect(() => {
    if (size === "big") {
      setButtonSize("buttonBig");
    } else if (size === "middle") {
      setButtonSize("buttonMiddle");
    } else if (size === "verybig") {
      setButtonSize("buttonVeryBig");
    }

    if (color === "purple") {
      setButtonColor("#7700FF");
      setColorTitle("#ffffff");
    } else if (color === "orange") {
      setButtonColor("#FF4F12");
      setColorTitle("#ffffff");
    } else if (color === "grey") {
      setButtonColor("#E8ECED");
      setColorTitle("#101828");
    } else if (color === "lowgrey") {
      setButtonColor("#F8F8FA");
      setColorTitle("#101828");
    }
    if (disabled) {
      setButtonColor("#E8ECED");
      setColorTitle("#BABACE");
    }
  }, [size, color, disabled]); // Зависимости для useEffect

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onButtonClick();
  };

  return (
    <div
      className={`${styles.button} ${styles[buttonSize]}`}
      style={{
        backgroundColor: isHovered && !disabled ? "#C3C5C9" : buttonColor,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={disabled ? () => {} : handleClick}
    >
      {icon}
      <span style={{ color: isHovered && !disabled ? "#101828" : colorTitle }}>
        {title}
      </span>
    </div>
  );
}

export default Button;
