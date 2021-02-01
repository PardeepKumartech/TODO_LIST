import React  from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import login from './Components/Login';
import TodoApp from './Components/TodoApp';
const _ = require("lodash");


const isAuth = !_.isEmpty(localStorage.getItem('user')) ? true : false;
console.log("isAuth", isAuth)
const base_path = "/";

const IfUserAuth = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuth === false
      ? <Redirect to={base_path} />
      : <Component {...props} />
  )} />
)

const IfUserNotAuth = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuth === false
      ? <Component {...props} />
      : <Redirect to={"/todo"} />
  )} />
)

function App() {
    return (
      <Router>
        <Switch>
          <IfUserNotAuth exact path={base_path} component={login} />
          <IfUserAuth exact path={base_path + "todo"} component={TodoApp} />
        </Switch>
      </Router>
    );
}
export default App;
