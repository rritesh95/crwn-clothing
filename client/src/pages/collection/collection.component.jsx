import React from 'react';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';
import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({ collection }) => {
    const {title, items} = collection;
    return (
    <div className="collection-page">
        <h2 className="title">{ title }</h2>
        <div className="items">
        {
            items.map(item => (
                <CollectionItem key={item.id} item={item} />
            ))
        }
        </div>
    </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    collection : selectCollection(ownProps.match.params.collectionId)(state) //this is currying
})

export default connect(
    mapStateToProps
)(CollectionPage);

//curring is concept which implements closures like functionality
//multiple argument function converted to curried function which takes only one argument at a time

//const multiply = (a,b) => a*b;
//multiply(5,3) //= 15
//const curriedMultiply = (a) => (b) => a*b;
//curriedMultiply(5)(3) //=15

//currying is a technique of evaluating function with multiple arguments, into sequence of 
//functions with single argument