import PropTypes from "prop-types";
import "../styles/Task.scss";

const Task = ({ title, substasks }) => {
  return (
    <div className="task-box">
      <p className="heading-m">{title}</p>
      <p className="body-l text-color">{substasks.length} subtasks</p>
    </div>
  );
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  substasks: PropTypes.array.isRequired,
};

export default Task;
