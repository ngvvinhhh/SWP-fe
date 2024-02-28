import { useEffect } from "react";
import "./App.css";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/login";
import Register from "./page/register";
import Dashboard from "./component/dashboard";
import Profile from "./page/profile";
import Package from "./page/package";
import Statistics from "./page/statistics";

function App() {
  //useEffect : dinh nghia function chay khi nao

  //chay khi trang load len
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "package",
          element: <Package />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
      ],
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
