import "../styles/Sidebar.scss"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <a href=""><img src="/logo-dark.svg" alt="logo-light.svg" /></a>
      <p>All BOARDS (0)</p>
      <div className="board-column">
        <button className="board-button">
            <img src="/icon-board.svg" alt="icon-board.svg" />
            <p>Platform Launch</p>
        </button>
        <button className="board-button">
            <img src="/icon-board.svg" alt="icon-board.svg" />
            <p>+ Create New Board</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
