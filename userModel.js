const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'department_head', 'employee'],
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  empNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  mobileWork: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  workSite: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  joinedDate: {
    type: Date,
    required: true
  },
  salaryUSD: {
    type: Number,
    required: true
  },
  salaryMVR: {
    type: Number,
    required: true
  },
  accountUSD: {
    type: String,
    required: true
  },
  accountMVR: {
    type: String,
    required: true
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);