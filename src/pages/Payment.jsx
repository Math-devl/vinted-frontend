import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

// import page
import CheckoutForm from "./CheckoutForm";

// connection à son compte Stripe
const stripePromise = loadStripe(
  "pk_test_51PuwjsH1HItnFh8pmeRt5XP4eBI59TANjFOM6HtU0K0oTpQiFTBd7680VrGT7jJNoWuOCKK1CJLnQIcTjKxeu6iT00e2M5Xr8j"
);

const Payment = () => {
  // il faut récupérer le prix de l'article via la page offers.
  const location = useLocation();
  const { price } = location.state;

  //infos de la transaction
  const options = {
    // type de transaction
    mode: "payment",
    //montant en centimes
    amount: Number((price * 100).toFixed(0)),
    //devise
    currency: eur,
  };

  // Elements est un composant de Stripe qui contient tous les éléments necessaires au paiement
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
