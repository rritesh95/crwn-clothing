import React from 'react';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ChekoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user.action';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { selectCurrentUser } from './redux/user/user.selector';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    //const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot( snapshot => {
          setCurrentUser({
              id : userRef.id,
              ...snapshot.data()
          });
        });
      }

      setCurrentUser(userAuth);
      //to load shop data in firebase 1st time
      // addCollectionAndDocuments(
      //   "collections", 
      //   collectionsArray.map(({ title, items }) => ({ title, items}))
      // );
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/checkout" component={ChekoutPage}></Route>
          <Route exact path="/signIn"
            render= { () => this.props.currentUser ? (
              <Redirect to="/" />) : (
              <SignInAndSignUpPage />)
            } />
        </Switch>
      </div>
    );
  }
  
}

// const mapStateToProps = createStructuredSelector({
//   currentUser : selectCurrentUser,
//   collectionsArray : selectCollectionsForPreview
// })

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
