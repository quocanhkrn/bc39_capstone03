import { Route } from "react-router-dom";

const { lazy } = require("react");

const routes = [
  // HOME ROUTES
  {
    path: "/",
    element: lazy(() => import("pages/HomeTemplate")),
    nestedElements: [
      { path: "/", element: lazy(() => import("pages/HomeTemplate/Homepage")) },
      { path: "details/:id", element: lazy(() => import("pages/HomeTemplate/MovieDetails")) },
      { path: "reservation/:id", element: lazy(() => import("pages/HomeTemplate/TicketBooking")) },
      { path: "reservationCompleted", element: lazy(() => import("pages/HomeTemplate/BookingSuccess")) },
    ],
  },
  {
    path: "signin",
    element: lazy(() => import("pages/HomeTemplate/SignIn")),
  },
  {
    path: "signup",
    element: lazy(() => import("pages/HomeTemplate/SignUp")),
  },

  // ADMIN ROUTES
  {
    path: "admin",
    element: lazy(() => import("pages/AdminTemplate")),
    nestedElements: [
      { path: "movies", element: lazy(() => import("pages/AdminTemplate/Movies")) },
      { path: "movies/new", element: lazy(() => import("pages/AdminTemplate/MovieForm")) },
      { path: "movies/edit/:id", element: lazy(() => import("pages/AdminTemplate/MovieForm")) },
      { path: "users", element: lazy(() => import("pages/AdminTemplate/Users")) },
      { path: "users/new", element: lazy(() => import("pages/AdminTemplate/UserForm")) },
      { path: "users/edit/:username", element: lazy(() => import("pages/AdminTemplate/UserForm")) },
    ],
  },
  { path: "admin/signin", element: lazy(() => import("pages/AdminTemplate/SignIn")) },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nestedElements) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nestedElements.map((route) => {
            return <Route key={route.path} path={route.path} element={<route.element />} />;
          })}
        </Route>
      );
    } else {
      return <Route key={route.path} path={route.path} element={<route.element />} />;
    }
  });
};

export default renderRoutes;
