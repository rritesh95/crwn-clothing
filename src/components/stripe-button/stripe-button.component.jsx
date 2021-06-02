import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IxsiDSFAexDecMaQbFlO27arPnDNWAfw5FAuDxtkk1bBJ41p6crgHgL10OFoWntrvtBiemnVYTDCmTXv3GxD2qx00nai9GnnJ';

    const onToken = token => {
        console.log(token);
        alert("Payment successful");
    }

    return (
        <StripeCheckout
        name="CRWN Clothing Ltd."
        label="Pay Now"
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        amount={priceForStripe} //cents
        description={`Your total is $${price}`}
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;