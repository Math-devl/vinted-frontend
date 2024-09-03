import axios from "axios"; // pour faire les requêtes
import { useEffect, useState } from "react"; // pour ne récupérer qu'une fois les données de l'API, et utiliser les states
import { Link } from "react-router-dom";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //useEffect(()=>{}, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        //console.log(response.data); // objet avec clé offers:[{offre}]
        setData(response.data);
        //console.log(data); [{offre}]
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main className="article-container">
      {data.offers.map((offer) => {
        // console.log(offer); // {offre}
        return (
          <Link to={`/offers/${offer._id}`} key={offer._id}>
            <article>
              <div className="avatar-text">
                <img
                  className="avatar"
                  src={offer.owner.account.avatar?.secure_url}
                  alt=""
                />
                <span>{offer.owner.account.username}</span>
              </div>

              <img
                className="home-img"
                src={offer.product_image.secure_url}
                alt=""
              />
              <div>
                <p>{offer.product_price} €</p>
                <p>{offer.product_details[1].TAILLE}</p>
                <p>{offer.product_details[0].MARQUE}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </main>
  );
};

export default Home;
