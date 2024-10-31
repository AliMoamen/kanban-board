import PropTypes from "prop-types";
import "../styles/Subtask.scss";
import { useState } from "react";
const Subtask = ({ title, isCompleted }) => {
  const [checked, setChecked] = useState(isCompleted);
  return (
    <div className="subtask">
      <button
        style={{ backgroundColor: !checked ? "white" : "#635fc7" }}
        onClick={() => setChecked(!checked)}
        className="checkbox"
      >
        {checked ? <img src="icon-check.svg" alt="icon-check.svg" /> : null}
      </button>
      <p
        className="heading-m text-color"
        style={{ textDecoration: checked ? "line-through" : "initial" }}
      >
        {title}
      </p>
    </div>
  );
};
Subtask.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default Subtask;
