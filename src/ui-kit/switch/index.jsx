import { useEffect, useState } from "react";
import { ConfigProvider, Switch } from "antd";

function SwitchAntd({ data, onSwitchClick, color, disabled }) {
  const [switchColor, setSwitchColor] = useState("#00d359");

  useEffect(() => {
    if (color && color === "purple") {
      setSwitchColor("#7700ff");
    }
  }, [color]);

  const handleClick = () => {
    onSwitchClick();
  };
  return (
    // <div
    //   className={data ? styles[switchColor] : styles.contaner}
    //   onClick={handleClick}
    // >
    //   <div className={styles.switch}></div>
    // </div>

    <ConfigProvider
      theme={{
        token: {
          colorPrimary: switchColor,
        },
      }}
    >
      <Switch
        size="small"
        onChange={handleClick}
        checked={data}
        disabled={disabled}
      />
    </ConfigProvider>
  );
}

export default SwitchAntd;
