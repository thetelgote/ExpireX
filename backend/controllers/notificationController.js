// const Notification =
//   require("../models/Notification");

// const getNotifications =
//   async (req, res) => {

//     try {

//       const notifications =
//         await Notification.find({
//           userId: req.user._id
//         }).sort({
//           createdAt: -1
//         });

//       res.json({
//         success: true,
//         count: notifications.length,
//         notifications
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });

//     }
// };

// const markAsRead =
//   async (req, res) => {

//     try {

//       const notification =
//         await Notification.findById(
//           req.params.id
//         );

//       if (!notification) {
//         return res.status(404).json({
//           success: false,
//           message:
//             "Notification not found"
//         });
//       }

//       notification.isRead = true;

//       await notification.save();

//       res.json({
//         success: true,
//         notification
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message
//       });

//     }
// };

// module.exports = {
//   getNotifications,
//   markAsRead
// };


const Notification =
  require("../models/Notification");

const getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find({
          userId: req.user._id
        }).sort({
          createdAt: -1
        });

      res.json({
        success: true,
        count: notifications.length,
        notifications
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

const markAsRead =
  async (req, res) => {

    try {

      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found"
        });
      }

      notification.isRead = true;

      await notification.save();

      res.json({
        success: true,
        notification
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

const markAllAsRead =
  async (req, res) => {

    try {

      await Notification.updateMany(
        {
          userId: req.user._id,
          isRead: false
        },
        {
          isRead: true
        }
      );

      res.json({
        success: true,
        message:
          "All notifications marked as read"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

const deleteNotification =
  async (req, res) => {

    try {

      const notification =
        await Notification.findOne({
          _id: req.params.id,
          userId: req.user._id
        });

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            "Notification not found"
        });
      }

      await Notification.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Notification deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};