import PropTypes from "prop-types";
import Task from "./Task";
import "../styles/Column.scss";

const Column = ({ name, tasks }) => {
  return (
    <div className="column-box">
      <p className="body-m text-color">
        {name.toUpperCase()} ({tasks.length})
      </p>
      {tasks.map(({ id, title, description, status, subtasks }, index) => (
        <Task
          key={index}
          title={title}
          description={description}
          status={status}
          subtasks={subtasks}
          taskID={id}
        />
      ))}
    </div>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default Column;
