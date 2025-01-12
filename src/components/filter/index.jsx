// import Select from "../../ui-kit/select";
import { useEffect, useState } from "react";
import Button from "../../ui-kit/button";
import CustomInput from "../../ui-kit/customInput";

import styles from "./styles.module.css";
// import { Select } from "antd";
import Select from "../../ui-kit/select";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../../redux/slices/filterSlice";

function Filter() {
  const dispatch = useDispatch();
  const FIELD_OPTIONS = [
    { title: "ID", value: "id" },
    { title: "ФИО", value: "fullname" },
    { title: "Номер студенческого", value: "record_book" },
    { title: "Дата рождения", value: "birth_date" },
    { title: "Дата поступления", value: "create_date" },
  ];

  const SQL_OPERATORS = [
    { title: "Равно", value: "IN" },
    { title: "Не равно", value: "NOT_IN" },
  ];

  const [rule, setRule] = useState({
    field: null,
    sql_op: null,
    value: null,
  });

  const [valueType, setValueType] = useState("text");

  const handleRuleChange = (key, value) => {
    console.log(value);
    if (key === "record_book" || key === "id") {
      setRule({
        ...rule,
        [key]: value,
      });
      return;
    }
    setRule({
      ...rule,
      [key]: value,
    });
  };

  useEffect(() => {
    console.log("aaaaaX");
    setRule({
      ...rule,
      sql_op: null,
      value: null,
    });
    if (rule.field === "birth_date" || rule.field === "create_date") {
      setValueType("date");
    }
    if (rule.field === "record_book" || rule.field === "id") {
      setValueType("number");
    }
  }, [rule]);

  const handleAddFilter = () => {
    dispatch(
      addFilter({
        params: `field=${rule.field}&sql_op=${rule.sql_op}&value=${rule.value}`,
      })
    );
  };

  const disabledCheck = () => {
    return Object.values(rule).some((value) => value === null || value === "");
  };

  const ClearF = () => {
    dispatch(removeFilter());
    setRule({
      field: "",
      sql_op: "",
      value: "",
    });
  };

  return (
    <div className={styles.contaner}>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <div className={styles.input}>
            {/* <SelectAntdV2
              options={FIELD_OPTIONS}
              defaultValue={rule.field}
              onChange={(value) => handleRuleChange("feild", value)}
              title="Поле"
            /> */}
            <Select
              placeholder="Выберите значение"
              title="Поле"
              data={rule.field}
              options={FIELD_OPTIONS}
              onSelectChange={(value) => handleRuleChange("field", value)}
            />
          </div>
          <div className={styles.input}>
            <Select
              placeholder="Выберите значение"
              title="Условие"
              data={rule.sql_op}
              options={SQL_OPERATORS}
              onSelectChange={(value) => handleRuleChange("sql_op", value)}
            />
          </div>
          <div className={styles.input}>
            <CustomInput
              cross={true}
              data={rule.value}
              placeholder="Введите значение"
              onInputChange={(value) => handleRuleChange("value", value)}
              type={valueType}
              title="Значение"
            />
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          title="Применить"
          color="purple"
          size="middle"
          onButtonClick={handleAddFilter}
          disabled={disabledCheck()}
        />
        <Button
          title="Сбросить"
          color="orange"
          size="middle"
          onButtonClick={ClearF}
        />
      </div>
    </div>
  );
}

export default Filter;
