import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-components">
        <input
          className="header-from"
          type="text"
          placeholder="Which City Are You Leaving From?"
        />
        <input
          className="header-to"
          type="text"
          placeholder="Which City Are You Traveling To?"
        />
        <button className="header-button">SEARCH</button>
      </div>
      <h1 className="header-title">Vacation Optimizer</h1>
    </header>
  );
}

export default Header;
