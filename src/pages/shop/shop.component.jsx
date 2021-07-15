import React from 'react';

import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.action';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading : true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        //REST API
        // fetch(
        //     'https://firestore.googleapis.com/v1/projects/crwn-db-90478/databases/(default)/documents/collections'
        // ).then(response => response.json())
        // .then(collections => console.log("collections", collections))

        //Promise pattern
        collectionRef.get().then( snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);    
            updateCollections(collectionsMap);
            this.setState({ loading : false});
        })

        //Observable pattern
        // collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);    
        //     updateCollections(collectionsMap);
        //     this.setState({ loading : false});
        // })

        //we will get collection values set in redux "collections" only when
        //this component will execute, if we have some component that needs
        //this collection data and have no dependency on this component then
        //we have to repeat the same code over there also, to avoid it we can
        //move this "collections" load to redux
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} 
                render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
                <Route path={`${match.path}/:collectionId`} 
                render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections : collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(
    null,
    mapDispatchToProps
)(ShopPage);