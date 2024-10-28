import PropTypes from "prop-types";
import { useContext } from "react";
import { ColumnsContext } from "./BoardForm";
const NewItem = ({ item_id }) => {
  const { columns, setColumns } = useContext(ColumnsContext); // Fixed spelling here

  const handleDelete = () => {
    setColumns(
      columns.filter(({ id }) => {
        return id !== item_id;
      })
    );
  };

  return (
    <div className="new-item">
      <input type="text" />
      <button onClick={handleDelete} className="cross-button">
        <img src="icon-cross.svg" alt="icon-cross.svg" />
      </button>
    </div>
  );
};

NewItem.propTypes = {
  item_id: PropTypes.string.isRequired,
};

export default NewItem;
