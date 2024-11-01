import "../styles/BoardButton.scss";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DataContext } from "../apis/dataContext";
const BoardButton = ({ title, selected, id }) => {
  const [hovered, setHovered] = useState(false);
  const { setBoard } = useContext(DataContext);
  return (
    <button
      style={
        selected
          ? { backgroundColor: "#635fc7" }
          : hovered
          ? { backgroundColor: "rgba(99,59,199,0.1)" }
          : null
      }
      onClick={() => setBoard(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="board-button"
    >
      <img
        src={
          selected
            ? "/icon-board-white.svg"
            : hovered
            ? "/icon-board-primary.svg"
            : "/icon-board.svg"
        }
        alt="icon-board.svg"
      />
      <p
        className="heading-s board-name"
        style={
          selected ? { color: "white" } : hovered ? { color: "#635fc7" } : null
        }
      >
        {title}
      </p>
    </button>
  );
};

BoardButton.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default BoardButton;
