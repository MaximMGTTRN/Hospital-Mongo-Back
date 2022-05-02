const express = require("express");
const appointmentRoutes = express.Router();
const { check } = require("express-validator");

const {
  getAllAppointments,
  createAppointment,
  deleteAppointment,
  editAppointment,
} = require("../controllers/appointment.controller.js");

appointmentRoutes.get("/allAppointments", getAllAppointments);
appointmentRoutes.post("/createAppointment", createAppointment);
appointmentRoutes.delete("/deleteAppointment", deleteAppointment);
appointmentRoutes.patch("/editAppointment", editAppointment); 

module.exports = appointmentRoutes;
 