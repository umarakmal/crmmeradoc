const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const agentctiSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    primaryPatient: {
      type: String,
    },
    primaryPhone: {
      type: String,
    },
    patientRelation: {
      type: String,
    },
    patientName: {
      type: String,
    },
    patientPhone: {
      type: String,
    },
    patientDOB: {
      type: String,
    },
    gender: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    uploaded_data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uploaddata",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Agentcti", agentctiSchema);
