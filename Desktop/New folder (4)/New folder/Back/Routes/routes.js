const express = require("express");
const {
  createApi,
  showApis,
  showApi,
  DeleteApi,
  editApi,
  updateApi,
} = require("../Controller/post");
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
//   },
//   // filename: (req, file, cb) => {
//   // 	cb(null, fileName(file));
//   // },
// });
// const upload = multer({ storage });
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/create", upload.single("image"), createApi);

router.get("/show", showApis);
router.get("/show/:id", showApi);

router.delete("/delete/:id", DeleteApi);
router.get("/edit/:id", editApi);
router.put("/update/:id", upload.single("image"), updateApi);
module.exports = router;
