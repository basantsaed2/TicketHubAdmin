// import {} from "./layouts/Layouts";
import App from "./App";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import LoginAgent from "./Pages/Authentication/LoginAgent";
import LoginSuper from "./Pages/Authentication/LoginSuper";
import { AdminHomePage,AgentHomePage } from "./Pages/AllPages";
import SuperAdminLayout from "./Layouts/SuperAdminLayouts/SuperAdminLayout";
import AgentLayout from "./Layouts/AgentLayouts/AgentLayout";
import { AddCarsLayout, CarsLayout, EditCarsLayout } from "./Layouts/AllLayouts";

const AppLayoutAdmin = () => (
  <>
    <SuperAdminLayout/>
  </>
);
// const AppCarLayout= () => (
//   <>
//     <Outlet/>
//   </>
// );
const AppLayoutAgent = () => (
    <>
      <AgentLayout/>
    </>
);

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LoginAgent />,
    },
    {
      path: "/login_admin",
      element: <LoginSuper />,
    },
   

    /* Admin Routes*/
    // {
    //   element: <ProtectedRoute allowedRoles={['admin']} />,
    //   path: '/dashboard_admin',
    //   children: [
    //     {
    //       path: '',
    //       element: <AppLayoutAdmin/>,
    //       children: [
    //         {
    //           path: '',
    //           element: <AdminHomePage/>,
    //         },
    //       ],
    //     },
    //   ]
    // },

    // Agent Routes
    {
      element: <ProtectedRoute allowedRoles={['agent']} />,
      path: '/dashboard_operator',
      children: [
        {
          path: '',
          element: <AppLayoutAgent/>,
          children: [
            {
              path: '',
              element: <AgentHomePage/>,
            },
            {
              path:'cars',
              element: <Outlet/>,
              children: [
                {
                  path: '',
                  element: <CarsLayout/>
                },
                {
                  path: 'add',
                  element:<AddCarsLayout/>
                },
                {
                  path: 'edit/:carId',
                  element:<EditCarsLayout/>
                }
              ]          
            }
          ]
        },
      ],
    },

]);
