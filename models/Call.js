const mongoose = require("mongoose");

const callSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    callType: {
      type: String,
      enum: ["inbound", "outbound"],
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "pending",
    },
    transcript: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Call", callSchema);
