import { useContext } from "react";
import "../styles/Content.scss";
import Toolbar from "./Toolbar";
import { DataContext } from "../apis/dataContext";
import Column from "./Column";
import BoardForm from "./BoardForm";

const Content = () => {
  // Destructure necessary values from DataContext
  const { getBoardData, board, setOverlay } = useContext(DataContext);
  const boardData = getBoardData(board); // Get the current board data
  const { columns } = boardData; // Destructure columns from board data

  return (
    <div className="content">
      <Toolbar /> {/* Render the Toolbar component */}
      <div>
        {columns.length ? (
          <div className="columns-box">
            {/* Map through the columns to display each column */}
            {columns.map(({ _id, title, tasks }, index) => (
              <Column
                key={index}
                columnID={_id.toString()}
                title={title}
                tasks={tasks}
              />
            ))}
            {/* Button to add a new column */}
            <div
              className="add-new-column"
              onClick={() => {
                setOverlay(
                  <BoardForm
                    type="edit"
                    title="Edit Board"
                    submitText="Save Changes"
                    boardName={boardData.title}
                    boardColumns={[
                      ...boardData.columns,
                      { title: "", tasks: [] },
                    ]}
                  />
                );
              }}
            >
              <p className="heading-l text-color">+ New Column</p>
            </div>
          </div>
        ) : (
          <div className="empty-box">
            <p className="heading-l empty-message">
              The board is empty. Create a new column to get started.
            </p>
            {/* Button to add a new column when the board is empty */}
            <button
              onClick={() =>
                setOverlay(
                  <BoardForm
                    type="edit"
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
