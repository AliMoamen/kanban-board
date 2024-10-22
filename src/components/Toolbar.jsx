import "../styles/Toolbar.scss";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";

const Toolbar = () => {
  const { data, board } = useContext(DataContext);
  return (
    <div className="toolbar">
      <p className="heading-l">{data.find((item) => item.id === board).name}</p>
      <button className="button-primary">+ Add New Task</button>
    </div>
  );
};

export default Toolbar;
