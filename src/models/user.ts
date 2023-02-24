import {mongoose} from '../index';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
    minlength: [6, 'Minimum length is 6 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'], //this is a custom error message
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
});

export const User = mongoose.model('user', userSchema);