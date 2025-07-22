import "./Header.css";

function Header({ fromCity, toCity, setFromCity, setToCity, onSearch }) {
  return (
    <header className="header">
      <div className="header-components">
        <input
          className="header-from"
          type="text"
          placeholder="Which City Are You Leaving From?"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
        />
        <input
          className="header-to"
          type="text"
          placeholder="Which City Are You Traveling To?"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
        />
        <button className="header-button" onClick={onSearch}>
          SEARCH
        </button>
      </div>
      <h1 className="header-title"> California Vacation Optimizer</h1>
    </header>
  );
}

export default Header;
