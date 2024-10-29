import "../styles/Toolbar.scss";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../apis/dataContext";
import NewTaskForm from "./NewTaskForm";
import DeleteForm from "./DeleteForm";

const Toolbar = () => {
  const [actions, setActions] = useState(false);
  const { data, board, getColumns, setOverlay, overlay } =
    useContext(DataContext);
  const handleNewTask = () => {
    setOverlay(<NewTaskForm />);
  };
  useEffect(() => {
    setActions(false);
  }, [board, overlay]);
  return (
    <div className="toolbar">
      <p className="heading-l">{data.find((item) => item.id === board).name}</p>
      <div className="tools-container">
        <button
          disabled={getColumns(board).length === 0}
          onClick={handleNewTask}
          className="button-primary"
        >
          + Add New Task
        </button>
        <button
          onClick={() => setActions(!actions)}
          className="icon-button ellipsis"
        >
          <img
            src="icon-vertical-ellipsis.svg"
            alt="icon-vertical-ellipsis.svg"
          />
          {actions ? (
            <div className="action-box">
              <button>
                {" "}
                <p className="body-s text-color">Edit Board</p>
              </button>
              <button onClick={() => setOverlay(<DeleteForm />)}>
                <p className="body- destructive">Delete Board</p>
              </button>
            </div>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
