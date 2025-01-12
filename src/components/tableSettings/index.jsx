import { useEffect, useState } from "react";
import SearchInput from "../../ui-kit/searchInput";
import styles from "./styles.module.css";

import SwitchAntd from "../../ui-kit/switch";

function TableSettings({ data, onUpdateSettings }) {
  const [searchValue, setSearchValue] = useState("");

  const [tableSettings, setTableSettings] = useState(data);
  const [filteredItems, setFilteredItems] = useState(data);

  const handleSwitchClick = (id) => {
    setTableSettings((prevSettings) => {
      const newSettings = prevSettings.map((item) => {
        if (item.id === id) {
          return { ...item, status: !item.status };
        } else {
          return item;
        }
      });
      onUpdateSettings(newSettings);
      return newSettings;
    });
  };

  const handleSearch = (searchTerm) => {
    const filtered = tableSettings.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setSearchValue(searchTerm);
  };

  useEffect(() => {
    setFilteredItems(
      tableSettings.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, tableSettings]);

  // const highlightSearchTerm = (text, searchTerm) => {
  //   const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  //   return parts.map((part, index) =>
  //     part.toLowerCase() === searchTerm.toLowerCase() ? (
  //       <span style={{ color: "red" }} className={styles.searchHighlights}>
  //         {part}
  //       </span>
  //     ) : (
  //       <span className={styles.titleName}>{part}</span>
  //     )
  //   );
  // };

  return (
    <div className={styles.contaner}>
      <div className={styles.body}>
        <div className={styles.search}>
          <SearchInput
            data={searchValue}
            cross={true}
            onInputChange={handleSearch}
            placeholder="Поиск"
          />
        </div>
        <div className={styles.title}>
          {filteredItems.map((item, index) => (
            <>
              {!item.required && (
                <div className={styles.setting} key={item.id}>
                  <div className={styles.titleItem}>
                    {/* <img src={icon} /> */}
                    <span>{item.name}</span>
                    {/* {highlightSearchTerm(item.name, searchValue)} */}
                  </div>
                  <SwitchAntd
                    data={item.status}
                    onSwitchClick={() => handleSwitchClick(item.id)}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TableSettings;
