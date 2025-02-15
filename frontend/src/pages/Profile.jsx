import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/user/userSlice";
import { Button, TextField, CircularProgress, Alert } from "@mui/material";
import PhoneInput from "react-phone-number-input";

import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";

const UserAccount = ({ user }) => {
  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-screen p-4 bg-gray-200 justify-between">
      <h1 className="text-3xl font-bold mb-4">User Account</h1>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Image:</h4>
          <img
            src={user.image || ""}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Username:</h4>
          <span className="text-sm leading-none">{user?.username}</span>
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Email:</h4>
          <span className="text-sm leading-none">{user?.email}</span>
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Address:</h4>
          <span className="text-sm leading-none">
            {user?.address || "...."}
          </span>
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Phone</h4>
          <span className="text-sm leading-none">{user?.phone || "...."}</span>
        </div>
      </div>
      <Link to="/">
        <Button startIcon={<ArrowCircleLeftOutlined />} variant="contained">
          Go Home
        </Button>
      </Link>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    image: "",
  });
  const [phone, setPhone] = useState("");

  const handInputs = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handImg = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  //   useEffect(() => {
  //     if (user) {
  //       setUsername(user.username || "");
  //       setAddress(user.address || "");
  //       setEmail(user.email || "");
  //       setPhone(user.phone || "");
  //       setImage(user.image || "");
  //     } else {
  //       setUsername("");
  //       setAddress("");
  //       setEmail("");
  //       setPhone("");
  //     }
  //   }, [user]);

  const handleUpdate = async () => {
    if (!user || !user._id) {
      console.error("User ID is missing");
      return;
    }

    if (
      formData.username === "" ||
      formData.address === "" ||
      formData.email === "" ||
      formData.phone === ""
    )
      return;

    const formDataInputs = new FormData();
    formDataInputs.append("username", formData.username);
    formDataInputs.append("address", formData.address);
    if (formData.image) {
      formDataInputs.append("image", formData.image);
    }
    formDataInputs.append("email", formData.email);
    formDataInputs.append("phone", phone);

    try {
      await dispatch(
        updateUser({
          id: user._id,
          userData: formData,
        })
      );
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <>
      <UserAccount user={user} />
      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Update Username"
          fullWidth
          margin="normal"
          value={formData.username}
          name="username"
          required
          onChange={handInputs}
        />
        <TextField
          label="Update Email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handInputs}
        />
        <TextField
          label="Update Address"
          fullWidth
          margin="normal"
          name="address"
          value={formData.address}
          onChange={handInputs}
        />
        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700">
            Update Phone Number
          </label>
          <PhoneInput
            international
            defaultCountry="DZ"
            value={phone}
            onChange={setPhone}
            className="flex items-center outline-none w-full border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
          />
        </div>
        <input type="file" margin="normal" onChange={handImg} />

        <Button
          onClick={handleUpdate}
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "10px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Update"}
        </Button>
      </div>
    </>
  );
};

export default Profile;
