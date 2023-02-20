const Address = require("../models/addressModel")
const Customer = require("../models/customerModel")

exports.addCustomer = async (req, res) => {
  try {
    const file = req.file
    const payload = {
      ...req.body,
      profilephoto: file.path,
    }
    const customer = Customer(payload)
    await customer.save()
    res.status(201).send({
      customer: customer,
      message: "Customer Add successfully",
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

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const file = req.file
    const oldCustomer = await Customer.findById(id)

    if (!oldCustomer) {
      throw new Error("Something went to wrong")
    }

    let profilephoto
    if (!file?.path) {
      profilephoto = oldCustomer.profilephoto
    } else {
      profilephoto = file.path
    }

    const payload = {
      ...req.body,
      profilephoto
    }
    await Customer.findByIdAndUpdate(id, { ...payload })
    const updatedCust = await Customer.findById(id)

    res.status(200).send({
      message: "Customer updated successfully",
      status: 200,
      customer: updatedCust,
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

exports.allCustomers = async (req, res) => {
  try {
    const customer = await Customer.find().populate("address")
    res.status(200).send({
      message: "All Customers list",
      status: 200,
      customer: customer,
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

exports.customerById = async (req, res) => {
  try {
    const { id } = req.params
    const oldCustomer = await Customer.findById(id)

    if (!oldCustomer) {
      throw new Error("Something went to wrong")
    }
    const customer = await Customer.findById(id).populate("address")
    res.status(200).send({
      message: "Customer By Id.",
      status: 200,
      customer: customer,
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

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const oldCustomer = await Customer.findById(id)

    if (!oldCustomer) {
      throw new Error("Something went to wrong")
    }
    await Address.findByIdAndDelete(oldCustomer.address)
    await Customer.findByIdAndDelete(id)

    res.status(200).send({
      message: "Delete Customer with address.",
      status: 200,
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