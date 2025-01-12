import styles from "./styles.module.css";
import { ReactComponent as BadIcon } from "../../assets/icons/bad-request.svg";
import { ReactComponent as SuccessIcon } from "../../assets/icons/succes-request.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-circle.svg";

import { useDispatch } from "react-redux";
import { close } from "../../redux/slices/alertSlice";
import { ReactComponent as Arrow } from "../../assets/icons/arrov.svg";
import { useState } from "react";

function Alert({ error, desc, errorinfo, index }) {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClose = () => {
    dispatch(close(index));
  };

  // useEffect(() => {
  //   if (autoClose) {
  //     const intervalId = setInterval(() => {
  //       setHeightPercentage((prevHeight) =>
  //         prevHeight > 0 ? prevHeight - 1 : prevHeight
  //       );
  //     }, 1000); // Decrease by 1% every second

  //     setTimeout(() => {
  //       clearInterval(intervalId);
  //     }, 10000); // Stop decreasing after 10 seconds
  //   }
  // }, []);

  return (
    <div className={styles.contaner}>
      <div
        className={styles.status_color}
        style={{
          backgroundColor: error ? "#FF4F12" : "#00D359",
        }}
      ></div>
      <div className={styles.body}>
        <div className={styles.buttons}>
          {error ? <BadIcon /> : <SuccessIcon />}
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{desc}</span>
          {errorinfo && (
            <div
              className={dropdownOpen ? styles.moreinfo : styles.moreinfohidden}
            >
              <span>{JSON.stringify(errorinfo)}</span>
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          {errorinfo && (
            <Arrow
              className={dropdownOpen ? styles.arrovActive : styles.arrovIcon}
              onClick={handleDropdownOpen}
            />
          )}
          <CloseIcon
            // onClick={() => dispatch(close(key))}
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Alert;
