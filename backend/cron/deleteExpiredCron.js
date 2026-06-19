// const cron = require("node-cron");

// const Item = require("../models/Item");
// const ExpiredItem =
//   require("../models/ExpiredItem");

// const Notification =
//   require("../models/Notification");

// /*
// Runs Everyday at Midnight

// 0 0 * * *
// */

// const deleteExpiredCron = () => {

//   cron.schedule(
//     "0 0 * * *",
//     async () => {

//       console.log(
//         "Checking expired products..."
//       );

//       try {

//         const today =
//           new Date();

//         const expiredItems =
//           await Item.find({
//             expiryDate: {
//               $lt: today
//             }
//           });

//         for (
//           const item
//           of expiredItems
//         ) {

//           await ExpiredItem.create({
//             userId: item.userId,
//             itemName:
//               item.itemName,
//             expiryDate:
//               item.expiryDate
//           });

//           await Notification.create({
//             userId: item.userId,
//             message:
//               `${item.itemName} has expired and moved to archive`
//           });

//           await Item.findByIdAndDelete(
//             item._id
//           );

//           console.log(
//             `${item.itemName} archived`
//           );
//         }

//       } catch (error) {

//         console.log(error.message);

//       }

//     }
//   );
// };

// module.exports =
//   deleteExpiredCron;
const cron = require("node-cron");

const Item = require("../models/Item");
const User = require("../models/User");
const ExpiredItem =
  require("../models/ExpiredItem");

const Notification =
  require("../models/Notification");

const {
  sendExpiredAlert
} = require(
  "../services/emailService"
);

/*
Checks for expired items, archives them,
and creates a notification for each one.
*/

const checkExpiredItems = async () => {

  console.log(
    "Checking expired products..."
  );

  try {

    const today =
      new Date();

    const expiredItems =
      await Item.find({
        expiryDate: {
          $lt: today
        }
      });

    for (
      const item
      of expiredItems
    ) {

      await ExpiredItem.create({
        userId: item.userId,
        itemName:
          item.itemName,
        expiryDate:
          item.expiryDate
      });

      await Notification.create({
        userId: item.userId,
        message:
          `${item.itemName} has expired and moved to archive`
      });

      const user =
        await User.findById(
          item.userId
        );

      if (user) {
        await sendExpiredAlert(
          user.email,
          item.itemName,
          item.expiryDate
        );
      }

      await Item.findByIdAndDelete(
        item._id
      );

      console.log(
        `${item.itemName} archived`
      );
    }

  } catch (error) {

    console.log(error.message);

  }

};

/*
Runs every minute, so items are archived
and notified about almost as soon as they expire.

* * * * *
*/

const deleteExpiredCron = () => {

  // Run once immediately on startup,
  // so already-expired items are caught right away.
  checkExpiredItems();

  cron.schedule(
    "* * * * *",
    checkExpiredItems
  );
};

module.exports =
  deleteExpiredCron;