import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IxsiDSFAexDecMaQbFlO27arPnDNWAfw5FAuDxtkk1bBJ41p6crgHgL10OFoWntrvtBiemnVYTDCmTXv3GxD2qx00nai9GnnJ';

    const onToken = token => {
        axios({
            url : 'payment',
            method : 'post',
            data : {
                amount : priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful!!!');
        }).catch( error => {
            console.log("Payment error: ", JSON.parse(error));
            alert('There was an issue with payment. Please make sure you use correct details');
        })
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