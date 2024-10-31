import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
import "../styles/DeleteForm.scss";
import PropTypes from "prop-types";

const DeleteForm = ({ type, name }) => {
  const { setOverlay } = useContext(DataContext);
  return (
    <div className="delete-form form">
      <p className="heading-l destructive">Delete this {type}?</p>
      <p className="body-m text-color">{`Are you sure you want to delete the "${name}" ${
        type === "board" ? "board" : "task and subtasks"
      } ? This action ${
        type === "board" ? "will remove all columns and tasks and" : ""
      } cannot be reversed.`}</p>
      <div className="button-group">
        <button className="button-destructive">Delete</button>
        <button onClick={() => setOverlay(null)} className="button-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};
DeleteForm.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default DeleteForm;
