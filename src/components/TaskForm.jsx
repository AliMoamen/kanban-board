import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import NewItem from "./NewItem";
import { ItemsContext } from "../apis/ItemsContext";
import { DataContext } from "../apis/dataContext";
import PropTypes from "prop-types";
const id = uuid();

const TaskForm = ({
  type = "add",
  title = "",
  description = "",
  subtasks = [
    {
      id,
      item: <NewItem key={id} item_id={id} />,
    },
  ],
  status = "",
}) => {
  const { board, getColumns } = useContext(DataContext);
  const [items, setItems] = useState(subtasks);
  console.log(items);
  const handleNewSubtask = () => {
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
      <p className="heading-l">
        {type === "add" ? "Add New Task" : "Edit Task"}
      </p>
      <p className="body-l text-color">Title</p>
      <input value={title} placeholder="e.g. Take Coffee Break" type="text" />
      <p className="body-l text-color">Description</p>
      <textarea
        value={description}
        placeholder="e.g. It's always good to take a break. This 15-minute break will recharge the batteries a little."
      />

      <p className="body-l text-color">Subtasks</p>
      <ItemsContext.Provider value={{ items, setItems }}>
        {items.map(({ item }) => item)}
      </ItemsContext.Provider>
      <button className="button-secondary" onClick={handleNewSubtask}>
        + Add New Subtask
      </button>

      <p className="body-l text-color">Status</p>
      <select>
        {getColumns(board).map((name, index) => {
          return (
            <option
              selected={
                status === "" ? index === 0 : status === name ? true : false
              }
              key={index}
            >
              {name}
            </option>
          );
        })}
      </select>
      <button className="button-primary">Create Task</button>
    </div>
  );
};
TaskForm.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};
export default TaskForm;
