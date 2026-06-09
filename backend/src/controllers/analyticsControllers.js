import Application from "../models/applicationModel.js";
import Student from "../models/studentModel.js";
import Company from "../models/companyModel.js";
import Drive from "../models/driveModel.js";

export const getPlacementAnalytics = async (req, res, next) => {
  try {
    const totalApplications = await Application.countDocuments();

    const shortlistedCount = await Application.countDocuments({
      status: "shortlisted"
    });

    const selectedCount = await Application.countDocuments({
      status: "selected"
    });

    const rejectedCount = await Application.countDocuments({
      status: "rejected"
    });

    res.json({
      success: true,
      message: "Placement analytics fetched successfully",
      data: {
        totalApplications,
        shortlistedCount,
        selectedCount,
        rejectedCount
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentAnalytics = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();

    const data = await Application.aggregate([
      {
        $match: { status: "selected" }
      },
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      {
        $group: {
          _id: "$student.department",
          placedCount: { $sum: 1 }
        }
      },
      {
        $project: {
          department: "$_id",
          placedCount: 1,
          placementPercentage: {
            $multiply: [{ $divide: ["$placedCount", totalStudents] }, 100]
          },
          _id: 0
        }
      }
    ]);

    res.json({
      success: true,
      message: "Department analytics fetched successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanyAnalytics = async (req, res, next) => {
  try {
    const data = await Application.aggregate([
      {
        $lookup: {
          from: "drives",
          localField: "drive",
          foreignField: "_id",
          as: "drive"
        }
      },
      { $unwind: "$drive" },
      {
        $lookup: {
          from: "companies",
          localField: "drive.company",
          foreignField: "_id",
          as: "company"
        }
      },
      { $unwind: "$company" },
      {
        $group: {
          _id: "$company._id",
          companyName: { $first: "$company.name" },
          highestPackage: { $max: "$company.package" },
          driveParticipationCount: { $sum: 1 },
          selectedStudents: {
            $sum: {
              $cond: [{ $eq: ["$status", "selected"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          companyName: 1,
          highestPackage: 1,
          driveParticipationCount: 1,
          selectedStudents: 1
        }
      }
    ]);

    res.json({
      success: true,
      message: "Company analytics fetched successfully",
      data
    });
  } catch (error) {
    next(error);
  }
};