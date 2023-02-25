import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const  hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const handleErrors = (err: any) => {
  let errors = { email: '', password: '' };

  if(err.message === 'Incorrect email'){
    errors.email = 'That email is not registered';
  }

  if(err.message === 'Incorrect password'){
    errors.password = 'That password is incorrect';
  }

  if(err.code === 11000){
    errors.email = 'That email is already registered';
    return errors;
  }

  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path as keyof typeof errors] = properties.message;
    });
  }
  
  return errors;
}

export const createToken = (id: string, maxAge: number) => {
  return jwt.sign({ id }, process.env.SECRET_KEY as string, { expiresIn: maxAge });
}