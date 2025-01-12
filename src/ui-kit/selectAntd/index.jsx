import { ConfigProvider, Select } from "antd";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

function SelectAntd({
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
}) {
  const handleChange = (option) => {
    onChange(option);
  };

  // const getNestedValue = (obj, path) => {
  //   return path.split(".").reduce((acc, key) => acc[key], obj);
  // };

  // const getOptionKey = (obj, keyId) => {
  //   return keyId.split(".").reduce((acc, key) => acc[key], obj);
  // };

  const getNestedValue = (obj, path) => {
    return path.reduce((acc, key) => acc && acc[key], obj);
  };

  const getOptionKey = (obj, keyId) => {
    return keyId.reduce((acc, key) => acc && acc[key], obj);
  };

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
          onChange={handleChange}
          className={styles.select}
          size={size}
          disabled={disabled}
          dropdownRender={dropdownRender ? () => dropdownRender : false}
          options={options?.map((item, index) => ({
            label: getNestedValue(item, path),
            value: getOptionKey(item, keyId),
            key: index,
          }))}
          // options={[{ value: "sample", label: <span>sample</span> }]}
        ></Select>
      </ConfigProvider>
    </div>
  );
}

export default SelectAntd;
