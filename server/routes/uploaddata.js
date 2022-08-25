const express = require("express");
const router = express.Router();

const {
  uploaddata,
  upload,
  getData,
  agentCti,
  allagentcti,
} = require("../controllers/uploaddata");

router.post("/uploadfile", upload.single("csv"), uploaddata);
router.get(`/uploadeddata`, getData);

router.post("/agentcti", agentCti);
router.post("/allagentcti", allagentcti);
module.exports = router;
