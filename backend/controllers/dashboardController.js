const Item =
  require("../models/Item");

const dashboardStats =
  async (req, res) => {

    try {

      const items =
        await Item.find({
          userId: req.user._id
        });

      const totalProducts =
        items.length;

      const today =
        new Date();

      let freshProducts = 0;
      let expired = 0;
      let expiringSoon = 0;

      const categoryCounts = {};

      items.forEach((item) => {

        const diff =
          Math.ceil(
            (
              new Date(item.expiryDate)
              - today
            ) /
            (
              1000 *
              60 *
              60 *
              24
            )
          );

        if (diff < 0) {
          expired++;
        } else if (
          diff <= 30
        ) {
          expiringSoon++;
        } else {
          freshProducts++;
        }

        // Build category distribution
        const categoryKey = item.category || "Uncategorized";

        categoryCounts[categoryKey] =
          (categoryCounts[categoryKey] || 0) + 1;

      });

      // Convert { Dairy: 2, Medicine: 1 } into [{ category: "Dairy", count: 2 }, ...]
      const categoryDistribution = Object.entries(
        categoryCounts
      ).map(([category, count]) => ({
        category,
        count
      }));

      res.json({
        success: true,
        totalProducts,
        freshProducts,
        expired,
        expiringSoon,
        categoryDistribution
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

module.exports = {
  dashboardStats
};