const mongoose = require("mongoose")
const validator = require("validator")
const CryptoJS = require("crypto-js")

const Schema = mongoose.Schema

var validateMobileNo = function (Mno) {
  var re = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/
  return re.test(Mno)
}

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (value !== "Male" && value !== "Female") {
          throw new Error('Please Enter "Male"  And "Female"  ')
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: {
        args: true,
        msg: "Email Already exists...",
      },
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter Valid Email Address...")
        }
      },
    },
    phone: {
      type: Number,
      required: true,
      unique: {
        args: true,
        msg: "phone number already exist",
      },
      validate: [validateMobileNo, "Please Valid Phone No..."],
    },
    username: {
      type: String,
      required: true,
      unique: {
        args: true,
        msg: "UserName Already exists...",
      },
      validate(value) {
        if (!validator.isLowercase(value)) {
          throw new Error("Please Enter in LowerCase...")
        }
      },
    },
    dob: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong PassWord.")
        }
      },
    },
    profilephoto: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

customerSchema.virtual("Address", {
  ref: "Address",
  localField: "_id",
  foreignField: "_id",
})

//Validation For Unique UserName,Email,Mobile Number...
customerSchema.path("username").validate(async (username) => {
  const userCount = await mongoose.models.Customer.countDocuments({ username })
  return !userCount
}, "username already Exists...")

customerSchema.path("phone").validate(async (phone) => {
  const noCount = await mongoose.models.Customer.countDocuments({ phone })
  return !noCount
}, "phone No already Exists")

customerSchema.path("email").validate(async (email) => {
  const mailCount = await mongoose.models.Customer.countDocuments({ email })
  return !mailCount
}, "email already exists...")

//Pre Save
customerSchema.pre("save", async function (next) {
  const customer = this
  console.log('run the save method')
  if (customer.isModified("password")) {
    customer.password = await CryptoJS.AES.encrypt(
      customer.password,
      "secretkey123"
    ).toString()
  }
  next()
})


const Customer = mongoose.model("Customer", customerSchema)
module.exports = Customer
