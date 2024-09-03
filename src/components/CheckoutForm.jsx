import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ price, title }) => {
  // state de gestion des messages d'erreur
  const [errorMessage, setErrormesage] = useState("");
  // state qui indique si le paiment est un succès ou pas
  const [success, setSuccess] = useState(false);
  // state de loading pendant la transaction
  const [isPaying, setIsPaying] = useState(false);

  // Hook permettant d'interagir avec Stripe
  const stripe = useStripe();

  //Pour récupérer et vérifier les informations dans les inputs CB Stripe
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      /* On veut disable le bouton au debut donc on utilise le state is paying */
      setIsPaying(true);
      //si il y a un soucis avec elements, on arrête tout
      if (elements == null) {
        return;
      }

      // 2) on envoie tout à Stripe pour vérifier que tout est bon et on récupère directement le message d'erreur si il y en a un dans le message déjà destructuré {error} que l'on renomme en submitError
      const { error: submitError } = await elements.submit();

      // 4) si on reçoit une erreur on arrête tout et on défini errorMessage avec le message d'erreur recu
      if (submitError) {
        setErrormesage(submitError.message);
      }

      // Si pas d'erreur on fait une intention de paiment via notre backend qui nous renvoie un client secret
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: price,
        }
      );
      //console.log(response.data.client_secret); // OK

      // on stock dans une variable le client secret
      const clientSecret = response.data.client_secret;

      // 13)requête à Stripe pour valider le paiement : on envoie les infos
      const { error, paymentIntent } = await stripe.confirmPayment({
        // éléments de la CB
        elements: elements,
        clientSecret: clientSecret,
        // une éventuelle redirection mais on ne s'en sert pas
        confirmParams: { return_url: "http://localhost:5173" },
        // On ne veut pas de redirection automatique
        redirect: "if_required",
      });
      //console.log("Error:", error);
      // Si il y a un pb :
      if (error) {
        setErrormesage(errorMessage);
      }
      // si le paiement intent s'est bien passé
      //console.log(paymentIntent); // undefined
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }

      //----------- error------------
    } catch (error) {
      console.log(error);
    }
    //fin de la fonction, on arrête le chargement
    setIsPaying(false);
  };

  return success ? (
    <p>"Merci pour votre achat</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {/* //quand on lancera le paiement on mettra isPaying sur true cela permettra
      de ne plus pouvoir utiliser le bouton payer  || si stripe n'a pas chargé || si elements n'a pas chargé*/}
      <button disabled={!stripe || isPaying || !elements}>Payer</button>
      {errorMessage && <p>errorMessage</p>}
    </form>
  );
};

export default CheckoutForm;
