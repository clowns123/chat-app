import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./screens/Home";
import UserList from "./screens/UserList";
import ChatRoomList from "./screens/ChatRoomList";
import ChatRoom from "./screens/ChatRoom";
import PrivateRoute from "./components/PrivateRoute";

function AppRoute() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/userlist" component={UserList} />
          <PrivateRoute exact path="/chatlist" component={ChatRoomList} />
          <PrivateRoute exact path="/chat/:chatId" component={ChatRoom} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRoute;
