import { Route, Redirect, RouteProps } from "react-router-dom";
import { useData } from "../contexts/useData";

function PrivateRoute(props: RouteProps) {
  const { state } = useData();
  if (!state.isLogin) return <Redirect to="/" />;
  return <Route {...props} />;
}

export default PrivateRoute;
