import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { getAuth, signInWithPopup } from "firebase/auth";
//import { provider } from "./config/firebase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/login";
import Register from "./page/register";

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
  ]);

  const loginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
