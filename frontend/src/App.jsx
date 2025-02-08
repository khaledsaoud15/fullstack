import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import ProtectedAuthRoute from "./lib/ProtectedRoute";
import { useEffect } from "react";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Protect the home route */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />

        {/* Prevent logged-in users from accessing login & register */}
        <Route
          path="/register"
          element={
            <ProtectedAuthRoute>
              <Register />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
