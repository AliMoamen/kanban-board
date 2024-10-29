import { useState } from "react";
import { v4 as uuid } from "uuid";
import NewItem from "./NewItem";
import { ItemsContext } from "../apis/ItemsContext";

const NewTaskForm = () => {
  const id = uuid();

  const [items, setItems] = useState([
    {
      id,
      item: <NewItem key={id} item_id={id} />,
    },
  ]);
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
      <p className="heading-l">Add New Task</p>
      <p className="body-l text-color">Title</p>
      <input placeholder="e.g. Take Coffee Break" type="text" />
      <p className="body-l text-color">Description</p>
      <textarea placeholder="e.g. It's always good to take a break. This 15-minute break will recharge the batteries a little." />

      <p className="body-l text-color">Subtasks</p>
      <ItemsContext.Provider value={{ items, setItems }}>
        {items.map(({ item }) => item)}
      </ItemsContext.Provider>
      <button className="button-secondary" onClick={handleNewSubtask}>
        + Add New Subtask
      </button>

      <p className="body-l text-color">Status</p>
      <button className="button-primary">Create Task</button>
    </div>
  );
};

export default NewTaskForm;
