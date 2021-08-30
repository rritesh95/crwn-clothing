import React from 'react';

// import { connect } from 'react-redux'; //commented to use useSelector and useDispatch hooks
// import { withRouter } from 'react-router-dom'; //commented to use useHistory hooks

// import { createStructuredSelector } from 'reselect'; //commented to use useSelector and useDispatch hooks

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selector';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

// const CartDropdown = ({ cartItems, history, dispatch }) => ( //converting code to use hooks
const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory(); //it will give us roting history object

    return (
        <div className="cart-dropdown">
            <div className="cart-items">
            {   cartItems.length ? (
                    cartItems.map( cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )
            }
            </div>
            <CustomButton onClick={ () => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}> GO TO CHECKOUT </CustomButton>
        </div>
    );
}

// const mapStateToProps = createStructuredSelector({ //useSelector hooks implementing this functionality
//     cartItems : selectCartItems
// });

// export default withRouter(connect(mapStateToProps)(CartDropdown));// will use react-redux hooks
//and also react-router-dom hooks here

export default CartDropdown;