import React from 'react';
import './collection-overview.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../redux/shop/shop.selector';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const CollectionOverview = ({ collections }) => (
    <div className="collections-overview">
        {
            collections.map(({id, ...otherPreviewDetails}) =>(
                <CollectionPreview key={id} {...otherPreviewDetails}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections : selectCollections
})

export default connect(
    mapStateToProps
)(CollectionOverview);