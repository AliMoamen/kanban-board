import "./styles/index.scss";
import "./styles/typography.scss";
import "./styles/colors.scss";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { DataContext } from "./apis/dataContext";
import axios from "axios";
import Content from "./components/Content";
import Overlay from "./components/Overlay";

function App() {
  const api = axios.create({
    baseURL: "http://localhost:3000/data/",
  });
  const [data, setData] = useState([]);
  const [user, setUser] = useState("aliOsman");
  const [board, setBoard] = useState(null);
  const [overlay, setOverlay] = useState(null);

  const getBoardData = (boardID) => {
    const board = data.find((board) => board._id.toString() === boardID);
    if (!board) {
      console.warn(`Board with ID ${boardID} not found.`);
    }
    return board;
  };
  const getColumnData = (baordID, columnID) => {
    const boardData = getBoardData(baordID);
    return boardData.columns.find(
      (column) => column._id.toString() === columnID
    );
  };
  const getTaskData = (baordID, columnID, taskID) => {
    const columnData = getColumnData(baordID, columnID);
    return columnData.tasks.find((task) => task._id.toString() === taskID);
  };

  const countCompleted = (subtasks) => {
    return subtasks.reduce(
      (total, curr) => total + (curr.isCompleted ? 1 : 0),
      0
    );
  };

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/${user}/boards`);
      setData(data);
      setBoard(data[data.length - 1]._id.toString());
      return data;
    } catch (err) {
      console.error(`Failed to Fetch Data: ${err.message}`, err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        user,
        setUser,
        board,
        setBoard,
        overlay,
        setOverlay,
        getBoardData,
        getColumnData,
        getTaskData,
        countCompleted,
        api,
        fetchData,
      }}
    >
      {overlay ? <Overlay>{overlay}</Overlay> : null}
      <Sidebar />
      {data.length ? <Content /> : <p>Loading boards...</p>}
    </DataContext.Provider>
  );
}

export default App;
