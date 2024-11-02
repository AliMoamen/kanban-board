import PropTypes from "prop-types";
import "../styles/Task.scss";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
import TaskDetails from "./TaskDetails";

const Task = ({ columnID, taskID, title, description, status, subtasks }) => {
  const { setOverlay, countCompleted } = useContext(DataContext);
  const completed = countCompleted(subtasks);
  return (
    <div
      className="task-box"
      onClick={() =>
        setOverlay(
          <TaskDetails
            columnID={columnID}
            taskID={taskID}
            title={title}
            description={description}
            status={status}
            subtasks={subtasks}
          />
        )
      }
    >
      <p
        style={{
          textDecoration: completed === subtasks.length ? "line-through" : null,
        }}
        className="heading-m"
      >
        {title}
      </p>
      <p className="body-l text-color">
        {`${completed} of ${subtasks.length}`} subtasks
      </p>
    </div>
  );
};

Task.propTypes = {
  columnID: PropTypes.string.isRequired,
  taskID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
};

export default Task;
