import React from "react";
import { AuthProvider } from "../Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Home from "./Home";
import Tournaments from "./Tournaments";
import "../css/App.css";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <PrivateRoute path="/tournaments" component={Tournaments} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
