import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-components">
        <input className="header-search" type="text" placeholder="SEARCH" />
        <h1 className="header-title">Vacation Optimizer</h1>
      </div>
    </header>
  );
}

export default Header;
