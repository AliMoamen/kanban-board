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
            setOverlay(null);
          }
        }}
        className="overlay-background"
      ></div>
      <div className="overlay-content">
        <div className="children">{children}</div>
      </div>
    </>
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Overlay;
