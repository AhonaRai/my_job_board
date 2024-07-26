const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator'); // Import validator

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email'] // Email validation
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Custom method to update user details
userSchema.methods.updateDetails = async function (updates) {
  Object.keys(updates).forEach(key => {
    if (key !== 'password') {
      this[key] = updates[key];
    }
  });
  await this.save();
};
const User = mongoose.model('User', userSchema);
module.exports = User;
