import "../styles/BoardButton.scss";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DataContext } from "../apis/dataContext";

const BoardButton = ({ title, selected, id }) => {
  const [hovered, setHovered] = useState(false); // State to manage hover effect
  const { setBoard } = useContext(DataContext);

  return (
    <button
      style={
        selected
          ? { backgroundColor: "#635fc7" } // Background color when selected
          : hovered
          ? { backgroundColor: "rgba(99,59,199,0.1)" } // Background color when hovered
          : null
      }
      onClick={() => setBoard(id)} // Set the board ID on click
      onMouseEnter={() => setHovered(true)} // Set hovered state to true on mouse enter
      onMouseLeave={() => setHovered(false)} // Set hovered state to false on mouse leave
      className="board-button"
    >
      <img
        src={
          selected
            ? "/icon-board-white.svg" // Icon when selected
            : hovered
            ? "/icon-board-primary.svg" // Icon when hovered
            : "/icon-board.svg" // Default icon
        }
        alt="icon-board.svg"
      />
      <p
        className="heading-s board-name"
        style={
          selected ? { color: "white" } : hovered ? { color: "#635fc7" } : null
        } // Text color based on selected and hovered state
      >
        {title}
      </p>
    </button>
  );
};

BoardButton.propTypes = {
  title: PropTypes.string.isRequired, // Title of the board
  selected: PropTypes.bool.isRequired, // Whether the board is selected
  id: PropTypes.string.isRequired, // ID of the board
};

export default BoardButton;
