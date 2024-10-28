import { useContext } from "react";
import "../styles/Sidebar.scss";
import { DataContext } from "../apis/dataContext";
import BoardButton from "./BoardButton";
import BoardForm from "./BoardForm";

const Sidebar = () => {
  const { data, board, setOverlay } = useContext(DataContext);
  const handleNewBoard = () => {
    setOverlay(
      <BoardForm title={"Add New Board"} submitText={"Create New Board"} />
    );
  };
  return (
    <div className="sidebar">
      <a href="">
        <img className="logo" src="/logo-dark.svg" alt="logo-light.svg" />
      </a>
      <p className="heading-s">ALL BOARDS ({data.length})</p>
      <div className="board-column">
        {data.map(({ name, id }, index) => {
          return index === board ? (
            <BoardButton name={name} selected={true} id={id} key={index} />
          ) : (
            <BoardButton name={name} selected={false} id={id} key={index} />
          );
        })}
        <button onClick={handleNewBoard} className="board-button">
          <img src="/icon-board-primary.svg" alt="icon-board.svg" />
          <p className="primary heading-s">+ Create New Board</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
