import { useContext } from "react";
import "../styles/Content.scss";
import Toolbar from "./Toolbar";
import { DataContext } from "../apis/dataContext";
import Column from "./Column";
import BoardForm from "./BoardForm";

const Content = () => {
  const { getBoardData, board, setOverlay } = useContext(DataContext);
  const boardData = getBoardData(board);
  const { columns } = boardData;
  return (
    <div className="content">
      <Toolbar />
      <div>
        {columns.length ? (
          <div className="columns-box">
            {columns.map(({ title, tasks }, index) => (
              <Column key={index} title={title} tasks={tasks} />
            ))}
          </div>
        ) : (
          <div className="empty-box">
            <p className="heading-l empty-message">
              The board is empty. Create a new column to get started.
            </p>
            <button
              onClick={() =>
                setOverlay(
                  <BoardForm
                    title="Edit Board"
                    submitText="Save Changes"
                    boardName={boardData.title}
                  />
                )
              }
              className="button-primary"
            >
              + Add New Column
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
