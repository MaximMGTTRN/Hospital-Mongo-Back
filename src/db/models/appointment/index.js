const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const appointmentSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
  }
});

module.exports = Appointment = mongoose.model(
  "appointment",
  appointmentSchema
);
