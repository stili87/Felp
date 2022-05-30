import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessFormPage from "./components/BusinessForm/index"
import { getAllTags } from "./store/tag";
import {getAllBusinesses} from "./store/business"
import BusinessDisplay from "./components/BusinessDisplay";
import BusinessEditForm from "./components/BusinessEditForm";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTags())
  },[dispatch])

  useEffect(() => {
    dispatch(getAllBusinesses())
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
          {sessionUser && <BusinessFormPage />}
          </Route>
          <Route exact path='/business/edit/:businessId'>
            <BusinessEditForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
