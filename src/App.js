import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import css from './App.module.css';
import StoreContextProvider from './StoreContext';

import Activity from './Activity';
import Explore from './Explore';
import Header from './Header';
import Home from './Home';
import Navbar from './Navbar';
import NewPost from './NewPost';
import Profile from './Profile';

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
          <StoreContextProvider>
              <div className={css.container}>
                  <Header/>
                  <main className={css.content}>
                      <Switch>
                          <Route path="/explore">
                              <Explore/>
                          </Route>
                          <Route path="/newpost">
                              <NewPost/>
                          </Route>
                          <Route path="/activity">
                              <Activity/>
                          </Route>
                          <Route path="/profile/:userId?">
                              <Profile/>
                          </Route>
                          <Route path="/:postId?">
                              <Home/>
                          </Route>
                      </Switch>
                  </main>
                  <Navbar/>
              </div>
          </StoreContextProvider>
      </Router>
  );
}

export default App;