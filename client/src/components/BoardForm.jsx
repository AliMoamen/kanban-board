import PropTypes from "prop-types";
import { useContext, useState, useRef } from "react";
import { DataContext } from "../apis/dataContext";

const BoardForm = ({
  type,
  title,
  boardName = "",
  boardColumns = [{ title: "", tasks: [] }],
  submitText,
}) => {
  const { board } = useContext(DataContext);
  const [columns, setColumns] = useState(boardColumns);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: boardName,
    columns: boardColumns,
  });
  const [errors, setErrors] = useState({ title: false, columns: [] });
  const newColumnRef = useRef(null); // Ref for the last added column input

  const { api, user, fetchData, setOverlay, setBoard } =
    useContext(DataContext);

  const handleNewColumn = () => {
    const updatedColumns = [...columns, { title: "", tasks: [] }];
    setColumns(updatedColumns);
    setFormData({ ...formData, columns: updatedColumns });
    setErrors({ ...errors, columns: [...errors.columns, false] });
    // Focus the last column input after adding
    setTimeout(() => {
      if (newColumnRef.current) {
        newColumnRef.current.focus();
        newColumnRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
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
    const isTitleEmpty = formData.title.trim() === "";
    const areColumnsEmpty = columns.map((col) => col.title.trim() === "");
    setErrors({ title: isTitleEmpty, columns: areColumnsEmpty });

    if (isTitleEmpty || areColumnsEmpty.includes(true)) {
      return;
    }

    try {
      if (type === "add") {
        await api.post(`/${user}/boards/`, formData);
      } else if (type === "edit") {
        await api.put(`/${user}/boards/${board}`, formData);
      }
      const fetchedData = await fetchData();
      setOverlay(null);
      setBoard(fetchedData[fetchedData.length - 1]._id.toString());
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
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
        onKeyDown={handleKeyDown}
        type="text"
        style={{
          borderColor: errors.title ? "#ea5555" : undefined,
        }}
      />
      <p className="body-l text-color">Columns</p>
      <div className="items-box">
        {columns.map((column, index) => (
          <div className="new-item" key={index}>
            <input
              onChange={(e) => handleEdit(e, index)}
              onKeyDown={handleKeyDown}
              type="text"
              value={column.title.toUpperCase()}
              style={{
                borderColor: errors.columns[index] ? "#ea5555" : undefined,
              }}
              ref={index === columns.length - 1 ? newColumnRef : null} // Set ref for the last column input
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
      </div>

      <button onClick={handleNewColumn} className="button-secondary">
        + Add New Column
      </button>
      <button onClick={handleSubmit} className="button-primary">
        {submitText}
      </button>
    </div>
  );
};

BoardForm.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  boardColumns: PropTypes.array.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default BoardForm;
