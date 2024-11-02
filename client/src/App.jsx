import "./styles/index.scss";
import "./styles/typography.scss";
import "./styles/colors.scss";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { DataContext } from "./apis/dataContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Content from "./components/Content";
import Overlay from "./components/Overlay";
import SignInForm from "./components/SigninForm";
import Spinner from "./components/Spinner"; // Import the Spinner component

function App() {
  const api = axios.create({
    baseURL: "http://localhost:3000/data/",
  });

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [board, setBoard] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  const getBoardData = (boardID) => {
    const board = data.find((board) => board._id.toString() === boardID);
    if (!board) {
      console.warn(`Board with ID ${boardID} not found.`);
    }
    return board;
  };

  const getColumnData = (boardID, columnID) => {
    const boardData = getBoardData(boardID);
    return boardData.columns.find(
      (column) => column._id.toString() === columnID
    );
  };

  const getTaskData = (boardID, columnID, taskID) => {
    const columnData = getColumnData(boardID, columnID);
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
      const params = { ...userInfo };
      const { data } = await api.get(`/${user}/boards`, { params });
      setData(data);
      if (data.length) {
        setBoard(data[data.length - 1]._id.toString());
      }
      return data;
    } catch (err) {
      console.error(`Failed to Fetch Data: ${err.message}`, err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userId = decodedToken.sub;
        setUser(userId);
        setUserInfo({
          email: decodedToken.email,
          name: decodedToken.name,
          picture: decodedToken.picture,
        });
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setLoading(false); // Set loading to false after checking for the token
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        await fetchData();
      }
    })();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        user,
        setUser,
        userInfo,
        setUserInfo,
        board,
        setBoard,
        overlay,
        setOverlay,
        showCompleted,
        setShowCompleted,
        getBoardData,
        getColumnData,
        getTaskData,
        countCompleted,
        api,
        fetchData,
      }}
    >
      {loading ? ( // Show spinner while loading
        <Overlay>
          <Spinner />
        </Overlay>
      ) : overlay ? (
        <Overlay>{overlay}</Overlay>
      ) : !user ? (
        <Overlay>
          <SignInForm />
        </Overlay>
      ) : null}
      {user ? <Sidebar /> : null}
      {data.length ? <Content /> : null}
    </DataContext.Provider>
  );
}

export default App;
