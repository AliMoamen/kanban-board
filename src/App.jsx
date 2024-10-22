import "./styles/index.scss";
import "./styles/typography.scss";
import "./styles/colors.scss";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { DataContext } from "./apis/dataContext";
import Content from "./components/Content";

function App() {
  const [data, setData] = useState([
    { id: 0, name: "Platform Launch", content: {} },
    { id: 1, name: "Marketing Plan", content: {} },
  ]);
  const [board, setBoard] = useState(data[0].id);
  return (
    <DataContext.Provider value={{ data, setData, board, setBoard }}>
      <Sidebar />
      <Content />
    </DataContext.Provider>
  );
}

export default App;
