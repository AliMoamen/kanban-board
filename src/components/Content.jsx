import { useContext } from "react";
import "../styles/Content.scss";
import Toolbar from "./Toolbar";
import { DataContext } from "../apis/dataContext";
import Column from "./Column";

const Content = () => {
  const { data, board } = useContext(DataContext);
  const boardData = data.filter(({ id }) => id === board)[0];
  const { columns } = boardData;
  return (
    <div className="content">
      <Toolbar />
      <div>
        {columns.length ? (
          <div className="columns-box">
            {columns.map(({ name, tasks }, index) => (
              <Column key={index} name={name} tasks={tasks} />
            ))}
          </div>
        ) : (
          <div className="empty-box">
            <p className="heading-l empty-message">
              The board is empty. Create a new column to get started.
            </p>
            <button className="button-primary">+ Add New Column</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
