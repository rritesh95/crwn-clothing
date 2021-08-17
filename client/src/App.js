import React, { useEffect, lazy, Suspense } from 'react';

import Header from './components/header/header.component';
//import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//import { setCurrentUser } from './redux/user/user.action';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';

import { GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => 
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const ChekoutPage = lazy(() => import('./pages/checkout/checkout.component'));

//class App extends React.Component {
const App = ({ checkUserSession, currentUser }) => {
  //unsubscribeFromAuth = null;
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  //componentDidMount(){
    // const { checkUserSession } = this.props;
    // checkUserSession();
    // //const { setCurrentUser, collectionsArray } = this.props;
    // //const { setCurrentUser } = this.props;

    // // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    // //   if(userAuth){
    // //     const userRef = await createUserProfileDocument(userAuth);

    // //     userRef.onSnapshot( snapshot => {
    // //       setCurrentUser({
    // //           id : userRef.id,
    // //           ...snapshot.data()
    // //       });
    // //     });
    // //   }

    // //   setCurrentUser(userAuth);
    // //   //to load shop data in firebase 1st time
    // //   // addCollectionAndDocuments(
    // //   //   "collections", 
    // //   //   collectionsArray.map(({ title, items }) => ({ title, items}))
    // //   // );
    // // });
  //}

  // componentWillUnmount(){
  //   this.unsubscribeFromAuth();
  // }

  //render(){
    return (
      <div>
        <GlobalStyle/>
        <Header/>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />} >
              <Route exact path="/" component={HomePage}></Route>
              <Route path="/shop" component={ShopPage}></Route>
              <Route path="/checkout" component={ChekoutPage}></Route>
              <Route exact path="/signIn"
                render= { () => currentUser ? (
                  <Redirect to="/" />) : (
                  <SignInAndSignUpPage />)
                } />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  //}
  
}

// const mapStateToProps = createStructuredSelector({
//   currentUser : selectCurrentUser,
//   collectionsArray : selectCollectionsForPreview
// })

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
})

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser : user => dispatch(setCurrentUser(user))
// });

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
