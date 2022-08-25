const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uploaddataSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    usertype: {
      type: String,
    },
    corporate_name: {
      type: String,
    },
    referral_code: {
      type: String,
    },
    organisation: {
      type: String,
    },
    offer: {
      type: String,
    },
    reference: {
      type: String,
    },
    calling_date: {
      type: String,
    },
    patient_name: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    patient_dob: {
      type: String,
    },
    spoc: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Uploaddata", uploaddataSchema);
