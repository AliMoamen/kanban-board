import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DataContext } from "../apis/dataContext";

const BoardForm = ({
  title,
  boardName = "",
  boardColumns = [{ title: "", tasks: [] }],
  submitText,
}) => {
  const [columns, setColumns] = useState(boardColumns);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: boardName,
    columns: boardColumns,
  });
  const [errors, setErrors] = useState({ title: false, columns: [] });

  const { api, user, fetchData, setOverlay, setBoard } =
    useContext(DataContext);

  const handleNewColumn = () => {
    if (columns.length < 7) {
      const updatedColumns = [...columns, { title: "", tasks: [] }];
      setColumns(updatedColumns);
      setFormData({ ...formData, columns: updatedColumns });
      setErrors({ ...errors, columns: [...errors.columns, false] });
    }
  };

  const handleDelete = (index) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
    setFormData({ ...formData, columns: updatedColumns });

    const updatedErrors = [...errors.columns];
    updatedErrors.splice(index, 1);
    setErrors({ ...errors, columns: updatedErrors });
  };

  const handleEdit = (e, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].title = e.target.value;
    setColumns(updatedColumns);
    setFormData({ ...formData, columns: updatedColumns });

    const updatedErrors = [...errors.columns];
    updatedErrors[index] = e.target.value.trim() === "";
    setErrors({ ...errors, columns: updatedErrors });
  };

  const handleBoardNameChange = (e) => {
    const title = e.target.value;
    setFormData({ ...formData, title });
    setErrors({ ...errors, title: title.trim() === "" });
  };

  const handleSubmit = async () => {
    // Validation check before submitting
    const isTitleEmpty = formData.title.trim() === "";
    const areColumnsEmpty = columns.map((col) => col.title.trim() === "");
    setErrors({ title: isTitleEmpty, columns: areColumnsEmpty });

    // Prevent submission if there are errors
    if (isTitleEmpty || areColumnsEmpty.includes(true)) {
      return;
    }

    try {
      await api.post(`/${user}/boards/`, formData);
      const fetchedData = await fetchData();
      setOverlay(null);
      setBoard(fetchedData[fetchedData.length - 1]._id.toString());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <p className="heading-l">{title}</p>
      <p className="body-l text-color">Name</p>
      <input
        placeholder="eg. Web Design"
        value={formData.title}
        onChange={handleBoardNameChange}
        type="text"
        style={{
          borderColor: errors.title ? "#ea5555" : undefined,
        }}
      />
      <p className="body-l text-color">Columns</p>
      {columns.map((column, index) => (
        <div className="new-item" key={index}>
          <input
            onChange={(e) => handleEdit(e, index)}
            type="text"
            value={column.title}
            style={{
              borderColor: errors.columns[index] ? "#ea5555" : undefined,
            }}
          />
          <button
            onClick={() => handleDelete(index)}
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

      <button
        onClick={handleNewColumn}
        disabled={columns.length === 7}
        className="button-secondary"
      >
        + Add New Column
      </button>
      <button onClick={handleSubmit} className="button-primary">
        {submitText}
      </button>
    </div>
  );
};

BoardForm.propTypes = {
  title: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  boardColumns: PropTypes.array.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default BoardForm;
