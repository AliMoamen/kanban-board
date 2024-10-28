import PropTypes from "prop-types";
import "../styles/BoardForm.scss";
import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";
import NewItem from "./NewItem";

// Define the context outside the component
export const ColumnsContext = createContext(null);

const BoardForm = ({ title, submitText }) => {
  const [columns, setColumns] = useState([]);

  const handleNewColumn = () => {
    const new_id = uuid();
    setColumns([
      ...columns,
      {
        id: new_id,
        item: <NewItem key={new_id} item_id={new_id} />,
      },
    ]);
  };

  return (
    <div className="board-form">
      <p className="heading-l">{title}</p>
      <p className="body-l text-color">Name</p>
      <input placeholder="eg. Web Design" type="text" />
      <p className="body-l text-color">Columns</p>
      <ColumnsContext.Provider value={{ columns, setColumns }}>
        {columns.map(({ item }) => item)}
      </ColumnsContext.Provider>

      <button
        onClick={handleNewColumn}
        disabled={columns.length === 7}
        className="button-secondary"
      >
        + Add New Column
      </button>
      <button className="button-primary">{submitText}</button>
    </div>
  );
};

BoardForm.propTypes = {
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default BoardForm;
