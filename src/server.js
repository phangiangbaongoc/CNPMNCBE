require("dotenv").config();
const express = require("express"); //commonjs
const mongoose = require("mongoose");
const cors = require("cors");
const configViewEngine = require("./config/viewEngine");
const apiRoutes = require("./routes/api");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const warehouseRouter = require("./routes/warehouseRouter");
const staffRouter = require("./routes/staffRouter");
const connection = require("./config/database");
const { getHomepage } = require("./controllers/homeController");

const app = express();
const port = process.env.PORT || 8888;

//config req.body cấu hình req.body lấy dữ liệu từ data
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// Cấu hình CORS để chấp nhận các request từ frontend
app.use(cors());
const corsOptions = {
  origin: [
    "http://localhost:5173/",
    "https://cnpmncbe-46ny2dnqp-ngocs-projects-c569bb48.vercel.app/",
  ], // Địa chỉ frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Bao gồm cả phương thức OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"], // Header được phép
  credentials: true, // Cho phép cookie hoặc thông tin xác thực
};
app.options("*", cors(corsOptions));
//config template engine
configViewEngine(app);

const webAPI = express.Router();
webAPI.get("/", getHomepage);
//khai báo route
app.use("/", webAPI);
app.use("/v1/api/", apiRoutes);
app.use("/v1/product", productRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/warehouse", warehouseRouter);
app.use("/v1/staff", staffRouter);
(async () => {
  try {
    await connection(); // Kết nối tới database
    console.log("Database connected:", mongoose.connection.name);

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connecting to DB:", error);
  }
})();
