import React from 'react';

// import { connect } from 'react-redux'; //commented to use useSelector hooks
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; //to access routing parameters

import { selectCollection } from '../../redux/shop/shop.selector';
import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';

// const CollectionPage = ({ collection }) => { ////converting code to use hooks
const CollectionPage = () => {
    const { collectionId } = useParams(); //useParams will return routing parameters object
    const collection = useSelector(selectCollection(collectionId));

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

// const mapStateToProps = (state, ownProps) => ({ //useSelector implementing it here
//     collection : selectCollection(ownProps.match.params.collectionId)(state) //this is currying
// })

// export default connect( //useSelector will do work of connect here 
//     mapStateToProps
// )(CollectionPage);

export default CollectionPage;

//curring is concept which implements closures like functionality
//multiple argument function converted to curried function which takes only one argument at a time

//const multiply = (a,b) => a*b;
//multiply(5,3) //= 15
//const curriedMultiply = (a) => (b) => a*b;
//curriedMultiply(5)(3) //=15

//currying is a technique of evaluating function with multiple arguments, into sequence of 
//functions with single argument