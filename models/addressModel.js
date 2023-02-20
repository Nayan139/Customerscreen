const mongoose = require("mongoose")

const Schema = mongoose.Schema

const addressSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: "Customer",
    },
    add: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Address = mongoose.model("Address", addressSchema)
module.exports = Address
