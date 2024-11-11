import React from 'react';

const PaypalButton = () => {
  const handlePayment = () => {
    // Configura el pago de PayPal aquí
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00' // Cambia este valor según tu necesidad
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(function(details) {
          alert('Transacción completada por ' + details.payer.name.given_name);
          // Aquí puedes manejar la respuesta después de la transacción
        });
      },
      onError: (err) => {
        console.error("Error en el pago", err);
      }
    }).render('#paypal-button-container'); // Esto renderizará el botón en el contenedor especificado
  };

  return (
    <div>
      <div id="paypal-button-container"></div>
      <button className="exercise-button" onClick={handlePayment}>
        ¡Ayuda al creador!
      </button>
    </div>
  );
};

export default PaypalButton;
