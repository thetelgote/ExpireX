require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const expiryReminderCron =
  require("./cron/expiryReminderCron");

const deleteExpiredCron =
  require("./cron/deleteExpiredCron");



const PORT =
  process.env.PORT || 5000;

connectDB();

expiryReminderCron();
deleteExpiredCron();

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});





// require("dotenv").config();

// console.log("MONGO_URI =", process.env.MONGO_URI);

// const app = require("./app");
// const connectDB = require("./config/db");

// const PORT = process.env.PORT || 5000;

// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });