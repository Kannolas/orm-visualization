import { Tooltip } from "antd";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

function Column({ data, status, hint }) {
  const [colorStatus, setColorStatus] = useState();
  const [message, setMassage] = useState();

  useEffect(() => {
    if (status) {
      if (status === "STATUS_OK") {
        setColorStatus("#00D359");
        setMassage("Устройство доступно");
      }
      if (status === "STATUS_ERROR") {
        setColorStatus("#FF4F12");
        setMassage("Устройство недоступно");
      }
      if (status === "STATUS_UNSPECIFIED") {
        setColorStatus("#C3C5C9");
        setMassage("Cтатус неопределён");
      }
      if (status === "STATUS_UNKNOWN") {
        setColorStatus("#C3C5C9");
        setMassage("Cтатус неопределён");
      }
      if (status === "STATUS_WARN") {
        setColorStatus("#FFB608");
        setMassage("Были обнаружены ошибки");
      }
    }
  }, [status]);

  return (
    <div className={styles.contaner}>
      {status && (
        <Tooltip
          title={<span style={{ color: "#000000" }}>{message}</span>}
          color="#D8DFE1"
          placement="left"
        >
          <div
            className={styles.state}
            style={{ backgroundColor: colorStatus }}
          ></div>
        </Tooltip>
      )}
      <div className={styles.value}>
        {hint ? (
          <Tooltip
            title={<span style={{ color: "#000000" }}>{data}</span>}
            color="#D8DFE1"
            placement="right"
          >
            {data}
          </Tooltip>
        ) : (
          <>{data}</>
        )}
      </div>
    </div>
  );
}

export default Column;
