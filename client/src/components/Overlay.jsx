import PropTypes from "prop-types";
import "../styles/Overlay.scss";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";

const Overlay = ({ children }) => {
  const { user, setOverlay } = useContext(DataContext);

  return (
    <>
      <div
        onClick={() => {
          if (user) {
            setOverlay(null); // Close the overlay if user is logged in
          }
        }}
        className="overlay-background"
      ></div>
      <div className="overlay-content">
        <div className="children">{children}</div>{" "}
        {/* Render the children components */}
      </div>
    </>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired, // Prop type validation for children
};

export default Overlay;
