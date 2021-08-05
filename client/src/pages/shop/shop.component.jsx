import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.action';

//class ShopPage extends React.Component {
const ShopPage = ({ fetchCollectionsStart, match }) => {
    //unsubscribeFromSnapshot = null;

    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart]);

    // componentDidMount(){
    //     const { fetchCollectionsStart } = this.props;
    //     fetchCollectionsStart();
    //     //const collectionRef = firestore.collection('collections');

    //     //REST API
    //     // fetch(
    //     //     'https://firestore.googleapis.com/v1/projects/crwn-db-90478/databases/(default)/documents/collections'
    //     // ).then(response => response.json())
    //     // .then(collections => console.log("collections", collections))

    //     //Promise pattern
    //     // collectionRef.get().then( snapshot => {
    //     //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);    
    //     //     updateCollections(collectionsMap);
    //     //     this.setState({ loading : false});
    //     // })

    //     //Observable pattern
    //     // collectionRef.onSnapshot(async snapshot => {
    //     //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);    
    //     //     updateCollections(collectionsMap);
    //     //     this.setState({ loading : false});
    //     // })

    //     //we will get collection values set in redux "collections" only when
    //     //this component will execute, if we have some component that needs
    //     //this collection data and have no dependency on this component then
    //     //we have to repeat the same code over there also, to avoid it we can
    //     //move this "collections" load to redux
    // }

    //render(){
    //    const { match } = this.props;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} 
                component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer} />
            </div>
        );
    //}
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart : () => dispatch(fetchCollectionsStart())
})

export default connect(
    null,
    mapDispatchToProps
)(ShopPage);