import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { fetchSignInStats } from "../../redux/user/userStatsSlice";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Stats = () => {
  const dispatch = useDispatch();
  const { daily, monthly, yearly, loading, error } = useSelector(
    (state) => state.stats
  );

  useEffect(() => {
    dispatch(fetchSignInStats());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching stats</p>;

  return (
    <section className="flex flex-col gap-8">
      <Typography variant="h4">User Sign-in Statistics</Typography>
      <div className="grid grid-cols-3 gap-6 ">
        {/* Line Chart for Daily Sign-ins */}
        <Card className="w-full flex flex-col items-center justify-center">
          <CardContent>
            <Typography variant="h6">Daily Sign-ins</Typography>
            <LineChart width={300} height={200} data={daily}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="signins" stroke="#8884d8" />
            </LineChart>
          </CardContent>
        </Card>

        {/* Bar Chart for Monthly Sign-ins */}
        <Card className="w-full flex flex-col items-center justify-center">
          <CardContent>
            <Typography variant="h6">Monthly Sign-ins</Typography>
            <BarChart width={300} height={200} data={monthly}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="signins" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Pie Chart for Yearly Sign-ins */}
        <Card className="w-full flex flex-col items-center justify-center">
          <CardContent>
            <Typography variant="h6">Yearly Sign-ins</Typography>
            <PieChart width={300} height={200}>
              <Pie
                data={yearly}
                dataKey="signins"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {yearly.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Stats;
