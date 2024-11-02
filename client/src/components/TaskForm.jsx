import { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "../apis/dataContext";
import PropTypes from "prop-types";

const TaskForm = ({
  type = "add",
  title = "",
  description = "",
  subtasks = [{ title: "", isCompleted: false }],
  submitText = "Create Task",
  columnID = null,
  taskID = null,
}) => {
  const { api, board, user, getBoardData, fetchData, setOverlay, setBoard } =
    useContext(DataContext);
  const boardData = getBoardData(board);
  const { columns } = boardData;
  const [formData, setFormData] = useState({
    title,
    description,
    subtasks,
  });
  const [errors, setErrors] = useState({ title: false, subtasks: [] });
  const [status, setStatus] = useState(
    type === "add" ? columns[0]._id.toString() : columnID
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const subtasksContainerRef = useRef(null); // Ref for the subtasks container
  const lastSubtaskRef = useRef(null); // Ref for the last subtask input

  const handleNewSubtask = () => {
    const updatedSubtasks = [
      ...formData.subtasks,
      { title: "", isCompleted: false },
    ];
    setFormData({ ...formData, subtasks: updatedSubtasks });
    setErrors({ ...errors, subtasks: [...errors.subtasks, false] });

    // Focus on the new last subtask input
    setTimeout(() => {
      if (lastSubtaskRef.current) {
        lastSubtaskRef.current.focus(); // Focus on the last subtask
      }
    }, 0);
  };

  const handleDeleteSubtask = (index) => {
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks.splice(index, 1);
    setFormData({ ...formData, subtasks: updatedSubtasks });

    const updatedErrors = [...errors.subtasks];
    updatedErrors.splice(index, 1);
    setErrors({ ...errors, subtasks: updatedErrors });
  };

  const handleEditSubtask = (e, index) => {
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks[index].title = e.target.value;
    setFormData({ ...formData, subtasks: updatedSubtasks });

    const updatedErrors = [...errors.subtasks];
    updatedErrors[index] = e.target.value.trim() === "";
    setErrors({ ...errors, subtasks: updatedErrors });
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData({ ...formData, title: newTitle });
    setErrors({ ...errors, title: newTitle.trim() === "" });
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleSubmit = async () => {
    const isTitleEmpty = formData.title.trim() === "";
    const areSubtasksEmpty = formData.subtasks.map(
      (subtask) => subtask.title.trim() === ""
    );
    setErrors({ title: isTitleEmpty, subtasks: areSubtasksEmpty });

    if (isTitleEmpty || areSubtasksEmpty.includes(true)) {
      return;
    }

    try {
      const taskData = {
        ...formData,
        status,
      };

      if (type === "add") {
        await api.post(`/${user}/boards/${board}/${status}/tasks/`, taskData);
      } else if (type === "edit") {
        await api.put(
          `/${user}/boards/${board}/${columnID}/tasks/${taskID}`,
          taskData
        );
      }
      await fetchData();
      setOverlay(null);
      setBoard(board);
    } catch (err) {
      console.error(err);
    }
  };

  // Effect to scroll to the bottom when subtasks change
  useEffect(() => {
    if (subtasksContainerRef.current) {
      subtasksContainerRef.current.scrollTop =
        subtasksContainerRef.current.scrollHeight;
    }
  }, [formData.subtasks]);

  return (
    <div className="form">
      <p className="heading-l">
        {type === "add" ? "Add New Task" : "Edit Task"}
      </p>
      <p className="body-l text-color">Title</p>
      <input
        placeholder="e.g. Take Coffee Break"
        value={formData.title}
        autoFocus
        onChange={handleTitleChange}
        style={{
          borderColor: errors.title ? "#ea5555" : undefined,
        }}
      />
      <p className="body-l text-color">Description</p>
      <textarea
        placeholder="e.g. It's always good to take a break. This 15-minute break will recharge the batteries a little."
        value={formData.description}
        onChange={handleDescriptionChange}
      />
      <p className="body-l text-color">Subtasks</p>
      <div className="items-box" ref={subtasksContainerRef}>
        {formData.subtasks.map((subtask, index) => (
          <div className="new-item" key={index}>
            <input
              ref={
                index === formData.subtasks.length - 1 ? lastSubtaskRef : null
              } // Ref for the last subtask input
              placeholder="Subtask name"
              value={subtask.title}
              onChange={(e) => handleEditSubtask(e, index)}
              style={{
                borderColor: errors.subtasks[index] ? "#ea5555" : undefined,
              }}
            />
            <button
              onClick={() => handleDeleteSubtask(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="icon-button"
            >
              {hoveredIndex === index ? (
                <img
                  src="icon-cross-destructive.svg"
                  alt="icon-cross-destructive.svg"
                />
              ) : (
                <img src="icon-cross.svg" alt="icon-cross.svg" />
              )}
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleNewSubtask} className="button-secondary">
        + Add New Subtask
      </button>

      <p className="body-l text-color">Status</p>
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        {columns.map((column) => (
          <option key={column._id} value={column._id}>
            {column.title.toUpperCase()}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} className="button-primary">
        {submitText}
      </button>
    </div>
  );
};

TaskForm.propTypes = {
  columnID: PropTypes.string.isRequired,
  taskID: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default TaskForm;
