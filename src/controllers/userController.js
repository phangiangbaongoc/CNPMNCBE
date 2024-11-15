const {
  createUserService,
  loginService,
  getUserService,
} = require("../services/userService");

const createUser = async (req, res) => {
  //  controller đẩy qua service tạo data
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  console.log(data); // Kiểm tra dữ liệu trả về
  return res.status(200).json(data);
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  // console.log(data); // Kiểm tra dữ liệu trả về
  return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
};
const getUser = async (req, res) => {
  const data = await getUserService();
  return res.status(200).json(data); // data been server trả về gì thì trả về nguyên cho frontend
};
const getAccount = async (req, res) => {
  return res.status(200).json(req.user); // data been server trả về gì thì trả về nguyên cho frontend
};
module.exports = {
  createUser,
  handleLogin,
  getUser,
  getAccount,
};
