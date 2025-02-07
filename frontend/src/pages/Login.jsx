import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginInWithGoogle } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleInputs = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginUser = async () => {
    try {
      await dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      );
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
      aspect-square w-8 flex justify-center items-center text-yellow-700"
      ></div>
    );
  return (
    <section className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-4 w-1/4 h-fit rounded shadow border border-gray-300 p-8">
      <h2 className="text-lg font-bold text-gray-900 text-center">Login</h2>
      <div className="space-y-3 w-full h-fit">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm text-gray-500 font-semibold"
          >
            Email:
          </label>
          <input
            type="email"
            onChange={handleInputs}
            name="email"
            value={formData.email}
            className="w-full py-2 px-4 rounded border border-gray-300 outline-none "
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm text-gray-500 font-semibold"
          >
            Password:
          </label>
          <input
            type="password"
            onChange={handleInputs}
            name="password"
            value={formData.password}
            className="w-full py-2 px-4 rounded border border-gray-300 outline-none "
          />
        </div>
      </div>
      <Link to="/register" className="text-blue-500 underline">
        dont have an account ? register
      </Link>
      <div className="flex items-center gap-4">
        <button
          onClick={loginUser}
          disabled={loading}
          className="w-full bg-blue-500 rounded shadow text-white py-2 cursor-pointer"
        >
          {loading ? "Loggin in" : "Loggin"}
        </button>
        <button
          onClick={() => dispatch(loginInWithGoogle())}
          disabled={loading}
          className="w-full bg-blue-500 rounded shadow text-white py-2 cursor-pointer"
        >
          {loading ? "Loggin in" : "Logg in with GOOGLE"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </section>
  );
};

export default Login;
