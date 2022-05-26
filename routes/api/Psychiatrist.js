const express = require("express");
const router = express.Router();
const Psychiatrist_controller = require("../../controllers/Psychiatrist")
const auth = require("../../middleware/auth_user")

router.post("/register", Psychiatrist_controller.create_Psychiatrist);
router.post("/login", Psychiatrist_controller.login)
router.post("/register_patient",auth, Psychiatrist_controller.create_Patient)
router.get("/patientsLists", auth, Psychiatrist_controller.get_assigned_patients)
router.get("/patientsCountLists", auth, Psychiatrist_controller.get_assigned_patients_count)

module.exports = router;