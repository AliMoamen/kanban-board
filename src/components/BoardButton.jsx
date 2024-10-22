import "../styles/BoardButton.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
const BoardButton = ({ name, selected, id }) => {
  const { setBoard } = useContext(DataContext);
  return (
    <button
      style={selected ? { backgroundColor: "#635fc7" } : {}}
      onClick={() => setBoard(id)}
      className={selected ? "board-button" : "board-button"}
    >
      <img
        src={selected ? "/icon-board-white.svg" : "/icon-board.svg"}
        alt="icon-board.svg"
      />
      <p
        className="heading-s board-name"
        style={selected ? { color: "white" } : {}}
      >
        {name}
      </p>
    </button>
  );
};

BoardButton.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default BoardButton;
