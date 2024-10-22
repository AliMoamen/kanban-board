import { useContext } from "react";
import "../styles/Content.scss";
import Toolbar from "./Toolbar";
import { DataContext } from "../apis/dataContext";
import BoardButton from "./BoardButton";

const Content = () => {
  const { board } = useContext(DataContext);
  const { columns } = { board };
  return (
    <div className="content">
      <Toolbar />
      {columns.length ? (
        <BoardButton />
      ) : (
        <div className="empty-box">
          <p className="heading-l empty-message">
            The board is empty. Create a new column to get started.
          </p>
          <button className="button-primary">+ Add New Column</button>
        </div>
      )}
    </div>
  );
};

export default Content;
