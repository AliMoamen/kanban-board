import PropTypes from "prop-types";
import Task from "./Task";
import "../styles/Column.scss";

const Column = ({ columnID, title, tasks }) => {
  return (
    <div className="column-box">
      <p className="body-m text-color">
        {title.toUpperCase()} ({tasks.length})
      </p>
      {tasks.map(({ _id, title, description, status, subtasks }, index) => (
        <Task
          key={index}
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
