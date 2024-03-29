import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from './components/AppliedRoutes';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';

export default function Routes({ addProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} addProps={addProps} />
      <AppliedRoute path="/login" exact component={Login} addProps={addProps} />
      <AppliedRoute
        path="/signup"
        exact
        component={Signup}
        addProps={addProps}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
