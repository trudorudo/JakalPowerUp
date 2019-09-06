import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import LoginPage from "./screens/loginpage";
import SignupPage from "./screens/signuppage";
import FirstPage from "./screens/firstpage";
import SecondPage from "./screens/secondpage";
import ThirdPage from "./screens/thirdpage";
import Map from "./components/GoogleMaps/googlemaps";
import "react-toastify/dist/ReactToastify.css"


class App extends React.Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path={'/'} component={LoginPage} />
            <Route exact path={'/signup'} component={SignupPage} />
            <Route exact path={'/landing'} component={FirstPage} />
            <Route exact path={'/checkout'} component={SecondPage} />
            <Route exact path={'/rental'} component={ThirdPage} />
            <Route exact path={'/map'} component={Map} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;