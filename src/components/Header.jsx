import { Link } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  return (
    <header>
      <img src="../src/assets/images/logo-vinted.png" alt="logo-vinted" />
      {token ? (
        <button
          onClick={() => {
            handleToken(null);
          }}
        >
          Déconnexion
        </button>
      ) : (
        <>
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </>
      )}

      <Link to="/publish">
        <button>Vends tes articles</button>
      </Link>
    </header>
  );
};

export default Header;
