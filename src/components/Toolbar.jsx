import "../styles/Toolbar.scss";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../apis/dataContext";
import TaskForm from "./TaskForm";
import DeleteForm from "./DeleteForm";
import { v4 as uuid } from "uuid";
import NewItem from "./NewItem";
import BoardForm from "./BoardForm";

const Toolbar = () => {
  const [actions, setActions] = useState(false);
  const { data, board, getBoardData, getColumns, setOverlay, overlay } =
    useContext(DataContext);
  const boardData = getBoardData(board);
  const boardColumns = getColumns(board);
  const handleEditBoard = () => {
    const boardItems = [];
    boardColumns.forEach((name) => {
      const id = uuid();

      boardItems.push({
        id,
        item: <NewItem key={id} item_id={id} value={name} />,
      });
    });
    setOverlay(
      <BoardForm
        title="Edit Board"
        submitText="Save Changes"
        boardName={boardData.name}
        boardItems={boardItems}
      />
    );
  };
  useEffect(() => {
    setActions(false);
  }, [board, overlay]);
  return (
    <div className="toolbar">
      <p className="heading-l">{data.find((item) => item.id === board).name}</p>
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
              <button onClick={handleEditBoard}>
                {" "}
                <p className="body-s text-color">Edit Board</p>
              </button>
              <button
                onClick={() =>
                  setOverlay(<DeleteForm type="board" name={boardData.name} />)
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
