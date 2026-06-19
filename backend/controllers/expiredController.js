const ExpiredItem =
  require("../models/ExpiredItem");

const getExpiredItems =
  async (req, res) => {

    try {

      const items =
        await ExpiredItem.find({
          userId: req.user._id
        });

      res.json({
        success: true,
        items
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

module.exports = {
  getExpiredItems
};