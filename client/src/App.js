import React, { useEffect, lazy, Suspense } from 'react';

import Header from './components/header/header.component';
//import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import {Switch, Route, Redirect} from 'react-router-dom';
//import { connect } from 'react-redux'; //commented to use useSelector and useDispatch hooks
import { useSelector, useDispatch } from 'react-redux';
//import { createStructuredSelector } from 'reselect'; //commented to use useSelector and useDispatch hooks
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
//const App = ({ checkUserSession, currentUser }) => { //commented as no more using connect HOC
const App = () => {

  const currentUser = useSelector(selectCurrentUser); //this will re-run whenever store state changes,
  //and selector pointing to state property also changed(incase we are using reslect)
  const dispatch = useDispatch(); // useDispatch is a hooks that gives access to "dispatch" method
  //which we can use to fire action on store from our component wherever required

  //const isHidden = useSelector(state => state.cart.hidden); //this will re-run whenever store state
  //changes as we are not using reslect here

  //unsubscribeFromAuth = null;
  // useEffect(() => {       //useEffect hooks implements componentDidMount, componentDidUpdate, ComponentWillUnmount
  //   checkUserSession();
  // }, [checkUserSession]); // if we create some handler function with "dispatch" method we get
  //from "useDispatch" hook we will endup creating action every time component re-renders and 
  //it may run dispatch on every re-render in "useEffect". so not doing that and calling action using
  //"dispatch" below in this case

  useEffect(() => {       //useEffect hooks implements componentDidMount, componentDidUpdate, ComponentWillUnmount
    dispatch(checkUserSession());
  }, [dispatch]); 

  //componentDidMount(){ //commented as we moved asynchronous code to react sagas
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

// const mapStateToProps = createStructuredSelector({  //not required when we use useSelector hook
//   currentUser : selectCurrentUser
// })

// const mapDispatchToProps = dispatch => ({ //not required when we use useDispatch hook
//   checkUserSession : () => dispatch(checkUserSession())
// })

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser : user => dispatch(setCurrentUser(user))
// });

//export default connect(mapStateToProps, mapDispatchToProps)(App); //connect not required when
//we use useSelector and useDispatch hooks as they do the same thing
export default App;
