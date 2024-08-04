const express = require("express");
const dotenv = require("dotenv");
const appRouter = require("./routes/index.js");
const cookieparser = require("cookie-parser");
const authenticateUser = require("./middlewares/auth.js");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/", appRouter);

app.listen(PORT, () => {
  console.log(`Server heard on PORT : ${PORT}`);
});
