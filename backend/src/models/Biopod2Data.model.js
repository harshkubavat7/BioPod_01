const mongoose = require("mongoose");

const Biopod2Schema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    light: {
      type: String,
      enum: ["ON", "OFF"],
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

module.exports = mongoose.model("Biopod2Data", Biopod2Schema);
