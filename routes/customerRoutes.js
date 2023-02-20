const express = require("express")
const router = express.Router()
const imageUpload = require("../helper/imageUpload")

const customerController = require("../controller/customerController")
const addressController = require("../controller/addressController")

//add customer and address
router.post(
  "/insertCustomer",
  [imageUpload.upload()],
  customerController.addCustomer
)

router.post("/insertAddress", addressController.addAddress)

//update customer and address
router.put("/updateCustomer/:id", [imageUpload.upload()], customerController.updateCustomer)

router.put("/updateAddress/:id", addressController.updateAddress)

//get list all the customer
router.get("/selectAllCustomers", customerController.allCustomers)

//get customer by id
router.get("/selectCustomerById/:id", customerController.customerById)

//delete customer [when you delete customer then address will be deleted meantime]
router.delete("/deleteCustomerById/:id", customerController.deleteCustomer)

module.exports = router
