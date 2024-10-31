import PropTypes from "prop-types";
import Subtask from "./Subtask";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../apis/dataContext";
import "../styles/TaskDetails.scss";
import DeleteForm from "./DeleteForm";
import TaskForm from "./TaskForm";
import NewItem from "./NewItem";
import { v4 as uuid } from "uuid";
const TaskDetails = ({ title, description, status, subtasks }) => {
  const { board, getColumns, countCompleted, overlay, setOverlay } =
    useContext(DataContext);
  const [actions, setActions] = useState(false);
  const columns = getColumns(board);
  useEffect(() => {
    setActions(false);
  }, [overlay]);
  const handleEditTask = () => {
    const taskItems = [];
    subtasks.forEach(({ title }) => {
      const id = uuid();
      taskItems.push({
        id,
        item: <NewItem key={id} item_id={id} value={title} />,
      });
    });
    setOverlay(
      <TaskForm
        type="edit"
        title={title}
        description={description}
        status={status}
        subtasks={taskItems}
      />
    );
  };
  return (
    <div className="form">
      <div className="title-box">
        <p className="heading-l">{title}</p>
        <button
          onClick={() => setActions(!actions)}
          className="icon-button ellipsis"
        >
          <img
            src="icon-vertical-ellipsis.svg"
            alt="icon-vertical-ellipsis.svg"
          />
          {actions ? (
            <div className="action-box task-action-box">
              <button onClick={handleEditTask}>
                {" "}
                <p className="body-s text-color">Edit Task</p>
              </button>
              <button
                onClick={() =>
                  setOverlay(<DeleteForm type="task" name={title} />)
                }
              >
                <p className="body-ss destructive">Delete Task</p>
              </button>
            </div>
          ) : null}
        </button>
      </div>

      <p className="body-l text-color">{description}</p>
      <p className="body-m text-color">
        Subtasks {`(${countCompleted(subtasks)} of ${subtasks.length})`}
      </p>
      {subtasks.map(({ title, isCompleted }, index) => {
        return <Subtask key={index} title={title} isCompleted={isCompleted} />;
      })}
      <p className="body-m text-color">Current Status</p>
      <select name="" id="">
        {columns.map((name, index) => {
          return (
            <option selected={status === name} key={index}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

TaskDetails.propTypes = {
  taskID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
};

export default TaskDetails;
