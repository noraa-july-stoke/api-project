

// NPM Library Imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// Local Module/Function Component Imports
import Navigation from "./components/Navigation";
import SpotsContainer from "./components/SpotDisplayComponents/SpotsContainer";

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
      {isLoaded && (
        <Switch>
          <Route path='/spots'>
            <SpotsContainer />
          </Route>
        </Switch>
      )}
    </>
)};

export default App;
