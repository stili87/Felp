import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessFormPage from "./components/BusinessForm/index"
import { getAllTags } from "./store/tag";
import {getAllBusinesses} from "./store/business"
import BusinessDisplay from "./components/BusinessDisplay";
import BusinessEditForm from "./components/BusinessEditForm";
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import BusinessSingle from "./components/BusinessSingle";
import { getAllUsers } from "./store/users";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTags())
  },[dispatch])

  useEffect(() => {
    dispatch(getAllBusinesses())
  },[dispatch])

  useEffect(() => {
    dispatch(getAllUsers())
  },[dispatch])



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route exact path='/listings'>
            <BusinessDisplay />
          </Route>
          <Route exact path="/signup">
            <SplashPage />
          </Route>
          <Route exact path="/business/create">
          <BusinessFormPage />
          </Route>
          <Route exact path='/business/edit/:businessId'>
            <BusinessEditForm />
          </Route>
          <Route exact path='/business/:businessId'>
            <BusinessSingle />
          </Route>
          <Route>
            Page not Found
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
