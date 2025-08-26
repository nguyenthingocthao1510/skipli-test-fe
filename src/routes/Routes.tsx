import { Navigate } from "react-router";
import { LoginPage } from "../pages/Login";
import { RoutesProps } from "./routeTypes";
import { homepageRoute, loginRoute, signUpRoute } from "./routes.constant";
import { lazy } from "react";
import { SignUpPage } from "../pages/SignUp";

const Homepage = lazy(() => import("../pages/Homepage"));

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
    path: signUpRoute,
    name: "signup",
    element: <SignUpPage />,
  },
  {
    path: homepageRoute,
    name: "homepage",
    element: <Homepage />,
    isPrivate: true,
  },
  {
    path: "*",
    name: "not-found",
    element: <div>404 Not Found</div>,
  },
];

export { routes };
