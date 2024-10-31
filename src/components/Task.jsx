import PropTypes from "prop-types";
import "../styles/Task.scss";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
import TaskDetails from "./TaskDetails";

const Task = ({ taskID, title, description, status, subtasks }) => {
  const { setOverlay, countCompleted } = useContext(DataContext);
  return (
    <div
      className="task-box"
      onClick={() =>
        setOverlay(
          <TaskDetails
            taskID={taskID}
            title={title}
            description={description}
            status={status}
            subtasks={subtasks}
          />
        )
      }
    >
      <p className="heading-m">{title}</p>
      <p className="body-l text-color">
        {`${countCompleted(subtasks)} of ${subtasks.length}`} subtasks
      </p>
    </div>
  );
};

Task.propTypes = {
  taskID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
};

export default Task;
