import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes/routes";
import Layout from "./Layout";


const App: React.FC = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {(Object.keys(routes) as (keyof (typeof routes))[]).map((key) => (
          routes[key].children?.length
            ? (
              <Route
                key={routes[key].name}
                path={routes[key].path}
              >
                <Route
                  key={routes[key].name}
                  path={routes[key].path}
                  element={routes[key].element}
                />
                {routes[key].children.map((childRoute) => (
                  <Route
                    key={childRoute.name}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            )
            : (
              <Route
                key={routes[key].name}
                path={routes[key].path}
                element={routes[key].element}
              />
            )
        ))}
      </Route>
    </Routes>
  );
};

export default App;
