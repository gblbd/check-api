const express = require("express");
const router = express.Router();

// import controller
const {
    showjobCategories,
    uploademployData
} = require("../controller/jobs");



router.get("/jobCategories",showjobCategories);
router.post("/employerProfile",uploademployData);

module.exports = router;
