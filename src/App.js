import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginScreen from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
import AuthScreen from "./Pages/LoginPage";

const DashboardLayout = () => (
  <Dashboard>
    <Outlet />
  </Dashboard>
);


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AuthScreen isRegister={false}/>} />
        <Route path="*" element={<Navigate to="/admin" />} />

        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
