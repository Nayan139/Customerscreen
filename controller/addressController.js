const Address = require("../models/addressModel")
const Customer = require("../models/customerModel")

exports.addAddress = async (req, res) => {
  try {
    const payload = {
      ...req.body,
    }
    const address = Address(payload)
    await address.save()
    await Customer.findOneAndUpdate(
      { _id: payload.customer },
      { $set: { address: address._id } },
      { new: true }
    )

    res.status(201).send({
      address: address,
      message: "Address Added successfully",
      status: 201,
    })
  } catch (error) {
    console.log("error", error)
    res.status(400).send({
      error: error,
      message: "Something went to wrong",
      status: 400,
    })
  }
}

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params
    const oldAddress = await Address.findById(id)
    if (!oldAddress) {
      throw new Error("Something went to wrong")
    }

    const payload = {
      ...req.body,
    }

    await Address.findByIdAndUpdate(id, { ...payload })
    const newAddress = await Address.findById(id)
    res.status(201).send({
      address: newAddress,
      message: "Address updated successfully",
      status: 201,
    })
  } catch (error) {
    console.log("error", error)
    res.status(400).send({
      error: error,
      message: "Something went to wrong",
      status: 400,
    })
  }
};

