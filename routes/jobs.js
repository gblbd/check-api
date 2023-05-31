const express = require("express");
const router = express.Router();

// import controller
const {
    showjobCategories,
    uploademployData,
    uploadUserData,
    employerUserFind
} = require("../controller/jobs");



router.get("/jobCategories",showjobCategories);
router.post("/employerProfile",uploademployData);
router.post("/users",uploadUserData);
router.get("/employerUser/:email",employerUserFind);

module.exports = router;
