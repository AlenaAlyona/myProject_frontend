import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import Navbar from "./components/Navigation/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

import Homepage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import DashBoard from "./components/Chat/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/main" component={MainPage} />
        <Route path="/chat" component={DashBoard} />
      </Switch>
    </div>
  );
}

export default App;
