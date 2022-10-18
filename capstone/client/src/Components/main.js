import React from 'react';
import { Switch, Route } from 'react-router-dom';

import index from 'capstone\client\src\index.js'
import login from 'capstone\client\src\login.js';
import Dashboard from 'capstone\client\src\Dashboard.js';

const Main = () => {
  return (
    <Route> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/login' component={login}></Route>
      <Route exact path='/dashboard' component={Dashboard}></Route>
    </Route>
  );
}

export default Main;