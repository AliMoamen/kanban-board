import "../styles/Toolbar.scss";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../apis/dataContext";
import TaskForm from "./TaskForm";
import DeleteForm from "./DeleteForm";
import BoardForm from "./BoardForm";

const Toolbar = () => {
  const [actions, setActions] = useState(false);
  const { board, getBoardData, getColumns, setOverlay, overlay } =
    useContext(DataContext);
  const boardData = getBoardData(board);
  const boardColumns = getColumns(board);

  useEffect(() => {
    setActions(false);
  }, [board, overlay]);
  return (
    <div className="toolbar">
      <p className="heading-l">{boardData.title}</p>
      <div className="tools-container">
        <button
          disabled={boardColumns.length === 0}
          onClick={() => setOverlay(<TaskForm />)}
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
              <button
                onClick={() => {
                  setOverlay(
                    <BoardForm
                      type="edit"
                      title="Edit Board"
                      submitText="Save Changes"
                      boardName={boardData.title}
                      boardColumns={boardData.columns}
                    />
                  );
                }}
              >
                {" "}
                <p className="body-s text-color">Edit Board</p>
              </button>
              <button
                onClick={() =>
                  setOverlay(<DeleteForm type="board" name={boardData.title} />)
                }
              >
                <p className="body-ss destructive">Delete Board</p>
              </button>
            </div>
          ) : null}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
