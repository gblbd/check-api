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

// const whitelist = ["https://careersbangladesh.com", "http://localhost:3000"]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }
// app.use(cors(corsOptions))


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v2wwlww.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// console.log(process.env.DB_USER, process.env.DB_PASSWORD)

// async await
async function run() {
  try {
    const jobCategoriesCollections = client
      .db("careersBangladeshDB")
      .collection("jobCategories");
    const jobCollections = client.db("careersBangladeshDB").collection("jobs");

    const userCollections = client
      .db("careersBangladeshDB")
      .collection("users");
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

    //////////////////////////// job Category api Section Start//////////////////////////////////////////////

    // api to save a Job Category
    app.post("/jobCategories", async (req, res) => {
      const category = req.body;
      const result = await jobCategoriesCollections.insertOne(category);
      res.send(result);
    });

    // api to show Job Categories

    app.use("/api", require("./routes/jobs"));
 
  } catch {
    (error) => console.log(error);
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => [
  res.send("The Careers Bangladesh Server is Running."),
]);

app.listen(port, () => [console.log(`Listen to port ${port}`)]);
