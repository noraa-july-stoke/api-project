

// NPM Library Imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

// Local Module/Function Component Imports
import Navigation from "./components/Navigation";
import SpotsContainer from "./components/SpotDisplayComponents/SpotsContainer";
import AddSpotForm from "./components/Forms/AddSpotForm/AddSpotForm";
import SingleSpotPage from "./components/SpotDisplayComponents/SingleSpotPage";
import UserSpotsList from "./components/SpotDisplayComponents/UserSpotsList";
import EditSpotForm from "./components/Forms/EditSpotForm/EditSpotForm";

import * as sessionActions from "./store/session.js";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.thunkRestoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch history >
      <Route exact path='/'>
        <SpotsContainer />
      </Route>
      <Route path={'/spots/:spotId/edit'}>
        <EditSpotForm/>
      </Route>
      <Route path='/spots/:spotId'>
        <SingleSpotPage />
      </Route>
      </Switch>

      {isLoaded && (
        <Switch>
          <Route path='/add-spot'>
            <AddSpotForm />
          </Route>
          <Route path='/your-spots'>
            <UserSpotsList />
          </Route>
        </Switch>
      )}
    </>
)};

export default App;
