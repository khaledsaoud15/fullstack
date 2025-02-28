const UserSignIn = require("../models/userSignin.model");

// GET Sign-In Statistics
const stats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    // 🟢 Daily Sign-ins
    const dailySignIns = await UserSignIn.aggregate([
      {
        $match: {
          signInDate: { $gte: new Date(currentYear, currentMonth, currentDay) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$signInDate" } },
          signins: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🟠 Monthly Sign-ins
    const monthlySignIns = await UserSignIn.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$signInDate" } },
          signins: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🔵 Yearly Sign-ins
    const yearlySignIns = await UserSignIn.aggregate([
      {
        $group: {
          _id: { $year: "$signInDate" },
          signins: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      daily: dailySignIns,
      monthly: monthlySignIns,
      yearly: yearlySignIns,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics" });
  }
};

module.exports = { stats };
