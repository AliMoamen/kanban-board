import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ItemsContext } from "../apis/ItemsContext";
import "../styles/NewItem.scss";
const NewItem = ({ item_id, value = "" }) => {
  const [hovered, setHovered] = useState(false);
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
      <input type="text" value={value} />
      <button
        onClick={handleDelete}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="icon-button"
      >
        {hovered ? (
          <img
            src="icon-cross-destructive.svg"
            alt="icon-cross-destructive.svg"
          />
        ) : (
          <img src="icon-cross.svg" alt="icon-cross.svg" />
        )}
      </button>
    </div>
  );
};

NewItem.propTypes = {
  item_id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default NewItem;
