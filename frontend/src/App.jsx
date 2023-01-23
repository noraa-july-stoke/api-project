

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
import ReviewForm from "./components/Forms/ReviewForm/ReviewForm";
import EditReviewForm from "./components/Forms/EditReviewForm/EditReviewForm";

import * as sessionActions from "./store/session.js";


const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.thunkRestoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch, isLoaded]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsContainer />
          </Route>
          <Route exact path='/spots'>
            <SpotsContainer />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpotPage />
            <Route path={'/spots/:spotId/edit'}>
              <EditSpotForm />
            </Route>
          </Route>
          <Route path='/create-review/'>
            <ReviewForm />
          </Route>
          <Route path='/add-spot'>
            <AddSpotForm />
          </Route>
          <Route path='/your-spots'>
            <UserSpotsList />
          </Route>
          <Route path ='/reviews/:reviewId/edit'>
            <EditReviewForm />
          </Route>

        </Switch>
      )}
    </>
)};

export default App;
