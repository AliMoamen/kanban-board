import "../styles/Toolbar.scss";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
import NewTaskForm from "./NewTaskForm";

const Toolbar = () => {
  const { data, board, setOverlay } = useContext(DataContext);
  const handleNewTask = () => {
    setOverlay(<NewTaskForm />);
  };
  return (
    <div className="toolbar">
      <p className="heading-l">{data.find((item) => item.id === board).name}</p>
      <button onClick={handleNewTask} className="button-primary">
        + Add New Task
      </button>
    </div>
  );
};

export default Toolbar;
