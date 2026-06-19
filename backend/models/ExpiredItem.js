const mongoose = require("mongoose");

const expiredItemSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      itemName: String,

      expiryDate: Date,

      deletedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "ExpiredItem",
  expiredItemSchema
);