import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
import "../styles/DeleteForm.scss";
import PropTypes from "prop-types";

const DeleteForm = ({
  columnID = null,
  taskID = null,
  type = "board",
  name,
}) => {
  const { setOverlay } = useContext(DataContext);
  const { user, api, board, fetchData } = useContext(DataContext);
  const handleDelete = async () => {
    try {
      if (type === "board") {
        await api.delete(`/${user}/boards/${board}`);
      } else if (type === "task") {
        await api.delete(
          `/${user}/boards/${board}/${columnID}/tasks/${taskID}`
        );
      }
      await fetchData();
      setOverlay(null);
    } catch (err) {
      console.error(`Failed to Delete Board: ${err.message}`);
    }
  };
  return (
    <div className="delete-form form">
      <p className="heading-l destructive">Delete this {type}?</p>
      <p className="body-m text-color">{`Are you sure you want to delete the "${name}" ${
        type === "board" ? "board" : "task and subtasks"
      } ? This action ${
        type === "board" ? "will remove all columns and tasks and" : ""
      } cannot be reversed.`}</p>
      <div className="button-group">
        <button onClick={handleDelete} className="button-destructive">
          Delete
        </button>
        <button onClick={() => setOverlay(null)} className="button-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};
DeleteForm.propTypes = {
  columnID: PropTypes.string,
  taskID: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
};
export default DeleteForm;
