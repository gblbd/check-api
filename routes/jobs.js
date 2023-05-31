const express = require("express");
const router = express.Router();

// import controller
const {
    showjobCategories,
    uploademployData,
    uploadUserData
} = require("../controller/jobs");



router.get("/jobCategories",showjobCategories);
router.post("/employerProfile",uploademployData);
router.post("/users",uploadUserData);

module.exports = router;
