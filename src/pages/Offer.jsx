import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        //console.log(response.data);{offre}
        setData(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <main>
      <div>
        <img src={data.product_image.secure_url} alt="" />
      </div>
      <div>
        <h2>{data.product_price} €</h2>
        <div>
          {data.product_details.map((detail, index) => {
            //console.log(detail); // objet avec les products details : {MARQUE: 'STRADIVARIUS'}

            /* On récupère les clés de l'objet product_details dans un TABLEAU*/
            const keys = Object.keys(detail);
            //console.log(keys); // ['MARQUE'] ['ÉTAT'] etc

            const key = keys[0];
            //console.log(key); // MARQUE ETAT etc

            return (
              <p key={index}>
                {key} : {detail[key]}
              </p>
            );
          })}
        </div>
        <br />
        <p>{data.product_description}</p>
        <div>
          <img
            className="avatar"
            src={data.owner.account.avatar?.secure_url}
            alt=""
          />
          <span>{data.owner.account.username}</span>
        </div>
        <Link
          to="/payment"
          state={{ title: data.product_name, price: data.product_price }}
        >
          Acheter
        </Link>
      </div>
    </main>
  );
};

export default Offer;
