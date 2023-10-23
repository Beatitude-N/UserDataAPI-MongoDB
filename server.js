const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbconnection");
const userRouter = require("./routes/userRoutes");

connectDb();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json())
app.use("/api/contacts", router )
app.use("/api/users", userRouter )
app.use(errorHandler)

app.listen(port, () => {
    console.log(`server runing on ${port}`)
});