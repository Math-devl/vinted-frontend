import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img src="../src/assets/images/logo-vinted.png" alt="logo-vinted" />
      <Link to="/signup">
        <button>S'inscrire</button>
      </Link>
      <Link to="/login">
        <button>Se connecter</button>
      </Link>
    </header>
  );
};

export default Header;
