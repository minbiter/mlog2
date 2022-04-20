import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "context/AuthProvider";
import Nav from "components/Nav";
import HomePage from "pages/HomePage";
import MainPage from "pages/MainPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Switch>
          <Route path="/main">
            <MainPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
