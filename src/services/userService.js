require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  //   dùng try catch để trong trường hợp có lỗi sẽ báo lỗi
  try {
    // check user exist
    const user = await User.findOne({ email });
    if (user) {
      // console.log(">>> user exist, chọn 1 email khác ${email}"); nhay don
      console.log(">>> user exist, chọn 1 email khác:", email);

      return null;
    }
    //  thông qua model User gọi đến function create
    // hash user password Ham doi
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // save user to database
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "HOIDANIT",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const loginService = async (email1, password) => {
  //   dùng try catch để trong trường hợp có lỗi sẽ báo lỗi
  try {
    //  thông qua model User gọi đến function create
    // fetch user by email để biết email có tồn tại hay không, find trả về array, findOne trả về phần tử
    const user = await User.findOne({ email: email1 }); // email <tu mongoDB compass: email1 <user truyen vao></user>

    if (user) {
      // compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password không hợp lệ",
        };
      } else {
        // create an access token
        // khai bao data save, khong co password de tang tinh bao mat
        const payload = {
          email: user.email,
          name: user.name,
        };
        // khai báo thư viện reuire(""dotenv")... mới dùng được process
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,
          user: { email: user.email, name: user.name },
        }; // user: { email: user.email, name: user.name } trả về thông tin người dùng vì phía FE cần
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password không hợp lệ",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getUserService = async () => {
  //   dùng try catch để trong trường hợp có lỗi sẽ báo lỗi
  try {
    // truyền biến rỗng mục đích lấy tất cả người dùng về
    let result = await User.find({}).select("-password"); // select("-password") lấy dữ liệu về trừ password
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  createUserService,
  loginService,
  getUserService,
};
