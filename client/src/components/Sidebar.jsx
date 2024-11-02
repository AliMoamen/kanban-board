import { useContext } from "react";
import "../styles/Sidebar.scss";
import { DataContext } from "../apis/dataContext";
import BoardButton from "./BoardButton";
import BoardForm from "./BoardForm";

const Sidebar = () => {
  const { data, board, setOverlay, setUser, setData } = useContext(DataContext);
  const handleNewBoard = () => {
    setOverlay(
      <BoardForm
        type="add"
        title={"Add New Board"}
        submitText={"Create New Board"}
      />
    );
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setData([]);
  };
  return (
    <div className="sidebar">
      <div>
        <a href="">
          <img className="logo" src="/logo-dark.svg" alt="logo-dark.svg" />
        </a>
        <p style={{ marginBottom: "15px" }} className="heading-s">
          ALL BOARDS ({data.length})
        </p>
        <div className="board-column">
          {data.map(({ title, _id }, index) => {
            return (
              <BoardButton
                title={title}
                selected={_id === board}
                id={_id}
                key={index}
              />
            );
          })}
          <button onClick={handleNewBoard} className="board-button">
            <img src="/icon-board-primary.svg" alt="icon-board.svg" />
            <p className="primary heading-s">+ Create New Board</p>
          </button>
        </div>
      </div>

      <button onClick={handleLogout} className="button-destructive">
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
