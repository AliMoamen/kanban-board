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
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track the index of the hovered button
  const [formData, setFormData] = useState({
    title: boardName,
    columns: boardColumns,
  });

  const { api, user, fetchData, setOverlay } = useContext(DataContext);

  const handleNewColumn = () => {
    // Prevent adding more than 7 columns
    if (columns.length < 7) {
      const updatedColumns = [...columns, { title: "", tasks: [] }];
      setColumns(updatedColumns);
      setFormData({ ...formData, columns: updatedColumns });
    }
  };

  const handleDelete = (index) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
    setFormData({ ...formData, columns: updatedColumns });
  };

  const handleEdit = (e, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].title = e.target.value;
    setColumns(updatedColumns);
    setFormData({ ...formData, columns: updatedColumns });
  };

  const handleBoardNameChange = (e) => {
    setFormData({ ...formData, title: e.target.value }); // Update only the title field
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/${user}/boards/`, formData);
      await fetchData();
      setOverlay(null);
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
        onChange={handleBoardNameChange} // Call the new handler
        type="text"
      />
      <p className="body-l text-color">Columns</p>
      {columns.map((column, index) => (
        <div className="new-item" key={index}>
          <input
            onChange={(e) => handleEdit(e, index)}
            type="text"
            value={column.title}
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
