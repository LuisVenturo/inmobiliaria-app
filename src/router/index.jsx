import { createBrowserRouter } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"
import Layout from "../components/Layout"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import PropertyDetail from "../pages/PropertyDetail"
import MyVisits from "../pages/MyVisits"
import PanelAdmin from "../pages/PanelAdmin"
import Unauthorized from "../pages/Unauthorized"
import NotFound from "../pages/NotFound"

export const router = createBrowserRouter([
  {
    element: <Layout />,   // se envuelve todas las rutas
    children: [
      // Rutas públicas
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/unauthorized", element: <Unauthorized /> },

      // Rutas protegidas
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: "/property/:id",
        element: <ProtectedRoute><PropertyDetail /></ProtectedRoute>
      },
      {
        path: "/my-visits",
        element: <ProtectedRoute><MyVisits /></ProtectedRoute>
      },

      // Solo admin
      {
        path: "/panel-admin",
        element: <ProtectedRoute><AdminRoute><PanelAdmin /></AdminRoute></ProtectedRoute>
      },

      // 404
      { path: "*", element: <NotFound /> },
    ]
  }
])