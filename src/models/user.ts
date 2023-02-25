import {mongoose} from '../index';
import validator from 'validator';
import bcrypt from 'bcrypt';

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

//static method to login user
userSchema.statics.login = async function(email: string, password: string){
  const user = await this.findOne({ email });
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};

export const User = mongoose.model('user', userSchema);