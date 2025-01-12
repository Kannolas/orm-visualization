import { ConfigProvider, Select } from "antd";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

function SelectAntdV2({
  defaultValue,
  options,
  onChange,
  size,
  title,
  required,
  placeholder,
  disabled,
  dropdownRender,
  path,
  keyId,
  status,
  color,
  isColorType,
}) {
  const handleChange = (option) => {
    console.log("op", option);
    onChange(option);
  };

  // const getNestedValue = (obj, path) => {
  //   return path.split(".").reduce((acc, key) => acc[key], obj);
  // };

  // const getOptionKey = (obj, keyId) => {
  //   return keyId.split(".").reduce((acc, key) => acc[key], obj);
  // };

  const [selectColor, setSelectColor] = useState("#FFFFFF");

  useEffect(() => {
    if (color && color === "grey") {
      setSelectColor("#F8F8FA");
    }
  }, [color]);

  return (
    <div className={styles.contaner}>
      {title && (
        <span className={styles.title}>
          {title}
          {required && <span style={{ color: "red" }}>*</span>}
        </span>
      )}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7700ff",
            borderRadius: 2,
            colorBorder: "#ffffff",
            colorBgContainer: selectColor,
            controlHeight: 32,
          },
          components: {
            Select: {
              optionSelectedBg: "#e8eced",
            },
          },
        }}
      >
        <Select
          value={defaultValue}
          // defaultValue={defaultValue}
          placeholder={placeholder}
          status={status}
          onChange={(value) => handleChange(value)}
          className={styles.select}
          size={size}
          disabled={disabled}
          options={options?.map((item, index) => ({
            label: item.title,
            value: item.value,
            key: index,
          }))}
          // options={[{ value: "sample", label: <span>sample</span> }]}
        ></Select>
      </ConfigProvider>
    </div>
  );
}

export default SelectAntdV2;
