import Student from "../models/studentModel.js";

export const getStudents = async (req, res, next) => {
  try {
    const { department, cgpaMin, status } = req.query;

    const query = {};

    if (department) query.department = department.toUpperCase();
    if (status) query.status = status.toLowerCase();
    if (cgpaMin) query.cgpa = { $gte: Number(cgpaMin) };

    const students = await Student.find(query);

    res.json({
      success: true,
      message: "Students fetched successfully",
      data: students
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      message: "Student fetched successfully",
      data: student
    });
  } catch (error) {
    next(error);
  }
};