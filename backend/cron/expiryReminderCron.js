const cron = require("node-cron");

const Item = require("../models/Item");
const User = require("../models/User");
const Notification =
  require("../models/Notification");

const {
  sendExpiryReminder
} = require(
  "../services/emailService"
);

const {
  calculateDaysLeft
} = require(
  "../utils/dateHelper"
);

/*
Runs Everyday at 9 AM

0 9 * * *
*/

const expiryReminderCron = () => {

  cron.schedule(
    "0 9 * * *",
    async () => {

      console.log(
        "Checking expiry reminders..."
      );

      try {

        const items =
          await Item.find();

        for (const item of items) {

          const daysLeft =
            calculateDaysLeft(
              item.expiryDate
            );

          if (
            daysLeft === 30 ||
            daysLeft === 15 ||
            daysLeft === 7 ||
            daysLeft === 1
          ) {

            const user =
              await User.findById(
                item.userId
              );

            if (!user) continue;

            await sendExpiryReminder(
              user.email,
              item.itemName,
              daysLeft,
              item.expiryDate
            );

            await Notification.create({
              userId: user._id,
              message:
                `${item.itemName} expires in ${daysLeft} day(s)`
            });

            console.log(
              `${item.itemName} reminder sent`
            );
          }
        }

      } catch (error) {

        console.log(error.message);

      }

    }
  );
};

module.exports =
  expiryReminderCron;