import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/auth/all-users",
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h4">All users</Typography>
      <Card className="w-1/3 p-4 flex flex-col gap-4">
        {data.map((user, id) => (
          <div className="flex items-center gap-4">
            <img
              src={user.image || "./assets/images/user.png"}
              alt={user.username}
              className="w-6 h-6 rounded-full"
            />
            <Typography variant="p">{user.email}</Typography>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AllUsers;
