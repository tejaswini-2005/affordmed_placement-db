import Student from "../models/studentModel.js";
import { fetchExternalDataset } from "../services/externalApiService.js";

import {
  cleanString,
  normalizeEmail,
  normalizeDepartment,
  normalizeStatus,
  cleanSkills,
  isValidEmail,
  isValidCGPA,
  isValidPhone,
  isValidGraduationYear,
  isValidStatus
} from "../utils/validators.js";

export const syncDataset = async (req, res, next) => {
  try {
    const dataset = await fetchExternalDataset();

    const students = dataset?.data?.students || [];

    let totalFetched = students.length;
    let inserted = 0;
    let duplicates = 0;
    let rejected = 0;

    for (const item of students) {
      const studentId = cleanString(item.studentId);
      const name = cleanString(item.name);
      const email = normalizeEmail(item.email);
      const department = normalizeDepartment(item.department);
      const cgpa = Number(item.cgpa);
      const skills = cleanSkills(item.skills);
      const graduationYear = Number(item.graduationYear);
      const phone = cleanString(item.phone);
      const status = normalizeStatus(item.status);

      if (
        !studentId ||
        !name ||
        !department ||
        !isValidEmail(email) ||
        !isValidCGPA(cgpa) ||
        !isValidGraduationYear(graduationYear) ||
        !isValidPhone(phone) ||
        !isValidStatus(status)
      ) {
        rejected++;
        continue;
      }

      const existingStudent = await Student.findOne({
        $or: [{ studentId }, { email }]
      });

      if (existingStudent) {
        duplicates++;
        continue;
      }

      await Student.create({
        studentId,
        name,
        email,
        department,
        cgpa,
        skills,
        graduationYear,
        phone,
        status
      });

      inserted++;
    }

    return res.status(200).json({
      success: true,
      totalFetched,
      inserted,
      duplicates,
      rejected
    });
  } catch (error) {
    next(error);
  }
};