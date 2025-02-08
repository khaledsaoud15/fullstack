import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAuthRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return user ? null : children;
};

export default ProtectedAuthRoute;
