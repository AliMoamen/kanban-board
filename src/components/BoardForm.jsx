import PropTypes from "prop-types";
import "../styles/BoardForm.scss";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import NewItem from "./NewItem";
import { ItemsContext } from "../apis/ItemsContext";
const BoardForm = ({ title, submitText }) => {
  const id = uuid();

  const [items, setItems] = useState([
    {
      id,
      item: <NewItem key={id} item_id={id} />,
    },
  ]);
  const handleNewColumn = () => {
    const new_id = uuid();
    setItems([
      ...items,
      {
        id: new_id,
        item: <NewItem key={new_id} item_id={new_id} />,
      },
    ]);
  };

  return (
    <div className="form">
      <p className="heading-l">{title}</p>
      <p className="body-l text-color">Name</p>
      <input placeholder="eg. Web Design" type="text" />
      <p className="body-l text-color">Columns</p>
      <ItemsContext.Provider value={{ items, setItems }}>
        {items.map(({ item }) => item)}
      </ItemsContext.Provider>

      <button
        onClick={handleNewColumn}
        disabled={items.length === 7}
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
