const express = require("express");
const router = express.Router();
const Psychiatrist_services = require("../../controllers/Psychiatrist")


router.post("/register", Psychiatrist_services.create_Psychiatrist);


module.exports = router;