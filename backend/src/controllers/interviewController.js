import Interview from "../models/interviewModel.js";
import Application from "../models/applicationModel.js";

export const scheduleInterview = async (req, res, next) => {
  try {
    const { interviewId, application, interviewer, round, scheduledAt } = req.body;

    const app = await Application.findById(application);

    if (!app) {
      return res.status(400).json({
        success: false,
        message: "Application does not exist"
      });
    }

    if (app.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Rejected applications cannot receive interviews"
      });
    }

    if (app.status === "selected") {
      return res.status(400).json({
        success: false,
        message: "Selected candidates cannot be rescheduled"
      });
    }

    if (!scheduledAt || Number.isNaN(Date.parse(scheduledAt))) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview date"
      });
    }

    const interview = await Interview.create({
      interviewId,
      application,
      interviewer,
      round,
      scheduledAt
    });

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

export const updateInterviewResult = async (req, res, next) => {
  try {
    const { result } = req.body;

    if (!["pending", "pass", "fail"].includes(result)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview result"
      });
    }

    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { result },
      { new: true, runValidators: true }
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    res.json({
      success: true,
      message: "Interview result updated successfully",
      data: interview
    });
  } catch (error) {
    next(error);
  }
};