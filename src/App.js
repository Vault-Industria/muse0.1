/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/analytics";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PendingUsers from "./pages/pendingusers";
import UserProfile from "./pages/userprofile";
import AllUsers from "./pages/allusers";
import Main from "./components/layout/Main";
import Assets from "./pages/assets";
import Creators from "./pages/creators";
import Collection from "./pages/collection";
import Collections from "./pages/collections";
import Analytics from "./pages/Home";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/creators" component={Creators} />
          <Route exact path="/assets" component={Assets} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route  path="/userprofile/:id" component={UserProfile} />
          <Route exact path="/Pendingusers" component={PendingUsers} />
          <Route exact path="/allusers" component={AllUsers} />
          <Route path="/collection/:id" component={Collection} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/analytics" component={Analytics} />
          {/* <Route exact path="/" component={SignIn} /> */}
          {/* <Redirect from="*" to="/dashboard" /> */}

          {/* admin */}
          
        </Main>
      </Switch>
    </div>
  );
}

export default App;
