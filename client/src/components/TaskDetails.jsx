import PropTypes from "prop-types";
import { useContext, useState } from "react";
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
  const { board, setBoard, getBoardData, setOverlay, user, api, fetchData } =
    useContext(DataContext);
  const [actions, setActions] = useState(false);
  const [taskData, setTaskData] = useState({
    title,
    description,
    status,
    subtasks,
  });
  const boardData = getBoardData(board);

  // Calculate completed subtasks dynamically
  const countCompleted = () =>
    taskData.subtasks.filter((subtask) => subtask.isCompleted).length;

  const handleEditTask = () => {
    setOverlay(
      <TaskForm
        type="edit"
        title={taskData.title}
        description={taskData.description}
        subtasks={taskData.subtasks}
        columnID={columnID}
        taskID={taskID}
        submitText="Save Changes"
        onSubmit={async (updatedData) => {
          setTaskData(updatedData); // Update taskData when form submits

          // API call to update the task when form is submitted
          try {
            await api.put(
              `/${user}/boards/${board}/${columnID}/tasks/${taskID}`,
              updatedData
            );
            await fetchData(); // Refresh data after updating
            setBoard(board);
          } catch (error) {
            console.error("Error updating task:", error);
            // Optional: Show an error message to the user
          }
          setOverlay(null); // Close overlay after submitting
        }}
      />
    );
  };

  const toggleSubtaskCompletion = (index) => {
    setTaskData((prevData) => {
      const updatedSubtasks = prevData.subtasks.map((subtask, i) =>
        i === index
          ? { ...subtask, isCompleted: !subtask.isCompleted }
          : subtask
      );
      return { ...prevData, subtasks: updatedSubtasks };
    });
  };

  return (
    <div className="form">
      <div className="title-box">
        <p className="heading-l">{taskData.title}</p>
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
                <p className="body-s text-color">Edit Task</p>
              </button>
              <button
                onClick={() =>
                  setOverlay(
                    <DeleteForm
                      columnID={columnID}
                      taskID={taskID}
                      type="task"
                      name={taskData.title}
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

      <p className="body-l text-color">{taskData.description}</p>
      <p className="body-m text-color">
        Subtasks ({countCompleted()} of {taskData.subtasks.length})
      </p>
      {taskData.subtasks.map((subtask, index) => (
        <div className="subtask" key={index}>
          <button
            style={{
              backgroundColor: subtask.isCompleted ? "#635fc7" : "white",
            }}
            onClick={() => toggleSubtaskCompletion(index)}
            className="checkbox"
          >
            {subtask.isCompleted ? (
              <img src="icon-check.svg" alt="icon-check.svg" />
            ) : null}
          </button>
          <p
            className="heading-m text-color"
            style={{
              textDecoration: subtask.isCompleted ? "line-through" : "initial",
            }}
          >
            {subtask.title}
          </p>
        </div>
      ))}

      <p className="body-m text-color">Current Status</p>
      <select
        name="status"
        id="status-select"
        value={taskData.status} // Set the value of the select based on taskData
        onChange={(e) =>
          setTaskData((prevData) => ({ ...prevData, status: e.target.value }))
        } // Update taskData on change
      >
        {boardData.columns.map((column, index) => (
          <option key={index} value={column._id.toString()}>
            {column.title.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Save Changes Button */}
      <button
        className="button-primary"
        onClick={async () => {
          // Save changes when button is clicked
          try {
            await api.put(
              `/${user}/boards/${board}/${columnID}/tasks/${taskID}`,
              taskData
            );
            await fetchData(); // Refresh data after updating
            setOverlay(null);
            setBoard(board);
            // Optional: Provide feedback to the user on successful save
          } catch (error) {
            console.error("Error saving task:", error);
            // Optional: Show an error message to the user
          }
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

TaskDetails.propTypes = {
  columnID: PropTypes.string.isRequired,
  taskID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subtasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskDetails;
