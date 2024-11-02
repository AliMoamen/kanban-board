import PropTypes from "prop-types";
import Subtask from "./Subtask";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../apis/dataContext";
import "../styles/TaskDetails.scss";
import DeleteForm from "./DeleteForm";
import TaskForm from "./TaskForm";

const TaskDetails = ({
  columnID,
  taskID,
  title,
  description,
  status,
  subtasks,
}) => {
  const { board, getBoardData, countCompleted, overlay, setOverlay } =
    useContext(DataContext);
  const [actions, setActions] = useState(false);
  const boardData = getBoardData(board);
  useEffect(() => {
    setActions(false);
  }, [overlay]);
  const handleEditTask = () => {
    setOverlay(
      <TaskForm
        type="edit"
        title={title}
        description={description}
        subtasks={subtasks}
        columnID={columnID}
        taskID={taskID}
        submitText="Save Changes"
      />
    );
  };
  console.log(columnID);
  console.log(status);
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
                  setOverlay(
                    <DeleteForm
                      columnID={columnID}
                      taskID={taskID}
                      type="task"
                      name={title}
                    />
                  )
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
        {boardData.columns.map((column, index) => {
          return (
            <option selected={status === column._id.toString()} key={index}>
              {column.title.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

TaskDetails.propTypes = {
  columnID: PropTypes.string.isRequired,
  taskID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
};

export default TaskDetails;
