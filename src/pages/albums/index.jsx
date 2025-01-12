import { useEffect, useState } from "react";
import Header from "../../components/header";
import SearchInput from "../../ui-kit/searchInput";
import styles from "./styles.module.css";
import Button from "../../ui-kit/button";
import filterIcon from "../../assets/icons/filter.svg";
import tableIcon from "../../assets/icons/table.svg";
import TableHeader from "../../components/table/tableHeader";
import Column from "../../components/table/column";
import {
  useAddAlbumMutation,
  useDeleteAlbumMutation,
  useGetAlbumsQuery,
} from "../../redux/api";
import TableSettings from "../../components/tableSettings";

import Modal from "../../components/modal";
import warnIcon from "../../assets/icons/Warn.svg";

import { ReactComponent as DeleteIcon } from "../../assets/icons/Delete.svg";
import Filter from "../../components/filter";
import CustomInput from "../../ui-kit/customInput";
import Loader from "../../ui-kit/loader";
import { Tooltip } from "antd";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { openFilter } from "../../redux/slices/filterSlice";

const Table = ({ tableSettings, searchValue }) => {
  const dispatch = useDispatch();
  const params = useSelector((state) => state.filter.value);
  const createOpen = useSelector((state) => state.filter.is_open);
  const {
    data: devicesData,
    refetch,
    isLoading,
    isFetching,
  } = useGetAlbumsQuery(params);

  const [devices, setDevices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deviceId, setDeviceId] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    fullname: null,
    record_book: null,
    birth_date: null,
    create_date: null,
  });

  useEffect(() => {
    if (devicesData) {
      setDevices(devicesData);
    }
  }, [devicesData]);
  useEffect(() => {
    setFilteredItems(devices);
  }, [devices]);

  const handleModalOpen = (id) => {
    setModalOpen(true);
    setDeviceId(id);
  };

  const [deleteStudent] = useDeleteAlbumMutation();

  const handleDelete = async () => {
    await deleteStudent(deviceId);
    setModalOpen(false);
    refetch();
  };

  const [countColumns, setCountColumns] = useState();

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < tableSettings.length; i++) {
      if (tableSettings[i].status === true) {
        count++;
      }
    }
    setCountColumns(count);
  }, [tableSettings]);

  useEffect(() => {
    setFilteredItems(
      devices.filter(
        (item) =>
          item.fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.record_book
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.birth_date.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.create_date.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, filteredItems, devices]);

  const handleInputChange = (key, value) => {
    if (key === "birth_date" || key === "create_date") {
      setStudentInfo({
        ...studentInfo,
        [key]: new Date(value),
      });
    }
    setStudentInfo({
      ...studentInfo,
      [key]: value,
    });
  };

  const [addAlbum] = useAddAlbumMutation();

  const handleAddAlbum = async () => {
    const response = await addAlbum({
      fullname: studentInfo.fullname,
      record_book: Number(studentInfo.record_book),
      birth_date: studentInfo.birth_date + "T00:00:00Z",
      create_date: studentInfo.create_date + "T00:00:00Z",
    });
    if (response.error) {
      dispatch(openFilter());
      return;
    }
    dispatch(openFilter());
    setStudentInfo({
      fullname: null,
      record_book: null,
      birth_date: null,
      create_date: null,
    });
    refetch();
  };

  if (isLoading || isFetching) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  } else
    return (
      <div className={styles.tableContaner}>
        <div className={styles.tableHeader}>
          {tableSettings[0].status === true && (
            <div
              className={styles.column}
              style={{
                width: `calc(93%/ ${countColumns})`,
              }}
            >
              <TableHeader data="ID" sort={true} />
            </div>
          )}
          {tableSettings[1].status === true && (
            <div
              className={styles.column}
              style={{
                width: `calc(93%/ ${countColumns})`,
              }}
            >
              <TableHeader data="ФИО" sort={true} />
            </div>
          )}
          {tableSettings[2].status === true && (
            <div
              className={styles.column}
              style={{
                width: `calc(93%/ ${countColumns})`,
              }}
            >
              <TableHeader data="Номер студентческого" sort={true} />
            </div>
          )}
          {tableSettings[3].status === true && (
            <div
              className={styles.column}
              style={{
                width: `calc(93%/ ${countColumns})`,
              }}
            >
              <TableHeader data="Дата рождения" sort={true} />
            </div>
          )}
          {tableSettings[4].status === true && (
            <div
              className={styles.column}
              style={{
                width: `calc(93%/ ${countColumns})`,
              }}
            >
              <TableHeader data="Дата поступления" sort={true} />
            </div>
          )}
          <div className={styles.editcolumn}>
            <TableHeader data="" />
          </div>
        </div>
        <div className={styles.columns}>
          {filteredItems.map((item) => (
            <div className={styles.row}>
              {tableSettings[0].status === true && (
                <div
                  className={styles.column}
                  style={{
                    width: `calc(93%/ ${countColumns})`,
                  }}
                >
                  <Column data={item.id} hint={true} />
                </div>
              )}
              {tableSettings[1].status === true && (
                <div
                  className={styles.column}
                  style={{
                    width: `calc(93%/ ${countColumns})`,
                  }}
                >
                  <Column data={item.fullname} hint={true} />
                </div>
              )}
              {tableSettings[2].status === true && (
                <div
                  className={styles.column}
                  style={{
                    width: `calc(93%/ ${countColumns})`,
                  }}
                >
                  <Column data={item.record_book} hint={true} />
                </div>
              )}
              {tableSettings[3].status === true && (
                <div
                  className={styles.column}
                  style={{
                    width: `calc(93%/ ${countColumns})`,
                  }}
                >
                  <Column data={item.birth_date} hint={true} />
                </div>
              )}
              {tableSettings[4].status === true && (
                <div
                  className={styles.column}
                  style={{
                    width: `calc(93%/ ${countColumns})`,
                  }}
                >
                  <Column data={item.create_date} hint={true} />
                </div>
              )}
              <div className={styles.editcolumn}>
                <Column
                  data={
                    <div className={styles.editBlock}>
                      <Tooltip
                        title={
                          <span style={{ color: "#000000" }}>Удалить</span>
                        }
                        color="#D8DFE1"
                        placement="bottom"
                      >
                        <DeleteIcon
                          className={styles.deleteicon}
                          onClick={() => {
                            handleModalOpen(item.id);
                          }}
                        />
                      </Tooltip>
                    </div>
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <Modal
            data={
              <div className={styles.modalContaner}>
                <img src={warnIcon} alt="dd" width={56} height={56} />
                <div className={styles.modalTitle}>
                  <h3>Отчислить студента?</h3>
                  <span>
                    Данные студента сразу же будут переданы военкомату!
                  </span>
                </div>
                <div className={styles.modalButtons}>
                  <Button
                    title="Отмена"
                    size="middle"
                    color="grey"
                    onButtonClick={() => {
                      setModalOpen(false);
                    }}
                  />
                  <Button
                    title="Удалить"
                    size="middle"
                    color="orange"
                    onButtonClick={handleDelete}
                  />
                </div>
              </div>
            }
          />
        )}

        {createOpen && (
          <Modal
            data={
              <div className={styles.modalStudentContaner}>
                <div className={styles.modalTitle}>
                  <h3>Зачисление студента</h3>
                </div>
                <div className={styles.fields}>
                  <CustomInput
                    data={studentInfo.fullname}
                    title="ФИО"
                    onInputChange={(value) =>
                      handleInputChange("fullname", value)
                    }
                    cross={true}
                    type="text"
                    color="grey"
                    required={true}
                  />
                  <CustomInput
                    data={studentInfo.record_book}
                    title="Номер студенческого"
                    onInputChange={(value) =>
                      handleInputChange("record_book", value)
                    }
                    cross={true}
                    type="text"
                    color="grey"
                    required={true}
                  />
                  <CustomInput
                    data={studentInfo.birth_date}
                    title="Дата рождения"
                    onInputChange={(value) =>
                      handleInputChange("birth_date", value)
                    }
                    cross={true}
                    type="date"
                    color="grey"
                    required={true}
                  />
                  <CustomInput
                    data={studentInfo.create_date}
                    title="Дата поступления"
                    onInputChange={(value) =>
                      handleInputChange("create_date", value)
                    }
                    cross={true}
                    type="date"
                    color="grey"
                    required={true}
                  />
                </div>
                <div className={styles.modalButtons}>
                  <Button
                    title="Отмена"
                    size="middle"
                    color="grey"
                    onButtonClick={() => {
                      dispatch(openFilter());
                    }}
                  />
                  <Button
                    title="Сохранить"
                    size="middle"
                    color="purple"
                    onButtonClick={handleAddAlbum}
                  />
                </div>
              </div>
            }
          />
        )}
      </div>
    );
};

function AlbumPage() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [tableSettings, setTableSettings] = useLocalStorage(
    "albumsTableSettings",
    [
      { id: 1, name: "ID", status: true, required: true },
      { id: 2, name: "ФИО", status: true, required: false },
      { id: 3, name: "Студенческий", status: true, required: false },
      { id: 4, name: "Дата рождения", status: true, required: false },
      { id: 5, name: "Дата поступления", status: true, required: false },
    ]
  );

  const handleUpdateSettings = (updatedSettings) => {
    setTableSettings(updatedSettings);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <div className={styles.contaner}>
      <Header title="Список студентов" />
      <div className={styles.filters}>
        <div className={styles.search}>
          <SearchInput
            onInputChange={handleSearchChange}
            data={searchValue}
            cross={true}
            placeholder="Поиск"
          />
        </div>
        <div className={styles.buttons}>
          <Button
            title="Фильтр"
            size="middle"
            color="lowgrey"
            icon={<img src={filterIcon} alt="dd" />}
            onButtonClick={() => setFiltersOpen(!filtersOpen)}
          />
          <div className={styles.tabset}>
            <Button
              title="Настройки таблицы"
              size="middle"
              color="lowgrey"
              icon={<img src={tableIcon} alt="dd" />}
              onButtonClick={() => {
                setSettingsOpen(!settingsOpen);
              }}
            />
            {settingsOpen && (
              <div className={styles.tablesettings}>
                <TableSettings
                  data={tableSettings}
                  onUpdateSettings={handleUpdateSettings}
                />
              </div>
            )}
          </div>

          <Button
            title="Зачислить студента"
            size="middle"
            color="purple"
            onButtonClick={() => dispatch(openFilter())}
          />
        </div>
      </div>
      {filtersOpen && <Filter />}

      <Table tableSettings={tableSettings} searchValue={searchValue} />
    </div>
  );
}
export default AlbumPage;
