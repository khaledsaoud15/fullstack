import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import ProtectedAuthRoute from "./lib/ProtectedRoute";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import Dashboared from "./pages/Dashboared";

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

        <Route
          path="/dashboared/*"
          element={
            user?.role === "admin" ? (
              <Dashboared />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/profile" element={<Profile />} />

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
