import PropTypes from "prop-types";
import Task from "./Task";
import "../styles/Column.scss";
import { useContext } from "react";
import { DataContext } from "../apis/dataContext";

const Column = ({ columnID, title, tasks }) => {
  const { countCompleted, showCompleted } = useContext(DataContext);

  // Calculate visible tasks based on the showCompleted state
  const visibleTasks = tasks.filter(({ subtasks }) => {
    const completedCount = countCompleted(subtasks);
    const isCompleted = completedCount === subtasks.length;
    return showCompleted || (!showCompleted && !isCompleted);
  });

  return (
    <div className="column-box">
      <p className="body-m text-color">
        {title.toUpperCase()} ({visibleTasks.length}) {/* Update count */}
      </p>
      {visibleTasks.map(({ _id, title, description, status, subtasks }) => (
        <Task
          key={_id} // Using _id for unique key
          title={title}
          description={description}
          status={status}
          subtasks={subtasks}
          columnID={columnID}
          taskID={_id}
        />
      ))}
    </div>
  );
};

Column.propTypes = {
  columnID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default Column;
