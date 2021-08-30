import React from 'react';

//import { connect } from 'react-redux'; //commented to use useSelector and useDispatch hooks
import { useSelector } from 'react-redux';
//import { createStructuredSelector } from 'reselect'; //commented to use useSelector and useDispatch hooks

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selector';
import CheckoutItem  from '../../components/checkout-item/checkout-item.component';

import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

// const ChekoutPage = ({ cartItems, total }) => {
const ChekoutPage = () => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            
            { 
                cartItems.map( cartItem => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))
            }
            
            <div className="total">
                <span>Total : ${total}</span>
            </div>
            <div className="test-warning">
                *Please use the following test credit card for payment*
                <br/>
                4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
            </div>
            <StripeCheckoutButton price={total}/>
        </div>
    );
}

// const mapStateToProps = createStructuredSelector({ //using useSelector hook
//     cartItems : selectCartItems,
//     total : selectCartTotal
// });

// export default connect(mapStateToProps)(ChekoutPage); //removed for using react-redux hooks
export default ChekoutPage;