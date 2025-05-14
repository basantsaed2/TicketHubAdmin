// import {} from "./layouts/Layouts";
import App from "./App";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import LoginAgent from "./Pages/Authentication/LoginAgent";
import LoginSuper from "./Pages/Authentication/LoginSuper";
import { AgentHomePage } from "./Pages/AllPages";
import AgentLayout from "./Layouts/AgentLayouts/AgentLayout";
import { AddBusesLayout, AddCarsLayout, AddHiacesLayout, AddTripsLayout, AgentProfileLayout, BookingLayout, BusesLayout, CarsLayout, EditBusesLayout, EditCarsLayout, EditHiacesLayout, EditTripsLayout, HiacesLayout, PayoutLayout, PayoutRequestLayout, TripsLayout, WalletLayout, BookingReportsLayout, EarningReportsLayout, PrivateRequestLayout, BookingDetailsLayout, PaymentsLayout, TrainsLayout, AddTrainsLayout, EditTrainsLayout } from "./Layouts/AllLayouts";
import { useAuth } from '../src/Context/Auth';
import { RouterProvider } from "react-router-dom";

const AppLayoutAgent = () => (
  <>
    <AgentLayout />
  </>
);

const createRoutes = (auth) => [
  {
    path: "/",
    element: <LoginAgent />,
  },
  {
    path: "/login_admin",
    element: <LoginSuper />,
  },


  // Agent Routes
  {
    element: <ProtectedRoute allowedRoles={['agent']} />,
    path: '/dashboard_operator',
    children: [
      {
        path: '',
        element: <AppLayoutAgent />,
        children: [
          {
            path: '',
            element: <AgentHomePage />,
          },
          {
            path: 'profile',
            element: <AgentProfileLayout />
          },
          ...(auth.user?.modules.some(module => module.module === 'private') ? [
            {
              path: 'cars',
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <CarsLayout />
                },
                {
                  path: 'add',
                  element: <AddCarsLayout />
                },
                {
                  path: 'edit/:carId',
                  element: <EditCarsLayout />
                }
              ]
            },
          ] : []),
          ...(auth.user?.modules.some(module => module.module === 'bus') ? [
            {
              path: 'buses',
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <BusesLayout />
                },
                {
                  path: 'add',
                  element: <AddBusesLayout />
                },
                {
                  path: 'edit/:busId',
                  element: <EditBusesLayout />
                }
              ]
            }
          ] : []),
          ...(auth.user?.modules.some(module => module.module === 'hiace') ? [
            {
              path: 'mini_vans',
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <HiacesLayout />
                },
                {
                  path: 'add',
                  element: <AddHiacesLayout />
                },
                {
                  path: 'edit/:hiaceId',
                  element: <EditHiacesLayout />
                }
              ]
            },
          ] : []),
          ...(auth.user?.modules.some(module => module.module === 'train') ? [
            {
              path: 'trains',
              element: <Outlet />,
              children: [
                {
                  path: '',
                  element: <TrainsLayout />
                },
                {
                  path: 'add',
                  element: <AddTrainsLayout />
                },
                {
                  path: 'edit/:trainId',
                  element: <EditTrainsLayout />
                }
              ]
            },
          ] : []),
          {
            path: 'trips',
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <TripsLayout />
              },
              {
                path: 'add',
                element: <AddTripsLayout />
              },
              {
                path: 'edit/:tripId',
                element: <EditTripsLayout />
              }
            ]
          },
          {
            path: 'booking',
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <BookingLayout />,
              },
              {
                path: 'details/:bookingId',
                element: <BookingDetailsLayout />,
              }
            ]
          },
          {
            path: 'payout',
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <PayoutLayout />,
              }
            ]
          },
          {
            path: 'wallet',
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <WalletLayout />,
              },
              {
                path: 'payout_request/:walletId',
                element: <PayoutRequestLayout />
              }
            ]
          },
          {
            path: 'payments',
            element: <PaymentsLayout />,
          },
          ...(auth.user?.modules.some(module => module.module === 'private') ? [
            {
              path: 'private_request',
              element: <PrivateRequestLayout />,
            },
          ] : []),

          {
            path: 'reports',
            element: <Outlet />,
            children: [
              {
                path: 'booking_reports',
                element: <Outlet />,
                children: [
                  {
                    path: '',
                    element: <BookingReportsLayout />,
                  },
                  {
                    path: 'details/:bookingId',
                    element: <BookingDetailsLayout />,
                  }
                ]
              },
              {
                path: 'earning_reports',
                element: <EarningReportsLayout />,
              }
            ]
          },

        ]
      },
    ],
  }

];

export const AppRouter = () => {
  const auth = useAuth();
  const router = createBrowserRouter(createRoutes(auth));
  return <RouterProvider router={router} />;
};

// Export the raw routes for testing or other purposes
export const routes = (auth) => createRoutes(auth);