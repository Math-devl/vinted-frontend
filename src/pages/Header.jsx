import { Link } from "react-router-dom";

const Header = ({ token, handleToken, search, setSearch }) => {
  return (
    <header className="header">
      <img src="../src/assets/images/logo-vinted.png" alt="logo-vinted" />{" "}
      <input
        className="search-bar"
        type="text"
        placeholder="rechercher des articles"
        value={search}
        onChange={(event) => {
          // console.log(event);
          setSearch(event.target.value);
        }}
      />
      {token ? (
        <button
          onClick={() => {
            handleToken(null);
          }}
        >
          Déconnexion
        </button>
      ) : (
        <div>
          <Link className="header-link login-signup" to="/signup">
            S'inscrire
          </Link>
          <Link className=" header-link login-signup" to="/login">
            Se connecter
          </Link>
        </div>
      )}
      <div>
        <Link className="header-link sell-button " to="/publish">
          Vends tes articles
        </Link>
      </div>
    </header>
  );
};

export default Header;
