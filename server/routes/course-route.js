const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("course route正在接收一個request....");
  next();
});

//獲得系統中的所有課程
router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用學生id來尋找註冊過的課程
router.get("/students/:_student_id", async (req, res) => {
  let { _student_id } = req.params;
  let courseFound = await Course.find({ students: _student_id })
    .populate("instructor", ["username", "email"])
    .exec();
  return res.send(courseFound);
});

//用講師id來尋找課程
router.get("/instructor/:_instructor_id", async (req, res) => {
  let { _instructor_id } = req.params;
  try {
    let courseFind = await Course.find({ instructor: _instructor_id })
      .populate("instructor", ["username", "email"])
      .exec();
    console.log(courseFind);
    return res.send(courseFind);
  } catch (e) {
    console.log(e);
  }
});

//用課程名稱尋找課程
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let courseFound = await Course.find({ title: { $regex: name } })
      .populate("instructor", ["email", "username"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用課程id尋找課程
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//製作課程post api(老師)
router.post("/", async (req, res) => {
  //驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { title, description, price } = req.body;
  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有講師才能新增課程。若你已經是講師，請透過講師帳號登入");
  }
  try {
    let newCouser = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCouser.save();
    return res.send({
      message: "新課程已經保存",
      savedCourse: savedCourse,
    });
  } catch (e) {
    return res.status(500).send("無法創建課程" + e);
  }
});

//讓學生透過課程id來註冊新課程
router.get("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  console.log("req._id", _id);
  try {
    let course = await Course.findOne({ _id });
    course.students.push(req.user._id);
    await course.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.status(500).send("無法註冊課程" + e);
  }
});

//更改課程
router.patch("/:_id", async (req, res) => {
  //驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //確認課程存在
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(404).send("找不到課程，無法更新");
    }
    //使用者必須是課程講師才能編輯課程
    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "課程已經被更新成功",
        updatedCourse,
      });
    } else {
      return res.status(403).send("只有此課程的講師可以編輯課程");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除課程
router.delete("/:_id", async (req, res) => {
  //驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //確認課程存在
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id }).exec();
    if (!courseFound) {
      return res.status(404).send("找不到課程，無法刪除");
    }
    //使用者必須是課程講師才能編輯課程
    if (courseFound.instructor.equals(req.user._id)) {
      let deleteCourse = await Course.deleteOne({ _id }).exec();
      return res.send({
        message: "課程已經被刪除成功",
        deleteCourse,
      });
    } else {
      return res.status(403).send("只有此課程的講師才能刪除課程");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
