import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Errorpage";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoute from "../context/PrivateRoute";
import Marathons from "../pages/Marathons/Marathons";
import MarathonDetails from "../pages/Marathons/MarathonDetails";

import Dashbord from "../pages/Dashbord/Dashbord";
import MyMarathonList from "../pages/Dashbord/MyMarathonList";
import MyApplyList from "../pages/Dashbord/MyApplyList";
import AddMarathon from "../pages/Dashbord/AddMarathon";
import MarathonRegistration from "../pages/Marathons/MarathonRegistration";
import AboutUs from "../pages/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'aboutUs',
        Component: AboutUs,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registration",
        Component: Registration,
      },
      {
        path: "marathons",
        // loader: () => fetch(`${import.meta.env.VITE_API_URL}/marathons`),
        element:

          <Marathons></Marathons>
        
        ,
      },
      {
        path: "marathons/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/marathons/${params.id}`),
        element: (
          <PrivateRoute>
            <MarathonDetails></MarathonDetails>
          </PrivateRoute>
        ),
      },
      {
        path: 'marathonRegistration',
        element:<PrivateRoute>
          <MarathonRegistration></MarathonRegistration>
        </PrivateRoute>
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashbord></Dashbord>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addMarathon",
        element: <AddMarathon />,
      },
      {
        path: "myMarathonList",
        element: <MyMarathonList />,
      },
      {
        path: "myApplyList",
        element: <MyApplyList />,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
