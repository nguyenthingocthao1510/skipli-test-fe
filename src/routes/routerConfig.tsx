import { Navigate, Route, Routes } from "react-router";
import { routes } from "./Routes";
import Cookies from "js-cookie";
import { loginRoute } from "./routes.constant";
import { JSX } from "react";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const token = Cookies.get("token");
  console.log(token);
  if (!token) {
    return <Navigate to={loginRoute} replace />;
  }
  return element;
};

const renderRoute = (route: any[]) =>
  route.map(({ path, element, children, isPrivate }, index) => {
    const protectRoute = isPrivate ? (
      <ProtectedRoute element={element} />
    ) : (
      element
    );

    return (
      <Route key={index} path={path} element={protectRoute}>
        {children && renderRoute(children)}
      </Route>
    );
  });

export const RouterRoute = () => {
  return <Routes>{renderRoute(routes)}</Routes>;
};
