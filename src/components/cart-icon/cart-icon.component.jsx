import { React } from 'react';

import { ReactComponent as ShoppingLogo } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingLogo className="shopping-icon" />
        <span className="item-count"> 0 </span>
    </div>
);

const mapDispatchToState = dispatch =>({
    toggleCartHidden : () => dispatch(toggleCartHidden())
});

export default connect(null, mapDispatchToState)(CartIcon);