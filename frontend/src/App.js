import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessFormPage from "./components/BusinessForm/index"
import { getAllTags } from "./store/tag";
import {getAllBusinesses} from "./store/business"
import BusinessDisplay from "./components/BusinessDisplay";
import BusinessEditForm from "./components/BusinessEditForm";

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
            <BusinessDisplay />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
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
