import { useContext } from "react";
import { DataContext } from "../apis/dataContext";
import "../styles/DeleteForm.scss";

const DeleteForm = () => {
  const { setOverlay, board, getBoardData } = useContext(DataContext);
  const boardName = getBoardData(board).name;
  return (
    <div className="delete-form form">
      <p className="heading-l destructive">Delete this board?</p>
      <p className="body-m text-color">{`Are you sure you want to delete the "${boardName}" board ? This action will remove all columns and tasks and cannot be reversed.`}</p>
      <div className="button-group">
        <button className="button-destructive">Delete</button>
        <button onClick={() => setOverlay(null)} className="button-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};
export default DeleteForm;
