import Drive from "../models/driveModel.js";
import Company from "../models/companyModel.js";

export const createDrive = async (req, res, next) => {
  try {
    const company = await Company.findById(req.body.company);

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Invalid company reference"
      });
    }

    const drive = await Drive.create(req.body);

    res.status(201).json({
      success: true,
      message: "Drive created successfully",
      data: drive
    });
  } catch (error) {
    next(error);
  }
};

export const getDrives = async (req, res, next) => {
  try {
    const { status, company } = req.query;

    const query = {};
    if (status) query.status = status.toLowerCase();

    let drives = await Drive.find(query).populate("company");

    if (company) {
      drives = drives.filter((drive) =>
        drive.company?.name?.toLowerCase().includes(company.toLowerCase())
      );
    }

    res.json({
      success: true,
      message: "Drives fetched successfully",
      data: drives
    });
  } catch (error) {
    next(error);
  }
};

export const getDriveById = async (req, res, next) => {
  try {
    const drive = await Drive.findById(req.params.id).populate("company");

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found"
      });
    }

    res.json({
      success: true,
      message: "Drive fetched successfully",
      data: drive
    });
  } catch (error) {
    next(error);
  }
};

export const updateDrive = async (req, res, next) => {
  try {
    const drive = await Drive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("company");

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found"
      });
    }

    res.json({
      success: true,
      message: "Drive updated successfully",
      data: drive
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDrive = async (req, res, next) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive not found"
      });
    }

    res.json({
      success: true,
      message: "Drive deleted successfully",
      data: drive
    });
  } catch (error) {
    next(error);
  }
};