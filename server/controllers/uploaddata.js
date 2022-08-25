const multer = require("multer");
const Uploaddata = require("../models/upload_data");
const Agentcti = require("../models/agent_cti");
const csv = require("csvtojson");
var path = require("path");

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      req.formaterror = "Only .csv format allowed";
      return cb(null, "Only .csv allowed");
    }
  },
});

//Upload file
exports.uploaddata = (req, res) => {
  if (req.formaterror) {
    return res.status(500).send({
      success: false,
      message: `Only CSV files are allowed`,
      chk: "2",
    });
  }
  var i = 1;
  csv()
    .fromFile(req.file.path)

    .then((jsonObj) => {
      // console.log(jsonObj);
      var arrayToInsert = [];
      jsonObj.map(async (element) => {
        var temp = {
          usertype: element.User_Type,
          corporate_name: element.Corporate_Name,
          referral_code: element.Referral_Code,
          organisation: element.Organisation,
          offer: element.Offer,
          reference: element.Reference,
          calling_date: element.Calling_Date,
          patient_name: element.Patient_Name,
          phone: element.Phone_Number,
          patient_dob: element.Patient_DOB,
          spoc: element.Spoc,
        };
        arrayToInsert.push(temp);
        i++;
      });

      Uploaddata.insertMany(arrayToInsert, (err, result) => {
        if (result) {
          return res.status(200).json({
            SUCCESS: "data uploaded",
            chk: "0",
          });
        } else if (err.code == 11000) {
          return res.status(422).json({
            error: ` Phone number already exists at row ${i}`,
            chk: "1",
          });
        } else {
          return res.status(400).json({
            error: "error",
          });
        }
      });
    });
};
// Retrieve all User from the database.
exports.getData = async (req, res) => {
  try {
    const phone = req.query.phone;
    console.log(req.query.phone);
    var data = await Uploaddata.find({ phone }).sort({ _id: -1 });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

exports.agentCti = async (req, res) => {
  try {
    // Create
    var agentcti = await new Agentcti({
      primaryPatient: req.body.primaryPatient,
      primaryPhone: req.body.primaryPhone,
      patientRelation: req.body.patientRelation,
      patientName: req.body.patientName,
      patientPhone: req.body.patientPhone,
      patientDOB: req.body.patientDOB,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      pincode: req.body.pincode,
      district: req.body.district,
      state: req.body.state,
      uploaded_data: req.body.uploaded_data,
    });
    // Save agentCTI in the database
    await agentcti.save(agentcti);
    return res.status(200).json("Added Successfully!");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred.",
    });
  }
};

// Retrieve all User from the database.
exports.allagentcti = async (req, res) => {
  try {
    var startDate = req.body.date1;
    var endDate = req.body.date2;
    var data = await Agentcti.find({
      createdAt: { $gte: startDate, $lt: endDate },
    }).populate("uploaded_data");

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};
