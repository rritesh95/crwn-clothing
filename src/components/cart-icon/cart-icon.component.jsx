import { React } from 'react';

import { ReactComponent as ShoppingLogo } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingLogo className="shopping-icon" />
        <span className="item-count"> {itemCount} </span>
    </div>
);

const mapDispatchToState = dispatch =>({
    toggleCartHidden : () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    itemCount : selectCartItemsCount
});

export default connect(
    mapStateToProps, 
    mapDispatchToState
)(CartIcon);