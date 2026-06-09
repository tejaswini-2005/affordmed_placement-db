import Application from "../models/applicationModel.js";
import Student from "../models/studentModel.js";
import Drive from "../models/driveModel.js";

export const createApplication = async (req, res, next) => {
  try {
    const { student, drive } = req.body;

    const studentData = await Student.findById(student);
    const driveData = await Drive.findById(drive).populate("company");

    if (!studentData) {
      return res.status(400).json({
        success: false,
        message: "Invalid student reference"
      });
    }

    if (!driveData) {
      return res.status(400).json({
        success: false,
        message: "Invalid drive reference"
      });
    }

    if (driveData.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "Closed drives cannot accept applications"
      });
    }

    if (studentData.cgpa < driveData.company.minimumCgpa) {
      return res.status(400).json({
        success: false,
        message: "Student CGPA does not meet company requirement"
      });
    }

    if (!driveData.company.eligibleDepartments.includes(studentData.department)) {
      return res.status(400).json({
        success: false,
        message: "Student department is not eligible"
      });
    }

    const duplicate = await Application.findOne({ student, drive });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Duplicate application not allowed"
      });
    }

    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;

    const query = {};
    if (status) query.status = status.toLowerCase();

    const skip = (Number(page) - 1) * Number(limit);

    let applications = await Application.find(query)
      .populate("student")
      .populate({
        path: "drive",
        populate: { path: "company" }
      });

    if (search) {
      applications = applications.filter((app) => {
        const keyword = search.toLowerCase();

        return (
          app.student?.name?.toLowerCase().includes(keyword) ||
          app.drive?.title?.toLowerCase().includes(keyword) ||
          app.drive?.company?.name?.toLowerCase().includes(keyword)
        );
      });
    }

    const total = applications.length;

    const paginatedApplications = applications.slice(
      skip,
      skip + Number(limit)
    );

    res.json({
      success: true,
      message: "Applications fetched successfully",
      data: paginatedApplications,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("student")
      .populate({
        path: "drive",
        populate: { path: "company" }
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.json({
      success: true,
      message: "Application fetched successfully",
      data: application
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.json({
      success: true,
      message: "Application updated successfully",
      data: application
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.json({
      success: true,
      message: "Application deleted successfully",
      data: application
    });
  } catch (error) {
    next(error);
  }
};