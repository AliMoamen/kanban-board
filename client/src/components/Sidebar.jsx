import { useContext } from "react";
import "../styles/Sidebar.scss";
import { DataContext } from "../apis/dataContext";
import BoardButton from "./BoardButton";
import BoardForm from "./BoardForm";

const Sidebar = () => {
  // Destructure necessary values from DataContext
  const { data, board, setOverlay, setUser, setData, userInfo } =
    useContext(DataContext);

  // Function to handle the creation of a new board
  const handleNewBoard = () => {
    setOverlay(
      <BoardForm
        type="add"
        title={"Add New Board"}
        submitText={"Create New Board"}
      />
    );
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
    setData([]); // Clear data state
  };

  return (
    <div className="sidebar">
      <div>
        <a href="">
          <img className="logo" src="/logo-dark.svg" alt="logo-dark.svg" />
        </a>
        <p style={{ marginBottom: "15px" }} className="heading-s">
          ALL BOARDS ({data.length}) {/* Display the number of boards */}
        </p>
        <div className="board-column">
          {/* Map through the data to display each board */}
          {data.map(({ title, _id }, index) => {
            return (
              <BoardButton
                title={title}
                selected={_id === board} // Highlight the selected board
                id={_id}
                key={index}
              />
            );
          })}
          {/* Button to create a new board */}
          <button onClick={handleNewBoard} className="board-button">
            <img src="/icon-board-primary.svg" alt="icon-board.svg" />
            <p className="primary heading-s">+ Create New Board</p>
          </button>
        </div>
      </div>
      <div className="user-info-box">
        <p className="heading-s">{userInfo.email}</p> {/* Display user email */}
        <button onClick={handleLogout} className="button-destructive">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
