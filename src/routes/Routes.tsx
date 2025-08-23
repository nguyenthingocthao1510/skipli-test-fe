import { Navigate } from "react-router";
import { LoginPage } from "../pages/Login";
import { RoutesProps } from "./routeTypes";
import { homepageRoute, loginRoute } from "./routes.constant";
import { lazy } from "react";

const Homepage = lazy(() =>
  import("../pages/Homepage").then((module) => ({
    default: module.Homepage,
  }))
);

const routes: RoutesProps[] = [
  {
    path: "/",
    name: "",
    element: <Navigate to={loginRoute} replace />,
  },
  {
    path: loginRoute,
    name: "login",
    element: <LoginPage />,
  },
  {
    path: homepageRoute,
    name: "homepage",
    element: <Homepage />, 
    isPrivate: true,
  },
];

export { routes };
