import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleInputs = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async () => {
    try {
      await dispatch(
        register({
          username: formData.username,
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
      <h2 className="text-lg font-bold text-gray-900 text-center">Register</h2>
      <div className="space-y-3 w-full h-fit">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm text-gray-500 font-semibold"
          >
            Username:
          </label>
          <input
            type="text"
            onChange={handleInputs}
            name="username"
            value={formData.username}
            className="w-full py-2 px-4 rounded border border-gray-300 outline-none "
          />
        </div>
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
      <Link to="/login" className="text-blue-500 underline">
        Already have an account ? login
      </Link>
      <button
        onClick={registerUser}
        disabled={loading}
        className="w-full bg-blue-500 rounded shadow text-white py-2 cursor-pointer"
      >
        {loading ? "..." : "Register"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </section>
  );
};

export default Register;
