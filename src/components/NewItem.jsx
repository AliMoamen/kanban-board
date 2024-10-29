import PropTypes from "prop-types";
import { useContext } from "react";
import { ItemsContext } from "../apis/ItemsContext";
const NewItem = ({ item_id }) => {
  const { items, setItems } = useContext(ItemsContext); // Fixed spelling here

  const handleDelete = () => {
    setItems(
      items.filter(({ id }) => {
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
