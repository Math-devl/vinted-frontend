import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  // States correspondants à chaque champs à remplir pour la mise en vente de l'article
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("0");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      /*  On crée une variable formData qui sera un FormData pour y envoyer toutes les infos de l'article */
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      // requête avec en 1er agrument l'url , puis le formdata, et enfin les headers (ou autres)
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offers/publish",
        formData,
        {
          //en-tête utilisé pour envoyer des infos complémentaires à la requête post : ici  indique au serveur que la requête provient d'un utilisateur authentifié et autorisé à accéder à certaines ressources
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-container">
      <form onSubmit={handleSubmit} className="publish-form">
        {/* On donne au label le même attribut que l'id de l'input pour les lier */}
        <label htmlFor="picture-input">+ Ajoute ta photo !</label>
        <input
          id="picture-input"
          type="file"
          // permet de ne pas afficher l'input de base
          style={{ display: "none" }}
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        {picture && (
          // syntaxe pour afficher un aperçu de l'image uploadée à partir d'un fichier
          <img
            className="publish-picture"
            src={URL.createObjectURL(picture)}
            alt="preview photo"
          />
        )}
        <input
          type="text"
          placeholder="titre"
          value={title}
          required
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          placeholder="Description"
          value={description}
          required
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Marque"
          value={brand}
          required
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Taille"
          value={size}
          required
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Couleur"
          value={color}
          required
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="état"
          value={condition}
          required
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ville"
          value={place}
          required
          onChange={(event) => {
            setPlace(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="prix"
          value={price}
          required
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />

        <button>Poster l'annonce</button>
      </form>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Publish;
