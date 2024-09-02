import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import { useState } from "react";

//App
const App = () => {
  const [token, setToken] = useState(null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };
  return (
    <Router>
      <div className="container">
        <Header token={token} handleToken={handleToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish/" element={<Publish />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
