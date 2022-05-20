import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "context/AuthProvider";
import Nav from "components/Nav";
import HomePage from "pages/HomePage";
import MainPage from "pages/MainPage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <AuthProvider>
          <Nav />
          <Switch>
            <Route path="/main">
              <MainPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
