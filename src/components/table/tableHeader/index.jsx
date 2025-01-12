import styles from "./styles.module.css";
import sortIcon from "../../../assets/icons/Sort.svg";
import { Tooltip } from "antd";

function TableHeader({ data, sort }) {
  return (
    <div className={styles.contaner}>
      <div className={styles.tableTitle}>
        {sort && <img src={sortIcon} alt="dd" />}
        <Tooltip
          title={<span style={{ color: "#000000" }}>{data}</span>}
          color="#D8DFE1"
          placement="top"
        >
          <span>{data}</span>
        </Tooltip>
      </div>
    </div>
  );
}

export default TableHeader;
