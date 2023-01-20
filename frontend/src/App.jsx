

// NPM Library Imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux';

// Local Module/Function Component Imports
import Navigation from "./components/Navigation";
import SpotsContainer from "./components/SpotDisplayComponents/SpotsContainer";
import AddSpotForm from "./components/SpotDisplayComponents/AddSpotForm/AddSpotForm";
import SingleSpotPage from "./components/SpotDisplayComponents/SingleSpotPage";

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
      <Route exact path='/'>
        <SpotsContainer />
      </Route>
      <Route path='/spots/:spotId'>
        <SingleSpotPage />
      </Route>

      {isLoaded && (
        <Switch>

          <Route path='/spots/:userId/add-spot'>
            <AddSpotForm />
          </Route>

        </Switch>
      )}
    </>
)};

export default App;
