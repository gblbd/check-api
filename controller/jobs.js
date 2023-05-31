const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 5000;
app.use(fileUpload());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

// midddle wares
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v2wwlww.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const jobCategoriesCollections = client
  .db("careersBangladeshDB")
  .collection("jobCategories");
const jobCollections = client.db("careersBangladeshDB").collection("jobs");

const userCollections = client.db("careersBangladeshDB").collection("users");
const employerCollections = client
  .db("careersBangladeshDB")
  .collection("employer");
const jobseekerCollections = client
  .db("careersBangladeshDB")
  .collection("jobseeker");

const jobSeekersPersonalDetails = client
  .db("careersBangladeshDB")
  .collection("empPersonal");
const jobSeekersExperiences = client
  .db("careersBangladeshDB")
  .collection("empExperiences");
const jobSeekersAcademics = client
  .db("careersBangladeshDB")
  .collection("empAcademics");
const jobSeekersCareers = client
  .db("careersBangladeshDB")
  .collection("empCareers");
const jobSeekersReferences = client
  .db("careersBangladeshDB")
  .collection("empReferences");

const subscriberCollections = client
  .db("careersBangladeshDB")
  .collection("subscribers");

const applicationCollections = client
  .db("careersBangladeshDB")
  .collection("applications");
const savedJobCollections = client
  .db("careersBangladeshDB")
  .collection("savedJobs");

exports.uploadUserData = async (req, res) => {
    
  try {
    const user = req.body;
    const result = await userCollections.insertOne(user);
    res.send(result);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.showjobCategories = async (req, res) => {
  console.log("hello");
  try {
    const result = await jobCategoriesCollections.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.uploademployData = async (req, res) => {
  try {
    const employer = req.body;
    const bodyData = new FormData();
    var resx = employer.image.split(",")[1].trim();
    console.log("one");
    bodyData.append("image", resx);
    const response = await Axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
      headers: bodyData.getHeaders(),
      data: bodyData,
    });

    console.log("cccccc", response);
    const imageUrl = response.data.data.url;
    const newData = {
      email: employer.email,
      name: employer.name,

      companyNameEn: employer.companyNameEn,
      organizationType: employer.organizationType,
      companyNameBn: employer.companyNameBn,

      companyLogo: imageUrl,
      estdYear: employer.estdYear,
      companySize: employer.companySize,
      addressEng: employer.addressEng,
      addressBng: employer.addressBng,
      busiDescription: employer.busiDescription,

      tradeLicense: employer.tradeLicense,
      websiteURL: employer.websiteURL,
      contactPersonName: employer.contactPersonName,
      contactPersonDesignation: employer.contactPersonDesignation,
      contactPersonEmail: employer.contactPersonEmail,
      contactPersonPhone: employer.contactPersonPhone,
    };
    const result = await employerCollections.insertOne(newData);
    res.send(result);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
