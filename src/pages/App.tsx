import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import { IRoute } from "../types";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";


const App: React.FC = () => {
  
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          {(Object.keys(routes) as (keyof (typeof routes))[]).map((key) => (
            getRouteElementWithChildren(routes[key])
          ))}
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;

const getRouteElementWithChildren = (route: IRoute&{children: IRoute[], protected?: boolean}) => {

  if (!route.children?.length) {
    return (
      <Route
        key={route.name}
        path={route.path}
        element={route.element}
      />
    );
  }

  return (
    <Route
      key={route.name}
      path={route.path}
      element={route.protected ? <ProtectedRoute /> : undefined}
    >
      <Route
        key={route.name}
        path={route.path}
        element={route.element}
      />
      {route.children.map((childRoute) => (
        <Route
          key={childRoute.name}
          path={childRoute.path}
          element={childRoute.element}
        />
      ))}
    </Route>
  );
};