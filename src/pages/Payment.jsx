import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// pour récupérer les infos de la page offers
import { useLocation } from "react-router-dom";

// import page
import CheckoutForm from "../components/CheckoutForm";

// connection à son compte Stripe
const stripePromise = loadStripe(
  "pk_test_51PuwjsH1HItnFh8pmeRt5XP4eBI59TANjFOM6HtU0K0oTpQiFTBd7680VrGT7jJNoWuOCKK1CJLnQIcTjKxeu6iT00e2M5Xr8j"
);

const Payment = () => {
  // il faut récupérer le prix de l'article via la page offers.
  const location = useLocation();
  const { price } = location.state;
  const { title } = location.state;
  //console.log(price, title);

  //infos de la transaction
  const options = {
    // type de transaction
    mode: "payment",
    //montant en centimesyarn
    amount: Number((price * 100).toFixed(0)),
    //devise
    currency: "eur",
  };

  // Elements est un composant de Stripe qui contient tous les éléments necessaires au paiement
  //on donne à Element la preuve qu'on est bien connecté et les options de paiment
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm price={price} title={title} />
    </Elements>
  );
};

export default Payment;
