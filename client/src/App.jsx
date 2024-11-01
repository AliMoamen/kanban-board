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

  const getBoardData = (id) => {
    const board = data.find((board) => board._id.toString() === id);
    if (!board) {
      console.warn(`Board with ID ${id} not found.`);
    }
    return board;
  };

  const getColumns = (id) => {
    const boardData = getBoardData(id);
    return boardData ? boardData.columns.map(({ title }) => title) : [];
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
      if (data.length > 0) {
        setBoard(data[data.length - 1]._id.toString());
      } else {
        console.warn("No boards available for the user.");
      }
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
        getColumns,
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
