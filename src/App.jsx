import { useDispatch, useSelector } from "react-redux";
import AlbumPage from "./pages/albums";
import Alert from "../src/ui-kit/alert";
import { useEffect } from "react";
import { close } from "./redux/slices/alertSlice";

function App() {
  const dispatch = useDispatch();

  const alerts = useSelector((state) => state.alert.alerts);

  const alertId = useSelector((state) => state.alert.index);

  useEffect(() => {
    console.log("alerts", JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(close(alertId));
    }, 10000);
  }, [alertId, dispatch]);

  return (
    <div className="App">
      <div className="alertblock">
        {alerts?.map((item, index) => (
          <Alert
            error={item?.error}
            desc={item?.desc}
            errorinfo={item?.errorinfo}
            index={item?.id}
          />
        ))}
      </div>
      <AlbumPage />
    </div>
  );
}

export default App;
